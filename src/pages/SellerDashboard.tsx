
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/components/auth/AuthContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import SellerProfile from '@/components/seller/SellerProfile';
import PremiumListings from '@/components/premium/PremiumListings';
import BusinessAccounts from '@/components/business/BusinessAccounts';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ArrowLeft, LayoutDashboard, Star, Building2, Lock, MapPin } from 'lucide-react';

const SellerDashboard = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground text-sm">Loading dashboard…</p>
        </div>
      </div>
    );
  }

  // Auth wall — not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col">
        {/* Header */}
        <header className="bg-background shadow-sm border-b sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16">
            <Button variant="ghost" size="sm" onClick={() => navigate('/')}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              <span className="hidden sm:inline">Back to MoCha Market</span>
              <span className="sm:hidden">Back</span>
            </Button>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="w-4 h-4" />
              Kingdom of Lesotho
            </div>
          </div>
        </header>

        {/* Auth wall content */}
        <main className="flex-1 flex items-center justify-center px-4 py-12">
          <div className="max-w-sm w-full text-center space-y-6">
            <div className="bg-primary/10 rounded-full p-5 w-20 h-20 flex items-center justify-center mx-auto">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-bold">Seller Dashboard</h1>
              <p className="text-muted-foreground">
                Sign in to manage your listings, track sales, and grow your business on MoCha Market.
              </p>
            </div>
            <div className="space-y-3">
              <Button className="w-full" size="lg" onClick={() => navigate('/auth')}>
                Sign In to Continue
              </Button>
              <Button variant="outline" className="w-full" size="lg" onClick={() => navigate('/auth')}>
                Create Free Account
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-3 pt-4 border-t text-xs text-muted-foreground">
              <div className="space-y-1">
                <div className="font-semibold text-foreground">Free</div>
                <div>List items</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-foreground">Secure</div>
                <div>Verified sellers</div>
              </div>
              <div className="space-y-1">
                <div className="font-semibold text-foreground">Local</div>
                <div>All 10 districts</div>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Authenticated dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-background shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 gap-3">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="sm" onClick={() => navigate('/')} className="shrink-0">
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Back</span>
              </Button>
              <div>
                <h1 className="text-base sm:text-xl font-bold leading-tight">Seller Dashboard</h1>
                <p className="text-xs text-muted-foreground hidden sm:block truncate max-w-[200px]">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="hidden sm:inline-flex">
                <MapPin className="w-3 h-3 mr-1" />
                Lesotho
              </Badge>
              <ThemeToggle />
              <Button size="sm" variant="outline" onClick={() => navigate('/list-product')}>
                <span className="hidden sm:inline">+ List Item</span>
                <span className="sm:hidden">+</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Tabs defaultValue="profile" className="space-y-6">
          {/* Tab List — scrollable on mobile */}
          <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
            <TabsList className="inline-flex w-auto sm:grid sm:w-full sm:grid-cols-3 min-w-full sm:min-w-0">
              <TabsTrigger value="profile" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
                <LayoutDashboard className="w-3.5 h-3.5 shrink-0" />
                <span>Seller Profile</span>
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

          <TabsContent value="profile">
            <SellerProfile />
          </TabsContent>

          <TabsContent value="premium">
            <PremiumListings />
          </TabsContent>

          <TabsContent value="business">
            <BusinessAccounts />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
