
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tag, MapPin, ChevronDown, Menu } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { SearchWithSuggestions } from '@/components/search/SearchWithSuggestions';
import AuthButton from '@/components/auth/AuthButton';
import NavigationMenu from '@/components/NavigationMenu';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
import { ScrollToTop } from '@/components/ui/scroll-to-top';
import MobileBottomNav from '@/components/MobileBottomNav';
import Footer from '@/components/Footer';

const districts = [
  'All Lesotho', 'Maseru', 'Leribe', 'Berea', 'Mafeteng',
  "Mohale's Hoek", 'Quthing', "Qacha's Nek", 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'
];

interface LayoutProps {
  children: React.ReactNode;
  hideFooter?: boolean;
}

const Layout = ({ children, hideFooter = false }: LayoutProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('All Lesotho');
  const [showDistrictPicker, setShowDistrictPicker] = useState(false);

  const handleSearch = (query: string) => {
    navigate(`/products${query.trim() ? `?search=${encodeURIComponent(query)}` : ''}`);
  };

  return (
    <div className="min-h-screen bg-background pb-14 sm:pb-0">
      {/* ─── Top utility bar ─── */}
      <div className="bg-primary text-primary-foreground text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowDistrictPicker(!showDistrictPicker)}
              className="flex items-center gap-1 hover:underline"
            >
              <MapPin className="w-3 h-3" />
              <span>Deliver to: <strong>{selectedDistrict}</strong></span>
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigate('/help-center')} className="hover:underline">Help</button>
            <button onClick={() => navigate('/safety-tips')} className="hover:underline">Safety</button>
            <button onClick={() => navigate('/seller-dashboard')} className="hover:underline">Seller Centre</button>
          </div>
        </div>
        {/* District picker dropdown */}
        {showDistrictPicker && (
          <div className="absolute z-[60] left-0 top-8 bg-popover text-popover-foreground border rounded-lg shadow-xl p-3 ml-6 min-w-[200px]">
            <p className="text-xs font-semibold text-muted-foreground mb-2 uppercase tracking-wide">Select District</p>
            <div className="grid grid-cols-2 gap-1">
              {districts.map((d) => (
                <button
                  key={d}
                  onClick={() => { setSelectedDistrict(d); setShowDistrictPicker(false); }}
                  className={`text-left text-sm px-2.5 py-1.5 rounded-md transition-colors ${
                    selectedDistrict === d ? 'bg-primary text-primary-foreground' : 'hover:bg-accent text-foreground'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ─── Main Header ─── */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
          {/* Main row: Logo + Search + Actions */}
          <div className="flex items-center h-14 sm:h-16 gap-2 sm:gap-4">
            {/* Logo */}
            <button
              className="flex items-center gap-1 shrink-0"
              onClick={() => navigate('/')}
            >
              <span className="text-lg sm:text-2xl font-bold text-primary leading-none">
                MoCha
              </span>
              <span className="text-lg sm:text-2xl font-bold text-foreground leading-none">
                Market
              </span>
            </button>

            {/* Search — Amazon-style integrated in header */}
            <div className="flex-1 max-w-2xl hidden sm:block">
              <div className="flex">
                <SearchWithSuggestions
                  value={searchQuery}
                  onChange={setSearchQuery}
                  onSearch={handleSearch}
                  placeholder="Search for anything in Lesotho..."
                  className="flex-1"
                />
                <Button
                  onClick={() => handleSearch(searchQuery)}
                  size="default"
                  className="rounded-l-none rounded-r-lg px-5 -ml-px"
                >
                  Search
                </Button>
              </div>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-1 sm:gap-2 shrink-0 ml-auto">
              <ThemeToggle />
              <AuthButton />
              <Button
                size="sm"
                onClick={() => navigate('/list-product')}
                className="hidden sm:inline-flex font-semibold gap-1.5"
              >
                <Tag className="w-3.5 h-3.5" />
                Sell
              </Button>
            </div>
          </div>

          {/* Mobile search row */}
          <div className="sm:hidden pb-2">
            <div className="flex gap-2">
              <SearchWithSuggestions
                value={searchQuery}
                onChange={setSearchQuery}
                onSearch={handleSearch}
                placeholder="Search MoCha Market..."
                className="flex-1"
              />
            </div>
          </div>

          {/* Category nav */}
          <div className="border-t">
            <NavigationMenu />
          </div>
        </div>
      </header>

      {/* ─── Main Content ─── */}
      <main>{children}</main>

      {!hideFooter && <Footer />}
      <ScrollToTop />
      <MobileBottomNav />
    </div>
  );
};

export default Layout;
