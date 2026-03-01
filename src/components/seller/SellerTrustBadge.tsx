
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Shield, Star, Award, Crown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

export type SellerTier = 'none' | 'basic' | 'id_verified' | 'verified_business' | 'platinum';

interface SellerTrustBadgeProps {
  tier: SellerTier;
  trustScore?: number;
  size?: 'sm' | 'md' | 'lg';
  showScore?: boolean;
}

const tierConfig: Record<SellerTier, { label: string; icon: React.ElementType; className: string; description: string }> = {
  none: { label: 'New Seller', icon: Shield, className: 'bg-muted text-muted-foreground', description: 'This seller has not yet completed their profile.' },
  basic: { label: 'Basic', icon: Shield, className: 'bg-muted text-muted-foreground border border-border', description: 'Profile complete. Basic seller.' },
  id_verified: { label: 'ID Verified', icon: Shield, className: 'bg-blue-500/10 text-blue-600 border border-blue-500/30', description: 'Identity verified with government ID & OTP.' },
  verified_business: { label: 'Verified Business', icon: Award, className: 'bg-yellow-500/10 text-yellow-700 border border-yellow-500/30', description: 'Verified business with documentation.' },
  platinum: { label: 'Platinum Seller', icon: Crown, className: 'bg-primary/10 text-primary border border-primary/30', description: '50+ reviews with 4★+ average rating.' },
};

const SellerTrustBadge = ({ tier, trustScore, size = 'sm', showScore = false }: SellerTrustBadgeProps) => {
  const config = tierConfig[tier] || tierConfig.none;
  const Icon = config.icon;

  const sizeClasses = {
    sm: 'text-xs px-1.5 py-0.5',
    md: 'text-xs px-2 py-1',
    lg: 'text-sm px-3 py-1.5',
  };

  const iconSize = { sm: 'w-3 h-3', md: 'w-3.5 h-3.5', lg: 'w-4 h-4' };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="inline-flex items-center gap-1.5">
          <Badge className={`${config.className} ${sizeClasses[size]} gap-1 font-medium`}>
            <Icon className={iconSize[size]} />
            {config.label}
          </Badge>
          {showScore && trustScore !== undefined && (
            <span className="text-xs font-semibold text-muted-foreground">
              {trustScore}/100
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-[200px]">
        <p className="text-xs">{config.description}</p>
        {trustScore !== undefined && (
          <p className="text-xs font-semibold mt-1">Trust Score: {trustScore}/100</p>
        )}
      </TooltipContent>
    </Tooltip>
  );
};

export default SellerTrustBadge;
