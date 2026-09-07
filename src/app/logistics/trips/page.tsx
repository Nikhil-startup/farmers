'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { logisticsService } from '@/services/logisticsService';
import { ConsolidatedTrip } from '@/types/logistics';
import { Card } from '@/components/common/Card';
import { Button } from '@/components/common/Button';
import { Truck, ArrowRight, Navigation, CheckCircle2 } from 'lucide-react';

export default function LogisticsTripsPage() {
  const [trips, setTrips] = useState<ConsolidatedTrip[]>([]);

  useEffect(() => {
    logisticsService.getTrips().then(setTrips);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">Active Consolidated Trips</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Monitor multi-stop farm pickups, transit progress, and destination arrivals.
        </p>
      </div>

      <div className="space-y-4">
        {trips.map((trip) => (
          <Card key={trip.id} className="p-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-slate-400">{trip.tripCode}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/30 text-xs font-bold">
                  {trip.status}
                </span>
                <span className="text-xs text-slate-400">• Carrier: {trip.vehicle.vehicleNumber}</span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">{trip.sourceHub} → {trip.destinationHub}</h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-slate-500 dark:text-slate-400">
                <div>
                  <span className="block text-slate-400">Commodity</span>
                  <strong className="text-slate-900 dark:text-white">{trip.commodity} ({trip.totalKg} kg)</strong>
                </div>
                <div>
                  <span className="block text-slate-400">Reefer Climate</span>
                  <strong className="text-emerald-500">{trip.coldChainTemp}°C (Low Risk)</strong>
                </div>
                <div>
                  <span className="block text-slate-400">Distance</span>
                  <strong className="text-slate-900 dark:text-white">{trip.distanceCompletedKm} / {trip.totalDistanceKm} km</strong>
                </div>
                <div>
                  <span className="block text-slate-400">ETA</span>
                  <strong className="text-amber-500">{trip.estimatedArrival}</strong>
                </div>
              </div>
            </div>

            <Link href={`/consumer/tracking/${trip.id}`}>
              <Button size="sm" className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold">
                <Navigation className="w-4 h-4 mr-1.5" />
                <span>Live GPS Map</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </div>
  );
}
