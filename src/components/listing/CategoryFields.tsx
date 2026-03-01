
import React from 'react';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface CategoryFieldsProps {
  category: string;
  metadata: Record<string, any>;
  onChange: (metadata: Record<string, any>) => void;
}

const CategoryFields = ({ category, metadata, onChange }: CategoryFieldsProps) => {
  const update = (key: string, value: any) => onChange({ ...metadata, [key]: value });

  if (category === 'cars' || category === 'commercial-vehicles') {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Vehicle Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Make</Label>
            <Input placeholder="e.g. Toyota" value={metadata.make || ''} onChange={(e) => update('make', e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Model</Label>
            <Input placeholder="e.g. Corolla" value={metadata.model || ''} onChange={(e) => update('model', e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Year</Label>
            <Input type="number" placeholder="e.g. 2018" value={metadata.year || ''} onChange={(e) => update('year', parseInt(e.target.value) || '')} />
          </div>
          <div>
            <Label className="text-xs">Mileage (km)</Label>
            <Input type="number" placeholder="e.g. 45000" value={metadata.mileage || ''} onChange={(e) => update('mileage', parseInt(e.target.value) || '')} />
          </div>
          <div>
            <Label className="text-xs">Fuel Type</Label>
            <Select value={metadata.fuel_type || ''} onValueChange={(v) => update('fuel_type', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Petrol', 'Diesel', 'Hybrid', 'Electric', 'LPG'].map(f => <SelectItem key={f} value={f.toLowerCase()}>{f}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Gearbox</Label>
            <Select value={metadata.gearbox || ''} onValueChange={(v) => update('gearbox', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Automatic', 'Manual', 'CVT', 'Semi-Auto'].map(g => <SelectItem key={g} value={g.toLowerCase()}>{g}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'electronics' || category === 'mobiles') {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">
          {category === 'mobiles' ? 'Phone Details' : 'Electronics Details'}
        </h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Brand</Label>
            <Input placeholder="e.g. Apple" value={metadata.brand || ''} onChange={(e) => update('brand', e.target.value)} />
          </div>
          <div>
            <Label className="text-xs">Warranty Status</Label>
            <Select value={metadata.warranty_status || ''} onValueChange={(v) => update('warranty_status', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Active', 'Expired', 'None'].map(w => <SelectItem key={w} value={w.toLowerCase()}>{w}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Condition Grade</Label>
            <Select value={metadata.condition_grade || ''} onValueChange={(v) => update('condition_grade', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {[{ v: 'A', l: 'A – Like New' }, { v: 'B', l: 'B – Minor Wear' }, { v: 'C', l: 'C – Visible Wear' }, { v: 'D', l: 'D – Heavy Wear' }].map(g => (
                  <SelectItem key={g.v} value={g.v}>{g.l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {category === 'mobiles' && (
            <div>
              <Label className="text-xs">Storage (GB)</Label>
              <Select value={metadata.storage || ''} onValueChange={(v) => update('storage', v)}>
                <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                <SelectContent>
                  {['32', '64', '128', '256', '512', '1024'].map(s => <SelectItem key={s} value={s}>{s} GB</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (category === 'furniture') {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Furniture Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Material</Label>
            <Select value={metadata.material || ''} onValueChange={(v) => update('material', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Wood', 'Metal', 'Fabric', 'Leather', 'Glass', 'Plastic', 'Mixed'].map(m => <SelectItem key={m} value={m.toLowerCase()}>{m}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Dimensions</Label>
            <Input placeholder="e.g. 2m x 1m" value={metadata.dimensions || ''} onChange={(e) => update('dimensions', e.target.value)} />
          </div>
          <div className="col-span-2 flex items-center gap-2">
            <Checkbox
              id="delivery_available"
              checked={metadata.delivery_available || false}
              onCheckedChange={(v) => update('delivery_available', !!v)}
            />
            <Label htmlFor="delivery_available" className="text-xs">Delivery available</Label>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'properties') {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Property Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Bedrooms</Label>
            <Input type="number" placeholder="e.g. 3" value={metadata.bedrooms || ''} onChange={(e) => update('bedrooms', parseInt(e.target.value) || '')} />
          </div>
          <div>
            <Label className="text-xs">Bathrooms</Label>
            <Input type="number" placeholder="e.g. 2" value={metadata.bathrooms || ''} onChange={(e) => update('bathrooms', parseInt(e.target.value) || '')} />
          </div>
          <div>
            <Label className="text-xs">Size (sqm)</Label>
            <Input type="number" placeholder="e.g. 120" value={metadata.size_sqm || ''} onChange={(e) => update('size_sqm', parseInt(e.target.value) || '')} />
          </div>
          <div>
            <Label className="text-xs">Property Type</Label>
            <Select value={metadata.property_type || ''} onValueChange={(v) => update('property_type', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['House', 'Apartment', 'Townhouse', 'Land', 'Commercial'].map(p => <SelectItem key={p} value={p.toLowerCase()}>{p}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    );
  }

  if (category === 'jobs') {
    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold text-foreground">Job Details</h4>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label className="text-xs">Job Type</Label>
            <Select value={metadata.job_type || ''} onValueChange={(v) => update('job_type', v)}>
              <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
              <SelectContent>
                {['Full-time', 'Part-time', 'Contract', 'Freelance', 'Internship'].map(j => <SelectItem key={j} value={j.toLowerCase()}>{j}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label className="text-xs">Experience (years)</Label>
            <Input type="number" placeholder="e.g. 2" value={metadata.experience_years || ''} onChange={(e) => update('experience_years', parseInt(e.target.value) || '')} />
          </div>
          <div className="col-span-2">
            <Label className="text-xs">Company Name</Label>
            <Input placeholder="e.g. MoCha Holdings" value={metadata.company_name || ''} onChange={(e) => update('company_name', e.target.value)} />
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default CategoryFields;
