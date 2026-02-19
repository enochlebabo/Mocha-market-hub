
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedListings from '@/components/FeaturedListings';
import AdBanner from '@/components/AdBanner';
import Footer from '@/components/Footer';
import AuthButton from '@/components/auth/AuthButton';
import NavigationMenu from '@/components/NavigationMenu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import { SearchWithSuggestions } from '@/components/search/SearchWithSuggestions';
import StatsSection from '@/components/StatsSection';
import SMESection from '@/components/SMESection';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header/Navigation */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top bar */}
          <div className="flex justify-between items-center h-14 sm:h-16 gap-2">
            <div className="flex items-center gap-2 shrink-0">
              <h1
                className="text-lg sm:text-2xl font-bold text-primary cursor-pointer leading-tight"
                onClick={() => navigate('/')}
              >
                MoCha Market
              </h1>
              <Badge variant="secondary" className="hidden sm:inline-flex text-xs">
                <MapPin className="w-3 h-3 mr-1" />
                Lesotho
              </Badge>
            </div>

            {/* Desktop search */}
            <div className="flex-1 max-w-sm lg:max-w-md mx-2 lg:mx-8 hidden md:block">
              <SearchWithSuggestions
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
              />
            </div>

            <div className="flex items-center gap-1 sm:gap-2 shrink-0">
              <ThemeToggle />
              <AuthButton />
              <Button size="sm" onClick={() => navigate('/list-product')} className="hidden xs:flex">
                <Tag className="w-4 h-4 sm:mr-2" />
                <span className="hidden sm:inline">List Item</span>
              </Button>
            </div>
          </div>

          {/* Navigation Menu - scrollable on mobile */}
          <div className="border-t overflow-x-auto scrollbar-none">
            <NavigationMenu />
          </div>

          {/* Mobile Search */}
          <div className="md:hidden pb-3 pt-1">
            <SearchWithSuggestions
              value={searchQuery}
              onChange={setSearchQuery}
              onSearch={handleSearch}
              placeholder="Search marketplace..."
            />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />

        <AdBanner
          title="Grow Your Business in Lesotho"
          description="Reach thousands of customers across all 10 districts with affordable advertising packages"
          buttonText="Start Advertising"
        />

        <CategoryGrid />
        <StatsSection />
        <FeaturedListings />
        <SMESection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
