import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useWishlist } from '@/hooks/useWishlist';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Heart, MapPin, Clock } from 'lucide-react';

const Wishlist = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { wishlistIds, toggle } = useWishlist();

  const { data: listings = [], isLoading } = useQuery({
    queryKey: ['wishlist-listings', wishlistIds],
    queryFn: async () => {
      if (!wishlistIds.length) return [];
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .in('id', wishlistIds);
      if (error) throw error;
      return data;
    },
    enabled: !!user && wishlistIds.length > 0,
  });

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Your Wishlist</h1>
        <p className="text-muted-foreground mb-6">Sign in to save your favourite items.</p>
        <Button onClick={() => navigate('/auth')}>Sign In</Button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold mb-6">My Wishlist</h1>

      {isLoading ? (
        <p className="text-muted-foreground">Loading…</p>
      ) : listings.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Your wishlist is empty. Browse listings and tap the heart icon to save items here.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate('/products')}>Browse Listings</Button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {listings.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden hover:shadow-md transition-all duration-200"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <div className="relative overflow-hidden">
                <img
                  src={(item.images as string[])?.[0] || '/placeholder.svg'}
                  alt={item.title}
                  className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  className="absolute top-2 right-2 bg-background/80 rounded-full p-1.5"
                  onClick={(e) => { e.stopPropagation(); toggle(item.id); }}
                >
                  <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                </button>
              </div>
              <CardContent className="p-3 sm:p-4 space-y-1.5">
                <Badge variant="secondary" className="text-xs">{item.category}</Badge>
                <h3 className="font-semibold text-sm line-clamp-2">{item.title}</h3>
                <p className="text-base font-bold text-primary">M {item.price.toLocaleString()}</p>
                <div className="flex items-center text-xs text-muted-foreground gap-1">
                  <MapPin className="w-3 h-3" />{item.location}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
