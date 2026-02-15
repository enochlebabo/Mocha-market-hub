
-- Create categories table
CREATE TABLE public.categories (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Categories are viewable by everyone" ON public.categories FOR SELECT USING (true);
CREATE POLICY "Only admins can modify categories" ON public.categories FOR ALL USING (false);

-- Seed default categories
INSERT INTO public.categories (name, description) VALUES
  ('Vehicles', 'Cars, trucks, motorcycles'),
  ('Electronics', 'Laptops, phones, gadgets'),
  ('Furniture', 'Home & office furniture'),
  ('Fashion', 'Clothing & accessories'),
  ('Services', 'Professional services'),
  ('Business', 'Equipment & supplies');

-- Create seller_verification table
CREATE TABLE public.seller_verification (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  verification_status TEXT NOT NULL DEFAULT 'pending' CHECK (verification_status IN ('pending', 'verified', 'rejected')),
  verification_documents JSONB DEFAULT '[]',
  government_id_url TEXT,
  social_media_link TEXT,
  mobile_verified BOOLEAN DEFAULT false,
  verification_badges JSONB DEFAULT '[]',
  verified_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
ALTER TABLE public.seller_verification ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own verification" ON public.seller_verification FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own verification" ON public.seller_verification FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own verification" ON public.seller_verification FOR UPDATE USING (auth.uid() = user_id);

-- Create business_accounts table
CREATE TABLE public.business_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  business_name TEXT NOT NULL,
  business_type TEXT NOT NULL,
  plan_type TEXT NOT NULL DEFAULT 'basic' CHECK (plan_type IN ('basic', 'premium', 'enterprise')),
  monthly_fee NUMERIC NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  plan_end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);
ALTER TABLE public.business_accounts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own business account" ON public.business_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own business account" ON public.business_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own business account" ON public.business_accounts FOR UPDATE USING (auth.uid() = user_id);

-- Create advertisements table
CREATE TABLE public.advertisements (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ad_title TEXT NOT NULL,
  ad_type TEXT NOT NULL DEFAULT 'banner',
  target_category TEXT,
  monthly_fee NUMERIC NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  click_count INTEGER NOT NULL DEFAULT 0,
  impression_count INTEGER NOT NULL DEFAULT 0,
  start_date TIMESTAMP WITH TIME ZONE DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.advertisements ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own ads" ON public.advertisements FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own ads" ON public.advertisements FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their own ads" ON public.advertisements FOR UPDATE USING (auth.uid() = user_id);

-- Create delivery_options table
CREATE TABLE public.delivery_options (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  listing_id TEXT NOT NULL,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  delivery_type TEXT NOT NULL CHECK (delivery_type IN ('pickup_only', 'seller_delivery', 'app_delivery')),
  delivery_radius_km NUMERIC,
  base_delivery_fee NUMERIC,
  per_km_rate NUMERIC,
  estimated_delivery_time TEXT,
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.delivery_options ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active delivery options" ON public.delivery_options FOR SELECT USING (is_active = true);
CREATE POLICY "Sellers can insert their delivery options" ON public.delivery_options FOR INSERT WITH CHECK (auth.uid() = seller_id);
CREATE POLICY "Sellers can update their delivery options" ON public.delivery_options FOR UPDATE USING (auth.uid() = seller_id);

-- Create transactions table
CREATE TABLE public.transactions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id TEXT NOT NULL,
  product_name TEXT NOT NULL,
  agreed_price NUMERIC NOT NULL,
  delivery_option TEXT NOT NULL DEFAULT 'pickup',
  delivery_address TEXT,
  delivery_fee NUMERIC DEFAULT 0,
  delivery_distance_km NUMERIC,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own transactions" ON public.transactions FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can insert transactions" ON public.transactions FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Transaction parties can update" ON public.transactions FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create reservations table
CREATE TABLE public.reservations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  reservation_amount NUMERIC NOT NULL,
  payment_method TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'expired', 'cancelled')),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.reservations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own reservations" ON public.reservations FOR SELECT USING (auth.uid() = buyer_id OR auth.uid() = seller_id);
CREATE POLICY "Buyers can insert reservations" ON public.reservations FOR INSERT WITH CHECK (auth.uid() = buyer_id);
CREATE POLICY "Reservation parties can update" ON public.reservations FOR UPDATE USING (auth.uid() = buyer_id OR auth.uid() = seller_id);

-- Create premium_listings table
CREATE TABLE public.premium_listings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  listing_id TEXT NOT NULL,
  premium_type TEXT NOT NULL CHECK (premium_type IN ('featured', 'top_search', 'category_highlight')),
  fee_amount NUMERIC NOT NULL DEFAULT 0,
  is_active BOOLEAN NOT NULL DEFAULT true,
  start_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  end_date TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.premium_listings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own premium listings" ON public.premium_listings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own premium listings" ON public.premium_listings FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create seller_reviews table
CREATE TABLE public.seller_reviews (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  seller_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  buyer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  transaction_id UUID REFERENCES public.transactions(id) ON DELETE CASCADE,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  review_text TEXT,
  response_time_rating INTEGER CHECK (response_time_rating >= 1 AND response_time_rating <= 5),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);
ALTER TABLE public.seller_reviews ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view seller reviews" ON public.seller_reviews FOR SELECT USING (true);
CREATE POLICY "Buyers can insert reviews" ON public.seller_reviews FOR INSERT WITH CHECK (auth.uid() = buyer_id);

-- Create RPC function for seller rating
CREATE OR REPLACE FUNCTION public.get_seller_rating(seller_user_id UUID)
RETURNS TABLE (
  average_rating NUMERIC,
  total_reviews BIGINT,
  response_time_rating NUMERIC
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    COALESCE(AVG(rating)::NUMERIC, 0) AS average_rating,
    COUNT(*) AS total_reviews,
    COALESCE(AVG(response_time_rating)::NUMERIC, 0) AS response_time_rating
  FROM public.seller_reviews
  WHERE seller_id = seller_user_id;
$$;

-- Admin policies: allow admins to view all records
-- We need a user_roles setup for proper admin access
-- For now, add select-all policies for admin dashboard tables

CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');

CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Admin policies for dashboard tables
CREATE POLICY "Admins can view all verifications" ON public.seller_verification FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update verifications" ON public.seller_verification FOR UPDATE USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all business accounts" ON public.business_accounts FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all advertisements" ON public.advertisements FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can view all transactions" ON public.transactions FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
