
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Clock } from 'lucide-react';
import { useRecentlyViewed } from '@/hooks/useRecentlyViewed';

const formatPrice = (price: number) => `M ${price.toLocaleString()}`;

const RecentlyViewed = () => {
  const navigate = useNavigate();
  const { items } = useRecentlyViewed();

  if (items.length === 0) return null;

  return (
    <section className="py-6 sm:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-lg sm:text-xl font-bold text-foreground mb-4">Recently Viewed</h2>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {items.slice(0, 10).map((item) => (
            <Card
              key={item.id}
              className="min-w-[160px] max-w-[180px] shrink-0 cursor-pointer hover:shadow-md transition-shadow overflow-hidden"
              onClick={() => navigate(`/product/${item.id}`)}
            >
              <img src={item.image} alt={item.title} className="w-full h-28 object-cover" loading="lazy" />
              <CardContent className="p-2.5 space-y-1">
                <h3 className="text-xs font-medium text-foreground line-clamp-2 leading-tight">{item.title}</h3>
                <p className="text-sm font-bold text-primary">{formatPrice(item.price)}</p>
                <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                  <MapPin className="w-2.5 h-2.5" />{item.location}
                </span>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;
