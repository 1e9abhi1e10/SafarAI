import React from 'react';

export default function TermsPage() {
  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Terms and Conditions</h1>
      <p className="text-sm text-muted-foreground mb-4">Last updated: Today</p>
      <div className="space-y-4 text-sm leading-6">
        <p>These mock Terms govern your use of this demo application. By accessing or using it, you agree to be bound by these Terms.</p>
        <p>All itinerary data is illustrative and may not reflect real-world availability, pricing, or schedules.</p>
        <p>We are not responsible for third-party websites linked for flights or hotels. Review their policies before booking.</p>
        <p>Use of this demo is at your own risk. No warranties are provided.</p>
      </div>
    </div>
  );
}


