import React, { useState } from 'react';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sent, setSent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      alert('Please complete all fields');
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen p-6 flex items-start justify-center"
      style={{
        backgroundImage: [
          'radial-gradient(40rem 40rem at 15% 10%, rgba(59, 130, 246, 0.20), transparent 50%)',
          'radial-gradient(35rem 35rem at 85% 15%, rgba(244, 114, 182, 0.20), transparent 55%)',
          'linear-gradient(135deg, #f8fafc 0%, #fff7ed 100%)'
        ].join(', '),
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-3xl bg-white/90 rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold mb-1">Contact us</h1>
        <p className="text-sm text-muted-foreground mb-6">We usually respond within 1–2 business days.</p>
        {sent ? (
          <div className="p-4 rounded border border-emerald-200 bg-emerald-50 text-emerald-800 text-sm">
            Thanks {name}! Your message has been sent.
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
              <input id="name" value={name} onChange={(e)=>setName(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="Your name" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
              <input id="email" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} className="w-full border rounded px-3 py-2" placeholder="you@example.com" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1" htmlFor="message">Message</label>
              <textarea id="message" value={message} onChange={(e)=>setMessage(e.target.value)} className="w-full border rounded px-3 py-2 h-32" placeholder="How can we help?" />
            </div>
            <div className="flex justify-end">
              <button type="submit" className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700 text-white">Send</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}


