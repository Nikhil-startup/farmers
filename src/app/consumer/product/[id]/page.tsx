import React from 'react';
import ProductDetailClient from './ProductDetailClient';

export function generateStaticParams() {
  return [
    { id: 'prod-1' },
    { id: 'prod-2' },
    { id: 'prod-3' },
    { id: 'prod-4' },
    { id: 'prod-5' },
    { id: 'prod-6' },
  ];
}

export default function ProductDetailPage() {
  return <ProductDetailClient />;
}