'use client';

import React from 'react';
import Link from 'next/link';
import { ShoppingCart, ShieldCheck, Truck, TrendingUp, Sparkles, ArrowRight, CheckCircle2, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function ConsumerLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-blue-500 selection:text-white">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 flex items-center justify-between text-slate-400">
        <Link href="/" className="hover:text-blue-400 flex items-center gap-1 font-semibold transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Ecosystem Gateway
        </Link>
        <span className="text-blue-400 font-bold">Institutional Buyer & Bulk Procurement Platform</span>
      </div>

      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black shadow-lg shadow-blue-600/30">
              🛒
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">AgriFlow <span className="text-blue-400">Buyer</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-950 text-blue-400 border border-blue-800">Farm Gate Direct</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/consumer/login">
              <Button variant="ghost" size="sm">Buyer Login</Button>
            </Link>
            <Link href="/consumer/marketplace">
              <Button variant="primary" size="sm" className="bg-blue-600 hover:bg-blue-500">
                <span>Enter Marketplace</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-900/50 border border-blue-700/60 text-blue-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> Direct Farm Gate B2B & Bulk Institutional Sourcing
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mb-6">
          Procure Grade-A fresh produce direct from verified farms with <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">transparent batch provenance</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Zero middleman adulteration. Transparent cost breakdowns showing exact farmer realization, cold-chain telemetry, and automated multi-farmer order fulfillment.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/consumer/marketplace" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-base px-8 py-4 bg-blue-600 hover:bg-blue-500 shadow-xl shadow-blue-900/40">
              <span>Browse Farm Marketplace</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/consumer/dashboard" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-base px-8 py-4">
              <span>Post Bulk Demand (5 Ton+)</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/30 flex items-center justify-center mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">100% Traceable Provenance</h3>
            <p className="text-xs text-slate-400">View farmer names, geo-tagged farm coordinates, harvest timestamps, and AI defect inspection scores.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 flex items-center justify-center mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Cold-Chain Reefer Telemetry</h3>
            <p className="text-xs text-slate-400">Track highway transit temperature (6°C optimal) with live spoilage risk indicators and simulated GPS.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center justify-center mb-4">
              <TrendingUp className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Price Transparency Receipt</h3>
            <p className="text-xs text-slate-400">Exact itemized receipts: see 87% going directly to the farmer bank account, with transparent freight & platform fees.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
