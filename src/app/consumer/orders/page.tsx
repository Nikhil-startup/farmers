'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { formatINR } from '@/lib/utils';
import { Truck, ArrowRight, PackageCheck, CheckCircle2 } from 'lucide-react';

export default function ConsumerOrdersPage() {
  const orders = [
    {
      id: 'ORD-78921',
      produce: 'Tomato (Hybrid Desi)',
      quantityKg: 2400,
      grade: 'A',
      totalValue: 100800,
      farmer: 'Ramesh Reddy (Shadnagar FPO)',
      destination: 'Bowenpally Terminal Gate 3, Hyderabad',
      status: 'In Transit',
      logisticsId: 'TRK-RD-9021',
      date: '2026-09-05',
    },
    {
      id: 'ORD-78410',
      produce: 'Green Chilli (G4)',
      quantityKg: 1200,
      grade: 'A-',
      totalValue: 69600,
      farmer: 'Venkatesh Rao & Guntur Cluster',
      destination: 'Warangal Commercial Mandi Hub',
      status: 'Delivered',
      logisticsId: 'TRK-RD-8812',
      date: '2026-09-04',
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Buyer Purchase Orders</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor your active road shipments, delivery proofs, and escrow settlement status.
        </p>
      </div>

      <div className="space-y-4">
        {orders.map((o) => (
          <Card key={o.id} className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{o.id}</span>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${o.status === 'Delivered' ? 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' : 'bg-blue-500/10 text-blue-500 border border-blue-500/20'}`}>
                  {o.status}
                </span>
                <span className="text-xs text-slate-400">• {o.date}</span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{o.produce} ({o.quantityKg.toLocaleString()} kg)</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Supplier: <strong className="text-slate-700 dark:text-slate-300">{o.farmer}</strong> • Destination: {o.destination}
              </p>
              <p className="text-sm font-black text-blue-600 dark:text-blue-400">
                Total Contract: {formatINR(o.totalValue)}
              </p>
            </div>

            <Link href={`/consumer/tracking/${o.logisticsId}`}>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-500">
                <Truck className="w-4 h-4 mr-1.5" />
                <span>Track Road Shipment</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
