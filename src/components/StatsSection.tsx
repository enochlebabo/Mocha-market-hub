import React from 'react';
import { MapPin, Briefcase, Package, Users } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Districts Covered', icon: MapPin },
  { value: '500+', label: 'Local Businesses', icon: Briefcase },
  { value: '25K+', label: 'Items Listed', icon: Package },
  { value: '50K+', label: 'Happy Users', icon: Users },
];

const StatsSection = () => {
  return (
    <section className="py-10 sm:py-14 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-10">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
            Where Goods Meet Good People
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">Supporting Lesotho's digital economy</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="space-y-2 p-4 rounded-xl bg-background shadow-sm border">
              <Icon className="w-6 h-6 mx-auto text-primary opacity-70" />
              <div className="text-2xl sm:text-3xl font-bold text-primary">{value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
