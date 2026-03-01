
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, CheckCircle, AlertTriangle } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import ImageQualityChecker from '@/components/upload/ImageQualityChecker';
import CategoryFields from '@/components/listing/CategoryFields';
import { categories as allCategories } from '@/data/categories';
import { useAuth } from '@/components/auth/AuthContext';
import { supabase } from '@/integrations/supabase/client';

const ListProduct = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, loading: authLoading } = useAuth();
  const [profileChecked, setProfileChecked] = useState(false);
  const [photos, setPhotos] = useState<File[]>([]);
  const [pendingPhotos, setPendingPhotos] = useState<File[]>([]);
  const [rejectedPhotos, setRejectedPhotos] = useState<{ file: File; issues: string[] }[]>([]);
  const [formData, setFormData] = useState({ title: '', description: '', price: '', category: '', subcategory: '', condition: '', location: '' });

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      navigate('/auth');
      return;
    }
    supabase
      .from('profiles')
      .select('is_complete')
      .eq('user_id', user.id)
      .maybeSingle()
      .then(({ data }) => {
        if (!data || !data.is_complete) {
          navigate('/complete-profile?redirect=/list-product');
        } else {
          setProfileChecked(true);
        }
      });
  }, [user, authLoading, navigate]);

  const conditions = ['New', 'Excellent', 'Good', 'Fair', 'Poor'];
  const selectedCat = allCategories.find(c => c.slug === formData.category);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (photos.length + pendingPhotos.length + files.length > 30) { toast({ title: "Too many photos", description: "Maximum 30 photos allowed.", variant: "destructive" }); return; }
    setPendingPhotos(prev => [...prev, ...files]);
  };

  const handlePhotoAccept = (file: File) => { setPhotos(prev => [...prev, file]); setPendingPhotos(prev => prev.filter(f => f !== file)); toast({ title: "Photo approved!" }); };
  const handlePhotoReject = (file: File, issues: string[]) => { setRejectedPhotos(prev => [...prev, { file, issues }]); setPendingPhotos(prev => prev.filter(f => f !== file)); };
  const removePhoto = (index: number) => { setPhotos(prev => prev.filter((_, i) => i !== index)); };
  const removeRejectedPhoto = (index: number) => { setRejectedPhotos(prev => prev.filter((_, i) => i !== index)); };
  const retryRejectedPhoto = (file: File) => { setRejectedPhotos(prev => prev.filter(r => r.file !== file)); setPendingPhotos(prev => [...prev, file]); };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photos.length < 5) { toast({ title: "Not enough photos", description: "Please upload at least 5 high-quality photos.", variant: "destructive" }); return; }
    if (pendingPhotos.length > 0) { toast({ title: "Photos still processing", variant: "destructive" }); return; }
    toast({ title: "Product listed successfully!", description: "Your product has been added to the marketplace." });
    navigate('/products');
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => { setFormData({ ...formData, [e.target.name]: e.target.value }); };

  if (authLoading || !profileChecked) {
    return <div className="flex justify-center py-20 text-muted-foreground">Loading...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Create New Listing</CardTitle>
          <p className="text-muted-foreground">Fill in the details to list your product</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Photos (Required: 5-30 high-quality photos)</label>
              <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                <input type="file" multiple accept="image/*" onChange={handlePhotoUpload} className="hidden" id="photo-upload" />
                <label htmlFor="photo-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium">Upload Photos</p>
                  <p className="text-sm text-muted-foreground">Choose high-quality images</p>
                </label>
              </div>
              <div className="mt-2 text-sm text-muted-foreground flex items-center justify-between">
                <span>Photos: {photos.length} approved, {pendingPhotos.length} processing, {rejectedPhotos.length} rejected</span>
                <span className="text-green-600 font-medium">Minimum 5 required</span>
              </div>

              {pendingPhotos.length > 0 && (
                <div className="mt-4 space-y-3">
                  <h4 className="text-sm font-medium">Processing Photos:</h4>
                  {pendingPhotos.map((photo, index) => (<ImageQualityChecker key={`pending-${index}`} file={photo} existingImages={photos} onAccept={handlePhotoAccept} onReject={handlePhotoReject} />))}
                </div>
              )}

              {photos.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center space-x-2 mb-3"><CheckCircle className="w-4 h-4 text-green-500" /><h4 className="text-sm font-medium text-green-700">Approved Photos:</h4></div>
                  <div className="grid grid-cols-4 gap-4">
                    {photos.map((photo, index) => (
                      <div key={index} className="relative">
                        <img src={URL.createObjectURL(photo)} alt={`Upload ${index + 1}`} className="w-full h-20 object-cover rounded border-2 border-green-200" />
                        <Button type="button" size="sm" variant="destructive" className="absolute -top-2 -right-2 w-6 h-6 p-0" onClick={() => removePhoto(index)}><X className="w-3 h-3" /></Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {rejectedPhotos.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center space-x-2 mb-3"><AlertTriangle className="w-4 h-4 text-red-500" /><h4 className="text-sm font-medium text-red-700">Photos Need Improvement:</h4></div>
                  <div className="space-y-3">
                    {rejectedPhotos.map((rejected, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <img src={URL.createObjectURL(rejected.file)} alt={`Rejected ${index + 1}`} className="w-16 h-16 object-cover rounded" />
                        <div className="flex-1"><p className="text-sm font-medium text-red-800">{rejected.file.name}</p><ul className="text-xs text-red-600 mt-1">{rejected.issues.map((issue, i) => <li key={i}>• {issue}</li>)}</ul></div>
                        <div className="flex space-x-2">
                          <Button type="button" size="sm" variant="outline" onClick={() => retryRejectedPhoto(rejected.file)} className="text-blue-600 border-blue-300">Retry</Button>
                          <Button type="button" size="sm" variant="outline" onClick={() => removeRejectedPhoto(index)} className="text-red-600 border-red-300">Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-2">Title</label><Input name="title" value={formData.title} onChange={handleChange} placeholder="e.g., iPhone 12 Pro Max" required /></div>
              <div><label className="block text-sm font-medium mb-2">Price (LSL)</label><Input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="0" required /></div>
            </div>

            <div><label className="block text-sm font-medium mb-2">Description</label><Textarea name="description" value={formData.description} onChange={handleChange} placeholder="Describe your product in detail..." rows={4} required /></div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Category</label>
                <Select onValueChange={(value) => setFormData({...formData, category: value, subcategory: ''})}>
                  <SelectTrigger><SelectValue placeholder="Select category" /></SelectTrigger>
                  <SelectContent>{allCategories.map(c => <SelectItem key={c.slug} value={c.slug}>{c.name}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              {selectedCat && selectedCat.subs.length > 0 && (
                <div>
                  <label className="block text-sm font-medium mb-2">Subcategory</label>
                  <Select onValueChange={(value) => setFormData({...formData, subcategory: value})}>
                    <SelectTrigger><SelectValue placeholder="Select subcategory" /></SelectTrigger>
                    <SelectContent>{selectedCat.subs.map(s => <SelectItem key={s.slug} value={s.slug}>{s.name}</SelectItem>)}</SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><label className="block text-sm font-medium mb-2">Condition</label><Select onValueChange={(value) => setFormData({...formData, condition: value})}><SelectTrigger><SelectValue placeholder="Select condition" /></SelectTrigger><SelectContent>{conditions.map(c => <SelectItem key={c} value={c.toLowerCase()}>{c}</SelectItem>)}</SelectContent></Select></div>
              <div><label className="block text-sm font-medium mb-2">Location</label><Input name="location" value={formData.location} onChange={handleChange} placeholder="e.g., Maseru" required /></div>
            </div>

            <Button type="submit" className="w-full" size="lg">List Product</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default ListProduct;
