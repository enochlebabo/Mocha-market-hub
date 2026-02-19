
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { SearchWithSuggestions } from '@/components/search/SearchWithSuggestions';

const trendingSearches = ['Toyota Corolla', 'iPhone', 'Sofa Set', 'Land Rover', 'Samsung TV'];

const HeroSection = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query: string) => {
    navigate(`/products${query.trim() ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <section className="bg-primary text-primary-foreground py-10 sm:py-16">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center space-y-5 sm:space-y-7">

        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold leading-tight">
          Buy &amp; Sell Anything in Lesotho
        </h1>
        <p className="text-sm sm:text-lg opacity-80 max-w-xl mx-auto">
          Lesotho's largest online marketplace — vehicles, electronics, furniture, fashion and more across all 10 districts.
        </p>

        {/* Big hero search */}
        <div className="max-w-xl mx-auto">
          <div className="flex gap-2 bg-background rounded-xl p-1.5 shadow-lg">
            <div className="flex-1">
              <SearchWithSuggestions
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="What are you looking for?"
              />
            </div>
            <Button
              onClick={() => handleSearch(searchQuery)}
              size="default"
              className="shrink-0 px-5 rounded-lg"
            >
              <Search className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Search</span>
            </Button>
          </div>
        </div>

        {/* Trending */}
        <div className="flex flex-wrap gap-2 justify-center text-sm opacity-90">
          <span className="opacity-70 text-xs mt-0.5">Trending:</span>
          {trendingSearches.map((term) => (
            <button
              key={term}
              onClick={() => handleSearch(term)}
              className="bg-primary-foreground/15 hover:bg-primary-foreground/25 px-3 py-0.5 rounded-full text-xs transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        <Button
          variant="secondary"
          size="sm"
          className="mx-auto"
          onClick={() => navigate('/products')}
        >
          Browse all listings
          <ArrowRight className="w-4 h-4 ml-1.5" />
        </Button>
      </div>
    </section>
  );
};

export default HeroSection;
