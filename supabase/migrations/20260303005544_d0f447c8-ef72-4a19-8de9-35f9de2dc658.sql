
-- Server-side validation trigger for category-specific metadata
CREATE OR REPLACE FUNCTION public.validate_listing_metadata()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path TO 'public'
AS $$
BEGIN
  -- Vehicles require make and model
  IF NEW.category IN ('cars', 'commercial-vehicles') THEN
    IF NEW.metadata IS NULL OR NEW.metadata->>'make' IS NULL OR NEW.metadata->>'make' = '' THEN
      RAISE EXCEPTION 'Vehicle make is required for category %', NEW.category;
    END IF;
    IF NEW.metadata->>'model' IS NULL OR NEW.metadata->>'model' = '' THEN
      RAISE EXCEPTION 'Vehicle model is required for category %', NEW.category;
    END IF;
  END IF;

  -- Electronics require brand
  IF NEW.category = 'electronics' THEN
    IF NEW.metadata IS NULL OR NEW.metadata->>'brand' IS NULL OR NEW.metadata->>'brand' = '' THEN
      RAISE EXCEPTION 'Brand is required for electronics';
    END IF;
  END IF;

  -- Mobiles require brand and storage
  IF NEW.category = 'mobiles' THEN
    IF NEW.metadata IS NULL OR NEW.metadata->>'brand' IS NULL OR NEW.metadata->>'brand' = '' THEN
      RAISE EXCEPTION 'Brand is required for mobiles';
    END IF;
    IF NEW.metadata->>'storage' IS NULL OR NEW.metadata->>'storage' = '' THEN
      RAISE EXCEPTION 'Storage capacity is required for mobiles';
    END IF;
  END IF;

  -- Properties require property_type
  IF NEW.category = 'properties' THEN
    IF NEW.metadata IS NULL OR NEW.metadata->>'property_type' IS NULL OR NEW.metadata->>'property_type' = '' THEN
      RAISE EXCEPTION 'Property type is required for properties';
    END IF;
  END IF;

  -- Jobs require job_type
  IF NEW.category = 'jobs' THEN
    IF NEW.metadata IS NULL OR NEW.metadata->>'job_type' IS NULL OR NEW.metadata->>'job_type' = '' THEN
      RAISE EXCEPTION 'Job type is required for job listings';
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_listing_metadata_trigger
BEFORE INSERT OR UPDATE ON public.listings
FOR EACH ROW
EXECUTE FUNCTION public.validate_listing_metadata();
