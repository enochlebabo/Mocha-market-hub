
import React from 'react';
import HeroSection from '@/components/HeroSection';
import CategoryGrid from '@/components/CategoryGrid';
import NewListings from '@/components/homepage/NewListings';
import TrendingByDistrict from '@/components/homepage/TrendingByDistrict';
import RecentlyViewed from '@/components/homepage/RecentlyViewed';
import StatsSection from '@/components/StatsSection';
import DealsBanner from '@/components/DealsBanner';

const Index = () => {
  return (
    <>
      <HeroSection />
      <DealsBanner />
      <NewListings />
      <RecentlyViewed />
      <TrendingByDistrict district="Maseru" />
      <CategoryGrid />
      <StatsSection />
    </>
  );
};

export default Index;
