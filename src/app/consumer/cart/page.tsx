'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { consumerService } from '@/services/consumerService';
import { CartItem } from '@/types/consumer';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/lib/utils';
import { Trash2, ShoppingCart, ArrowRight, ShieldCheck, Truck } from 'lucide-react';

export default function CartPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    consumerService.getCart().then((items) => {
      setCart(items);
      setLoading(false);
    });
  }, []);

  const handleRemove = async (productId: string) => {
    const updated = await consumerService.removeFromCart(productId);
    setCart(updated);
  };

  const totalKg = cart.reduce((acc, item) => acc + item.quantityKg, 0);
  const totalAmount = cart.reduce((acc, item) => acc + (item.quantityKg * (item.product?.consumerPricePerKg || 0)), 0);
  const totalFarmerPayout = cart.reduce((acc, item) => acc + (item.quantityKg * (item.product?.farmerRealizationPerKg || 0)), 0);
  const totalLogistics = cart.reduce((acc, item) => acc + (item.quantityKg * (item.product?.logisticsFeePerKg || 0)), 0);
  const totalPlatform = cart.reduce((acc, item) => acc + (item.quantityKg * (item.product?.platformFeePerKg || 0)), 0);

  if (loading) {
    return (
      <div className="p-12 text-center text-xs text-slate-400">Loading procurement cart...</div>
    );
  }

  if (cart.length === 0) {
    return (
      <Card className="p-12 text-center max-w-lg mx-auto space-y-4">
        <ShoppingCart className="w-12 h-12 mx-auto text-slate-400" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Procurement Cart is Empty</h2>
        <p className="text-xs text-slate-400">Discover fresh harvest batches direct from verified farmer clusters.</p>
        <Link href="/consumer/marketplace">
          <Button size="sm" className="bg-blue-600 hover:bg-blue-500 text-white">
            Browse Marketplace
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Procurement Cart</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Review your direct farm purchase contracts and transparent cost distribution.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card key={item.product?.id} className="p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800 flex items-center justify-center text-2xl flex-shrink-0">
                  {item.product?.image || '🌾'}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-900 dark:text-white text-base">{item.product?.name}</h3>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold">
                      Grade {item.product?.grade}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Farmer: {item.product?.farmerName} • {item.product?.farmLocation}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 font-bold mt-1">
                    {formatINR(item.product?.consumerPricePerKg || 0)}/kg × {item.quantityKg.toLocaleString()} kg = {formatINR(item.quantityKg * (item.product?.consumerPricePerKg || 0))}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-between">
                <span className="text-sm font-black text-slate-900 dark:text-white sm:hidden">
                  {formatINR(item.quantityKg * (item.product?.consumerPricePerKg || 0))}
                </span>
                <button
                  onClick={() => handleRemove(item.product?.id)}
                  className="p-2 rounded-xl text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {/* Summary & Escrow Breakdown */}
        <div>
          <Card className="p-6 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white">Cost & Impact Transparency Receipt</h3>

            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span>Total Weight:</span>
                <span className="font-bold text-slate-900 dark:text-white">{totalKg.toLocaleString()} kg</span>
              </div>
              <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-semibold">
                <span>✓ Net Direct to Farmer (Bank):</span>
                <span>{formatINR(totalFarmerPayout)}</span>
              </div>
              <div className="flex justify-between">
                <span>Road Cold Logistics:</span>
                <span>{formatINR(totalLogistics)}</span>
              </div>
              <div className="flex justify-between">
                <span>AgriFlow Smart Escrow & Platform:</span>
                <span>{formatINR(totalPlatform)}</span>
              </div>
              <div className="border-t border-slate-200 dark:border-slate-800 pt-3 flex justify-between font-black text-base text-slate-900 dark:text-white">
                <span>Total Amount:</span>
                <span className="text-blue-600 dark:text-blue-400">{formatINR(totalAmount)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-[11px] text-blue-700 dark:text-blue-300">
              🔒 <strong>Smart Escrow Protected:</strong> Payout released to farmer bank only after digital QR weighment scan at destination.
            </div>

            <Link href="/consumer/checkout">
              <Button className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white">
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}