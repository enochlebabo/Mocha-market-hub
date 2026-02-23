
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { categories } from '@/data/categories';
import { ChevronDown } from 'lucide-react';

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [openSlug, setOpenSlug] = useState<string | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>();
  const navRef = useRef<HTMLDivElement>(null);

  // Close dropdown on route change
  useEffect(() => { setOpenSlug(null); }, [location]);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenSlug(null);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleEnter = (slug: string) => {
    clearTimeout(timeoutRef.current);
    setOpenSlug(slug);
  };

  const handleLeave = () => {
    timeoutRef.current = setTimeout(() => setOpenSlug(null), 200);
  };

  const handleCategoryClick = (slug: string) => {
    navigate(`/products?category=${slug}`);
    setOpenSlug(null);
  };

  const handleSubClick = (catSlug: string, subSlug: string) => {
    navigate(`/products?category=${catSlug}&sub=${subSlug}`);
    setOpenSlug(null);
  };

  return (
    <div ref={navRef} className="relative">
      <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none py-1">
        {/* All */}
        <button
          onClick={() => navigate('/products')}
          className={cn(
            'flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap',
            location.pathname === '/products' && !location.search
              ? 'bg-primary text-primary-foreground'
              : 'text-muted-foreground hover:text-foreground hover:bg-accent'
          )}
        >
          All
        </button>

        {categories.map((cat) => {
          const isActive = location.search.includes(`category=${cat.slug}`);
          const isOpen = openSlug === cat.slug;

          return (
            <div
              key={cat.slug}
              className="relative flex-shrink-0"
              onMouseEnter={() => handleEnter(cat.slug)}
              onMouseLeave={handleLeave}
            >
              <button
                onClick={() => handleCategoryClick(cat.slug)}
                className={cn(
                  'flex items-center gap-1 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent'
                )}
              >
                {cat.name}
                <ChevronDown className={cn('w-3 h-3 transition-transform', isOpen && 'rotate-180')} />
              </button>

              {/* Dropdown */}
              {isOpen && (
                <div
                  className="absolute left-0 top-full mt-1 z-50 bg-popover border rounded-lg shadow-lg p-2 min-w-[220px] max-h-[70vh] overflow-y-auto"
                  onMouseEnter={() => handleEnter(cat.slug)}
                  onMouseLeave={handleLeave}
                >
                  {cat.subs.map((sub) => (
                    <button
                      key={sub.slug}
                      onClick={() => handleSubClick(cat.slug, sub.slug)}
                      className="w-full text-left text-sm px-3 py-2 rounded-md hover:bg-accent text-foreground transition-colors"
                    >
                      {sub.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
};

export default NavigationMenu;
