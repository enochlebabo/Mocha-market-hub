
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { categories } from '@/data/categories';

const CategoryGrid = () => {
  const navigate = useNavigate();

  return (
    <section className="py-6 sm:py-10 bg-background border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-base sm:text-lg font-semibold text-foreground mb-4">
          Browse by Category
        </h2>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 sm:gap-3">
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => navigate(`/products?category=${cat.slug}`)}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 rounded-xl border bg-background hover:bg-accent hover:border-primary/30 transition-all duration-200 active:scale-95 group text-center"
            >
              <div className="bg-primary/10 rounded-full p-2.5 sm:p-3 group-hover:bg-primary/20 transition-colors">
                <cat.icon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
              </div>
              <p className="text-xs sm:text-sm font-medium text-foreground leading-tight line-clamp-2">
                {cat.name}
              </p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
