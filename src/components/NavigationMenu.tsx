
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'All', href: '/products' },
  { label: 'Vehicles', href: '/products?category=vehicles' },
  { label: 'Electronics', href: '/products?category=electronics' },
  { label: 'Furniture', href: '/products?category=furniture' },
  { label: 'Fashion', href: '/products?category=fashion' },
  { label: 'Services', href: '/products?category=services' },
  { label: 'Business', href: '/products?category=business' },
];

const NavigationMenu = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="flex items-center gap-0.5 overflow-x-auto scrollbar-none py-1">
      {navLinks.map((link) => {
        const isActive =
          location.pathname + location.search === link.href ||
          (link.href !== '/products' && (location.pathname + location.search).startsWith(link.href));

        return (
          <button
            key={link.label}
            onClick={() => navigate(link.href)}
            className={cn(
              'flex-shrink-0 text-xs sm:text-sm px-3 sm:px-4 py-1.5 rounded-full font-medium transition-all duration-200 whitespace-nowrap',
              isActive
                ? 'bg-primary text-primary-foreground'
                : 'text-muted-foreground hover:text-foreground hover:bg-accent'
            )}
          >
            {link.label}
          </button>
        );
      })}
    </nav>
  );
};

export default NavigationMenu;
