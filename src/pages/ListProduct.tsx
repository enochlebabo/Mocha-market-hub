
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import AppHeader from '@/components/layout/AppHeader';

const districts = [
  'Maseru', 'Leribe', 'Berea', 'Mafeteng', "Mohale's Hoek",
  'Quthing', "Qacha's Nek", 'Mokhotlong', 'Thaba-Tseka', 'Butha-Buthe'
];

const categories = [
  'Vehicles', 'Electronics', 'Furniture', 'Fashion', 'Books',
  'Sports', 'Home & Garden', 'Services', 'Jobs', 'Property', 'Other'
];

const conditions = ['New', 'Excellent', 'Good', 'Fair', 'Poor'];

const ListProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [photos, setPhotos] = useState<File[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    condition: '',
    location: ''
  });

  // Redirect if not logged in
  if (!user) {
    return (
      <div className="min-h-screen bg-background pb-14 sm:pb-0">
        <AppHeader showCategoryNav={false} />
        <div className="max-w-md mx-auto px-4 py-16 text-center space-y-4">
          <h1 className="text-2xl font-bold">Sign in to post an ad</h1>
          <p className="text-muted-foreground">You need an account to list items on MoCha Market.</p>
          <Button onClick={() => navigate('/auth')} size="lg">Sign In</Button>
        </div>
      </div>
    );
  }

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const total = photos.length + files.length;
    if (total > 10) {
      toast({ title: "Too many photos", description: "Maximum 10 photos allowed.", variant: "destructive" });
      return;
    }
    setPhotos(prev => [...prev, ...files]);
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.price || !formData.category || !formData.location) {
      toast({ title: "Missing fields", description: "Please fill all required fields.", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      // Upload images
      const imageUrls: string[] = [];
      for (const photo of photos) {
        const filePath = `${user.id}/${Date.now()}-${photo.name}`;
        const { error: uploadError } = await supabase.storage
          .from('listing-images')
          .upload(filePath, photo);
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from('listing-images')
          .getPublicUrl(filePath);
        imageUrls.push(urlData.publicUrl);
      }

      // Insert listing
      const { error } = await supabase.from('listings').insert({
        user_id: user.id,
        title: formData.title,
        description: formData.description,
        price: parseFloat(formData.price),
        category: formData.category,
        condition: formData.condition || null,
        location: formData.location,
        images: imageUrls,
      });

      if (error) throw error;

      toast({ title: "Ad posted!", description: "Your listing is now live on MoCha Market." });
      navigate('/seller-dashboard');
    } catch (err: any) {
      toast({ title: "Error", description: err.message || "Failed to post ad.", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-background pb-14 sm:pb-0">
      <AppHeader showCategoryNav={false} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <Card>
          <CardHeader>
            <CardTitle>Post Your Ad</CardTitle>
            <p className="text-muted-foreground text-sm">Add details and photos to sell your item quickly</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Photos */}
              <div>
                <label className="block text-sm font-medium mb-2">Photos (up to 10)</label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                  <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                    <Upload className="w-10 h-10 text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Tap to upload photos</p>
                    <p className="text-xs text-muted-foreground">JPG, PNG — up to 10 images</p>
                  </label>
                </div>
                {photos.length > 0 && (
                  <div className="grid grid-cols-4 gap-3 mt-3">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img src={URL.createObjectURL(photo)} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded border" />
                        <Button type="button" size="sm" variant="destructive" className="absolute -top-2 -right-2 w-6 h-6 p-0" onClick={() => removePhoto(index)}>
                          <X className="w-3 h-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Title & Price */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Title *</label>
                  <Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g., iPhone 13 Pro Max" required />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Price (LSL) *</label>
                  <Input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="0" required />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your item..." rows={3} />
              </div>

              {/* Category, Condition, Location */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Category *</label>
                  <Select onValueChange={(v) => setFormData({ ...formData, category: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {categories.map((c) => (
                        <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Condition</label>
                  <Select onValueChange={(v) => setFormData({ ...formData, condition: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {conditions.map((c) => (
                        <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">District *</label>
                  <Select onValueChange={(v) => setFormData({ ...formData, location: v })}>
                    <SelectTrigger><SelectValue placeholder="Select" /></SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d} value={d}>{d}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full" size="lg" disabled={submitting}>
                {submitting ? 'Posting...' : 'Post Ad'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ListProduct;
