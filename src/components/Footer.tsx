import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Users, Star, ArrowRight, Code, Globe, Mail, Phone, GraduationCap, Heart, ExternalLink } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Founder Information Section */}
        <div className="py-12 border-b border-primary-foreground/20">
          <Card className="bg-primary-foreground/10 text-primary-foreground border-none">
            <CardContent className="p-8">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center space-x-2">
                  <Heart className="w-8 h-8 opacity-80" />
                  <h3 className="text-2xl font-bold">Meet the Founder & Developer</h3>
                </div>
                <div className="max-w-4xl mx-auto space-y-6">
                  <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-6">
                    <h4 className="text-xl font-semibold mb-4 opacity-90">Mr. Enoch Lebabo - Founder & Lead Developer</h4>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-5 h-5 opacity-80" />
                          <span className="font-medium">Education & Background</span>
                        </div>
                        <p className="text-sm opacity-80">
                          Information Technology Engineer pursuing B.Tech in IT at BVM Engineering College, 
                          Gujarat Technological University (GTU), India
                        </p>
                        <p className="text-sm opacity-80">
                          Specialized in Mobile Development, AI, Cloud Integration, and User-Centric System Design
                        </p>
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-2">
                          <Star className="w-5 h-5 opacity-80" />
                          <span className="font-medium">Innovation & Leadership</span>
                        </div>
                        <p className="text-sm opacity-80">
                          Leading AI-powered crop disease detection systems and Lesotho-centric marketplace solutions
                        </p>
                        <p className="text-sm opacity-80">
                          Dedicated to leveraging technology for economic development and social transformation in Africa
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-primary-foreground/20">
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <div className="flex items-center space-x-2 text-sm">
                          <Mail className="w-4 h-4" />
                          <span>enochlebabo@gmail.com</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <Phone className="w-4 h-4" />
                          <span>+91 63592 89443</span>
                        </div>
                        <Button 
                          variant="secondary" 
                          size="sm"
                          onClick={() => window.open('mailto:enochlebabo@gmail.com', '_blank')}
                        >
                          Contact Founder
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </div>
                      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-3">
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
                  </div>
                </div>
                
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                  <div className="text-center">
                    <Globe className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    <h4 className="font-semibold">AI Innovation</h4>
                    <p className="text-sm opacity-70">TensorFlow & Flutter Solutions</p>
                  </div>
                  <div className="text-center">
                    <Users className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    <h4 className="font-semibold">Community Impact</h4>
                    <p className="text-sm opacity-70">Empowering African Economies</p>
                  </div>
                  <div className="text-center">
                    <Code className="w-6 h-6 mx-auto mb-2 opacity-80" />
                    <h4 className="font-semibold">Technical Leadership</h4>
                    <p className="text-sm opacity-70">Cloud & Mobile Development</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Newsletter Section */}
        <div className="py-12 border-b border-primary-foreground/20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold mb-2">
                Stay Updated with MoCha Market
              </h3>
              <p className="opacity-80">
                Get notified about new listings, deals, and local business opportunities.
              </p>
            </div>
            <div className="flex space-x-3">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button variant="secondary">
                Subscribe
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="py-12 grid md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-xl font-bold">MoCha Market</h3>
            <p className="text-sm leading-relaxed opacity-80">
              Connecting buyers and sellers across the beautiful Kingdom of Lesotho. 
              Your trusted marketplace for quality second-hand goods.
            </p>
            <div className="flex items-center space-x-2 text-sm opacity-70">
              <MapPin className="w-4 h-4" />
              <span>Serving all 10 districts of Lesotho</span>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Categories</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => navigate('/products?category=vehicles')} className="hover:opacity-100 transition-opacity">Vehicles</button></li>
              <li><button onClick={() => navigate('/products?category=electronics')} className="hover:opacity-100 transition-opacity">Electronics</button></li>
              <li><button onClick={() => navigate('/products?category=furniture')} className="hover:opacity-100 transition-opacity">Furniture</button></li>
              <li><button onClick={() => navigate('/products?category=fashion')} className="hover:opacity-100 transition-opacity">Fashion</button></li>
              <li><button onClick={() => navigate('/products?category=services')} className="hover:opacity-100 transition-opacity">Services</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">For Businesses</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => navigate('/contact-us')} className="hover:opacity-100 transition-opacity">Advertise with Us</button></li>
              <li><button onClick={() => navigate('/list-product')} className="hover:opacity-100 transition-opacity">Business Listings</button></li>
              <li><button onClick={() => navigate('/auth')} className="hover:opacity-100 transition-opacity">Seller Dashboard</button></li>
              <li><button onClick={() => navigate('/help-center')} className="hover:opacity-100 transition-opacity">Success Stories</button></li>
              <li><button onClick={() => navigate('/help-center')} className="hover:opacity-100 transition-opacity">Support</button></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><button onClick={() => navigate('/help-center')} className="hover:opacity-100 transition-opacity">Help Center</button></li>
              <li><button onClick={() => navigate('/safety-tips')} className="hover:opacity-100 transition-opacity">Safety Tips</button></li>
              <li><button onClick={() => navigate('/terms-of-service')} className="hover:opacity-100 transition-opacity">Terms of Service</button></li>
              <li><button onClick={() => navigate('/privacy-policy')} className="hover:opacity-100 transition-opacity">Privacy Policy</button></li>
              <li><button onClick={() => navigate('/contact-us')} className="hover:opacity-100 transition-opacity">Contact Us</button></li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="py-6 border-t border-primary-foreground/20">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-sm opacity-70">
              © MoCha Market. All rights reserved. Lesotho.
            </div>
            <div className="flex items-center space-x-6 text-sm opacity-70">
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="w-4 h-4" />
                <span>4.8/5 Rating</span>
              </div>
              <div className="flex items-center space-x-1">
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
