
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Shield, Star, MessageSquare, ShoppingBag, CheckCircle } from 'lucide-react';
import SellerTrustBadge, { type SellerTier } from './SellerTrustBadge';

interface TrustScoreData {
  trust_score: number;
  tier: SellerTier;
  avg_rating: number;
  total_reviews: number;
  completed_transactions: number;
  response_time: number;
}

interface TrustScoreCardProps {
  data: TrustScoreData;
}

const TrustScoreCard = ({ data }: TrustScoreCardProps) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Highly Reliable';
    if (score >= 60) return 'Reliable';
    if (score >= 40) return 'Moderate';
    return 'Building Trust';
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-semibold flex items-center gap-2">
          <Shield className="w-4 h-4 text-primary" />
          Seller Trust Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Score display */}
        <div className="text-center space-y-2">
          <div className={`text-4xl font-bold ${getScoreColor(data.trust_score)}`}>
            {data.trust_score}
            <span className="text-lg text-muted-foreground">/100</span>
          </div>
          <p className={`text-sm font-medium ${getScoreColor(data.trust_score)}`}>
            ⭐ {getScoreLabel(data.trust_score)}
          </p>
          <SellerTrustBadge tier={data.tier} size="md" />
        </div>

        <Progress value={data.trust_score} className="h-2" />

        {/* Breakdown */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <div className="flex items-center gap-2 text-xs">
            <Star className="w-3.5 h-3.5 text-yellow-500" />
            <div>
              <p className="font-medium">{Number(data.avg_rating).toFixed(1)} ★</p>
              <p className="text-muted-foreground">Avg Rating</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <MessageSquare className="w-3.5 h-3.5 text-blue-500" />
            <div>
              <p className="font-medium">{data.total_reviews}</p>
              <p className="text-muted-foreground">Reviews</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <ShoppingBag className="w-3.5 h-3.5 text-green-500" />
            <div>
              <p className="font-medium">{data.completed_transactions}</p>
              <p className="text-muted-foreground">Sales</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs">
            <CheckCircle className="w-3.5 h-3.5 text-primary" />
            <div>
              <p className="font-medium">{Number(data.response_time).toFixed(1)} ★</p>
              <p className="text-muted-foreground">Response</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrustScoreCard;
