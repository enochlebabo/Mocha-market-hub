
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { User, Phone, MapPin, FileText } from 'lucide-react';

const DISTRICTS = [
  'Maseru', 'Berea', 'Leribe', 'Butha-Buthe',
  'Mokhotlong', 'Thaba-Tseka', 'Qacha\'s Nek',
  'Quthing', 'Mohale\'s Hoek', 'Mafeteng',
];

const CompleteProfile = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [form, setForm] = useState({
    display_name: '',
    phone: '',
    district: '',
    bio: '',
  });

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }
    if (user) {
      supabase
        .from('profiles')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle()
        .then(({ data }) => {
          if (data) {
            setForm({
              display_name: data.display_name || '',
              phone: data.phone || '',
              district: data.district || '',
              bio: data.bio || '',
            });
          }
          setFetching(false);
        });
    }
  }, [user, authLoading, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.display_name || !form.phone || !form.district) {
      toast.error('Please fill in all required fields');
      return;
    }
    setLoading(true);
    const { error } = await supabase
      .from('profiles')
      .upsert({
        user_id: user!.id,
        display_name: form.display_name,
        phone: form.phone,
        district: form.district,
        bio: form.bio,
        is_complete: true,
      }, { onConflict: 'user_id' });

    setLoading(false);
    if (error) {
      toast.error('Failed to save profile');
      console.error(error);
    } else {
      toast.success('Profile completed!');
      const redirect = new URLSearchParams(window.location.search).get('redirect');
      navigate(redirect || '/');
    }
  };

  if (authLoading || fetching) {
    return <div className="flex justify-center py-20 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            Complete Your Profile
          </CardTitle>
          <p className="text-sm text-muted-foreground">Fill in your details to start selling on MoCha Market</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <Label htmlFor="display_name">Display Name *</Label>
              <Input
                id="display_name"
                value={form.display_name}
                onChange={(e) => setForm({ ...form, display_name: e.target.value })}
                placeholder="How buyers will see you"
                required
              />
            </div>

            <div>
              <Label htmlFor="phone" className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" /> Phone Number *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="+266 5XXX XXXX"
                required
              />
            </div>

            <div>
              <Label className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" /> District *
              </Label>
              <Select value={form.district} onValueChange={(v) => setForm({ ...form, district: v })}>
                <SelectTrigger><SelectValue placeholder="Select your district" /></SelectTrigger>
                <SelectContent>
                  {DISTRICTS.map((d) => (
                    <SelectItem key={d} value={d}>{d}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="bio" className="flex items-center gap-1">
                <FileText className="w-3.5 h-3.5" /> Bio (optional)
              </Label>
              <Textarea
                id="bio"
                value={form.bio}
                onChange={(e) => setForm({ ...form, bio: e.target.value })}
                placeholder="Tell buyers about yourself..."
                rows={3}
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Saving...' : 'Save & Continue'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CompleteProfile;
