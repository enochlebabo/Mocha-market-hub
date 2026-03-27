
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

const formatPrice = (price: number) => `M ${price.toLocaleString()}`;

interface TrendingByDistrictProps {
  district?: string;
}

const TrendingByDistrict = ({ district = 'Maseru' }: TrendingByDistrictProps) => {
  const navigate = useNavigate();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['trending-district', district],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .eq('location', district)
        .order('view_count', { ascending: false })
        .limit(6);

      if (error) throw error;
      return data;
    },
  });

  if (isLoading) {
    return (
      <section className="py-6 sm:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Skeleton className="h-7 w-48 mb-4" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-28 w-full rounded-lg" />
                <Skeleton className="h-3 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!listings?.length) return null;

  const getFirstImage = (images: any) => {
    if (Array.isArray(images) && images.length > 0) return images[0];
    return '/placeholder.svg';
  };

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-bold text-foreground">
              Trending in {district}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={() => navigate(`/products?location=${district}`)}>
            View all <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {listings.map((listing) => (
            <Card
              key={listing.id}
              className="cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => navigate(`/product/${listing.id}`)}
            >
              <img
                src={getFirstImage(listing.images)}
                alt={listing.title}
                className="w-full h-28 object-cover"
                loading="lazy"
              />
              <CardContent className="p-2.5 space-y-1">
                <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-tight">{listing.title}</h3>
                <p className="text-sm font-bold text-primary">{formatPrice(listing.price)}</p>
                <div className="flex items-center gap-1">
                  <Badge variant="secondary" className="text-[9px] px-1 py-0">{listing.category}</Badge>
                  <span className="text-[10px] text-muted-foreground">{listing.view_count} views</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrendingByDistrict;
