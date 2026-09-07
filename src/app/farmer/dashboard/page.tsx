'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import { farmerService } from '@/services/farmerService';
import { trackingService } from '@/services/trackingService';
import { aiService } from '@/services/aiService';
import { Produce, Order, AIRecommendation } from '@/types/farmer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { StatusBadge } from '@/components/common/StatusBadge';
import {
  TrendingUp,
  Sprout,
  Plus,
  ArrowRight,
  Truck,
  MapPin,
  Sparkles,
  BarChart3,
  PackageCheck,
  CheckCircle2
} from 'lucide-react';
import { formatINR } from '@/lib/utils';

export default function FarmerDashboard() {
  const { user } = useAuth();
  const [produceList, setProduceList] = useState<Produce[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [recommendations, setRecommendations] = useState<AIRecommendation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      farmerService.getProduceList(),
      trackingService.getOrders(),
      aiService.getRecommendations(),
    ]).then(([prods, ords, recs]) => {
      setProduceList(prods);
      setOrders(ords);
      setRecommendations(recs);
      setLoading(false);
    });
  }, []);

  const topRec = recommendations[0];
  const activeOrder = orders.find(o => o.status === 'In Transit') || orders[0];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      
      {/* 1. WELCOME HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl shadow-sm">
        <div>
          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Farmer Command Center</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Namaste, {user?.name || 'Farmer'} 🌾</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {user?.farmName || 'Primary Farm'} • {user?.location || 'Verified Agricultural Cluster'}
          </p>
        </div>
        <div>
          <Link href="/farmer/analytics">
            <Button variant="outline" size="sm" className="font-bold border-emerald-500/40 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40">
              <BarChart3 className="w-4 h-4 mr-1.5 text-emerald-500" />
              <span>View Analytics</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. IMPORTANT OPPORTUNITY / ALERT */}
      <div className="bg-gradient-to-r from-emerald-900/80 to-slate-900 border-2 border-emerald-500/60 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-lg shadow-emerald-950/20">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center font-bold text-2xl flex-shrink-0">
            🚨
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded bg-emerald-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">High Opportunity</span>
              <span className="text-xs font-bold text-emerald-300">Hyderabad Urban Corridor</span>
            </div>
            <h2 className="text-base sm:text-lg font-bold text-white mt-1">Direct Institutional Buyer Demand Available</h2>
            <p className="text-xs text-slate-300">Verified buyers offering direct contracts with transparent road cold logistics.</p>
          </div>
        </div>
        <Link href="/farmer/recommendations" className="w-full sm:w-auto">
          <Button variant="primary" size="sm" className="w-full sm:w-auto flex-shrink-0">
            <span>View Opportunity</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </Button>
        </Link>
      </div>

      {/* 3. QUICK ACTIONS - Large touch targets for mobile */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Quick Actions</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Link href="/farmer/produce" className="block">
            <div className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-md transition transform active:scale-95 h-28">
              <Plus className="w-7 h-7 mb-1.5" />
              <span className="font-bold text-sm">Add Produce</span>
            </div>
          </Link>

          <Link href="/farmer/orders" className="block">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-900 dark:text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm transition transform active:scale-95 h-28">
              <Truck className="w-7 h-7 mb-1.5 text-blue-500" />
              <span className="font-bold text-sm">View Orders</span>
            </div>
          </Link>

          <Link href="/farmer/market-prices" className="block">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-900 dark:text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm transition transform active:scale-95 h-28">
              <TrendingUp className="w-7 h-7 mb-1.5 text-emerald-500" />
              <span className="font-bold text-sm">Mandi Prices</span>
            </div>
          </Link>

          <Link href="/farmer/demand-map" className="block">
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 text-slate-900 dark:text-white p-4 rounded-2xl flex flex-col items-center justify-center text-center shadow-sm transition transform active:scale-95 h-28">
              <MapPin className="w-7 h-7 mb-1.5 text-amber-500" />
              <span className="font-bold text-sm">Demand Map</span>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. MY PRODUCE - Clean Farmer Cards */}
      <Card className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-500 flex items-center justify-center">
              <Sprout className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">My Produce</h3>
              <span className="text-xs text-slate-400">{produceList.length} Active Listings</span>
            </div>
          </div>
          <Link href="/farmer/produce">
            <Button size="sm" variant="outline">
              <span>All Produce</span>
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="p-8 text-center text-xs text-slate-400">Loading produce inventory...</div>
        ) : produceList.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400 space-y-2">
            <p>No produce listed yet.</p>
            <Link href="/farmer/produce">
              <Button size="sm" className="bg-emerald-600 text-white">Add Your First Crop</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {produceList.slice(0, 3).map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-lg">
                    🌾
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 dark:text-white text-sm">{item.crop}</h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold text-[10px] border border-emerald-500/20">
                        Grade {item.grade}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      Available: <strong className="text-slate-700 dark:text-slate-300">{item.quantity?.toLocaleString()} {item.unit}</strong> • {item.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="text-left sm:text-right">
                    <span className="text-[10px] text-slate-400 block">Expected Price</span>
                    <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatINR(item.expectedPrice)}/{item.unit}
                    </span>
                  </div>
                  <Link href="/farmer/produce">
                    <Button size="sm" variant="secondary" className="px-3 py-1.5 text-xs">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* 5. ACTIVE ORDERS */}
      {activeOrder && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 dark:text-white text-base">Active Orders</h3>
                <span className="text-xs text-slate-400">Road Delivery in Progress</span>
              </div>
            </div>
            <Link href="/farmer/orders">
              <Button size="sm" variant="outline">
                <span>View All Orders</span>
              </Button>
            </Link>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="font-mono text-xs text-slate-400 font-bold">{activeOrder.id}</span>
                <h4 className="text-base font-bold text-white">{activeOrder.produceName} ({activeOrder.quantityKg?.toLocaleString()} kg)</h4>
                <p className="text-xs text-slate-300">Buyer: {activeOrder.buyerName}</p>
              </div>
              <div className="text-left sm:text-right">
                <span className="text-xs text-slate-400 block">Order Value:</span>
                <span className="text-lg font-black text-emerald-400">{formatINR(activeOrder.totalOrderValue)}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-slate-300">Status: <strong className="text-white">{activeOrder.status}</strong></span>
                <span className="text-slate-500">• {activeOrder.destinationCity}</span>
              </div>
              <Link href={`/farmer/tracking/${activeOrder.logisticsId}`} className="w-full sm:w-auto">
                <Button size="sm" className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white">
                  <Truck className="w-3.5 h-3.5 mr-1.5" /> Track Delivery
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* 6. IMPORTANT RECOMMENDATION */}
      {topRec && (
        <Card className="p-6">
          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 text-amber-500 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">Important AI Recommendation</h3>
              <span className="text-xs text-slate-400">Optimal Selling Window</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 space-y-3">
            <div>
              <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Recommended Action</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-0.5">{topRec.actionText}</h4>
            </div>

            <div>
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider block">Why?</span>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">{topRec.summary}</p>
            </div>

            <div className="pt-2 border-t border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                Expected Improvement: +{formatINR(topRec.expectedImprovementPerKg)}/kg
              </span>
              <Link href="/farmer/recommendations">
                <Button size="sm" variant="outline">
                  View Full Recommendations
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* 7. VIEW ANALYTICS FOOTER CTA */}
      <div className="p-6 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center space-y-3">
        <h4 className="text-sm font-bold text-slate-900 dark:text-white">Looking for detailed market price charts and historical trends?</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          Detailed price graphs, 7-day demand forecasts, and full realization calculations are kept in the Analytics hub.
        </p>
        <Link href="/farmer/analytics" className="inline-block">
          <Button variant="outline" size="sm" className="font-bold">
            <BarChart3 className="w-4 h-4 mr-1.5 text-emerald-500" />
            <span>Open Farmer Analytics & Graphs →</span>
          </Button>
        </Link>
      </div>

    </div>
  );
}