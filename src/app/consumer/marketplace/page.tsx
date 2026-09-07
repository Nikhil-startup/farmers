'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { consumerService } from '@/services/consumerService';
import { ConsumerProduct } from '@/types/consumer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/lib/utils';
import { ShoppingCart, ShieldCheck, Thermometer, Clock, Sparkles, Filter, Check, ArrowRight } from 'lucide-react';

export default function MarketplacePage() {
  const [products, setProducts] = useState<ConsumerProduct[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [addedId, setAddedId] = useState<string | null>(null);

  useEffect(() => {
    consumerService.getProducts().then(setProducts);
  }, []);

  const handleAddToCart = (product: ConsumerProduct) => {
    consumerService.addToCart(product, product.minOrderKg);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 2000);
  };

  const filtered = selectedCategory === 'All'
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider block">Farm-Gate B2B Marketplace</span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Direct Verified Harvests 🥦</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Grade-A produce direct from farmer producer organizations with transparent price breakdowns.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/consumer/dashboard">
            <Button variant="secondary" size="sm">
              <span>Post Bulk Demand (5 Ton+)</span>
            </Button>
          </Link>
          <Link href="/consumer/cart">
            <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
              <ShoppingCart className="w-4 h-4" />
              <span>View Cart</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {['All', 'Vegetables', 'Spices', 'Tubers', 'Fruits'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {filtered.map((prod) => (
          <Card key={prod.id} className="p-6 flex flex-col justify-between hover:border-blue-500/50 transition shadow-sm space-y-5">
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-2xl flex-shrink-0">
                    {prod.image}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-slate-900 dark:text-white">{prod.name}</h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">{prod.hindiName} • {prod.farmLocation}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black">
                  Grade {prod.grade}
                </span>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2 my-3">
                {prod.description}
              </p>

              {/* Provenance & Telemetry bar */}
              <div className="grid grid-cols-3 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-200 dark:border-slate-700/60">
                <div>
                  <span className="text-slate-400 text-[10px] block">Freshness</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> {prod.freshnessScore}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Harvested</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> {prod.harvestHoursAgo}h ago
                  </span>
                </div>
                <div>
                  <span className="text-slate-400 text-[10px] block">Transit Temp</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <Thermometer className="w-3 h-3" /> {prod.coldChainTempCelsius}°C
                  </span>
                </div>
              </div>

              {/* Transparent Price Breakdown */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5 text-xs">
                <div className="flex justify-between font-bold text-slate-900 dark:text-white">
                  <span>Buyer Price:</span>
                  <span className="text-base text-blue-600 dark:text-blue-400 font-black">{formatINR(prod.consumerPricePerKg)}/kg</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span>↳ Net to Farmer ({Math.round(prod.farmerRealizationPerKg / prod.consumerPricePerKg * 100)}%):</span>
                  <span className="font-bold text-emerald-600 dark:text-emerald-400">{formatINR(prod.farmerRealizationPerKg)}/kg</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span>↳ Road Logistics & Cold-Chain:</span>
                  <span>{formatINR(prod.logisticsFeePerKg)}/kg</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400 text-[11px]">
                  <span>↳ AgriFlow Platform & Escrow:</span>
                  <span>{formatINR(prod.platformFeePerKg)}/kg</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link href={`/consumer/product/${prod.id}`} className="flex-1">
                <Button variant="outline" size="sm" className="w-full">
                  Provenance Details
                </Button>
              </Link>
              <Button
                size="sm"
                onClick={() => handleAddToCart(prod)}
                className={`flex-1 ${addedId === prod.id ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
              >
                {addedId === prod.id ? (
                  <>
                    <Check className="w-4 h-4 mr-1" /> Added ({prod.minOrderKg}kg)
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1" /> Add Min ({prod.minOrderKg}kg)
                  </>
                )}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
