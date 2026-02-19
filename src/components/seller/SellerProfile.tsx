
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EnhancedSellerProfile from './EnhancedSellerProfile';
import SellerReviews from './SellerReviews';
import DeliveryManager from '../delivery/DeliveryManager';
import { User, Star, Truck } from 'lucide-react';

const SellerProfile = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-4 sm:space-y-6">
      <Tabs defaultValue="verification" className="space-y-4 sm:space-y-6">
        <div className="overflow-x-auto -mx-4 px-4 sm:mx-0 sm:px-0">
          <TabsList className="inline-flex w-auto sm:grid sm:w-full sm:grid-cols-3 min-w-full sm:min-w-0">
            <TabsTrigger value="verification" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
              <User className="w-3.5 h-3.5 shrink-0" />
              Verification
            </TabsTrigger>
            <TabsTrigger value="reviews" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
              <Star className="w-3.5 h-3.5 shrink-0" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="delivery" className="flex items-center gap-1.5 text-xs sm:text-sm whitespace-nowrap px-3 sm:px-4">
              <Truck className="w-3.5 h-3.5 shrink-0" />
              Delivery
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="verification">
          <EnhancedSellerProfile />
        </TabsContent>

        <TabsContent value="reviews">
          <SellerReviews sellerId="current-user" />
        </TabsContent>

        <TabsContent value="delivery">
          <DeliveryManager isSellerView={true} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SellerProfile;
