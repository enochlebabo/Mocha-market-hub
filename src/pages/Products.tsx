
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Clock, Star } from 'lucide-react';
import CategoryFilter from '@/components/filters/CategoryFilter';

const Products = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data for now
  const mockProducts = [
    {
      id: 1, title: 'Toyota Corolla 2018', price: 'M 180,000', location: 'Maseru',
      image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400',
      category: 'Vehicles', timeAgo: '2 hours ago', isPremium: true, isVerifiedSeller: true,
    },
    {
      id: 2, title: 'MacBook Pro 13" 2020', price: 'M 8,500', location: 'Leribe',
      image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      category: 'Electronics', timeAgo: '5 hours ago', isPremium: false, isVerifiedSeller: true,
    },
    {
      id: 3, title: 'Modern Office Desk', price: 'M 1,200', location: 'Berea',
      image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400',
      category: 'Furniture', timeAgo: '1 day ago', isPremium: true, isVerifiedSeller: false,
    },
  ];

  const filteredProducts = mockProducts.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = filteredProducts.sort((a, b) => {
    if (a.isPremium && !b.isPremium) return -1;
    if (!a.isPremium && b.isPremium) return 1;
    return 0;
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Bar */}
      <div className="mb-6 flex gap-3 items-center">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search for vehicles, electronics, furniture..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </form>
        <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
          <Filter className="w-4 h-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="flex gap-6">
        {showFilters && (
          <div className="w-64 space-y-6">
            <Card>
              <CardContent className="p-4">
                <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={setSelectedCategory} />
              </CardContent>
            </Card>
          </div>
        )}

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">{selectedCategory || 'All Categories'}</h2>
              <p className="text-muted-foreground">{sortedProducts.length} goods found</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="relative">
                  <img src={product.image} alt={product.title} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  {product.isPremium && (
                    <Badge className="absolute top-3 left-3 bg-orange-500 hover:bg-orange-600"><Star className="w-3 h-3 mr-1" />Premium</Badge>
                  )}
                  {product.isVerifiedSeller && (
                    <Badge className="absolute top-3 right-3 bg-green-500 hover:bg-green-600">✓ Verified</Badge>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                    <h3 className="font-semibold text-lg text-foreground line-clamp-2">{product.title}</h3>
                    <span className="text-2xl font-bold text-primary block">{product.price}</span>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center"><MapPin className="w-4 h-4 mr-1" />{product.location}</div>
                      <div className="flex items-center"><Clock className="w-4 h-4 mr-1" />{product.timeAgo}</div>
                    </div>
                    <Button className="w-full">View Details</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No goods found matching your criteria.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory(''); }} className="mt-4">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
