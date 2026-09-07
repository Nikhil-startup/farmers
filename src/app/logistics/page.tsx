'use client';

import React from 'react';
import Link from 'next/link';
import { Truck, RotateCcw, Thermometer, ShieldCheck, Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/common/Button';

export default function LogisticsLandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-amber-500 selection:text-slate-950">
      <div className="bg-slate-900 border-b border-slate-800 text-xs py-2 px-4 flex items-center justify-between text-slate-400">
        <Link href="/" className="hover:text-amber-400 flex items-center gap-1 font-semibold transition">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Ecosystem Gateway
        </Link>
        <span className="text-amber-400 font-bold">Carrier & Road Fleet Platform</span>
      </div>

      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-500/30">
              🚚
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">AgriFlow <span className="text-amber-400">Logistics</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-950 text-amber-400 border border-amber-800">Fleet Dispatch</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/logistics/login">
              <Button variant="ghost" size="sm">Carrier Login</Button>
            </Link>
            <Link href="/logistics/dashboard">
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
                <span>Enter Fleet Portal</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 flex flex-col items-center text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-900/50 border border-amber-700/60 text-amber-300 text-xs font-semibold mb-6">
          <Sparkles className="w-3.5 h-3.5" /> For Road Transport Operators, Reefer Trucks & Fleet Owners
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight max-w-4xl mb-6">
          Maximize vehicle utilization with automated load consolidation and <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-300">zero empty return hauls</span>.
        </h1>

        <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Manage Tata Ace, Tata 407 Reefer & Mahindra Bolero freight fleets. Monitor real-time cold-chain temperature telemetry and claim AI-matched return loads.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <Link href="/logistics/dashboard" className="w-full sm:w-auto">
            <Button size="lg" className="w-full text-base px-8 py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold shadow-xl shadow-amber-900/40">
              <span>Open Fleet Command Center</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </Link>
          <Link href="/logistics/return-loads" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full text-base px-8 py-4">
              <span>View Return Loads (Earn +₹2,800)</span>
            </Button>
          </Link>
        </div>
      </section>

      {/* Highlights */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
              <RotateCcw className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Return Load Matching</h3>
            <p className="text-xs text-slate-400">Never drive back empty. Match returning reefers with fertilizer, seeds, and retail dry freight to add +₹2,800/trip.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
              <Thermometer className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Live Cold-Chain Telemetry</h3>
            <p className="text-xs text-slate-400">Maintain Reefer cargo at optimal 6°C. Live humidity and spoilage window telemetry eliminates transit damage disputes.</p>
          </div>
          <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/30 flex items-center justify-center mb-4">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-white mb-2">Multi-Stop Farm Gate Pooling</h3>
            <p className="text-xs text-slate-400">Optimized route sequence for collecting from multiple neighbor FPOs in a single corridor run.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
