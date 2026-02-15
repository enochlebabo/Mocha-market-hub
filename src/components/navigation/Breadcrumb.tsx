import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  if (pathnames.length === 0) return null;

  return (
    <nav aria-label="Breadcrumb" className="py-3">
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        <li>
          <Link to="/" className="hover:text-primary flex items-center">
            <Home className="w-4 h-4" />
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;
          const label = name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

          return (
            <li key={routeTo} className="flex items-center space-x-2">
              <ChevronRight className="w-4 h-4" />
              {isLast ? (
                <span className="text-foreground font-medium">{label}</span>
              ) : (
                <Link to={routeTo} className="hover:text-primary">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
