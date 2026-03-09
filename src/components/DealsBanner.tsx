
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Zap, Clock, ArrowRight } from 'lucide-react';

const deals = [
  { label: 'Flash Deals', desc: 'Up to 50% off electronics', category: 'electronics', color: 'bg-destructive/10 text-destructive' },
  { label: 'New Arrivals', desc: 'Latest vehicles listed today', category: 'cars', color: 'bg-primary/10 text-primary' },
  { label: 'Hot Properties', desc: 'Best houses in Maseru', category: 'properties', color: 'bg-accent text-accent-foreground' },
];

const DealsBanner = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
          {deals.map((deal) => (
            <button
              key={deal.label}
              onClick={() => navigate(`/products?category=${deal.category}`)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg ${deal.color} hover:opacity-90 transition-opacity text-left group`}
            >
              <Zap className="w-5 h-5 shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm">{deal.label}</p>
                <p className="text-xs opacity-70 truncate">{deal.desc}</p>
              </div>
              <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DealsBanner;
