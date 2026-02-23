
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
          <p className="text-muted-foreground">Last updated: January 2024</p>
        </CardHeader>
        <CardContent className="prose max-w-none">
          <h3>Information We Collect</h3>
          <p>We collect information you provide directly to us, such as when you create an account, list an item, or contact us.</p>
          <h3>How We Use Your Information</h3>
          <p>We use the information we collect to:</p>
          <ul><li>Provide, maintain, and improve our services</li><li>Process transactions and send related information</li><li>Send technical notices and support messages</li><li>Communicate with you about products, services, and events</li></ul>
          <h3>Information Sharing</h3>
          <p>We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.</p>
          <h3>Location Data</h3>
          <p>If you choose to share your location through our chat feature, this information is only shared with the specific user you are communicating with.</p>
          <h3>Data Security</h3>
          <p>We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>
          <h3>Contact Us</h3>
          <p>If you have questions about this Privacy Policy, please contact us at privacy@mochamarket.ls</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PrivacyPolicy;
