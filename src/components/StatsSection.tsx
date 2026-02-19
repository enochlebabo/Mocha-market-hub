
import React from 'react';
import { MapPin, Briefcase, Package, Users } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Districts', icon: MapPin },
  { value: '500+', label: 'Businesses', icon: Briefcase },
  { value: '25K+', label: 'Listings', icon: Package },
  { value: '50K+', label: 'Users', icon: Users },
];

const StatsSection = () => {
  return (
    <section className="py-5 sm:py-8 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-4 gap-3 sm:gap-6 text-center">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="space-y-1">
              <Icon className="w-4 h-4 sm:w-5 sm:h-5 mx-auto text-primary opacity-70" />
              <div className="text-xl sm:text-2xl font-bold text-primary">{value}</div>
              <div className="text-xs text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
