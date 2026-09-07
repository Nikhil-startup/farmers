'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { consumerService } from '@/services/consumerService';
import { BulkDemandPost } from '@/types/consumer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/lib/utils';
import {
  Users,
  Store,
  ShieldCheck,
  TrendingUp,
  ArrowRight,
  Truck,
  Plus,
  PackageCheck,
  Sparkles,
  Layers
} from 'lucide-react';

export default function ConsumerDashboard() {
  const [demands, setDemands] = useState<BulkDemandPost[]>([]);

  useEffect(() => {
    consumerService.getBulkDemands().then(setDemands);
  }, []);

  return (
    <div className="space-y-8">
      {/* Welcome Banner - Exact match to Farmer Command Center */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Institutional Buyer Command Center</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Welcome, FreshDirect Retail 🛒</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Hyderabad Regional Procurement Hub • Direct Farm Gate Consolidations
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/consumer/marketplace">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
              <Store className="w-4 h-4 mr-1.5" />
              <span>Browse Marketplace</span>
            </Button>
          </Link>
          <Link href="/consumer/cart">
            <Button variant="secondary" size="sm">
              <span>View Active Cart</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* TODAY'S TOP SOURCING OPPORTUNITY ALERT - Mirroring Farmer Top Alert */}
      <div className="bg-gradient-to-r from-blue-950/80 to-slate-900 border-2 border-blue-500/60 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-blue-950/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/40 flex items-center justify-center font-bold text-2xl flex-shrink-0">
            🚨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-blue-500 text-white text-[10px] font-black uppercase tracking-wider">High Volume Match</span>
              <span className="text-xs font-bold text-blue-300">Shadnagar Organic Cluster</span>
            </div>
            <h2 className="text-lg font-bold text-white mt-1">Direct Hybrid Tomato Harvest (2,400 kg Grade-A) Ready for Dispatch</h2>
            <p className="text-xs text-slate-300">Procure directly at <strong>₹42.00/kg</strong> with 87% farmer realization and pre-scheduled Tata 407 Reefer.</p>
          </div>
        </div>
        <Link href="/consumer/marketplace">
          <Button variant="primary" size="sm" className="flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white">
            <span>Procure Lot</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* Direct Buyer Transparency & Savings Card - Matching FarmerImpactCard */}
      <Card variant="highlight" className="relative overflow-hidden bg-gradient-to-r from-blue-950/90 to-slate-900 border-blue-500/30">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/30 text-xs font-bold mb-3">
              <TrendingUp className="w-3.5 h-3.5" /> Direct Sourcing Cost Advantage
            </div>
            <h3 className="text-xl font-extrabold text-white">Institutional Procurement Savings vs. Mandi Brokers</h3>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              Zero middleman markup, 100% geo-traceable batch provenance, and verified cold-chain freshness score.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Terminal Mandi Rate</span>
                <span className="text-lg font-black text-slate-300">₹48.00<span className="text-xs font-normal">/kg</span></span>
              </div>
              <div className="bg-blue-950/60 rounded-xl p-3.5 border border-blue-500/40">
                <span className="text-[11px] text-blue-300 block font-bold">AgriFlow Direct Rate</span>
                <span className="text-xl font-black text-blue-400">₹42.00<span className="text-xs font-normal">/kg</span></span>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Buyer Savings</span>
                <span className="text-lg font-black text-emerald-400">₹6.00/kg</span>
                <span className="text-[10px] text-emerald-300 block">12.5% cost reduction</span>
              </div>
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800">
                <span className="text-[11px] text-slate-400 block font-medium">Net Farmer Payout</span>
                <span className="text-lg font-black text-emerald-400">87.0%</span>
                <span className="text-[10px] text-slate-400 block">Escrow auto-settled</span>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 bg-slate-900/90 rounded-xl p-4 border border-slate-800 flex flex-col justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400" /> Transparent Breakdown
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span>Total Delivered Price:</span>
                <span className="font-semibold text-white">₹42.00/kg</span>
              </div>
              <div className="flex justify-between text-emerald-400 font-semibold">
                <span>↳ Farmer Realization:</span>
                <span>₹36.50/kg</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>↳ Road Cold Logistics:</span>
                <span>₹3.50/kg</span>
              </div>
              <div className="flex justify-between text-slate-400">
                <span>↳ AgriFlow Escrow & Tech:</span>
                <span>₹2.00/kg</span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>Middlemen markups eliminated:</span>
              <span className="text-emerald-400 font-bold">100%</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Multi-Farmer Bulk Demands Pooling Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Multi-Farmer Demand Fulfillment Pools</h3>
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
            {demands.length} Active Bulk Purchase Orders
          </span>
        </div>

        <div className="space-y-4">
          {demands.map((demand) => (
            <Card key={demand.id} className="p-6 space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs font-bold text-slate-400">{demand.id}</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-500 border border-blue-500/30 text-xs font-bold">
                      {demand.status}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{demand.commodity} • {demand.requiredQuantityKg.toLocaleString()} kg</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Destination: {demand.deliveryLocation}</p>
                </div>

                <div className="text-right">
                  <span className="text-xs text-slate-400 block">Target Rate:</span>
                  <span className="text-xl font-black text-blue-600 dark:text-blue-400">{formatINR(demand.maxTargetPricePerKg)}/kg</span>
                </div>
              </div>

              {/* Allocated Farmers Pooling */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3 flex items-center gap-1.5">
                  <Users className="w-4 h-4 text-emerald-500" /> Multi-Farmer Fulfillment Allocation ({demand.allocatedFarmers.length} Regional FPOs)
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  {demand.allocatedFarmers.map((f, i) => (
                    <div key={i} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                      <span className="font-bold text-slate-900 dark:text-white block">{f.farmerName}</span>
                      <span className="text-[11px] text-slate-400 block">{f.location}</span>
                      <div className="flex justify-between items-center pt-1 font-bold text-emerald-600 dark:text-emerald-400">
                        <span>{f.allocatedKg.toLocaleString()} kg</span>
                        <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">Grade {f.grade}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-400">Consolidated road freight savings: <strong className="text-emerald-500">38% reduction vs single farm pickup</strong></span>
                <Link href="/consumer/tracking/TRK-RD-9021">
                  <Button size="sm" variant="outline">
                    <Truck className="w-4 h-4 mr-1.5" /> Track Consolidated Road Trip
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
