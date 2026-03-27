
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Shield, DollarSign, Users, TrendingUp, Check, X, Eye, Trash2, AlertTriangle, Search, Package, BarChart3, UserCheck, ShieldAlert, MapPin } from 'lucide-react';
import { toast } from 'sonner';
import { formatDistanceToNow } from 'date-fns';
import { useAuth } from '@/components/auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const formatPrice = (price: number) => `M ${price.toLocaleString()}`;

const AdminDashboard = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchUsers, setSearchUsers] = useState('');
  const [searchListings, setSearchListings] = useState('');

  // Check admin role
  const { data: isAdmin, isLoading: checkingRole } = useQuery({
    queryKey: ['check-admin', user?.id],
    queryFn: async () => {
      if (!user) return false;
      const { data } = await supabase
        .from('user_roles')
        .select('role')
        .eq('user_id', user.id)
        .eq('role', 'admin');
      return (data && data.length > 0);
    },
    enabled: !!user,
  });

  const { data: verificationRequests } = useQuery({
    queryKey: ['admin-verification-requests'],
    queryFn: async () => {
      const { data, error } = await supabase.from('seller_verification').select('*').eq('verification_status', 'pending');
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: allProfiles } = useQuery({
    queryKey: ['admin-profiles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: allListings } = useQuery({
    queryKey: ['admin-listings'],
    queryFn: async () => {
      const { data, error } = await supabase.from('listings').select('*').order('created_at', { ascending: false }).limit(100);
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: businessAccounts } = useQuery({
    queryKey: ['admin-business-accounts'],
    queryFn: async () => {
      const { data, error } = await supabase.from('business_accounts').select('*');
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: advertisements } = useQuery({
    queryKey: ['admin-advertisements'],
    queryFn: async () => {
      const { data, error } = await supabase.from('advertisements').select('*');
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: transactions } = useQuery({
    queryKey: ['admin-transactions'],
    queryFn: async () => {
      const { data, error } = await supabase.from('transactions').select('*').order('created_at', { ascending: false }).limit(50);
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const { data: userRoles } = useQuery({
    queryKey: ['admin-user-roles'],
    queryFn: async () => {
      const { data, error } = await supabase.from('user_roles').select('*');
      if (error) throw error;
      return data;
    },
    enabled: !!isAdmin,
  });

  const updateVerificationMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: 'verified' | 'rejected' }) => {
      const { error } = await supabase
        .from('seller_verification')
        .update({ verification_status: status, verified_at: status === 'verified' ? new Date().toISOString() : null })
        .eq('id', id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-verification-requests'] });
      toast.success('Verification status updated');
    },
  });

  if (checkingRole) {
    return <div className="flex items-center justify-center min-h-[60vh] text-muted-foreground">Checking permissions...</div>;
  }

  if (!user || !isAdmin) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
        <ShieldAlert className="w-16 h-16 text-destructive" />
        <h2 className="text-2xl font-bold text-foreground">Access Denied</h2>
        <p className="text-muted-foreground">You must be an admin to access this panel.</p>
        <Button onClick={() => navigate('/')}>Go Home</Button>
      </div>
    );
  }

  // Stats
  const totalUsers = allProfiles?.length || 0;
  const totalListings = allListings?.length || 0;
  const activeListings = allListings?.filter(l => l.status === 'active').length || 0;
  const pendingVerifications = verificationRequests?.length || 0;
  const activeAds = advertisements?.filter(ad => ad.is_active).length || 0;
  const monthlyRevenue = (advertisements?.reduce((sum, ad) => sum + (ad.monthly_fee || 0), 0) || 0) +
    (businessAccounts?.reduce((sum, ba) => sum + (ba.monthly_fee || 0), 0) || 0);
  const completedTransactions = transactions?.filter(t => t.status === 'completed').length || 0;
  const totalTransactionVolume = transactions?.filter(t => t.status === 'completed').reduce((sum, t) => sum + t.agreed_price, 0) || 0;

  // Fraud signals
  const suspiciousListings = allListings?.filter(l => {
    const highPrice = l.price > 500000;
    const noDescription = !l.description || l.description.length < 10;
    return highPrice && noDescription;
  }) || [];

  const duplicateListings = allListings?.filter((l, i, arr) =>
    arr.findIndex(a => a.title === l.title && a.user_id === l.user_id && a.id !== l.id) !== -1
  ) || [];

  // Filter users
  const filteredProfiles = allProfiles?.filter(p =>
    !searchUsers || (p.display_name || '').toLowerCase().includes(searchUsers.toLowerCase()) ||
    p.user_id.toLowerCase().includes(searchUsers.toLowerCase())
  ) || [];

  const filteredListings = allListings?.filter(l =>
    !searchListings || l.title.toLowerCase().includes(searchListings.toLowerCase())
  ) || [];

  const getUserRole = (userId: string) => {
    const role = userRoles?.find(r => r.user_id === userId);
    return role?.role || 'user';
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Admin Super Panel</h1>
          <p className="text-sm text-muted-foreground">MoCha Market Control Centre</p>
        </div>
        <Badge variant="secondary" className="flex items-center space-x-2 px-3 py-1.5">
          <Shield className="w-4 h-4" />
          <span>Admin</span>
        </Badge>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
        {[
          { label: 'Users', value: totalUsers, icon: Users, color: 'text-primary' },
          { label: 'Listings', value: totalListings, icon: Package, color: 'text-primary' },
          { label: 'Active', value: activeListings, icon: Eye, color: 'text-primary' },
          { label: 'Pending', value: pendingVerifications, icon: UserCheck, color: 'text-destructive' },
          { label: 'Active Ads', value: activeAds, icon: TrendingUp, color: 'text-primary' },
          { label: 'Revenue/mo', value: formatPrice(monthlyRevenue), icon: DollarSign, color: 'text-primary' },
          { label: 'Completed', value: completedTransactions, icon: Check, color: 'text-primary' },
          { label: 'Volume', value: formatPrice(totalTransactionVolume), icon: BarChart3, color: 'text-primary' },
        ].map((stat) => (
          <Card key={stat.label}>
            <CardContent className="p-3 text-center">
              <stat.icon className={`w-5 h-5 mx-auto mb-1 ${stat.color}`} />
              <p className="text-lg font-bold text-foreground">{stat.value}</p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Fraud Alerts */}
      {(suspiciousListings.length > 0 || duplicateListings.length > 0) && (
        <Card className="border-destructive/50 bg-destructive/5">
          <CardHeader className="pb-2">
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="w-5 h-5" /> Fraud Detection Alerts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {suspiciousListings.length > 0 && (
              <p className="text-sm text-foreground">
                <span className="font-semibold text-destructive">{suspiciousListings.length}</span> high-value listings with minimal descriptions
              </p>
            )}
            {duplicateListings.length > 0 && (
              <p className="text-sm text-foreground">
                <span className="font-semibold text-destructive">{duplicateListings.length}</span> potential duplicate listings detected
              </p>
            )}
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="users">Users ({totalUsers})</TabsTrigger>
          <TabsTrigger value="listings">Listings ({totalListings})</TabsTrigger>
          <TabsTrigger value="verifications">Verifications ({pendingVerifications})</TabsTrigger>
          <TabsTrigger value="business">Business</TabsTrigger>
          <TabsTrigger value="ads">Ads</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="fraud">Fraud</TabsTrigger>
        </TabsList>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>User Management</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search users..." value={searchUsers} onChange={(e) => setSearchUsers(e.target.value)} className="pl-9 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredProfiles.map((profile) => (
                  <div key={profile.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-9 h-9">
                        <AvatarImage src={profile.avatar_url || ''} />
                        <AvatarFallback className="text-xs">{(profile.display_name || 'U').substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium text-sm text-foreground">{profile.display_name || 'No name'}</p>
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          {profile.district && <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{profile.district}</span>}
                          <span>Joined {formatDistanceToNow(new Date(profile.created_at), { addSuffix: true })}</span>
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={getUserRole(profile.user_id) === 'admin' ? 'default' : 'secondary'} className="text-[10px]">
                        {getUserRole(profile.user_id)}
                      </Badge>
                      <Badge variant={profile.is_complete ? 'default' : 'outline'} className="text-[10px]">
                        {profile.is_complete ? 'Complete' : 'Incomplete'}
                      </Badge>
                    </div>
                  </div>
                ))}
                {filteredProfiles.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No users found</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Listings Tab */}
        <TabsContent value="listings" className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>All Listings</CardTitle>
                <div className="relative w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search listings..." value={searchListings} onChange={(e) => setSearchListings(e.target.value)} className="pl-9 h-9" />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {filteredListings.map((listing) => (
                  <div key={listing.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={Array.isArray(listing.images) && listing.images.length > 0 ? (listing.images[0] as string) : '/placeholder.svg'} alt="" className="w-12 h-12 rounded object-cover" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{listing.title}</p>
                        <p className="text-xs text-muted-foreground">{listing.category} • {listing.location} • {listing.view_count} views</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-sm text-primary">{formatPrice(listing.price)}</span>
                      <Badge variant={listing.status === 'active' ? 'default' : 'secondary'} className="text-[10px]">{listing.status}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Verifications Tab */}
        <TabsContent value="verifications" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Pending Verification Requests</CardTitle></CardHeader>
            <CardContent>
              {verificationRequests?.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg mb-3">
                  <div>
                    <p className="font-semibold text-sm text-foreground">User: {request.user_id.substring(0, 8)}...</p>
                    <p className="text-xs text-muted-foreground">
                      Submitted {formatDistanceToNow(new Date(request.created_at!), { addSuffix: true })}
                    </p>
                    <div className="flex gap-2 mt-1">
                      {request.government_id_url && <Badge variant="outline" className="text-[10px]">Gov ID ✓</Badge>}
                      {request.social_media_link && <Badge variant="outline" className="text-[10px]">Social ✓</Badge>}
                      {request.mobile_verified && <Badge variant="outline" className="text-[10px]">Phone ✓</Badge>}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => updateVerificationMutation.mutate({ id: request.id, status: 'verified' })}>
                      <Check className="w-4 h-4 mr-1" /> Approve
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => updateVerificationMutation.mutate({ id: request.id, status: 'rejected' })}>
                      <X className="w-4 h-4 mr-1" /> Reject
                    </Button>
                  </div>
                </div>
              ))}
              {!verificationRequests?.length && <p className="text-muted-foreground text-sm">No pending requests</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Business Accounts</CardTitle></CardHeader>
            <CardContent>
              {businessAccounts?.map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{account.business_name}</p>
                    <p className="text-xs text-muted-foreground">{account.business_type}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={account.is_active ? 'default' : 'secondary'}>{account.plan_type?.toUpperCase()}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{formatPrice(account.monthly_fee)}/mo</p>
                  </div>
                </div>
              ))}
              {!businessAccounts?.length && <p className="text-muted-foreground text-sm">No business accounts</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Ads Tab */}
        <TabsContent value="ads" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Advertisement Campaigns</CardTitle></CardHeader>
            <CardContent>
              {advertisements?.map((ad) => (
                <div key={ad.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{ad.ad_title}</p>
                    <p className="text-xs text-muted-foreground">{ad.ad_type} • {ad.target_category || 'All categories'}</p>
                  </div>
                  <div className="text-right">
                    <Badge variant={ad.is_active ? 'default' : 'secondary'}>{ad.is_active ? 'Active' : 'Inactive'}</Badge>
                    <p className="text-xs text-muted-foreground mt-1">{ad.click_count} clicks • {ad.impression_count} views</p>
                  </div>
                </div>
              ))}
              {!advertisements?.length && <p className="text-muted-foreground text-sm">No advertisements</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader><CardTitle>Recent Transactions</CardTitle></CardHeader>
            <CardContent>
              {transactions?.map((t) => (
                <div key={t.id} className="flex items-center justify-between p-3 border rounded-lg mb-2">
                  <div>
                    <p className="font-semibold text-sm text-foreground">{t.product_name}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.delivery_option} • {formatDistanceToNow(new Date(t.created_at!), { addSuffix: true })}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="font-semibold text-sm text-primary">{formatPrice(t.agreed_price)}</span>
                    <Badge variant={t.status === 'completed' ? 'default' : t.status === 'cancelled' ? 'destructive' : 'secondary'} className="ml-2 text-[10px]">
                      {t.status?.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
              {!transactions?.length && <p className="text-muted-foreground text-sm">No transactions</p>}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Fraud Tab */}
        <TabsContent value="fraud" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-destructive" /> Fraud Detection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  Suspicious Listings ({suspiciousListings.length})
                </h3>
                <p className="text-xs text-muted-foreground mb-3">High-value items (&gt;M 500,000) with very short or missing descriptions</p>
                {suspiciousListings.map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 border border-destructive/30 rounded-lg mb-2 bg-destructive/5">
                    <div>
                      <p className="font-medium text-sm text-foreground">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.category} • {l.location}</p>
                    </div>
                    <span className="font-bold text-destructive">{formatPrice(l.price)}</span>
                  </div>
                ))}
                {suspiciousListings.length === 0 && <p className="text-sm text-muted-foreground">No suspicious listings detected ✓</p>}
              </div>

              <div>
                <h3 className="font-semibold text-sm text-foreground mb-2">
                  Potential Duplicates ({duplicateListings.length})
                </h3>
                <p className="text-xs text-muted-foreground mb-3">Same title from the same seller</p>
                {duplicateListings.map((l) => (
                  <div key={l.id} className="flex items-center justify-between p-3 border border-destructive/30 rounded-lg mb-2 bg-destructive/5">
                    <div>
                      <p className="font-medium text-sm text-foreground">{l.title}</p>
                      <p className="text-xs text-muted-foreground">{l.category} • {formatPrice(l.price)}</p>
                    </div>
                    <Badge variant="destructive" className="text-[10px]">Duplicate</Badge>
                  </div>
                ))}
                {duplicateListings.length === 0 && <p className="text-sm text-muted-foreground">No duplicates detected ✓</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
