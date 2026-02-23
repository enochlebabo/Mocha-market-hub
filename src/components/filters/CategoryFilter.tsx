
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { categories as allCategories } from '@/data/categories';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategoryChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="font-semibold">Categories</h3>
      <div className="space-y-1">
        <Button
          variant={selectedCategory === '' ? 'default' : 'ghost'}
          onClick={() => onCategoryChange('')}
          className="w-full justify-start"
          size="sm"
        >
          All Categories
        </Button>
        {allCategories.map((cat) => (
          <Button
            key={cat.slug}
            variant={selectedCategory === cat.name ? 'default' : 'ghost'}
            onClick={() => onCategoryChange(cat.name)}
            className="w-full justify-start"
            size="sm"
          >
            <cat.icon className="w-4 h-4 mr-2" />
            {cat.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
