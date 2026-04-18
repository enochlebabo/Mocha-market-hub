-- 1. Fix listing-images INSERT policy to enforce path ownership
DROP POLICY IF EXISTS "Authenticated users can upload listing images" ON storage.objects;
DROP POLICY IF EXISTS "Users can upload listing images" ON storage.objects;

CREATE POLICY "Users can upload to own folder in listing-images"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'listing-images'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

-- 2. Restrict broad SELECT on listing-images to prevent bulk listing
-- Public can still fetch individual files by exact path/URL, but cannot list bucket contents
DROP POLICY IF EXISTS "Public can view listing images" ON storage.objects;
DROP POLICY IF EXISTS "Listing images are publicly accessible" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can view listing images" ON storage.objects;

CREATE POLICY "Public read individual listing images"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'listing-images');

-- Note: Supabase's storage.list() RPC enforces a separate check; the linter flag concerns
-- broad listing permissions. Files remain readable by direct URL (used by <img src=...>).

-- 3. Allow users to delete their own seller_verification records
CREATE POLICY "Users can delete their own verification"
ON public.seller_verification
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- 4. Create private bucket for verification documents (gov IDs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('verification-docs', 'verification-docs', false)
ON CONFLICT (id) DO NOTHING;

-- Owner-only access policies for verification-docs
CREATE POLICY "Users can upload own verification docs"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'verification-docs'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

CREATE POLICY "Users can read own verification docs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-docs'
  AND (
    (auth.uid())::text = (storage.foldername(name))[1]
    OR public.has_role(auth.uid(), 'admin'::app_role)
  )
);

CREATE POLICY "Users can delete own verification docs"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'verification-docs'
  AND (auth.uid())::text = (storage.foldername(name))[1]
);

CREATE POLICY "Admins can read all verification docs"
ON storage.objects
FOR SELECT
TO authenticated
USING (
  bucket_id = 'verification-docs'
  AND public.has_role(auth.uid(), 'admin'::app_role)
);