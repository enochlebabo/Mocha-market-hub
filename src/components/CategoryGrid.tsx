import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from "@/components/ui/card";
import { Car, Laptop, Briefcase, Star, Users, Building, ArrowRight } from 'lucide-react';

const categories = [
  { name: 'Vehicles', icon: Car, count: '2,453', description: 'Cars, trucks, motorcycles', slug: 'vehicles' },
  { name: 'Electronics', icon: Laptop, count: '1,876', description: 'Laptops, phones, gadgets', slug: 'electronics' },
  { name: 'Furniture', icon: Building, count: '987', description: 'Home & office furniture', slug: 'furniture' },
  { name: 'Fashion', icon: Star, count: '1,234', description: 'Clothing & accessories', slug: 'fashion' },
  { name: 'Services', icon: Users, count: '567', description: 'Professional services', slug: 'services' },
  { name: 'Business', icon: Briefcase, count: '345', description: 'Equipment & supplies', slug: 'business' },
];

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Browse by Category
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
            Find exactly what you're looking for in our organized categories
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
          {categories.map((category) => (
            <Card
              key={category.name}
              className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/30 active:scale-[0.98]"
              onClick={() => navigate(`/products?category=${category.slug}`)}
            >
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:space-x-4 space-y-2 sm:space-y-0">
                  <div className="bg-secondary p-2.5 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300 w-fit">
                    <category.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base sm:text-lg text-foreground mb-0.5 sm:mb-1 truncate">
                      {category.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mb-1 sm:mb-2 hidden sm:block">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg sm:text-2xl font-bold text-primary">
                        {category.count}
                      </span>
                      <span className="text-xs sm:text-sm text-muted-foreground hidden sm:block">items</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-300 sm:hidden" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
