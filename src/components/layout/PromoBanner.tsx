
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Megaphone } from 'lucide-react';

const PromoBanner = () => {
  const [dismissed, setDismissed] = useState(false);
  const navigate = useNavigate();

  if (dismissed) return null;

  return (
    <div className="bg-primary text-primary-foreground py-1.5 px-3 flex items-center justify-center gap-2 text-xs sm:text-sm">
      <Megaphone className="w-3.5 h-3.5 shrink-0" />
      <button
        onClick={() => navigate('/contact-us')}
        className="hover:underline font-medium"
      >
        M500/month to feature your business — Contact Us
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); setDismissed(true); }}
        className="ml-auto p-0.5 hover:bg-primary-foreground/20 rounded"
        aria-label="Dismiss"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
};

export default PromoBanner;
