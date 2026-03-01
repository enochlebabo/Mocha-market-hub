
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SellerProfile from '@/components/seller/SellerProfile';
import PremiumListings from '@/components/premium/PremiumListings';
import BusinessAccounts from '@/components/business/BusinessAccounts';
import TrustScoreCard from '@/components/seller/TrustScoreCard';
import BoostListingModal from '@/components/premium/BoostListingModal';
import { LayoutDashboard, Star, Building2, Lock, Rocket } from 'lucide-react';

const SellerDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [boostOpen, setBoostOpen] = useState(false);

  const { data: trustData } = useQuery({
    queryKey: ['seller-trust-score', user?.id],
    queryFn: async () => {
      if (!user) return null;
      const { data, error } = await supabase.rpc('get_seller_trust_score', { seller_user_id: user.id });
      if (error) throw error;
      return data as any;
    },
    enabled: !!user,
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-sm w-full text-center space-y-6">
          <div className="bg-primary/10 rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto">
            <Lock className="w-10 h-10 text-primary" />
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl font-bold">Seller Dashboard</h1>
            <p className="text-muted-foreground">Sign in to manage your listings, track sales, and grow your business on MoCha Market.</p>
          </div>
          <div className="space-y-3">
            <Button className="w-full" size="lg" onClick={() => navigate('/auth')}>Sign In to Continue</Button>
            <Button variant="outline" className="w-full" size="lg" onClick={() => navigate('/auth')}>Create Free Account</Button>
          </div>
          <div className="grid grid-cols-3 gap-3 pt-4 border-t text-xs text-muted-foreground">
            <div className="space-y-1"><div className="font-semibold text-foreground">Free</div><div>List items</div></div>
            <div className="space-y-1"><div className="font-semibold text-foreground">Secure</div><div>Verified sellers</div></div>
            <div className="space-y-1"><div className="font-semibold text-foreground">Local</div><div>All 10 districts</div></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-base sm:text-xl font-bold">Seller Dashboard</h1>
          <p className="text-xs text-muted-foreground hidden sm:block truncate max-w-[200px]">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => setBoostOpen(true)}>
            <Rocket className="w-3.5 h-3.5 mr-1" />Boost
          </Button>
          <Button size="sm" variant="outline" onClick={() => navigate('/list-product')}>+ List Item</Button>
        </div>

      {/* Trust Score Card */}
      {trustData && (
        <div className="mb-6">
          <TrustScoreCard data={trustData} />
        </div>
      )}

      <Tabs defaultValue="profile" className="space-y-6">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="inline-flex w-auto sm:grid sm:w-full sm:grid-cols-3 min-w-full sm:min-w-0 h-auto p-1">
            <TabsTrigger value="profile" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"><LayoutDashboard className="w-3.5 h-3.5 shrink-0" /><span>Seller Profile</span></TabsTrigger>
            <TabsTrigger value="premium" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"><Star className="w-3.5 h-3.5 shrink-0" /><span>Premium</span></TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4"><Building2 className="w-3.5 h-3.5 shrink-0" /><span>Business</span></TabsTrigger>
          </TabsList>
        </div>
        <TabsContent value="profile"><SellerProfile /></TabsContent>
        <TabsContent value="premium"><PremiumListings /></TabsContent>
        <TabsContent value="business"><BusinessAccounts /></TabsContent>
      </Tabs>

      <BoostListingModal open={boostOpen} onOpenChange={setBoostOpen} />
    </div>
  );
};

export default SellerDashboard;
