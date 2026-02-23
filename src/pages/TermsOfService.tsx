
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Terms of Service</CardTitle>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3>1. Acceptance of Terms</h3>
          <p>By accessing and using MoCha Market, you accept and agree to be bound by the terms and provision of this agreement.</p>
          <h3>2. Use License</h3>
          <p>Permission is granted to temporarily use MoCha Market for personal, non-commercial transitory viewing only.</p>
          <h3>3. User Responsibilities</h3>
          <p>Users are responsible for:</p>
          <ul><li>Providing accurate information in listings</li><li>Uploading photos per product listing</li><li>Maintaining respectful communication with other users</li><li>Following local laws and regulations</li></ul>
          <h3>4. Prohibited Uses</h3>
          <p>You may not use our service for any illegal or unauthorized purpose nor may you, in the use of the service, violate any laws in your jurisdiction.</p>
          <h3>5. Limitation of Liability</h3>
          <p>MoCha Market acts as a platform connecting buyers and sellers. We are not responsible for the quality, safety, or legality of items listed.</p>
          <h3>6. Contact Information</h3>
          <p>Questions about the Terms of Service should be sent to us at legal@mochamarket.ls</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default TermsOfService;
