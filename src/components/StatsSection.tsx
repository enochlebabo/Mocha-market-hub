
import React from 'react';
import { MapPin, Briefcase, Package, Users, ShieldCheck, TrendingUp } from 'lucide-react';

const stats = [
  { value: '10+', label: 'Districts Covered', icon: MapPin },
  { value: '500+', label: 'Verified Businesses', icon: Briefcase },
  { value: '25K+', label: 'Active Listings', icon: Package },
  { value: '50K+', label: 'Trusted Users', icon: Users },
  { value: '98%', label: 'Satisfaction Rate', icon: ShieldCheck },
  { value: '24/7', label: 'Always Open', icon: TrendingUp },
];

const StatsSection = () => {
  return (
    <section className="py-6 sm:py-10 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <h2 className="text-lg sm:text-xl font-bold">Trusted by thousands across Lesotho</h2>
        </div>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-4 sm:gap-6 text-center">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="space-y-1.5">
              <Icon className="w-5 h-5 mx-auto opacity-70" />
              <div className="text-xl sm:text-2xl font-bold">{value}</div>
              <div className="text-[11px] sm:text-xs opacity-70">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
