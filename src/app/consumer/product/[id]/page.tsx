'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { consumerService } from '@/services/consumerService';
import { ConsumerProduct } from '@/types/consumer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/lib/utils';
import { ArrowLeft, ShieldCheck, Thermometer, Sparkles, MapPin, Truck, Check, ShoppingCart } from 'lucide-react';

export default function ProductDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [product, setProduct] = useState<ConsumerProduct | null>(null);
  const [qty, setQty] = useState<number>(100);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      consumerService.getProductById(id).then(p => {
        if (p) {
          setProduct(p);
          setQty(p.minOrderKg || 25);
        }
        setLoading(false);
      });
    }
  }, [id]);

  if (loading) {
    return <div className="p-12 text-center text-xs text-slate-400">Loading produce provenance from verified farm records...</div>;
  }

  if (!product) {
    return (
      <Card className="p-12 text-center space-y-4 max-w-lg mx-auto">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white">Harvest Batch Unavailable</h2>
        <p className="text-xs text-slate-400">This harvest batch may have been completely procured or expired.</p>
        <Link href="/consumer/marketplace">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">Back to Marketplace</Button>
        </Link>
      </Card>
    );
  }

  const handleAdd = async () => {
    await consumerService.addToCart(product.id, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <Link href="/consumer/marketplace" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-blue-500 transition font-medium">
          <ArrowLeft className="w-4 h-4" /> Back to Marketplace
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-4xl">
                  {product.image || '🌾'}
                </div>
                <div>
                  <h1 className="text-2xl font-black text-slate-900 dark:text-white">{product.name}</h1>
                  <p className="text-xs text-slate-500 dark:text-slate-400">{product.hindiName || ''} • Batch: <span className="font-mono text-blue-500">{product.provenanceBatchId}</span></p>
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 text-xs font-black">
                Grade {product.grade} Certified
              </span>
            </div>

            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {product.description}
            </p>

            {/* Farm Origin & Provenance */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-emerald-500" /> Farm Gate Traceability & Farmer Profile
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div>
                  <span className="text-slate-400 block">Cultivating Farmer:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{product.farmerName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Farm Cluster & District:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{product.farmLocation}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">FPO Affiliation:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{product.fpoCluster || 'Direct Individual Cluster'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block">Harvest Timestamp:</span>
                  <strong className="text-slate-900 dark:text-white text-sm">{product.harvestDate} ({product.harvestHoursAgo} hours ago)</strong>
                </div>
              </div>
            </div>

            {/* Quality and Cold Chain */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-1">
                <span className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4" /> AI Computer-Vision Inspection
                </span>
                <p className="text-slate-600 dark:text-slate-300">Skin integrity: 96% • Ripeness: Optimal • Rejection Risk: &lt; 1.2%</p>
              </div>
              <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/30 border border-blue-500/30 text-xs space-y-1">
                <span className="font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1.5">
                  <Thermometer className="w-4 h-4" /> Cold-Chain Telemetry
                </span>
                <p className="text-slate-600 dark:text-slate-300">Carrier Temp: {product.coldChainTempCelsius}°C • Humidity: 88% RH • Safe Window: 72h+</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Purchase Card */}
        <div>
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Order Procurement</h3>

            <div className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-400 block mb-1">Order Quantity (kg)</label>
                <input
                  type="number"
                  min={product.minOrderKg}
                  step={25}
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900 dark:text-white"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Min order: {product.minOrderKg} kg • Available: {product.availableKg?.toLocaleString()} kg</span>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Unit Price:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{formatINR(product.consumerPricePerKg)}/kg</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Farmer Realization:</span>
                  <span className="text-emerald-500 font-bold">{formatINR(product.farmerRealizationPerKg * qty)}</span>
                </div>
                <div className="flex justify-between text-slate-500 dark:text-slate-400">
                  <span>Road Freight (Tata Reefer):</span>
                  <span>{formatINR(product.logisticsFeePerKg * qty)}</span>
                </div>
                <div className="border-t border-slate-200 dark:border-slate-800 pt-2 flex justify-between font-black text-sm text-slate-900 dark:text-white">
                  <span>Total Procurement Value:</span>
                  <span className="text-blue-600 dark:text-blue-400 text-base">{formatINR(product.consumerPricePerKg * qty)}</span>
                </div>
              </div>

              <Button
                onClick={handleAdd}
                className={`w-full py-3 ${added ? 'bg-emerald-600 text-white' : 'bg-blue-600 hover:bg-blue-500 text-white'}`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4 mr-1.5" /> Added to Procurement Cart
                  </>
                ) : (
                  <>
                    <ShoppingCart className="w-4 h-4 mr-1.5" /> Add {qty} kg to Cart
                  </>
                )}
              </Button>

              <Link href="/consumer/cart" className="block text-center text-xs text-blue-500 hover:underline font-bold mt-2">
                Proceed to Checkout →
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}