import React from 'react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-sm text-muted-foreground mb-4">Last updated: Today</p>
      <div className="space-y-4 text-sm leading-6">
        <p>This demo app stores minimal data in your browser (e.g., auth token) to enable basic functionality.</p>
        <p>Location lookups and vendor links may call third-party services you select. Their data practices apply.</p>
        <p>We do not sell or share personal information. Clear your browser storage to remove saved data.</p>
        <p>Contact us to request changes to this policy for production deployments.</p>
      </div>
    </div>
  );
}


