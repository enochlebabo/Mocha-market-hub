
import React, { useState } from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedListings from '@/components/FeaturedListings';
import StatsSection from '@/components/StatsSection';

const Index = () => {
  return (
    <>
      <HeroSection />
      <FeaturedListings />
      <CategoryGrid />
      <StatsSection />
    </>
  );
};

export default Index;
