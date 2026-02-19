import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Search, Tag, Shield, Users, Sparkles, ArrowRight } from 'lucide-react';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative bg-primary text-primary-foreground overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 lg:py-28">
        <div className="text-center space-y-6 sm:space-y-8">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Kingdom of Lesotho's
            <br />
            <span className="opacity-80">Premier Marketplace</span>
          </h1>

          <p className="text-base sm:text-xl md:text-2xl opacity-80 max-w-3xl mx-auto px-2">
            Buy and sell goods across all 10 districts. From Maseru to the highlands,
            connect with trusted sellers and find everything you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-lg mx-auto">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto font-semibold px-6 py-5 text-base sm:text-lg shadow-lg hover:shadow-xl transition-all duration-300 group"
              onClick={() => navigate('/products')}
            >
              <Search className="w-5 h-5 mr-2 shrink-0" />
              Browse 25K+ Items
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary font-semibold px-6 py-5 text-base sm:text-lg transition-all duration-300"
              onClick={() => navigate('/list-product')}
            >
              <Tag className="w-5 h-5 mr-2 shrink-0" />
              List Your Goods
            </Button>
          </div>

          {/* Trust badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 sm:mt-16">
            <div className="text-center space-y-2">
              <Shield className="w-10 h-10 mx-auto opacity-80" />
              <h3 className="text-base sm:text-lg font-semibold">Verified Sellers</h3>
              <p className="opacity-70 text-sm">Trade with confidence using our verification system</p>
            </div>
            <div className="text-center space-y-2">
              <Users className="w-10 h-10 mx-auto opacity-80" />
              <h3 className="text-base sm:text-lg font-semibold">Local Community</h3>
              <p className="opacity-70 text-sm">Supporting businesses and individuals across Lesotho</p>
            </div>
            <div className="text-center space-y-2">
              <Sparkles className="w-10 h-10 mx-auto opacity-80" />
              <h3 className="text-base sm:text-lg font-semibold">Quality Assured</h3>
              <p className="opacity-70 text-sm">AI-powered image quality checks for better listings</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
