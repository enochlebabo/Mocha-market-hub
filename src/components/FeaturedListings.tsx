
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Heart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/components/auth/AuthContext';

const featuredItems = [
  {
    id: 1, title: 'Toyota Corolla 2018', price: 180000, location: 'Maseru',
    image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400',
    category: 'Vehicles', condition: 'Used', timeAgo: '2h ago',
    isVerifiedSeller: true, isFeatured: true, rating: 4.8, reviews: 12, hasDelivery: false,
  },
  {
    id: 2, title: 'MacBook Pro 13" 2020', price: 8500, location: 'Leribe',
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
    category: 'Electronics', condition: 'Like New', timeAgo: '5h ago',
    isVerifiedSeller: true, isFeatured: false, rating: 4.9, reviews: 8, hasDelivery: true,
  },
  {
    id: 3, title: 'Modern Office Desk', price: 1200, location: 'Berea',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
    category: 'Furniture', condition: 'New', timeAgo: '1d ago',
    isVerifiedSeller: false, isFeatured: true, rating: 4.5, reviews: 3, hasDelivery: true,
  },
  {
    id: 4, title: 'iPhone 13 Pro Max', price: 12000, location: 'Mafeteng',
    image: 'https://images.unsplash.com/photo-1632661674596-df8be59a8056?w=400',
    category: 'Mobiles', condition: 'Used', timeAgo: '3h ago',
    isVerifiedSeller: true, isFeatured: false, rating: 4.7, reviews: 15, hasDelivery: true,
  },
  {
    id: 5, title: 'Living Room Sofa Set', price: 5500, location: "Mohale's Hoek",
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400',
    category: 'Furniture', condition: 'New', timeAgo: '6h ago',
    isVerifiedSeller: false, isFeatured: true, rating: 4.3, reviews: 5, hasDelivery: true,
  },
  {
    id: 6, title: 'Gaming Laptop Setup', price: 15000, location: 'Quthing',
    image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400',
    category: 'Electronics', condition: 'Used', timeAgo: '1d ago',
    isVerifiedSeller: true, isFeatured: false, rating: 4.6, reviews: 7, hasDelivery: false,
  },
];

const formatPrice = (price: number) =>
  `M ${price.toLocaleString()}`;

const FeaturedListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();

  return (
    <section className="py-6 sm:py-10 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">Featured Listings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Handpicked deals from verified sellers
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={() => navigate('/products')} className="shrink-0">
            See all <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden hover:shadow-lg transition-all duration-200 border"
              onClick={() => navigate('/products')}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                {/* Badges stack */}
                <div className="absolute top-2 left-2 flex flex-col gap-1">
                  {item.isFeatured && (
                    <Badge className="text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground">
                      <Star className="w-2.5 h-2.5 mr-0.5" /> Featured
                    </Badge>
                  )}
                  {item.condition === 'New' && (
                    <Badge className="text-[10px] px-1.5 py-0.5 bg-accent text-accent-foreground border">
                      New
                    </Badge>
                  )}
                </div>
                {item.isVerifiedSeller && (
                  <div className="absolute top-2 right-2">
                    <ShieldCheck className="w-4 h-4 text-primary drop-shadow" />
                  </div>
                )}
                <button
                  className="absolute bottom-2 right-2 bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                  onClick={(e) => { e.stopPropagation(); user ? toggle(String(item.id)) : navigate('/auth'); }}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(String(item.id)) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                </button>
              </div>

              {/* Info */}
              <CardContent className="p-3 sm:p-4 space-y-1.5">
                <div className="flex items-center gap-1.5">
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{item.category}</Badge>
                  {item.hasDelivery && (
                    <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground">
                      <Truck className="w-2.5 h-2.5" /> Delivery
                    </span>
                  )}
                </div>
                <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-base sm:text-xl font-bold text-primary">
                  {formatPrice(item.price)}
                </p>
                {/* Rating */}
                <div className="flex items-center gap-1">
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${i < Math.floor(item.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] text-muted-foreground">({item.reviews})</span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />{item.location}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />{item.timeAgo}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-6 text-center">
          <Button size="lg" onClick={() => navigate('/products')} className="font-semibold px-8">
            Browse all 25,000+ listings
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedListings;
