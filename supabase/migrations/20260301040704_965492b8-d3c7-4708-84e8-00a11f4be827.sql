
-- Category-specific metadata columns on listings
ALTER TABLE public.listings
  ADD COLUMN IF NOT EXISTS subcategory text,
  ADD COLUMN IF NOT EXISTS metadata jsonb DEFAULT '{}'::jsonb;

-- metadata stores category-specific fields like:
-- Vehicles: { "mileage": 45000, "fuel_type": "petrol", "gearbox": "automatic", "year": 2018, "make": "Toyota", "model": "Corolla" }
-- Electronics: { "warranty_status": "active", "condition_grade": "A", "brand": "Apple" }
-- Furniture: { "material": "wood", "delivery_available": true, "dimensions": "2m x 1m" }

-- Premium boost columns
ALTER TABLE public.premium_listings
  ADD COLUMN IF NOT EXISTS boost_score numeric DEFAULT 0,
  ADD COLUMN IF NOT EXISTS rotation_weight numeric DEFAULT 1;

-- Seller Trust Score function
CREATE OR REPLACE FUNCTION public.get_seller_trust_score(seller_user_id uuid)
RETURNS jsonb
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  WITH verification AS (
    SELECT 
      CASE verification_status
        WHEN 'verified' THEN 30
        ELSE 0
      END AS score,
      verification_status,
      COALESCE(mobile_verified, false) AS mobile_verified,
      government_id_url IS NOT NULL AS has_govt_id,
      social_media_link IS NOT NULL AS has_social
    FROM public.seller_verification
    WHERE user_id = seller_user_id
    LIMIT 1
  ),
  reviews AS (
    SELECT
      COALESCE(AVG(rating), 0) AS avg_rating,
      COUNT(*) AS total_reviews,
      COALESCE(AVG(response_time_rating), 0) AS avg_response
    FROM public.seller_reviews
    WHERE seller_id = seller_user_id
  ),
  txns AS (
    SELECT
      COUNT(*) FILTER (WHERE status = 'completed') AS completed,
      COUNT(*) FILTER (WHERE status = 'cancelled') AS cancelled,
      COUNT(*) AS total
    FROM public.transactions
    WHERE seller_id = seller_user_id
  ),
  profile AS (
    SELECT is_complete FROM public.profiles WHERE user_id = seller_user_id LIMIT 1
  )
  SELECT jsonb_build_object(
    'trust_score', LEAST(100, GREATEST(0,
      COALESCE((SELECT score FROM verification), 0)
      + CASE WHEN (SELECT mobile_verified FROM verification) THEN 10 ELSE 0 END
      + CASE WHEN (SELECT has_govt_id FROM verification) THEN 10 ELSE 0 END
      + CASE WHEN (SELECT has_social FROM verification) THEN 5 ELSE 0 END
      + CASE WHEN (SELECT is_complete FROM profile) THEN 5 ELSE 0 END
      + LEAST(20, (SELECT avg_rating FROM reviews) * 4)
      + LEAST(10, (SELECT completed FROM txns) * 2)
      + LEAST(10, (SELECT total_reviews FROM reviews))
    )),
    'tier', CASE
      WHEN (SELECT total_reviews FROM reviews) >= 50 AND (SELECT avg_rating FROM reviews) >= 4 THEN 'platinum'
      WHEN (SELECT verification_status FROM verification) = 'verified' AND (SELECT has_govt_id FROM verification) THEN 'verified_business'
      WHEN (SELECT verification_status FROM verification) = 'verified' THEN 'id_verified'
      WHEN (SELECT is_complete FROM profile) THEN 'basic'
      ELSE 'none'
    END,
    'avg_rating', (SELECT avg_rating FROM reviews),
    'total_reviews', (SELECT total_reviews FROM reviews),
    'completed_transactions', (SELECT completed FROM txns),
    'response_time', (SELECT avg_response FROM reviews)
  );
$$;
