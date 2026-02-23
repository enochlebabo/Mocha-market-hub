
import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { Home, Search, Tag, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const tabs = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Browse', icon: Search, href: '/products' },
  { label: 'Sell', icon: Tag, href: '/list-product', highlight: true },
  { label: 'Wishlist', icon: Heart, href: '/wishlist' },
  { label: 'Account', icon: User, href: '/seller-dashboard' },
];

const MobileBottomNav = () => {
  const location = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t sm:hidden flex items-center justify-around h-14 px-2 safe-area-inset-bottom">
      {tabs.map(({ label, icon: Icon, href, highlight }) => {
        const isActive = location.pathname === href;
        return (
          <Link
            key={label}
            to={href}
            className={cn(
              'flex flex-col items-center justify-center gap-0.5 flex-1 h-full text-xs font-medium transition-colors',
              highlight
                ? 'text-primary'
                : isActive
                  ? 'text-primary'
                  : 'text-muted-foreground'
            )}
          >
            <div className={cn(
              'rounded-full p-1.5 transition-colors',
              highlight ? 'bg-primary text-primary-foreground' : ''
            )}>
              <Icon className={cn('w-5 h-5', highlight ? 'text-primary-foreground' : '')} />
            </div>
            <span className="leading-none">{label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
