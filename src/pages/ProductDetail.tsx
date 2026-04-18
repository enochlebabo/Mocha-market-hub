
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from '@/components/ui/skeleton';
import { Heart, Share2, MessageCircle, Phone, MapPin, Eye, Star, Clock, Shield, ChevronRight } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/components/auth/AuthContext';
import { useWishlist } from '@/hooks/useWishlist';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';
import { formatDistanceToNow } from 'date-fns';

const formatPrice = (price: number) => `M ${price.toLocaleString()}`;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();
  const { addItem } = useRecentlyViewed();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: product, isLoading } = useQuery({
    queryKey: ['product', id],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('id', id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
    enabled: !!id,
  });

  const { data: sellerProfile } = useQuery({
    queryKey: ['seller-profile', product?.user_id],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('get_public_profile', { _user_id: product!.user_id });
      if (error) throw error;
      return data?.[0] ?? null;
    },
    enabled: !!product?.user_id,
  });

  // Track recently viewed
  useEffect(() => {
    if (product) {
      const images = Array.isArray(product.images) ? product.images : [];
      addItem({
        id: product.id,
        title: product.title,
        price: product.price,
        image: (images[0] as string) || '/placeholder.svg',
        category: product.category,
        location: product.location,
      });
    }
  }, [product?.id]);

  // Increment view count
  useEffect(() => {
    if (id) {
      supabase.rpc('get_seller_rating', { seller_user_id: id }).then(() => {});
      // Simple view increment - fire and forget
      supabase.from('listings').update({ view_count: (product?.view_count || 0) + 1 }).eq('id', id).then(() => {});
    }
  }, [id]);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Skeleton className="w-full h-96 rounded-lg" />
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="space-y-6">
            <Skeleton className="h-32 w-full rounded-lg" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="text-4xl mb-3">😕</div>
        <h2 className="text-xl font-bold text-foreground mb-2">Listing not found</h2>
        <p className="text-muted-foreground mb-4">This listing may have been removed or is no longer available.</p>
        <Button onClick={() => navigate('/products')}>Browse Listings</Button>
      </div>
    );
  }

  const images = Array.isArray(product.images) ? (product.images as string[]) : ['/placeholder.svg'];
  const isFavorited = isWishlisted(product.id);

  const handleToggleFavorite = () => {
    if (!user) { navigate('/auth'); return; }
    toggle(product.id);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.title, text: `Check out ${product.title} for ${formatPrice(product.price)}`, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({ title: "Link copied", description: "Product link copied to clipboard" });
    }
  };

  const handleContact = () => { if (!user) { navigate('/auth'); return; } navigate(`/chat/${product.user_id}`); };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
        <ChevronRight className="w-3 h-3" />
        <button onClick={() => navigate(`/products?category=${product.category}`)} className="hover:text-foreground">{product.category}</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium line-clamp-1">{product.title}</span>
      </div>

      <div className="flex items-center justify-end mb-4 gap-2">
        <Button variant="ghost" size="icon" onClick={handleShare}><Share2 className="w-4 h-4" /></Button>
        <Button variant="ghost" size="icon" onClick={handleToggleFavorite} className={isFavorited ? 'text-destructive' : ''}>
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img src={images[currentImageIndex] || '/placeholder.svg'} alt={product.title} className="w-full h-72 sm:h-96 object-cover rounded-t-lg" />
                {images.length > 1 && (
                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    {images.map((_, index) => (
                      <button key={index} onClick={() => setCurrentImageIndex(index)} className={`w-3 h-3 rounded-full ${index === currentImageIndex ? 'bg-background' : 'bg-background/50'}`} />
                    ))}
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="p-4 flex space-x-2 overflow-x-auto">
                  {images.map((image, index) => (
                    <img key={index} src={image} alt={`${product.title} ${index + 1}`} onClick={() => setCurrentImageIndex(index)} className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${index === currentImageIndex ? 'border-primary' : 'border-transparent'}`} />
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-start justify-between flex-wrap gap-4">
                <div className="space-y-2">
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">{product.title}</h1>
                  <div className="flex items-center flex-wrap gap-2">
                    {product.condition && <Badge variant="secondary">{product.condition}</Badge>}
                    <Badge variant="outline">{product.category}</Badge>
                    {product.subcategory && <Badge variant="outline">{product.subcategory}</Badge>}
                    <div className="flex items-center text-sm text-muted-foreground"><Eye className="w-4 h-4 mr-1" />{product.view_count} views</div>
                  </div>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-primary">{formatPrice(product.price)}</p>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center text-muted-foreground"><MapPin className="w-4 h-4 mr-2" />{product.location}</div>
                <div className="flex items-center text-muted-foreground">
                  <Clock className="w-4 h-4 mr-2" />
                  Listed {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                </div>
                {product.description && (
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-2 text-foreground">Description</h3>
                    <p className="whitespace-pre-line text-muted-foreground">{product.description}</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardContent className="p-6 space-y-4">
              <Button size="lg" onClick={handleContact} className="w-full"><MessageCircle className="w-4 h-4 mr-2" />Chat with Seller</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle>Seller Information</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={sellerProfile?.avatar_url || ''} />
                  <AvatarFallback>{(sellerProfile?.display_name || 'S').substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{sellerProfile?.display_name || 'Seller'}</h3>
                  {sellerProfile?.district && (
                    <span className="text-sm text-muted-foreground flex items-center gap-1"><MapPin className="w-3 h-3" />{sellerProfile.district}</span>
                  )}
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center text-muted-foreground">
                  <Shield className="w-4 h-4 mr-2" />
                  <span>Member since {new Date(sellerProfile?.created_at || product.created_at).getFullYear()}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="flex items-center text-foreground"><Shield className="w-5 h-5 mr-2" />Safety Tips</CardTitle></CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>• Meet in a public place</p>
              <p>• Inspect the item before payment</p>
              <p>• Don't send money in advance</p>
              <p>• Trust your instincts</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
