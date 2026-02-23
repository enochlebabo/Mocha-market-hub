
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => { if (user) navigate('/'); }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) toast.error(error.message);
        else { toast.success("Welcome back to MoCha Market!"); navigate('/'); }
      } else {
        if (!firstName || !lastName) { toast.error("Please fill in all fields"); setLoading(false); return; }
        const { error } = await signUp(email, password, firstName, lastName);
        if (error) toast.error(error.message);
        else toast.success("Account created! Please check your email to verify your account.");
      }
    } catch { toast.error("An unexpected error occurred"); } finally { setLoading(false); }
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground">{isLogin ? 'Welcome back' : 'Join MoCha Market'}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{isLogin ? 'Sign in to your account to start buying and selling' : "Create your account to join Lesotho's digital marketplace"}</p>
        </div>
        <Card>
          <CardHeader><CardTitle className="text-center">{isLogin ? 'Sign In' : 'Create Account'}</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-4">
                  <div><Label htmlFor="firstName">First Name</Label><Input id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="Your first name" required={!isLogin} /></div>
                  <div><Label htmlFor="lastName">Last Name</Label><Input id="lastName" value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Your last name" required={!isLogin} /></div>
                </div>
              )}
              <div><Label htmlFor="email">Email</Label><Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="your.email@example.com" required /></div>
              <div><Label htmlFor="password">Password</Label><Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" required /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? 'Please wait...' : (isLogin ? 'Sign In' : 'Create Account')}</Button>
            </form>
            <div className="mt-6 text-center">
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-sm text-primary hover:text-primary/80">{isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}</button>
            </div>
          </CardContent>
        </Card>
        <div className="text-center text-sm text-muted-foreground"><p>By joining MoCha Market, you're supporting</p><p className="font-medium text-primary">Lesotho's digital economy</p></div>
      </div>
    </div>
  );
};

export default Auth;
