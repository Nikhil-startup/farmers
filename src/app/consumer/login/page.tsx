'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { PhoneAuthForm } from '@/components/auth/PhoneAuthForm';
import { ArrowLeft } from 'lucide-react';

export default function ConsumerLoginPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between py-8 px-4 sm:px-6 lg:px-8 selection:bg-blue-500 selection:text-white">
      
      <div className="max-w-md w-full mx-auto">
        <Link href="/consumer" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-400 transition font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Buyer Portal
        </Link>
      </div>

      <div className="max-w-md w-full mx-auto my-8">
        <Card className="bg-slate-900 border-slate-800 p-8 shadow-2xl">
          
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/20 text-blue-400 border border-blue-500/40 flex items-center justify-center mx-auto mb-3 font-black text-2xl">
              🛒
            </div>
          </div>

          <PhoneAuthForm
            role="consumer"
            redirectUrl="/consumer/marketplace"
            roleTitle="Bulk Buyer / Consumer Login"
            roleSubtitle="Access verified farm gate produce batches and live freight telemetry."
            themeColor="blue"
          />

        </Card>
      </div>

      <div className="text-center text-xs text-slate-500">
        AgriFlow AI • Buyer & Institutional Procurement Platform
      </div>

    </div>
  );
}
