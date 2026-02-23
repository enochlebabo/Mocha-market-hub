
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star, Heart, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/components/auth/AuthContext';

const featuredItems = [
  {
    id: 1,
    title: 'Toyota Corolla 2018',
    price: 'M 180,000',
    location: 'Maseru',
    image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400',
    category: 'Vehicles',
    timeAgo: '2 hours ago',
    isVerifiedSeller: true,
    isFeatured: true,
  },
  {
    id: 2,
    title: 'MacBook Pro 13" 2020',
    price: 'M 8,500',
    location: 'Leribe',
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400',
    category: 'Electronics',
    timeAgo: '5 hours ago',
    isVerifiedSeller: true,
    isFeatured: false,
  },
  {
    id: 3,
    title: 'Modern Office Desk',
    price: 'M 1,200',
    location: 'Berea',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400',
    category: 'Furniture',
    timeAgo: '1 day ago',
    isVerifiedSeller: false,
    isFeatured: true,
  },
  {
    id: 4,
    title: 'iPhone 13 Pro Max',
    price: 'M 12,000',
    location: 'Mafeteng',
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400',
    category: 'Electronics',
    timeAgo: '3 hours ago',
    isVerifiedSeller: true,
    isFeatured: false,
  },
  {
    id: 5,
    title: 'Living Room Sofa Set',
    price: 'M 5,500',
    location: "Mohale's Hoek",
    image: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=400',
    category: 'Furniture',
    timeAgo: '6 hours ago',
    isVerifiedSeller: false,
    isFeatured: true,
  },
  {
    id: 6,
    title: 'Gaming Laptop Setup',
    price: 'M 15,000',
    location: 'Quthing',
    image: 'https://images.unsplash.com/photo-1721322800607-8c38375eef04?w=400',
    category: 'Electronics',
    timeAgo: '1 day ago',
    isVerifiedSeller: true,
    isFeatured: false,
  },
];

const FeaturedListings = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();

  return (
    <section className="py-8 sm:py-12 bg-muted/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="flex items-center justify-between mb-5 sm:mb-8">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold text-foreground">Featured Listings</h2>
            <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
              Handpicked from trusted sellers across Lesotho
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/products')}
            className="shrink-0"
          >
            See all
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </div>

        {/* Listings grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-5">
          {featuredItems.map((item) => (
            <Card
              key={item.id}
              className="group cursor-pointer overflow-hidden hover:shadow-md transition-all duration-200 border"
              onClick={() => navigate('/products')}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {item.isFeatured && (
                  <Badge className="absolute top-2 left-2 text-xs px-1.5 py-0.5 bg-primary text-primary-foreground">
                    Featured
                  </Badge>
                )}
                {item.isVerifiedSeller && (
                  <Badge className="absolute top-2 right-2 text-xs px-1.5 py-0.5 bg-primary text-primary-foreground">
                    ✓ Verified
                  </Badge>
                )}
                <button
                  className="absolute bottom-2 right-2 bg-background/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => { e.stopPropagation(); user ? toggle(String(item.id)) : navigate('/auth'); }}
                >
                  <Heart className={`w-3.5 h-3.5 ${isWishlisted(String(item.id)) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                </button>
              </div>

              {/* Info */}
              <CardContent className="p-3 sm:p-4 space-y-1.5">
                <Badge variant="secondary" className="text-xs px-1.5 py-0">
                  {item.category}
                </Badge>
                <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-tight">
                  {item.title}
                </h3>
                <p className="text-base sm:text-xl font-bold text-primary">
                  {item.price}
                </p>
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span className="flex items-center gap-0.5">
                    <MapPin className="w-3 h-3" />
                    {item.location}
                  </span>
                  <span className="flex items-center gap-0.5">
                    <Clock className="w-3 h-3" />
                    {item.timeAgo}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View all CTA */}
        <div className="mt-6 sm:mt-8 text-center">
          <Button
            size="lg"
            onClick={() => navigate('/products')}
            className="font-semibold px-8"
          >
            Browse all 25,000+ listings
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default FeaturedListings;
