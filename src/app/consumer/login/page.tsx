'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ArrowLeft } from 'lucide-react';

export default function ConsumerLoginPage() {
  const router = useRouter();
  const [identifier, setIdentifier] = useState('buyer@freshdirect.in');
  const [password, setPassword] = useState('demo_password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/consumer/marketplace');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <Link href="/consumer" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Buyer Portal
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-8">
        <Card className="bg-slate-900 border-slate-800 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto mb-3 font-black text-xl">
              🛒
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Bulk Buyer / Consumer Login</h1>
            <p className="text-xs text-slate-400 mt-1">Access verified direct farm listings and track reefer freight.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Buyer Email or Phone</label>
              <input
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <Button type="submit" className="w-full py-3.5 mt-2 bg-blue-600 hover:bg-blue-500">
              Login to Buyer Platform
            </Button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 text-center">
            💡 <em>Demo pre-loaded for FreshDirect Retail buyer account. Click Login to proceed.</em>
          </div>
        </Card>
      </div>

      <div className="text-center text-xs text-slate-500">
        AgriFlow AI • Buyer & Institutional Platform
      </div>
    </div>
  );
}
