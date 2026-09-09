import React from 'react';
import TrackingClient from './TrackingClient';

export function generateStaticParams() {
  return [
    { id: 'TRK-RD-9021' },
    { id: 'TRK-RD-9022' },
    { id: 'TRK-RD-9023' },
  ];
}

export default function ConsumerTrackingPage() {
  return <TrackingClient />;
}
