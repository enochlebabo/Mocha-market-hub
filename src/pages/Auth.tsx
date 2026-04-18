import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Shield, Mail, Lock, ArrowLeft, Loader2, CheckCircle, Eye, EyeOff, UserPlus, LogIn } from 'lucide-react';

type AuthMode = 'signin' | 'signup' | 'forgot';

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const { signIn, signUp, resetPassword, signInWithGoogle, user } = useAuth();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const { error } = await signInWithGoogle();
    if (error) {
      setLoading(false);
      toast.error(error.message);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      handlePostAuthRedirect();
    }
  }, [user]);

  const handlePostAuthRedirect = async () => {
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (!authUser) return;

    const { data: roles } = await supabase
      .from('user_roles')
      .select('role')
      .eq('user_id', authUser.id);

    const roleSet = new Set(roles?.map(r => r.role) || []);
    if (roleSet.has('admin')) { navigate('/admin'); return; }

    const { data: profile } = await supabase
      .from('profiles')
      .select('is_complete')
      .eq('user_id', authUser.id)
      .maybeSingle();

    if (!profile || !profile.is_complete) {
      navigate('/complete-profile');
      return;
    }
    navigate('/');
  };

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const validatePassword = (pw: string) => {
    if (pw.length < 8) return 'Password must be at least 8 characters';
    if (!/[A-Z]/.test(pw)) return 'Must contain an uppercase letter';
    if (!/[a-z]/.test(pw)) return 'Must contain a lowercase letter';
    if (!/[0-9]/.test(pw)) return 'Must contain a number';
    return null;
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email.trim())) { toast.error('Please enter a valid email'); return; }
    if (!password) { toast.error('Please enter your password'); return; }

    setLoading(true);
    const { error } = await signIn(email.trim().toLowerCase(), password);
    setLoading(false);

    if (error) {
      if (error.message?.includes('Email not confirmed')) {
        toast.error('Please confirm your email before signing in. Check your inbox.');
      } else if (error.message?.includes('Invalid login credentials')) {
        toast.error('Invalid email or password. Please try again.');
      } else {
        toast.error(error.message);
      }
      return;
    }
    toast.success('Welcome back to MoCha Market!');
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email.trim())) { toast.error('Please enter a valid email'); return; }

    const pwError = validatePassword(password);
    if (pwError) { toast.error(pwError); return; }
    if (password !== confirmPassword) { toast.error('Passwords do not match'); return; }

    setLoading(true);
    const { error } = await signUp(email.trim().toLowerCase(), password);
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setEmailSent(true);
    toast.success('Account created! Please check your email to confirm.');
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateEmail(email.trim())) { toast.error('Please enter a valid email'); return; }

    setLoading(true);
    const { error } = await resetPassword(email.trim().toLowerCase());
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    setEmailSent(true);
    toast.success('Password reset link sent to your email.');
  };

  const resetForm = (newMode: AuthMode) => {
    setMode(newMode);
    setPassword('');
    setConfirmPassword('');
    setShowPassword(false);
    setEmailSent(false);
  };

  if (emailSent) {
    return (
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
        <div className="max-w-md w-full space-y-6">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-2">
              <Mail className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Check Your Email</h2>
            <p className="text-sm text-muted-foreground">
              {mode === 'signup'
                ? <>We've sent a confirmation link to <span className="font-semibold text-foreground">{email}</span>. Click the link to activate your account.</>
                : <>We've sent a password reset link to <span className="font-semibold text-foreground">{email}</span>. Click the link to set a new password.</>
              }
            </p>
          </div>
          <Card className="border-border/50 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  Check your inbox and spam/junk folder
                </p>
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  The link expires in 24 hours
                </p>
                <p className="text-xs text-muted-foreground">
                  <CheckCircle className="w-3.5 h-3.5 inline mr-1 text-primary" />
                  {mode === 'signup' ? 'After confirming, you can sign in' : 'After resetting, sign in with your new password'}
                </p>
              </div>
              <Button variant="outline" className="w-full" onClick={() => resetForm('signin')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Sign In
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {mode === 'signin' && 'Welcome Back'}
            {mode === 'signup' && 'Create Your Account'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {mode === 'signin' && "Sign in to Lesotho's leading digital marketplace"}
            {mode === 'signup' && "Join MoCha Market — buy and sell with confidence"}
            {mode === 'forgot' && "Enter your email to receive a password reset link"}
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardContent className="pt-6 space-y-5">
            {mode === 'forgot' && (
              <button
                type="button"
                onClick={() => resetForm('signin')}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Back to sign in
              </button>
            )}

            {mode !== 'forgot' && (
              <>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full"
                  size="lg"
                  onClick={handleGoogleSignIn}
                  disabled={loading}
                >
                  <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-border/50" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>
              </>
            )}

            <form onSubmit={
              mode === 'signin' ? handleSignIn :
              mode === 'signup' ? handleSignUp :
              handleForgotPassword
            } className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@example.com"
                    className="pl-10"
                    required
                    autoFocus
                    autoComplete="email"
                  />
                </div>
              </div>

              {/* Password (signin & signup) */}
              {mode !== 'forgot' && (
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10 pr-10"
                      required
                      autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Confirm Password (signup only) */}
              {mode === 'signup' && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="pl-10"
                      required
                      autoComplete="new-password"
                    />
                  </div>
                </div>
              )}

              {/* Password requirements hint */}
              {mode === 'signup' && (
                <div className="bg-muted/50 rounded-lg p-3 space-y-1">
                  <p className="text-xs font-medium text-foreground mb-1">Password requirements:</p>
                  <PasswordCheck label="At least 8 characters" valid={password.length >= 8} />
                  <PasswordCheck label="Uppercase letter" valid={/[A-Z]/.test(password)} />
                  <PasswordCheck label="Lowercase letter" valid={/[a-z]/.test(password)} />
                  <PasswordCheck label="Number" valid={/[0-9]/.test(password)} />
                  {confirmPassword && (
                    <PasswordCheck label="Passwords match" valid={password === confirmPassword} />
                  )}
                </div>
              )}

              {/* Forgot password link (signin only) */}
              {mode === 'signin' && (
                <div className="text-right">
                  <button
                    type="button"
                    onClick={() => resetForm('forgot')}
                    className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>
              )}

              {/* Submit */}
              <Button type="submit" className="w-full" size="lg" disabled={loading}>
                {loading ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Please wait…</>
                ) : (
                  <>
                    {mode === 'signin' && <><LogIn className="w-4 h-4 mr-2" />Sign In</>}
                    {mode === 'signup' && <><UserPlus className="w-4 h-4 mr-2" />Create Account</>}
                    {mode === 'forgot' && <><Mail className="w-4 h-4 mr-2" />Send Reset Link</>}
                  </>
                )}
              </Button>
            </form>

            {/* Toggle between signin/signup */}
            {mode !== 'forgot' && (
              <div className="text-center pt-2 border-t border-border/50">
                <p className="text-sm text-muted-foreground">
                  {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
                  <button
                    type="button"
                    onClick={() => resetForm(mode === 'signin' ? 'signup' : 'signin')}
                    className="text-primary hover:text-primary/80 font-semibold transition-colors"
                  >
                    {mode === 'signin' ? 'Sign Up' : 'Sign In'}
                  </button>
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Secure authentication</span>
          </div>
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-primary" />
            <span>Email verified</span>
          </div>
        </div>

        <div className="text-center text-xs text-muted-foreground">
          <p>By signing in, you agree to our{' '}
            <a href="/terms-of-service" className="text-primary hover:underline">Terms</a> and{' '}
            <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>
          </p>
        </div>
      </div>
    </div>
  );
};

const PasswordCheck = ({ label, valid }: { label: string; valid: boolean }) => (
  <p className={`text-xs flex items-center gap-1.5 ${valid ? 'text-primary' : 'text-muted-foreground'}`}>
    <CheckCircle className={`w-3 h-3 ${valid ? 'text-primary' : 'text-muted-foreground/40'}`} />
    {label}
  </p>
);

export default Auth;
