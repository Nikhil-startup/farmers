'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { consumerService } from '@/services/consumerService';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/lib/utils';
import { CheckCircle2, ShieldCheck, Truck, ArrowRight, Lock } from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [complete, setComplete] = useState(false);

  const cart = consumerService.getCart();
  const totalAmount = cart.reduce((acc, item) => acc + (item.quantityKg * item.product.consumerPricePerKg), 0);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setComplete(true);
    consumerService.clearCart();
  };

  if (complete) {
    return (
      <Card className="p-8 text-center max-w-xl mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto text-3xl font-black">
          ✓
        </div>
        <div>
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-wider block">Order Confirmed</span>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-1">Farm Direct Contract Executed</h2>
          <p className="text-xs text-slate-400 mt-2">
            Trip assigned: <strong className="text-white font-mono">TRK-RD-9021</strong> (Tata 407 Reefer • Driver Mohammed Ismail)
          </p>
        </div>

        <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 text-xs text-left space-y-2 text-slate-300">
          <div className="flex justify-between"><span>Order Reference:</span> <strong className="text-white font-mono">ORD-78921</strong></div>
          <div className="flex justify-between"><span>Escrow Lock:</span> <strong className="text-emerald-400">Active (Released on QR POD Scan)</strong></div>
          <div className="flex justify-between"><span>Estimated Delivery:</span> <strong className="text-white">Today, 05:45 PM</strong></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Button onClick={() => router.push('/consumer/tracking/TRK-RD-9021')} className="flex-1 bg-blue-600 hover:bg-blue-500">
            <Truck className="w-4 h-4 mr-1.5" /> Track Live Reefer Freight
          </Button>
          <Button variant="secondary" onClick={() => router.push('/consumer/orders')} className="flex-1">
            View My Orders
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white">Confirm Farm Procurement</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Lock contract escrow and schedule regional road logistics dispatch.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="space-y-6">
        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">1. Destination Delivery Hub</h3>
          <div className="space-y-3 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">Receiving Facility</label>
              <input
                type="text"
                defaultValue="Bowenpally Agri Terminal Gate 3, Hyderabad"
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 font-bold text-slate-900 dark:text-white"
              />
            </div>
            <div>
              <label className="text-slate-400 block mb-1">Receiving Manager & Phone</label>
              <input
                type="text"
                defaultValue="K. Ramana Rao (+91 98480 66712)"
                className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-slate-900 dark:text-white"
              />
            </div>
          </div>
        </Card>

        <Card className="p-6 space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">2. Payment & Smart Escrow Deposit</h3>
          <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/30 text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-bold">
              <ShieldCheck className="w-4 h-4" />
              <span>Smart Escrow Account: {formatINR(totalAmount || 100800)}</span>
            </div>
            <p className="text-slate-300">
              Funds are held securely in escrow and automatically released to farmer accounts upon electronic weighment verification.
            </p>
          </div>
        </Card>

        <Button
          type="submit"
          isLoading={loading}
          className="w-full py-4 text-base bg-blue-600 hover:bg-blue-500 text-white shadow-xl shadow-blue-900/40"
        >
          <Lock className="w-4 h-4 mr-2" /> Authorize Escrow & Dispatch Logistics ({formatINR(totalAmount || 100800)})
        </Button>
      </form>
    </div>
  );
}
