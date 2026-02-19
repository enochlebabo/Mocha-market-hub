
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Car, Laptop, Building, Star, Users, Briefcase, Sofa, Shirt } from 'lucide-react';

const categories = [
  { name: 'Vehicles', icon: Car, count: '2,453', slug: 'vehicles' },
  { name: 'Electronics', icon: Laptop, count: '1,876', slug: 'electronics' },
  { name: 'Furniture', icon: Sofa, count: '987', slug: 'furniture' },
  { name: 'Fashion', icon: Shirt, count: '1,234', slug: 'fashion' },
  { name: 'Services', icon: Users, count: '567', slug: 'services' },
  { name: 'Business', icon: Briefcase, count: '345', slug: 'business' },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-6 sm:py-10 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
          Browse by Category
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => navigate(`/products?category=${cat.slug}`)}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border bg-background hover:bg-accent hover:border-primary/30 transition-all duration-200 active:scale-95 group text-center"
            >
              <div className="bg-primary/10 rounded-full p-2.5 sm:p-3 group-hover:bg-primary/20 transition-colors">
                <cat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <div>
                <p className="text-xs sm:text-sm font-medium text-foreground leading-tight">{cat.name}</p>
                <p className="text-xs text-muted-foreground">{cat.count}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
