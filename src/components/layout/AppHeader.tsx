
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, MapPin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AuthButton from '@/components/auth/AuthButton';
import NavigationMenu from '@/components/NavigationMenu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { SearchWithSuggestions } from '@/components/search/SearchWithSuggestions';
import MobileBottomNav from '@/components/MobileBottomNav';

interface AppHeaderProps {
  showSearch?: boolean;
  showCategoryNav?: boolean;
  children?: React.ReactNode;
}

const AppHeader = ({ showSearch = true, showCategoryNav = true, children }: AppHeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (query: string) => {
    if (query.trim()) {
      navigate(`/products?search=${encodeURIComponent(query)}`);
    } else {
      navigate('/products');
    }
  };

  return (
    <>
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Top row */}
          <div className="flex items-center h-13 sm:h-16 gap-2 py-2">
            {/* Logo */}
            <button
              className="flex items-center gap-1.5 shrink-0 mr-1 sm:mr-3"
              onClick={() => navigate('/')}
            >
              <span className="text-lg sm:text-2xl font-bold text-primary leading-none">
                MoCha
              </span>
              <span className="text-lg sm:text-2xl font-bold text-foreground leading-none">
                Market
              </span>
              <Badge variant="outline" className="hidden lg:inline-flex text-xs ml-1 px-1.5 py-0.5">
                <MapPin className="w-2.5 h-2.5 mr-0.5" />
                Lesotho
              </Badge>
            </button>

            {/* Search — grows to fill middle */}
            {showSearch && (
              <div className="flex-1 hidden sm:block">
                <SearchWithSuggestions
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="Search for anything..."
                />
              </div>
            )}
            {!showSearch && <div className="flex-1" />}

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto sm:ml-2">
              <ThemeToggle />
              <AuthButton />
              <Button
                size="sm"
                onClick={() => navigate('/list-product')}
                className="hidden sm:inline-flex font-semibold"
              >
                <Tag className="w-3.5 h-3.5 mr-1.5" />
                Sell
              </Button>
            </div>
          </div>

          {/* Mobile search */}
          {showSearch && (
            <div className="sm:hidden pb-2">
              <SearchWithSuggestions
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search for anything..."
              />
            </div>
          )}

          {/* Optional banner slot */}
          {children}

          {/* Category nav */}
          {showCategoryNav && (
            <div className="border-t">
              <NavigationMenu />
            </div>
          )}
        </div>
      </header>
      <MobileBottomNav />
    </>
  );
};

export default AppHeader;
