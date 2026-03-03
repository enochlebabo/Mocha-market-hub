
export interface VehicleMetadata {
  make?: string;
  model?: string;
  year?: number;
  mileage?: number;
  fuel_type?: 'petrol' | 'diesel' | 'hybrid' | 'electric' | 'lpg';
  gearbox?: 'automatic' | 'manual' | 'cvt' | 'semi-auto';
}

export interface ElectronicsMetadata {
  brand?: string;
  warranty_status?: 'active' | 'expired' | 'none';
  condition_grade?: 'A' | 'B' | 'C' | 'D';
  storage?: string;
}

export interface FurnitureMetadata {
  material?: 'wood' | 'metal' | 'fabric' | 'leather' | 'glass' | 'plastic' | 'mixed';
  dimensions?: string;
  delivery_available?: boolean;
}

export interface PropertyMetadata {
  bedrooms?: number;
  bathrooms?: number;
  size_sqm?: number;
  property_type?: 'house' | 'apartment' | 'townhouse' | 'land' | 'commercial';
}

export interface JobMetadata {
  job_type?: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
  experience_years?: number;
  company_name?: string;
}

export type ListingMetadata =
  | VehicleMetadata
  | ElectronicsMetadata
  | FurnitureMetadata
  | PropertyMetadata
  | JobMetadata
  | Record<string, unknown>;

/** Validates required fields per category. Returns array of error messages. */
export function validateMetadata(category: string, metadata: Record<string, unknown>): string[] {
  const errors: string[] = [];

  if (category === 'cars' || category === 'commercial-vehicles') {
    if (!metadata.make) errors.push('Vehicle make is required');
    if (!metadata.model) errors.push('Vehicle model is required');
  }

  if (category === 'electronics') {
    if (!metadata.brand) errors.push('Brand is required');
  }

  if (category === 'mobiles') {
    if (!metadata.brand) errors.push('Brand is required');
    if (!metadata.storage) errors.push('Storage capacity is required');
  }

  if (category === 'properties') {
    if (!metadata.property_type) errors.push('Property type is required');
  }

  if (category === 'jobs') {
    if (!metadata.job_type) errors.push('Job type is required');
  }

  return errors;
}
