'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/common/Button';
import { Card } from '@/components/common/Card';
import { ArrowLeft } from 'lucide-react';

export default function LogisticsLoginPage() {
  const router = useRouter();
  const [phone, setPhone] = useState('+91 98480 22341');
  const [pass, setPass] = useState('demo_password');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/logistics/dashboard');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full mx-auto">
        <Link href="/logistics" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-amber-400 transition font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Logistics Portal
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-8">
        <Card className="bg-slate-900 border-slate-800 p-8 shadow-2xl">
          <div className="text-center mb-6">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-3 font-black text-xl">
              🚚
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">Logistics Operator Login</h1>
            <p className="text-xs text-slate-400 mt-1">Manage dispatch fleets, driver assignments, and cold telemetry.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Carrier Phone / ID</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">Password</label>
              <input
                type="password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 focus:border-amber-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
              />
            </div>
            <Button type="submit" className="w-full py-3.5 mt-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
              Login to Fleet Management
            </Button>
          </form>

          <div className="mt-4 p-3 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 text-center">
            💡 <em>Pre-loaded for Deccan Reefer Transport operator (Mohammed Ismail). Click to enter.</em>
          </div>
        </Card>
      </div>

      <div className="text-center text-xs text-slate-500">
        AgriFlow AI • Road Freight Logistics Portal
      </div>
    </div>
  );
}
