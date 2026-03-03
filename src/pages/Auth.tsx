
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";
import { Shield, Mail, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';

const RESEND_COOLDOWN = 30;

const Auth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const { sendOtp, verifyOtp, user } = useAuth();
  const navigate = useNavigate();
  const cooldownRef = useRef<ReturnType<typeof setInterval>>();

  // Redirect if already logged in
  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  // Cooldown timer
  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setInterval(() => {
        setCooldown(prev => {
          if (prev <= 1) { clearInterval(cooldownRef.current); return 0; }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(cooldownRef.current);
    }
  }, [cooldown]);

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { toast.error("Please enter your email"); return; }

    setLoading(true);
    const { error } = await sendOtp(email.trim().toLowerCase());
    setLoading(false);

    if (error) {
      toast.error(error.message);
      return;
    }

    toast.success("Verification code sent to your email");
    setStep('otp');
    setCooldown(RESEND_COOLDOWN);
  };

  const handleResend = async () => {
    if (cooldown > 0) return;
    setLoading(true);
    const { error } = await sendOtp(email.trim().toLowerCase());
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success("New code sent!");
    setCooldown(RESEND_COOLDOWN);
    setOtp('');
  };

  const handleVerifyOtp = useCallback(async (code: string) => {
    if (code.length !== 6) return;
    setLoading(true);
    const { error } = await verifyOtp(email.trim().toLowerCase(), code);
    setLoading(false);

    if (error) {
      toast.error("Invalid or expired code. Please try again.");
      setOtp('');
      return;
    }

    toast.success("Welcome to MoCha Market!");

    // Role-based redirect
    const { data: { user: authUser } } = await supabase.auth.getUser();
    if (authUser) {
      const { data: roles } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', authUser.id);

      const roleSet = new Set(roles?.map(r => r.role) || []);

      if (roleSet.has('admin')) { navigate('/admin'); return; }

      // Check if profile is complete
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
    }
  }, [email, verifyOtp, navigate]);

  // Auto-verify when 6 digits entered
  useEffect(() => {
    if (otp.length === 6) handleVerifyOtp(otp);
  }, [otp, handleVerifyOtp]);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[70vh]">
      <div className="max-w-md w-full space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-2">
            <Shield className="w-7 h-7 text-primary" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {step === 'email' ? 'Welcome to MoCha Market' : 'Enter Verification Code'}
          </h2>
          <p className="text-sm text-muted-foreground">
            {step === 'email'
              ? "Secure, passwordless login for Lesotho's digital marketplace"
              : <>Code sent to <span className="font-medium text-foreground">{email}</span></>
            }
          </p>
        </div>

        <Card className="border-border/50 shadow-lg">
          <CardHeader className="pb-0" />
          <CardContent className="space-y-5">
            {step === 'email' ? (
              <form onSubmit={handleSendOtp} className="space-y-4">
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
                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Sending…</> : 'Send Verification Code'}
                </Button>
              </form>
            ) : (
              <div className="space-y-5">
                {/* Back button */}
                <button
                  type="button"
                  onClick={() => { setStep('email'); setOtp(''); }}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Change email
                </button>

                {/* OTP Input */}
                <div className="flex flex-col items-center space-y-4">
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={loading}
                    autoFocus
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>

                  {loading && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Verifying…
                    </div>
                  )}
                </div>

                {/* Resend */}
                <div className="text-center">
                  {cooldown > 0 ? (
                    <p className="text-xs text-muted-foreground">
                      Resend code in <span className="font-medium text-foreground">{cooldown}s</span>
                    </p>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={loading}
                      className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                    >
                      Resend Code
                    </button>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Trust indicators */}
        <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <CheckCircle className="w-3.5 h-3.5 text-primary" />
            <span>No password needed</span>
          </div>
          <div className="flex items-center gap-1">
            <Shield className="w-3.5 h-3.5 text-primary" />
            <span>Bank-grade security</span>
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

export default Auth;
