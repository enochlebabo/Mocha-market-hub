

# Implementation Plan

This plan covers four features: a database-backed listings system, a promotional banner, an OLX-style Post Ad page, and a My Listings tab in the seller dashboard.

---

## 1. Create a `listings` table in Supabase

A new `listings` table will store all marketplace items. This is the foundation for showing real data on the homepage and in the seller dashboard.

**Columns:**
- `id` (uuid, primary key)
- `user_id` (uuid, not null) -- the seller
- `title` (text, not null)
- `description` (text)
- `price` (numeric, not null)
- `category` (text, not null)
- `condition` (text)
- `location` (text, not null)
- `status` (text, default 'active') -- active, sold, paused, deleted
- `images` (jsonb, default '[]') -- array of image URLs
- `is_featured` (boolean, default false)
- `view_count` (integer, default 0)
- `created_at`, `updated_at` (timestamptz)

**RLS Policies:**
- Anyone can SELECT active listings (`status = 'active'`)
- Authenticated users can INSERT with `user_id = auth.uid()`
- Users can UPDATE/DELETE their own listings

**Storage:** Create a `listing-images` public bucket with upload policy for authenticated users.

---

## 2. Homepage: Replace static mock data with "New Listings" section

**File: `src/components/FeaturedListings.tsx`**
- Remove the hardcoded `featuredItems` array
- Query `listings` table ordered by `created_at DESC`, limit 6, where `status = 'active'`
- Use `@tanstack/react-query` for data fetching with loading skeleton fallback
- Display images from `listing.images[0]` or a placeholder
- Change section title to "New Listings" with subtitle "Just posted by sellers across Lesotho"

---

## 3. Sticky promotional banner on homepage

**File: `src/pages/Index.tsx`**
- Add a slim banner between the header and `<HeroSection />` with text: "M500/month to feature your business -- Contact Us"
- Links to `/contact-us`
- Dismissible with an X button (state-based hide)
- Styled as a narrow accent-colored bar

---

## 4. Post Ad page (OLX-style)

**File: `src/pages/ListProduct.tsx`** (refactor existing)
- Replace the TensorFlow-based image quality checker with simple file upload (1-10 photos, no minimum of 5)
- On submit: upload images to `listing-images` bucket, then insert row into `listings` table
- Require authentication -- redirect to `/auth` if not logged in
- Use Lesotho's 10 districts as location options in a dropdown
- Add Lesotho-relevant categories from the `categories` table (with fallback hardcoded list)
- After successful submission, navigate to `/seller-dashboard`

---

## 5. Seller Dashboard: Add "My Listings" tab

**File: `src/pages/SellerDashboard.tsx`**
- Add a 4th tab: "My Listings" (with `Package` icon) as the default active tab
- Query `listings` where `user_id = auth.uid()`, ordered by `created_at DESC`

**New component: `src/components/seller/MyListings.tsx`**
- Display listings in a card grid with:
  - Thumbnail image
  - Title, price, location, category
  - Status badge (Active = green, Paused = yellow, Sold = blue)
  - "Edit" and "Delete" action buttons
- Edit opens an inline form or modal to update title, price, description, status
- Delete sets `status = 'deleted'` (soft delete)
- Empty state: "No listings yet -- Post your first ad" with CTA button to `/list-product`
- Tab grid changes from 3 to 4 columns

---

## Technical Details

### Database Migration SQL
Creates the `listings` table, RLS policies, `listing-images` storage bucket, and storage policies.

### Files Changed
| File | Action |
|---|---|
| `supabase/migrations/...` | New migration for `listings` table + storage bucket |
| `src/components/FeaturedListings.tsx` | Rewrite to fetch from Supabase |
| `src/pages/Index.tsx` | Add promotional banner |
| `src/pages/ListProduct.tsx` | Refactor to save to DB with image upload |
| `src/pages/SellerDashboard.tsx` | Add My Listings tab |
| `src/components/seller/MyListings.tsx` | New component for listing management |

### Dependencies
- No new packages needed. Uses existing `@supabase/supabase-js`, `@tanstack/react-query`, and UI components.

