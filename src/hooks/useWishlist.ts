import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/components/auth/AuthContext';
import { useToast } from '@/hooks/use-toast';

export const useWishlist = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: wishlistIds = [], isLoading } = useQuery({
    queryKey: ['wishlist', user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from('wishlists')
        .select('listing_id')
        .eq('user_id', user.id);
      if (error) throw error;
      return data.map((w) => w.listing_id);
    },
    enabled: !!user,
  });

  const toggleMutation = useMutation({
    mutationFn: async (listingId: string) => {
      if (!user) throw new Error('Not authenticated');
      const isFav = wishlistIds.includes(listingId);
      if (isFav) {
        const { error } = await supabase
          .from('wishlists')
          .delete()
          .eq('user_id', user.id)
          .eq('listing_id', listingId);
        if (error) throw error;
        return { added: false };
      } else {
        const { error } = await supabase
          .from('wishlists')
          .insert({ user_id: user.id, listing_id: listingId });
        if (error) throw error;
        return { added: true };
      }
    },
    onSuccess: (result) => {
      queryClient.invalidateQueries({ queryKey: ['wishlist'] });
      toast({
        title: result.added ? 'Added to wishlist' : 'Removed from wishlist',
      });
    },
  });

  const isWishlisted = (listingId: string) => wishlistIds.includes(listingId);
  const toggle = (listingId: string) => toggleMutation.mutate(listingId);

  return { wishlistIds, isLoading, isWishlisted, toggle };
};
