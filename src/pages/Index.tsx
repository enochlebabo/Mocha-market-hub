
import React from 'react';
import AppHeader from '@/components/layout/AppHeader';
import PromoBanner from '@/components/layout/PromoBanner';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedListings from '@/components/FeaturedListings';
import Footer from '@/components/Footer';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import StatsSection from '@/components/StatsSection';

const Index = () => {
  return (
    <div className="min-h-screen bg-background pb-14 sm:pb-0">
      <AppHeader>
        <PromoBanner />
      </AppHeader>

      <main>
        <HeroSection />
        <FeaturedListings />
        <CategoryGrid />
        <StatsSection />
      </main>

      <Footer />
      <ScrollToTop />
    </div>
  );
};

export default Index;
