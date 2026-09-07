'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Tractor, ShoppingCart, Truck, ShieldCheck, TrendingUp, Sparkles, Network, RotateCcw } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-emerald-500 selection:text-white">
      {/* Top Notification Bar */}
      <div className="bg-emerald-950/80 border-b border-emerald-800/40 text-xs py-2 px-4 text-center text-emerald-300 font-medium">
        ✨ Smart India Hackathon Live Ecosystem: <span className="text-white font-semibold">AgriFlow AI Demand, Direct Buyer & Cold Logistics Network</span>
      </div>

      {/* Main Header */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 via-blue-600 to-amber-500 flex items-center justify-center text-white font-black shadow-lg">
              🌾
            </div>
            <div>
              <span className="font-extrabold text-xl tracking-tight text-white">AgriFlow<span className="text-emerald-400">AI</span></span>
              <span className="hidden sm:inline-block ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-900 text-slate-300 border border-slate-700">Unified Gateway</span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Link
              href="/farmer"
              className="text-xs font-bold text-emerald-400 hover:text-emerald-300 px-3 py-1.5 rounded-lg hover:bg-emerald-950/40 transition"
            >
              Farmer
            </Link>
            <Link
              href="/consumer"
              className="text-xs font-bold text-blue-400 hover:text-blue-300 px-3 py-1.5 rounded-lg hover:bg-blue-950/40 transition"
            >
              Buyer / Consumer
            </Link>
            <Link
              href="/logistics"
              className="text-xs font-bold text-amber-400 hover:text-amber-300 px-3 py-1.5 rounded-lg hover:bg-amber-950/40 transition"
            >
              Logistics Fleet
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 flex flex-col justify-center">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300 text-xs font-semibold mb-6">
            <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> Direct Demand Discovery • Zero Middleman Waste • Cold-Chain Road Freight
          </div>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight mb-6">
            One Unified Platform Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-blue-400 to-amber-300">Farmers, Bulk Buyers & Logistics</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            Choose your portal below. AgriFlow AI integrates computer-vision produce grading, direct farm-gate procurement, and optimized road logistics.
          </p>
        </div>

        {/* 3 Main Integrated Portals Gateway */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          
          {/* 1. Farmer Portal Card */}
          <div className="relative group rounded-3xl bg-gradient-to-b from-emerald-950/40 via-slate-900 to-slate-900 border-2 border-emerald-500/60 p-8 flex flex-col justify-between transition-all duration-300 hover:border-emerald-400 hover:shadow-2xl hover:shadow-emerald-950/40 hover:-translate-y-1">
            <div className="absolute -top-3 right-6 bg-emerald-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Active Portal
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                <Tractor className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Farmer / FPO Portal</h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                List harvests, run AI quality grading, compare mandi prices, pool produce with neighbor farmers, and track outgoing road dispatches.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>AI Quality Inspection (A, A-, B)</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Mandi Price Arbitrage & Demand Heatmap</span>
                </li>
                <li className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span>Multi-Farmer Group Produce Pooling</span>
                </li>
              </ul>
            </div>

            <Link
              href="/farmer"
              className="w-full inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-emerald-950/40"
            >
              <span>Enter Farmer Experience</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* 2. Consumer / Bulk Buyer Portal */}
          <div className="relative group rounded-3xl bg-gradient-to-b from-blue-950/40 via-slate-900 to-slate-900 border-2 border-blue-500/60 p-8 flex flex-col justify-between transition-all duration-300 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-950/40 hover:-translate-y-1">
            <div className="absolute -top-3 right-6 bg-blue-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Active Portal
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Buyer / Consumer Portal</h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Direct farm-gate B2B procurement, batch provenance verification, transparent receipts (87% to farmer), and smart escrow protection.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Farm Gate Traceability & Batch ID</span>
                </li>
                <li className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Price Transparency & Impact Receipt</span>
                </li>
                <li className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-blue-400 flex-shrink-0" />
                  <span>Post 5-Ton Bulk Procurement Demand</span>
                </li>
              </ul>
            </div>

            <Link
              href="/consumer"
              className="w-full inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-blue-950/40"
            >
              <span>Enter Buyer Experience</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          {/* 3. Logistics Operator Portal */}
          <div className="relative group rounded-3xl bg-gradient-to-b from-amber-950/40 via-slate-900 to-slate-900 border-2 border-amber-500/60 p-8 flex flex-col justify-between transition-all duration-300 hover:border-amber-400 hover:shadow-2xl hover:shadow-amber-950/40 hover:-translate-y-1">
            <div className="absolute -top-3 right-6 bg-amber-500 text-slate-950 text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider shadow">
              Active Portal
            </div>

            <div>
              <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6 group-hover:scale-110 transition-transform">
                <Truck className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Logistics Operator Portal</h2>
              <p className="text-xs text-slate-300 mb-6 leading-relaxed">
                Fleet dispatch for Tata Ace, Tata 407 Reefer & Mahindra Bolero carriers with live cold-chain climate telemetry and return-load matching.
              </p>

              <ul className="space-y-2.5 text-xs text-slate-300 mb-8">
                <li className="flex items-center gap-2">
                  <RotateCcw className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Return Load AI Match (+₹2,800/trip)</span>
                </li>
                <li className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Live 6°C Cold-Chain & Spoilage Window</span>
                </li>
                <li className="flex items-center gap-2">
                  <Network className="w-4 h-4 text-amber-400 flex-shrink-0" />
                  <span>Multi-Farm Consolidation Road Route</span>
                </li>
              </ul>
            </div>

            <Link
              href="/logistics"
              className="w-full inline-flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3.5 px-4 rounded-xl transition shadow-lg shadow-amber-950/40"
            >
              <span>Enter Fleet Experience</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

        </div>

        {/* SIH Scenario Highlight Banner */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <div className="w-14 h-14 rounded-2xl bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-bold text-2xl border border-emerald-500/30 flex-shrink-0">
              💡
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black uppercase">Live Case Study</span>
                <span className="text-xs font-bold text-emerald-400">Hyderabad Tomato Value Chain</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white">Shadnagar FPO → Bowenpally Hub (5,000 kg Bulk Order)</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-3xl">
                Farmer earns <strong className="text-emerald-400">+₹6.00/kg (+16.7%)</strong> over traditional mandi; Buyer saves on commission; Carrier avoids 142 km empty return haul.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 flex-shrink-0">
            <Link href="/farmer" className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition">
              Farmer View
            </Link>
            <Link href="/consumer" className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition">
              Buyer View
            </Link>
            <Link href="/logistics" className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 px-4 rounded-xl transition">
              Logistics View
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-center text-xs text-slate-400">
        <p>© 2026 AgriFlow AI Ecosystem. Built for Smart India Hackathon. Fully Integrated Multi-Portal Platform.</p>
      </footer>
    </div>
  );
}
