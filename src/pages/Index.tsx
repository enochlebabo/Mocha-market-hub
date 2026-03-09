
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedListings from '@/components/FeaturedListings';
import StatsSection from '@/components/StatsSection';
import DealsBanner from '@/components/DealsBanner';

const Index = () => {
  return (
    <>
      <HeroSection />
      <DealsBanner />
      <FeaturedListings />
      <CategoryGrid />
      <StatsSection />
    </>
  );
};

export default Index;
