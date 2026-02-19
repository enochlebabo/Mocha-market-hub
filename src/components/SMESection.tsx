import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Briefcase } from 'lucide-react';

const SMESection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-12 sm:py-16 bg-primary text-primary-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <Briefcase className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 sm:mb-6 opacity-80" />
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">
          Empowering Lesotho's Economy
        </h2>
        <p className="text-base sm:text-xl mb-6 sm:mb-8 opacity-90 max-w-3xl mx-auto">
          Supporting SMEs and promoting digital transformation across the Kingdom of Lesotho.
          From Maseru to the highlands, MoCha Market connects buyers and sellers nationwide.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
          <Button size="lg" variant="secondary" onClick={() => navigate('/list-product')} className="w-full sm:w-auto">
            List Your Business
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="w-full sm:w-auto text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            onClick={() => navigate('/contact-us')}
          >
            View Ad Packages
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SMESection;
