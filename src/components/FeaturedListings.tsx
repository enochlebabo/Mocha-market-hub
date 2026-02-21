
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Skeleton } from '@/components/ui/skeleton';
import { formatDistanceToNow } from 'date-fns';

const FeaturedListings = () => {
  const navigate = useNavigate();

  const { data: listings, isLoading } = useQuery({
    queryKey: ['new-listings'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(6);
      if (error) throw error;
      return data;
    },
  });

  const formatPrice = (price: number) => {
    return `M ${price.toLocaleString()}`;
  };

  return (
    <section className="py-8 sm:py-12 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">New Listings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Just posted by sellers across Lesotho
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/products')} className="shrink-0">
            See all
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-36 sm:h-48 w-full" />
                <CardContent className="p-3 sm:p-4 space-y-2">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-5 w-20" />
                  <Skeleton className="h-3 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-5">
            {listings.map((item) => {
              const images = item.images as string[];
              const imageUrl = images?.[0] || '/placeholder.svg';

              return (
                <Card
                  key={item.id}
                  className="group cursor-pointer overflow-hidden hover:shadow-md transition-all duration-200 border"
                  onClick={() => navigate(`/product/${item.id}`)}
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={imageUrl}
                      alt={item.title}
                      className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    {item.is_featured && (
                      <Badge className="absolute top-2 left-2 text-xs px-1.5 py-0.5 bg-primary text-primary-foreground">
                        Featured
                      </Badge>
                    )}
                    <button
                      className="absolute bottom-2 right-2 bg-background/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="w-3.5 h-3.5 text-muted-foreground" />
                    </button>
                  </div>

                  <CardContent className="p-3 sm:p-4 space-y-1.5">
                    <Badge variant="secondary" className="text-xs px-1.5 py-0">
                      {item.category}
                    </Badge>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-base sm:text-xl font-bold text-primary">
                      {formatPrice(Number(item.price))}
                    </p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="flex items-center gap-0.5">
                        <MapPin className="w-3 h-3" />
                        {item.location}
                      </span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(item.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-12 text-muted-foreground">
            <p className="text-lg font-medium">No listings yet</p>
            <p className="text-sm mt-1">Be the first to post an ad!</p>
            <Button className="mt-4" onClick={() => navigate('/list-product')}>
              Post Your Ad
            </Button>
          </div>
        )}

        {listings && listings.length > 0 && (
          <div className="mt-6 sm:mt-8 text-center">
            <Button size="lg" onClick={() => navigate('/products')} className="font-semibold px-8">
              Browse all listings
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedListings;
