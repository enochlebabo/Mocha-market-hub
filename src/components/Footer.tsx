
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  const navigate = useNavigate();

  const categories = ['Vehicles', 'Electronics', 'Furniture', 'Fashion', 'Services', 'Business'];

  const buyerLinks = [
    { label: 'Browse All Items', path: '/products' },
    { label: 'Help Center', path: '/help-center' },
    { label: 'Safety Tips', path: '/safety-tips' },
    { label: 'Contact Us', path: '/contact-us' },
  ];

  const sellerLinks = [
    { label: 'Sell an Item', path: '/list-product' },
    { label: 'Seller Dashboard', path: '/seller-dashboard' },
    { label: 'Advertise with Us', path: '/contact-us' },
    { label: 'Business Accounts', path: '/seller-dashboard' },
  ];

  const legalLinks = [
    { label: 'Terms of Service', path: '/terms-of-service' },
    { label: 'Privacy Policy', path: '/privacy-policy' },
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main grid */}
        <div className="py-10 sm:py-14 grid grid-cols-2 sm:grid-cols-4 gap-8">

          {/* Brand */}
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <div>
              <span className="text-xl font-bold">MoCha</span>
              <span className="text-xl font-bold opacity-70">Market</span>
            </div>
            <p className="text-sm opacity-60 leading-relaxed">
              Lesotho's trusted marketplace connecting buyers and sellers across all 10 districts.
            </p>
            <div className="space-y-1.5 text-sm opacity-60">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 shrink-0" />
                <span>Maseru, Kingdom of Lesotho</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 shrink-0" />
                <span>enochlebabo@gmail.com</span>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-50">
              Categories
            </h4>
            <ul className="space-y-2">
              {categories.map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => navigate(`/products?category=${cat.toLowerCase()}`)}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Buyers */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-50">
              For Buyers
            </h4>
            <ul className="space-y-2">
              {buyerLinks.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Sellers */}
          <div>
            <h4 className="font-semibold mb-4 text-sm uppercase tracking-wide opacity-50">
              For Sellers
            </h4>
            <ul className="space-y-2">
              {sellerLinks.map(({ label, path }) => (
                <li key={label}>
                  <button
                    onClick={() => navigate(path)}
                    className="text-sm opacity-70 hover:opacity-100 transition-opacity text-left"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-background/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs opacity-50">
          <span>© {new Date().getFullYear()} MoCha Market. All rights reserved.</span>
          <div className="flex gap-4">
            {legalLinks.map(({ label, path }) => (
              <button
                key={label}
                onClick={() => navigate(path)}
                className="hover:opacity-100 transition-opacity"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
