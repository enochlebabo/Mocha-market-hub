
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Search, MapPin, Clock, Star, Heart, ShieldCheck, Truck, LayoutGrid, List, SlidersHorizontal, X, ChevronRight, ChevronLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { categories } from '@/data/categories';
import { useWishlist } from '@/hooks/useWishlist';
import { useAuth } from '@/components/auth/AuthContext';
import { formatDistanceToNow } from 'date-fns';

const districts = ['Maseru', 'Leribe', 'Berea', 'Mafeteng', "Mohale's Hoek", 'Quthing', "Qacha's Nek", 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'];
const conditionOptions = ['All', 'New', 'Like New', 'Used'];
const PAGE_SIZE = 12;

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
  const [locationFilter, setLocationFilter] = useState(searchParams.get('location') || '');
  const [page, setPage] = useState(0);

  const categorySlug = searchParams.get('category') || '';
  const subSlug = searchParams.get('sub') || '';
  const activeCat = categories.find((c) => c.slug === categorySlug);
  const subcategories = activeCat ? activeCat.subs : [];

  const setCategory = (slug: string) => {
    const params = new URLSearchParams();
    if (slug) params.set('category', slug);
    setSearchParams(params);
    setPage(0);
  };

  const setSub = (sub: string) => {
    const params = new URLSearchParams(searchParams);
    if (sub) params.set('sub', sub);
    else params.delete('sub');
    setSearchParams(params);
    setPage(0);
  };

  // Fetch real data from Supabase
  const { data, isLoading, isFetching } = useQuery({
    queryKey: ['products', categorySlug, subSlug, searchQuery, sortBy, priceRange, conditionFilter, locationFilter, page],
    queryFn: async () => {
      let query = supabase
        .from('listings')
        .select('*', { count: 'exact' })
        .eq('status', 'active')
        .gte('price', priceRange[0])
        .lte('price', priceRange[1]);

      if (categorySlug) query = query.eq('category', categorySlug);
      if (subSlug) query = query.eq('subcategory', subSlug);
      if (searchQuery) query = query.ilike('title', `%${searchQuery}%`);
      if (conditionFilter !== 'All') query = query.eq('condition', conditionFilter);
      if (locationFilter) query = query.eq('location', locationFilter);

      // Sorting
      switch (sortBy) {
        case 'price-asc': query = query.order('price', { ascending: true }); break;
        case 'price-desc': query = query.order('price', { ascending: false }); break;
        case 'newest': query = query.order('created_at', { ascending: false }); break;
        case 'rating': query = query.order('view_count', { ascending: false }); break;
        default: query = query.order('is_featured', { ascending: false }).order('created_at', { ascending: false });
      }

      query = query.range(page * PAGE_SIZE, (page + 1) * PAGE_SIZE - 1);

      const { data, error, count } = await query;
      if (error) throw error;
      return { listings: data || [], total: count || 0 };
    },
  });

  const listings = data?.listings || [];
  const totalCount = data?.total || 0;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  const getFirstImage = (images: any) => {
    if (Array.isArray(images) && images.length > 0) return images[0];
    return '/placeholder.svg';
  };

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
    setPage(0);
  };

  const FilterSidebar = () => (
    <div className="space-y-5">
      <div>
        <h3 className="font-semibold text-sm mb-2 text-foreground">Categories</h3>
        <div className="space-y-0.5">
          <button onClick={() => setCategory('')} className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${!categorySlug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}>
            All Categories
          </button>
          {categories.map((cat) => (
            <button key={cat.slug} onClick={() => setCategory(cat.slug)} className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors flex items-center gap-2 ${categorySlug === cat.slug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}>
              <cat.icon className="w-3.5 h-3.5" />
              {cat.name}
              <ChevronRight className="w-3 h-3 ml-auto opacity-40" />
            </button>
          ))}
        </div>
      </div>

      {subcategories.length > 0 && (
        <div>
          <h3 className="font-semibold text-sm mb-2 text-foreground">{activeCat?.name}</h3>
          <div className="space-y-0.5">
            <button onClick={() => setSub('')} className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${!subSlug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}>
              All {activeCat?.name}
            </button>
            {subcategories.map((sub) => (
              <button key={sub.slug} onClick={() => setSub(sub.slug)} className={`w-full text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${subSlug === sub.slug ? 'bg-primary text-primary-foreground font-medium' : 'text-foreground hover:bg-accent'}`}>
                {sub.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="font-semibold text-sm mb-3 text-foreground">Price Range</h3>
        <Slider value={priceRange} onValueChange={setPriceRange} min={0} max={1500000} step={1000} className="mb-2" />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatPrice(priceRange[0])}</span>
          <span>{formatPrice(priceRange[1])}</span>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2 text-foreground">Condition</h3>
        <div className="flex flex-wrap gap-1.5">
          {conditionOptions.map((c) => (
            <button key={c} onClick={() => { setConditionFilter(c); setPage(0); }} className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${conditionFilter === c ? 'bg-primary text-primary-foreground border-primary' : 'bg-background text-foreground border-border hover:bg-accent'}`}>
              {c}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-sm mb-2 text-foreground">District</h3>
        <Select value={locationFilter} onValueChange={(v) => { setLocationFilter(v); setPage(0); }}>
          <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="All districts" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Districts</SelectItem>
            {districts.map((d) => (<SelectItem key={d} value={d}>{d}</SelectItem>))}
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

  const ProductCardSkeleton = () => (
    <div className="space-y-2 border rounded-lg overflow-hidden">
      <Skeleton className="h-36 sm:h-48 w-full" />
      <div className="p-3 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-5 w-1/2" />
        <Skeleton className="h-3 w-full" />
      </div>
    </div>
  );

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'rating', label: 'Most Viewed' },
  ];

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
          <form onSubmit={(e) => { e.preventDefault(); setPage(0); }} className="relative flex-1 max-w-xl">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input type="text" placeholder="Search within results..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 h-9" />
          </form>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[180px] h-9 hidden sm:flex"><SelectValue /></SelectTrigger>
            <SelectContent>
              {sortOptions.map((opt) => (<SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>))}
            </SelectContent>
          </Select>
          <div className="hidden sm:flex border rounded-md">
            <button onClick={() => setViewMode('grid')} className={`p-2 ${viewMode === 'grid' ? 'bg-accent' : ''}`}><LayoutGrid className="w-4 h-4 text-foreground" /></button>
            <button onClick={() => setViewMode('list')} className={`p-2 ${viewMode === 'list' ? 'bg-accent' : ''}`}><List className="w-4 h-4 text-foreground" /></button>
          </div>
          <Button variant="outline" size="sm" className="sm:hidden" onClick={() => setShowMobileFilters(!showMobileFilters)}>
            <SlidersHorizontal className="w-4 h-4" />
            {activeFiltersCount > 0 && (<Badge className="ml-1 h-4 w-4 p-0 text-[10px] rounded-full bg-primary text-primary-foreground flex items-center justify-center">{activeFiltersCount}</Badge>)}
          </Button>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-foreground">{totalCount}</span> results
            {searchQuery && <> for "<span className="font-medium text-foreground">{searchQuery}</span>"</>}
            {isFetching && <span className="ml-2 text-xs text-muted-foreground">(loading...)</span>}
          </p>
          {activeFiltersCount > 0 && (
            <button onClick={clearAllFilters} className="text-xs text-primary hover:underline hidden sm:inline">
              Clear filters ({activeFiltersCount})
            </button>
          )}
        </div>
      </div>

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
        <aside className="w-60 shrink-0 hidden sm:block">
          <Card><CardContent className="p-4"><FilterSidebar /></CardContent></Card>
        </aside>

        <div className="flex-1 min-w-0">
          {isLoading ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {Array.from({ length: 6 }).map((_, i) => (<ProductCardSkeleton key={i} />))}
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {listings.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="relative overflow-hidden">
                    <img src={getFirstImage(product.images)} alt={product.title} className="w-full h-36 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                    <div className="absolute top-2 left-2 flex flex-col gap-1">
                      {product.is_featured && (
                        <Badge className="text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground"><Star className="w-2.5 h-2.5 mr-0.5" /> Premium</Badge>
                      )}
                      {product.condition === 'New' && (
                        <Badge className="text-[10px] px-1.5 py-0.5 bg-accent text-accent-foreground border">New</Badge>
                      )}
                    </div>
                    <button className="absolute bottom-2 right-2 bg-background/90 rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm" onClick={(e) => { e.stopPropagation(); user ? toggle(product.id) : navigate('/auth'); }}>
                      <Heart className={`w-3.5 h-3.5 ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground'}`} />
                    </button>
                  </div>
                  <CardContent className="p-3 sm:p-4 space-y-1.5">
                    <Badge variant="secondary" className="text-[10px] px-1.5 py-0">{product.category}</Badge>
                    <h3 className="font-semibold text-sm sm:text-base text-foreground line-clamp-2 leading-tight">{product.title}</h3>
                    <span className="text-base sm:text-lg font-bold text-primary block">{formatPrice(product.price)}</span>
                    <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-0.5">
                      <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{product.location}</span>
                      <span className="flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {listings.map((product) => (
                <Card key={product.id} className="group hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden" onClick={() => navigate(`/product/${product.id}`)}>
                  <div className="flex">
                    <div className="relative w-40 sm:w-52 shrink-0 overflow-hidden">
                      <img src={getFirstImage(product.images)} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
                      {product.is_featured && (
                        <Badge className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5 bg-primary text-primary-foreground"><Star className="w-2.5 h-2.5 mr-0.5" /> Premium</Badge>
                      )}
                    </div>
                    <CardContent className="p-4 flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-[10px]">{product.category}</Badge>
                        {product.condition && <Badge variant="outline" className="text-[10px]">{product.condition}</Badge>}
                      </div>
                      <h3 className="font-semibold text-foreground">{product.title}</h3>
                      <span className="text-xl font-bold text-primary block">{formatPrice(product.price)}</span>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-0.5"><MapPin className="w-3 h-3" />{product.location}</span>
                        <span className="flex items-center gap-0.5">
                          <Clock className="w-3 h-3" />
                          {formatDistanceToNow(new Date(product.created_at), { addSuffix: true })}
                        </span>
                      </div>
                    </CardContent>
                    <div className="p-4 hidden sm:flex flex-col items-end justify-between">
                      <button onClick={(e) => { e.stopPropagation(); user ? toggle(product.id) : navigate('/auth'); }}>
                        <Heart className={`w-5 h-5 ${isWishlisted(product.id) ? 'fill-destructive text-destructive' : 'text-muted-foreground hover:text-foreground'}`} />
                      </button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}

          {listings.length === 0 && !isLoading && (
            <div className="text-center py-16">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="font-semibold text-foreground mb-1">No listings found</h3>
              <p className="text-sm text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
              <Button variant="outline" onClick={clearAllFilters}>Clear all filters</Button>
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              <Button variant="outline" size="sm" disabled={page === 0} onClick={() => setPage(p => p - 1)}>
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                  const pageNum = totalPages <= 5 ? i : Math.max(0, Math.min(page - 2, totalPages - 5)) + i;
                  return (
                    <Button key={pageNum} variant={page === pageNum ? 'default' : 'outline'} size="sm" className="w-9 h-9" onClick={() => setPage(pageNum)}>
                      {pageNum + 1}
                    </Button>
                  );
                })}
              </div>
              <Button variant="outline" size="sm" disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>
                Next <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;
