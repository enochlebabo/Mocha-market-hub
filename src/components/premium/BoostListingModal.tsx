
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Rocket, Zap, Crown, Check } from 'lucide-react';
import { toast } from 'sonner';

interface BoostListingModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  listingId?: string;
  listingTitle?: string;
}

const boostTiers = [
  {
    id: 'basic',
    name: '3-Day Boost',
    price: 'M 20',
    days: 3,
    scoreBonus: 20,
    icon: Zap,
    features: ['+20% ranking boost', 'Category highlight', '3-day duration'],
    popular: false,
  },
  {
    id: 'standard',
    name: '7-Day Boost',
    price: 'M 35',
    days: 7,
    scoreBonus: 30,
    icon: Rocket,
    features: ['+30% ranking boost', 'Category highlight', 'Homepage rotation', '7-day duration'],
    popular: true,
  },
  {
    id: 'premium',
    name: '14-Day Boost',
    price: 'M 50',
    days: 14,
    scoreBonus: 40,
    icon: Crown,
    features: ['+40% ranking boost', 'Top of category', 'Homepage featured', '10km radius boost', '14-day duration'],
    popular: false,
  },
];

const BoostListingModal = ({ open, onOpenChange, listingTitle }: BoostListingModalProps) => {
  const [selected, setSelected] = useState('standard');

  const handleBoost = () => {
    const tier = boostTiers.find(t => t.id === selected);
    toast.success(`${tier?.name} activated for "${listingTitle || 'your listing'}"!`);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-primary" />
            Boost Your Listing
          </DialogTitle>
          <DialogDescription>
            Increase visibility and get more buyers for your listing.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 py-2">
          {boostTiers.map((tier) => (
            <Card
              key={tier.id}
              className={`cursor-pointer transition-all ${selected === tier.id ? 'ring-2 ring-primary' : 'hover:border-primary/50'}`}
              onClick={() => setSelected(tier.id)}
            >
              <CardContent className="p-4 flex items-start gap-3">
                <div className={`rounded-full p-2 ${selected === tier.id ? 'bg-primary/10' : 'bg-muted'}`}>
                  <tier.icon className={`w-5 h-5 ${selected === tier.id ? 'text-primary' : 'text-muted-foreground'}`} />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{tier.name}</h4>
                    {tier.popular && <Badge className="bg-primary text-primary-foreground text-xs">Popular</Badge>}
                  </div>
                  <ul className="text-xs text-muted-foreground space-y-0.5">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-center gap-1">
                        <Check className="w-3 h-3 text-green-500" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <span className="text-lg font-bold text-primary">{tier.price}</span>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="w-full" size="lg" onClick={handleBoost}>
          <Rocket className="w-4 h-4 mr-2" />
          Activate Boost
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default BoostListingModal;
