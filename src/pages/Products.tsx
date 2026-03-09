
import React, { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, Filter, MapPin, Clock, Star, Heart, ShieldCheck, Truck, LayoutGrid, List, SlidersHorizontal, X, ChevronRight } from 'lucide-react';
import { categories, getSubcategories } from '@/data/categories';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/components/auth/AuthContext';

const districts = ['Maseru', 'Leribe', 'Berea', 'Mafeteng', "Mohale's Hoek", 'Quthing', "Qacha's Nek", 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'];

const allMockProducts = [
  { id: '101', title: 'Toyota Corolla 2018', price: 180000, location: 'Maseru', image: 'https://images.unsplash.com/photo-1623869675781-80aa31012a5a?w=400', category: 'cars', sub: 'cars', timeAgo: '2h ago', isPremium: true, isVerifiedSeller: true, rating: 4.8, reviews: 12, condition: 'Used', hasDelivery: false },
  { id: '102', title: 'Honda CB 250 Motorcycle', price: 35000, location: 'Leribe', image: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=400', category: 'cars', sub: 'motorcycles', timeAgo: '5h ago', isPremium: false, isVerifiedSeller: true, rating: 4.5, reviews: 6, condition: 'Used', hasDelivery: false },
  { id: '103', title: 'Mountain Bicycle', price: 3500, location: 'Berea', image: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400', category: 'cars', sub: 'bicycles', timeAgo: '1d ago', isPremium: false, isVerifiedSeller: false, rating: 4.2, reviews: 3, condition: 'New', hasDelivery: true },
  { id: '201', title: '3 Bedroom House in Maseru', price: 1200000, location: 'Maseru', image: 'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=400', category: 'properties', sub: 'houses-for-sale', timeAgo: '3h ago', isPremium: true, isVerifiedSeller: true, rating: 4.9, reviews: 2, condition: '', hasDelivery: false },
  { id: '202', title: 'Land Plot 500sqm', price: 250000, location: 'Mafeteng', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400', category: 'properties', sub: 'lands-plots', timeAgo: '1d ago', isPremium: false, isVerifiedSeller: false, rating: 0, reviews: 0, condition: '', hasDelivery: false },
  { id: '301', title: 'MacBook Pro 13" 2020', price: 8500, location: 'Leribe', image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400', category: 'electronics', sub: 'computers-laptops', timeAgo: '5h ago', isPremium: false, isVerifiedSeller: true, rating: 4.9, reviews: 8, condition: 'Like New', hasDelivery: true },
  { id: '302', title: 'Samsung 55" Smart TV', price: 7200, location: 'Maseru', image: 'https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400', category: 'electronics', sub: 'tvs-video-audio', timeAgo: '6h ago', isPremium: true, isVerifiedSeller: true, rating: 4.7, reviews: 11, condition: 'New', hasDelivery: true },
  { id: '303', title: 'Gaming Laptop Setup', price: 15000, location: 'Quthing', image: 'https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400', category: 'electronics', sub: 'computers-laptops', timeAgo: '1d ago', isPremium: false, isVerifiedSeller: true, rating: 4.6, reviews: 7, condition: 'Used', hasDelivery: false },
  { id: '401', title: 'iPhone 13 Pro Max', price: 12000, location: 'Mafeteng', image: 'https://images.unsplash.com/photo-1632661674596-df8be59a8056?w=400', category: 'mobiles', sub: 'mobile-phones', timeAgo: '3h ago', isPremium: true, isVerifiedSeller: true, rating: 4.7, reviews: 15, condition: 'Used', hasDelivery: true },
  { id: '402', title: 'Samsung Galaxy S22', price: 9000, location: 'Maseru', image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400', category: 'mobiles', sub: 'mobile-phones', timeAgo: '4h ago', isPremium: false, isVerifiedSeller: false, rating: 4.4, reviews: 4, condition: 'Used', hasDelivery: true },
  { id: '501', title: 'Isuzu NQR Truck', price: 450000, location: 'Maseru', image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=400', category: 'commercial-vehicles', sub: 'commercial-vehicles', timeAgo: '2d ago', isPremium: true, isVerifiedSeller: true, rating: 4.8, reviews: 3, condition: 'Used', hasDelivery: false },
  { id: '601', title: 'Sales Representative Needed', price: 5000, location: 'Maseru', image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400', category: 'jobs', sub: 'sales-marketing', timeAgo: '1h ago', isPremium: false, isVerifiedSeller: true, rating: 0, reviews: 0, condition: '', hasDelivery: false },
  { id: '602', title: 'IT Developer Position', price: 15000, location: 'Maseru', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400', category: 'jobs', sub: 'it-engineer', timeAgo: '3h ago', isPremium: true, isVerifiedSeller: true, rating: 0, reviews: 0, condition: '', hasDelivery: false },
  { id: '701', title: 'Modern Office Desk', price: 1200, location: 'Berea', image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=400', category: 'furniture', sub: 'other-household', timeAgo: '1d ago', isPremium: true, isVerifiedSeller: false, rating: 4.5, reviews: 3, condition: 'New', hasDelivery: true },
  { id: '702', title: 'Living Room Sofa Set', price: 5500, location: "Mohale's Hoek", image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400', category: 'furniture', sub: 'sofa-dining', timeAgo: '6h ago', isPremium: false, isVerifiedSeller: false, rating: 4.3, reviews: 5, condition: 'New', hasDelivery: true },
  { id: '801', title: "Men's Leather Jacket", price: 850, location: 'Maseru', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400', category: 'fashion', sub: 'men', timeAgo: '4h ago', isPremium: false, isVerifiedSeller: true, rating: 4.6, reviews: 9, condition: 'New', hasDelivery: true },
  { id: '901', title: 'Golden Retriever Puppy', price: 2500, location: 'Maseru', image: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=400', category: 'pets', sub: 'dogs', timeAgo: '2h ago', isPremium: true, isVerifiedSeller: true, rating: 5.0, reviews: 2, condition: '', hasDelivery: false },
  { id: '1001', title: 'Home Gym Equipment Set', price: 4800, location: 'Leribe', image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400', category: 'books-sports', sub: 'gym-fitness', timeAgo: '1d ago', isPremium: false, isVerifiedSeller: false, rating: 4.1, reviews: 2, condition: 'Used', hasDelivery: true },
  { id: '1101', title: 'Professional Home Cleaning', price: 300, location: 'Maseru', image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=400', category: 'services', sub: 'cleaning-pest-control', timeAgo: '5h ago', isPremium: false, isVerifiedSeller: true, rating: 4.8, reviews: 20, condition: '', hasDelivery: false },
];

const sortOptions = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest First' },
  { value: 'rating', label: 'Top Rated' },
];

const conditionOptions = ['All', 'New', 'Like New', 'Used'];

const formatPrice = (price: number) => `M ${price.toLocaleString()}`;

const Products = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { isWishlisted, toggle } = useWishlist();
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [priceRange, setPriceRange] = useState([0, 1500000]);
  const [conditionFilter, setConditionFilter] = useState('All');
  const [locationFilter, setLocationFilter] = useState('');

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
    let results = allMockProducts.filter((p) => {
      const matchesCategory = !categorySlug || p.category === categorySlug;
      const matchesSub = !subSlug || p.sub === subSlug;
      const matchesSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
      const matchesCondition = conditionFilter === 'All' || p.condition === conditionFilter;
      const matchesLocation = !locationFilter || p.location === locationFilter;
      return matchesCategory && matchesSub && matchesSearch && matchesPrice && matchesCondition && matchesLocation;
    });

    // Sort
    switch (sortBy) {
      case 'price-asc': results.sort((a, b) => a.price - b.price); break;
      case 'price-desc': results.sort((a, b) => b.price - a.price); break;
      case 'newest': break; // already in order
      case 'rating': results.sort((a, b) => b.rating - a.rating); break;
      default: results.sort((a, b) => (a.isPremium === b.isPremium ? 0 : a.isPremium ? -1 : 1));
    }

    return results;
  }, [categorySlug, subSlug, searchQuery, sortBy, priceRange, conditionFilter, locationFilter]);

  const getCategoryLabel = () => {
    if (!activeCat) return 'All Categories';
    if (subSlug) {
      const sub = activeCat.subs.find((s) => s.slug === subSlug);
      return sub ? `${activeCat.name} › ${sub.name}` : activeCat.name;
    }
    return activeCat.name;
  };

  const activeFiltersCount = [
    conditionFilter !== 'All',
    locationFilter !== '',
    priceRange[0] > 0 || priceRange[1] < 1500000,
  ].filter(Boolean).length;

  const clearAllFilters = () => {
    setConditionFilter('All');
    setLocationFilter('');
    setPriceRange([0, 1500000]);
    setSearchQuery('');
    setCategory('');
  };

  const FilterSidebar = () => (
    <div className="space-y-5">
      {/* Categories */}
      <div>
        <h3 className="font-semibold text-sm mb-2 text-foreground">Categories</h3>
        <div className="space-y-0.5">
          <button
            onClick={() => setCategory('')}
            className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${!categorySlug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setCategory(cat.slug)}
              className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-2 ${categorySlug === cat.slug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}
            >
              <cat.icon className="w-3.5 h-3.5" />
              {cat.name}
              <ChevronRight className="w-3 h-3 ml-auto opacity-40" />
            </button>
          ))}
        </div>
      </div>

      {/* Subcategories */}
      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-2 text-foreground">{activeCat?.name}</h3>
          <div className="space-y-0.5">
            <button
              onClick={() => setSub('')}
              className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${!subSlug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}
            >
              All {activeCat?.name}
            </button>
            {subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setSub(sub.slug)}
                className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${subSlug === sub.slug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}
              >
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Price Range */}
      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          min={0}
          max={1500000}
          step={1000}
          className="mb-2"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      {/* Condition */}
      <div>
        <h3 className="font-semibold text-sm mb-2 text-foreground">Condition</h3>
        <div className="flex flex-wrap gap-1.5">
          {conditionOptions.map((c) => (
            <button
              key={c}
              onClick={() => setConditionFilter(c)}
              className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${conditionFilter === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-accent'}`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Location */}
      <div>
        <h3 className="font-semibold text-sm mb-2 text-foreground">District</h3>
        <Select value={locationFilter} onValueChange={setLocationFilter}>
          <SelectTrigger className="h-9 text-sm">
            <SelectValue placeholder="All districts" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Districts</SelectItem>
            {districts.map((d) => (
              <SelectItem key={d} value={d}>{d}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {activeFiltersCount > 0 && (
        <Button variant="ghost" size="sm" onClick={clearAllFilters} className="w-full text-destructive">
          <X className="w-3.5 h-3.5 mr-1" /> Clear all filters
        </Button>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4">
        <button onClick={() => navigate('/')} className="hover:text-foreground">Home</button>
        <ChevronRight className="w-3 h-3" />
        <span className="text-foreground font-medium">{getCategoryLabel()}</span>
      </div>

      {/* Search + Toolbar */}
      <div className="mb-4 space-y-3">
        <div className="flex gap-2 items-center">
          <form onSubmit={(e) => e.preventDefault()} className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search within results..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-9"
            />
          </form>

          {/* Sort */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-9 hidden sm:flex">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View toggle */}
          <div className="hidden sm:flex border rounded-md">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-accent' : ''}`}
            >
              <LayoutGrid className="w-4 h-4 text-foreground" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-accent' : ''}`}
            >
              <List className="w-4 h-4 text-foreground" />
            </button>
          </div>

          {/* Mobile filter toggle */}
          <Button variant="outline" size="sm" className="sm:hidden" onClick={() => setShowMobileFilters(!showMobileFilters)}>
            <SlidersHorizontal className="w-4 h-4" />
            {activeFiltersCount > 0 && (
              <Badge className="ml-1 h-4 w-4 p-0 text-[10px] rounded-full bg-primary text-primary-foreground flex items-center justify-center">{activeFiltersCount}</Badge>
            )}
          </Button>
        </div>

        {/* Results summary */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{filteredProducts.length}</span> results
            {searchQuery && <> for "<span className="font-medium text-foreground">{searchQuery}</span>"</>}
          </p>
          {activeFiltersCount > 0 && (
            <button onClick={clearAllFilters} className="text-xs text-primary hover:underline hidden sm:inline">
              Clear filters ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

      {/* Mobile filters drawer */}
      {showMobileFilters && (
        <div className="sm:hidden mb-4 p-4 border rounded-lg bg-card">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-semibold text-sm">Filters</h3>
            <button onClick={() => setShowMobileFilters(false)}><X className="w-4 h-4" /></button>
          </div>
          <FilterSidebar />
        </div>
      )}

      <div className="flex gap-6">
        {/* Desktop sidebar */}
        <aside className="w-60 shrink-0 hidden sm:block">
          <Card>
            <CardContent className="p-4">
              <FilterSidebar />
            </CardContent>
          </Card>
        </aside>

        {/* Product grid/list */}
        <div className="flex-1 min-w-0">
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="relative overflow-hidden">
                    <img src={product.image} alt={product.title} className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.isPremium && (
                        <Badge className="text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground">
                          <Star className="w-2.5 h-2.5 mr-0.5" /> Premium
                        </Badge>
                      )}
                      {product.condition === 'New' && (
                        <Badge className="text-[10px] px-1.5 py-0.5 bg-accent text-accent-foreground border">New</Badge>
                      )}
                    </div>
                    {product.isVerifiedSeller && (
                      <ShieldCheck className="absolute top-2 right-2 w-4 h-4 text-primary drop-shadow" />
                    )}
                    <button
                      className="absolute bottom-2 right-2 bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      onClick={(e) => { e.stopPropagation(); user ? toggle(product.id) : navigate('/auth'); }}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                  <CardContent className="p-3 sm:p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5">
                      <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{categories.find(c => c.slug === product.category)?.name || product.category}</Badge>
                      {product.hasDelivery && (
                        <span className="flex items-center gap-0.5 text-[10px] text-muted-foreground"><Truck className="w-2.5 h-2.5" /> Delivery</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-tight">{product.title}</h3>
                    <span className="text-base sm:text-lg font-bold text-primary block">{formatPrice(product.price)}</span>
                    {product.rating > 0 && (
                      <div className="flex items-center gap-1">
                        <div className="flex">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} />
                          ))}
                        </div>
                        <span className="text-[10px] text-muted-foreground">({product.reviews})</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{product.location}</span>
                      <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{product.timeAgo}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            /* List view */
            <div className="space-y-3">
              {filteredProducts.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="flex">
                    <div className="relative w-40 sm:w-52 shrink-0 overflow-hidden">
                      <img src={product.image} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      {product.isPremium && (
                        <Badge className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground">
                          <Star className="w-2.5 h-2.5 mr-0.5" /> Premium
                        </Badge>
                      )}
                    </div>
                    <CardContent className="p-4 flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{categories.find(c => c.slug === product.category)?.name || product.category}</Badge>
                        {product.condition && <Badge variant="outline" className="text-[10px]">{product.condition}</Badge>}
                        {product.isVerifiedSeller && <ShieldCheck className="w-3.5 h-3.5 text-primary" />}
                      </div>
                      <h3 className="font-semibold text-foreground">{product.title}</h3>
                      <span className="text-xl font-bold text-primary block">{formatPrice(product.price)}</span>
                      {product.rating > 0 && (
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-primary text-primary' : 'text-muted-foreground/30'}`} />
                            ))}
                          </div>
                          <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                        </div>
                      )}
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{product.location}</span>
                        <span className="flex items-center gap-0.5"><Clock className="w-3 h-3" />{product.timeAgo}</span>
                        {product.hasDelivery && <span className="flex items-center gap-0.5 text-primary"><Truck className="w-3 h-3" /> Delivery available</span>}
                      </div>
                    </CardContent>
                    <div className="p-4 hidden sm:flex flex-col items-end justify-between">
                      <button
                        onClick={(e) => { e.stopPropagation(); user ? toggle(product.id) : navigate('/auth'); }}
                      >
                        <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-foreground'}`} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-foreground mb-1">No listings found</h3>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button variant="outline" onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
