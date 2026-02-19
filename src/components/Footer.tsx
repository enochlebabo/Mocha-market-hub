import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, ArrowRight, Code, Globe, Mail, Phone, GraduationCap, Heart, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founder Section */}
        <div className="py-10 sm:py-12 border-b border-primary-foreground/20">
          <div className="bg-primary-foreground/10 rounded-xl p-5 sm:p-8">
            <div className="text-center mb-5 sm:mb-6">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="w-6 h-6 opacity-80" />
                <h3 className="text-lg sm:text-2xl font-bold">Meet the Founder & Developer</h3>
              </div>
              <h4 className="text-base sm:text-xl font-semibold opacity-90">
                Mr. Enoch Lebabo — Founder & Lead Developer
              </h4>
            </div>

            <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 text-sm mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <GraduationCap className="w-4 h-4 opacity-80 shrink-0" />
                  Education & Background
                </div>
                <p className="opacity-80 leading-relaxed">
                  IT Engineer pursuing B.Tech at BVM Engineering College, GTU, India.
                  Specialized in Mobile Development, AI, Cloud Integration.
                </p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <Star className="w-4 h-4 opacity-80 shrink-0" />
                  Innovation & Leadership
                </div>
                <p className="opacity-80 leading-relaxed">
                  Leading AI-powered crop disease detection and Lesotho-centric marketplace solutions.
                  Dedicated to tech-driven economic development in Africa.
                </p>
              </div>
            </div>

            <div className="border-t border-primary-foreground/20 pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center items-center text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>enochlebabo@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 shrink-0" />
                  <span>+91 63592 89443</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => window.open('mailto:enochlebabo@gmail.com', '_blank')}
                >
                  Contact Founder
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => window.open('https://linkedin.com/in/enoch-lebabo-04b651266', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  LinkedIn
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                  onClick={() => window.open('https://github.com/enochlebabo', '_blank')}
                >
                  <ExternalLink className="w-4 h-4 mr-2" />
                  GitHub
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 mt-6 pt-4 border-t border-primary-foreground/20 text-center text-sm">
              <div>
                <Globe className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="font-semibold text-xs sm:text-sm">AI Innovation</p>
                <p className="opacity-70 text-xs hidden sm:block">TensorFlow & Flutter</p>
              </div>
              <div>
                <Users className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="font-semibold text-xs sm:text-sm">Community</p>
                <p className="opacity-70 text-xs hidden sm:block">African Economies</p>
              </div>
              <div>
                <Code className="w-5 h-5 mx-auto mb-1 opacity-80" />
                <p className="font-semibold text-xs sm:text-sm">Tech Lead</p>
                <p className="opacity-70 text-xs hidden sm:block">Cloud & Mobile</p>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="py-8 sm:py-12 border-b border-primary-foreground/20">
          <div className="grid sm:grid-cols-2 gap-5 sm:gap-8 items-center">
            <div>
              <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">
                Stay Updated with MoCha Market
              </h3>
              <p className="opacity-80 text-sm sm:text-base">
                Get notified about new listings, deals, and local business opportunities.
              </p>
            </div>
            <div className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary" className="shrink-0">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Links */}
        <div className="py-8 sm:py-12 grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          <div className="col-span-2 sm:col-span-1 space-y-3">
            <h3 className="text-lg font-bold">MoCha Market</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Connecting buyers and sellers across the beautiful Kingdom of Lesotho.
              Your trusted marketplace for quality goods.
            </p>
            <div className="flex items-center gap-2 text-sm opacity-70">
              <MapPin className="w-4 h-4 shrink-0" />
              <span>All 10 districts of Lesotho</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Categories</h4>
            <ul className="space-y-2 text-sm opacity-80">
              {['Vehicles', 'Electronics', 'Furniture', 'Fashion', 'Services'].map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => navigate(`/products?category=${cat.toLowerCase()}`)}
                    className="hover:opacity-100 transition-opacity text-left"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Businesses</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => navigate('/contact-us')} className="hover:opacity-100">Advertise</button></li>
              <li><button onClick={() => navigate('/list-product')} className="hover:opacity-100">List Item</button></li>
              <li><button onClick={() => navigate('/seller-dashboard')} className="hover:opacity-100">Dashboard</button></li>
              <li><button onClick={() => navigate('/help-center')} className="hover:opacity-100">Support</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => navigate('/help-center')} className="hover:opacity-100">Help Center</button></li>
              <li><button onClick={() => navigate('/safety-tips')} className="hover:opacity-100">Safety Tips</button></li>
              <li><button onClick={() => navigate('/terms-of-service')} className="hover:opacity-100">Terms of Service</button></li>
              <li><button onClick={() => navigate('/privacy-policy')} className="hover:opacity-100">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/contact-us')} className="hover:opacity-100">Contact Us</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-primary-foreground/20">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 text-sm opacity-70">
            <div>© MoCha Market. All rights reserved. Lesotho.</div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center gap-1">
                <GraduationCap className="w-4 h-4" />
                <span>GTU Engineering</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
