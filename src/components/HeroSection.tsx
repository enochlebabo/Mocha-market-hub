
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck, BadgeCheck } from 'lucide-react';
import { Button } from "@/components/ui/button";

const trendingSearches = ['Toyota Corolla', 'iPhone', 'Sofa Set', 'Land Rover', 'Samsung TV', '3 Bedroom House', 'Laptop'];

const trustBadges = [
  { icon: ShieldCheck, label: 'Verified Sellers' },
  { icon: Truck, label: 'Delivery Available' },
  { icon: BadgeCheck, label: 'Secure Payments' },
];

const HeroSection = () => {
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    navigate(`/products${query.trim() ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <section className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-10 items-center">
          {/* Left: Copy */}
          <div className="space-y-4">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Buy &amp; Sell Anything<br />in Lesotho
            </h1>
            <p className="text-sm sm:text-base opacity-80 max-w-md">
              The Kingdom's #1 marketplace — vehicles, electronics, property, jobs &amp; more across all 10 districts.
            </p>

            {/* Trending tags */}
            <div className="flex flex-wrap gap-1.5">
              {trendingSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => handleSearch(term)}
                  className="bg-primary-foreground/15 hover:bg-primary-foreground/25 px-3 py-1 rounded-full text-xs transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <Button
              variant="secondary"
              size="default"
              onClick={() => navigate('/products')}
              className="font-semibold"
            >
              Browse all listings
              <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>

          {/* Right: Trust badges */}
          <div className="hidden sm:flex flex-col gap-3">
            {trustBadges.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex items-center gap-3 bg-primary-foreground/10 rounded-xl px-5 py-4"
              >
                <div className="bg-primary-foreground/20 rounded-full p-2.5">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-medium text-sm">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
