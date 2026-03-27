
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Clock, Star, Heart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/components/auth/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const formatPrice = (price: number) => `M ${price.toLocaleString()}`;

const NewListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['new-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(8);

      if (error) throw error;
      return data;
    },
  });

  const getFirstImage = (images: any) => {
    if (Array.isArray(images) && images.length > 0) return images[0];
    return '/placeholder.svg';
  };

  if (isLoading) {
    return (
      <section className="py-6 sm:py-10 bg-muted/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-7 w-48 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-36 sm:h-48 w-full rounded-lg" />
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-5 w-1/2" />
                <Skeleton className="h-3 w-full" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!listings?.length) return null;

  return (
    <section className="py-6 sm:py-10 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">New Listings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">Fresh items just posted</p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/products')} className="shrink-0">
            See all <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
          {listings.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-200 border"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={getFirstImage(item.images)}
                  alt={item.title}
                  className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {item.is_featured && (
                    <Badge className="text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground">
                      <Star className="w-2.5 h-2.5 mr-0.5" /> Featured
                    </Badge>
                  )}
                  {item.condition === 'New' && (
                    <Badge className="text-[10px] px-1.5 py-0.5 bg-accent text-accent-foreground border">New</Badge>
                  )}
                </div>
                <button
                  className="absolute bottom-2 right-2 bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={(e) => { e.stopPropagation(); user ? toggle(item.id) : navigate('/auth'); }}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(item.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                </button>
              </div>
              <CardContent className="p-3 sm:p-4 space-y-1.5">
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.category}</Badge>
                <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-tight">{item.title}</h3>
                <p className="text-base sm:text-xl font-bold text-primary">{formatPrice(item.price)}</p>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{item.location}</span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewListings;
