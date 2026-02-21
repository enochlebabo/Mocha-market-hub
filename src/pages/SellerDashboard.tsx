
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SellerProfile from '@/components/seller/SellerProfile';
import PremiumListings from '@/components/premium/PremiumListings';
import BusinessAccounts from '@/components/business/BusinessAccounts';
import MyListings from '@/components/seller/MyListings';
import AppHeader from '@/components/layout/AppHeader';
import { LayoutDashboard, Star, Building2, Lock, Package } from 'lucide-react';

const SellerDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-14 sm:pb-0">
        <AppHeader showCategoryNav={false} />
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-sm w-full text-center space-y-6">
            <div className="bg-primary/10 rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Seller Dashboard</h1>
              <p className="text-muted-foreground">Sign in to manage your listings and grow your business.</p>
            </div>
            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={() => navigate('/auth')}>Sign In</Button>
              <Button variant="outline" className="w-full" size="lg" onClick={() => navigate('/auth')}>Create Free Account</Button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-14 sm:pb-0">
      <AppHeader showCategoryNav={false} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Seller Dashboard</h1>

        <Tabs defaultValue="listings" className="space-y-6">
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex w-auto sm:grid sm:w-full sm:grid-cols-4 min-w-full sm:min-w-0 h-auto p-1">
              <TabsTrigger value="listings" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                <Package className="w-3.5 h-3.5 shrink-0" />
                <span>My Listings</span>
              </TabsTrigger>
              <TabsTrigger value="profile" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                <span>Profile</span>
              </TabsTrigger>
              <TabsTrigger value="premium" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                <Star className="w-3.5 h-3.5 shrink-0" />
                <span>Premium</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                <Building2 className="w-3.5 h-3.5 shrink-0" />
                <span>Business</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="listings"><MyListings /></TabsContent>
          <TabsContent value="profile"><SellerProfile /></TabsContent>
          <TabsContent value="premium"><PremiumListings /></TabsContent>
          <TabsContent value="business"><BusinessAccounts /></TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
