import React from 'react';
import FarmerTrackingClient from './FarmerTrackingClient';

export function generateStaticParams() {
  return [
    { id: 'TRK-RD-9021' },
    { id: 'TRK-RD-9022' },
    { id: 'TRK-RD-9023' },
  ];
}

export default function RoadTrackingPage() {
  return <FarmerTrackingClient />;
}
