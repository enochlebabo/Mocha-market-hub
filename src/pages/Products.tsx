
import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Filter, MapPin, Clock, Star, Heart } from 'lucide-react';
import { categories, getSubcategories } from '@/data/categories';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/components/auth/AuthContext';

// Mock products covering every category slug
const allMockProducts = [
  // Cars
  { id: '101', title: 'Toyota Corolla 2018', price: 'M 180,000', location: 'Maseru', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400', category: 'cars', sub: 'cars', timeAgo: '2 hours ago', isPremium: true, isVerifiedSeller: true },
  { id: '102', title: 'Honda CB 250 Motorcycle', price: 'M 35,000', location: 'Leribe', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400', category: 'cars', sub: 'motorcycles', timeAgo: '5 hours ago', isPremium: false, isVerifiedSeller: true },
  { id: '103', title: 'Mountain Bicycle', price: 'M 3,500', location: 'Berea', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', category: 'cars', sub: 'bicycles', timeAgo: '1 day ago', isPremium: false, isVerifiedSeller: false },

  // Properties
  { id: '201', title: '3 Bedroom House in Maseru', price: 'M 1,200,000', location: 'Maseru', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400', category: 'properties', sub: 'houses-for-sale', timeAgo: '3 hours ago', isPremium: true, isVerifiedSeller: true },
  { id: '202', title: 'Land Plot 500sqm', price: 'M 250,000', location: 'Mafeteng', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', category: 'properties', sub: 'lands-plots', timeAgo: '1 day ago', isPremium: false, isVerifiedSeller: false },

  // Electronics
  { id: '301', title: 'MacBook Pro 13" 2020', price: 'M 8,500', location: 'Leribe', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', category: 'electronics', sub: 'computers-laptops', timeAgo: '5 hours ago', isPremium: false, isVerifiedSeller: true },
  { id: '302', title: 'Samsung 55" Smart TV', price: 'M 7,200', location: 'Maseru', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', category: 'electronics', sub: 'tvs-video-audio', timeAgo: '6 hours ago', isPremium: true, isVerifiedSeller: true },
  { id: '303', title: 'Gaming Laptop Setup', price: 'M 15,000', location: 'Quthing', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', category: 'electronics', sub: 'computers-laptops', timeAgo: '1 day ago', isPremium: false, isVerifiedSeller: true },

  // Mobiles
  { id: '401', title: 'iPhone 13 Pro Max', price: 'M 12,000', location: 'Mafeteng', image: 'https://images.unsplash.com/photo-1632661674596-df8be59a8056?w=400', category: 'mobiles', sub: 'mobile-phones', timeAgo: '3 hours ago', isPremium: true, isVerifiedSeller: true },
  { id: '402', title: 'Samsung Galaxy S22', price: 'M 9,000', location: 'Maseru', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', category: 'mobiles', sub: 'mobile-phones', timeAgo: '4 hours ago', isPremium: false, isVerifiedSeller: false },

  // Commercial Vehicles
  { id: '501', title: 'Isuzu NQR Truck', price: 'M 450,000', location: 'Maseru', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400', category: 'commercial-vehicles', sub: 'commercial-vehicles', timeAgo: '2 days ago', isPremium: true, isVerifiedSeller: true },

  // Jobs
  { id: '601', title: 'Sales Representative Needed', price: 'M 5,000/mo', location: 'Maseru', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', category: 'jobs', sub: 'sales-marketing', timeAgo: '1 hour ago', isPremium: false, isVerifiedSeller: true },
  { id: '602', title: 'IT Developer Position', price: 'M 15,000/mo', location: 'Maseru', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', category: 'jobs', sub: 'it-engineer', timeAgo: '3 hours ago', isPremium: true, isVerifiedSeller: true },

  // Furniture
  { id: '701', title: 'Modern Office Desk', price: 'M 1,200', location: 'Berea', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', category: 'furniture', sub: 'other-household', timeAgo: '1 day ago', isPremium: true, isVerifiedSeller: false },
  { id: '702', title: 'Living Room Sofa Set', price: 'M 5,500', location: "Mohale's Hoek", image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'furniture', sub: 'sofa-dining', timeAgo: '6 hours ago', isPremium: false, isVerifiedSeller: false },

  // Fashion
  { id: '801', title: "Men's Leather Jacket", price: 'M 850', location: 'Maseru', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', category: 'fashion', sub: 'men', timeAgo: '4 hours ago', isPremium: false, isVerifiedSeller: true },

  // Pets
  { id: '901', title: 'Golden Retriever Puppy', price: 'M 2,500', location: 'Maseru', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', category: 'pets', sub: 'dogs', timeAgo: '2 hours ago', isPremium: true, isVerifiedSeller: true },

  // Books, Sports
  { id: '1001', title: 'Home Gym Equipment Set', price: 'M 4,800', location: 'Leribe', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', category: 'books-sports', sub: 'gym-fitness', timeAgo: '1 day ago', isPremium: false, isVerifiedSeller: false },

  // Services
  { id: '1101', title: 'Professional Home Cleaning', price: 'M 300', location: 'Maseru', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', category: 'services', sub: 'cleaning-pest-control', timeAgo: '5 hours ago', isPremium: false, isVerifiedSeller: true },
];

const Products = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showFilters, setShowFilters] = useState(false);

  const categorySlug = searchParams.get('category') || '';
  const subSlug = searchParams.get('sub') || '';

  const activeCat = categories.find((c) => c.slug === categorySlug);
  const subcategories = activeCat ? activeCat.subs : [];

  const setCategory = (slug: string) => {
    const params = new URLSearchParams();
    if (slug) params.set('category', slug);
    setSearchParams(params);
  };

  const setSub = (sub: string) => {
    const params = new URLSearchParams(searchParams);
    if (sub) params.set('sub', sub);
    else params.delete('sub');
    setSearchParams(params);
  };

  const filteredProducts = useMemo(() => {
    return allMockProducts.filter((p) => {
      const matchesCategory = !categorySlug || p.category === categorySlug;
      const matchesSub = !subSlug || p.sub === subSlug;
      const matchesSearch = !searchQuery ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSub && matchesSearch;
    }).sort((a, b) => {
      if (a.isPremium && !b.isPremium) return -1;
      if (!a.isPremium && b.isPremium) return 1;
      return 0;
    });
  }, [categorySlug, subSlug, searchQuery]);

  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); };

  const getCategoryLabel = () => {
    if (!activeCat) return 'All Categories';
    if (subSlug) {
      const sub = activeCat.subs.find((s) => s.slug === subSlug);
      return sub ? `${activeCat.name} › ${sub.name}` : activeCat.name;
    }
    return activeCat.name;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      {/* Search Bar */}
      <div className="mb-6 flex gap-3 items-center">
        <form onSubmit={handleSearch} className="relative flex-1 max-w-2xl">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="text"
            placeholder="Search listings..."
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
        {/* Sidebar filters */}
        {showFilters && (
          <div className="w-64 space-y-6 shrink-0">
            <Card>
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold">Categories</h3>
                <div className="space-y-1">
                  <Button variant={!categorySlug ? 'default' : 'ghost'} onClick={() => setCategory('')} className="w-full justify-start" size="sm">
                    All Categories
                  </Button>
                  {categories.map((cat) => (
                    <Button
                      key={cat.slug}
                      variant={categorySlug === cat.slug ? 'default' : 'ghost'}
                      onClick={() => setCategory(cat.slug)}
                      className="w-full justify-start"
                      size="sm"
                    >
                      <cat.icon className="w-4 h-4 mr-2" />
                      {cat.name}
                    </Button>
                  ))}
                </div>

                {/* Subcategory filter */}
                {subcategories.length > 0 && (
                  <>
                    <h3 className="font-semibold pt-2">Subcategory</h3>
                    <div className="space-y-1">
                      <Button variant={!subSlug ? 'default' : 'ghost'} onClick={() => setSub('')} className="w-full justify-start" size="sm">
                        All {activeCat?.name}
                      </Button>
                      {subcategories.map((sub) => (
                        <Button
                          key={sub.slug}
                          variant={subSlug === sub.slug ? 'default' : 'ghost'}
                          onClick={() => setSub(sub.slug)}
                          className="w-full justify-start text-left"
                          size="sm"
                        >
                          {sub.name}
                        </Button>
                      ))}
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Product grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-semibold">{getCategoryLabel()}</h2>
              <p className="text-muted-foreground">{filteredProducts.length} listings found</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProducts.map((product) => (
              <Card key={product.id} className="group hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                <div className="relative">
                  <img src={product.image} alt={product.title} className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" />
                  {product.isPremium && (
                    <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground"><Star className="w-3 h-3 mr-1" />Premium</Badge>
                  )}
                  {product.isVerifiedSeller && (
                    <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">✓ Verified</Badge>
                  )}
                  <button
                    className="absolute bottom-2 right-2 bg-background/80 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => { e.stopPropagation(); user ? toggle(product.id) : navigate('/auth'); }}
                  >
                    <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                  </button>
                </div>
                <CardContent className="p-4">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="text-xs">{activeCat?.name || categories.find(c => c.slug === product.category)?.name || product.category}</Badge>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2">{product.title}</h3>
                    <span className="text-lg sm:text-xl font-bold text-primary block">{product.price}</span>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <div className="flex items-center"><MapPin className="w-3 h-3 mr-1" />{product.location}</div>
                      <div className="flex items-center"><Clock className="w-3 h-3 mr-1" />{product.timeAgo}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No listings found in this category.</p>
              <Button variant="outline" onClick={() => { setSearchQuery(''); setCategory(''); }} className="mt-4">Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
