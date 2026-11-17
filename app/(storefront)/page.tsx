import React from 'react';
import {
  ALL_PRODUCTS,
  getFeaturedProducts,
  PRODUCT_CATEGORIES,
} from '@/lib/commerce';
import { LandingClient } from './landing-client';

export const revalidate = 3600;

export default async function StorefrontLandingPage() {
  const featuredProducts = await getFeaturedProducts();

  const categoryCards = PRODUCT_CATEGORIES.map((category) => {
    const matching = ALL_PRODUCTS.filter(
      (p) => p.category === category && p.status !== 'draft'
    );
    return {
      name: category,
      count: matching.length,
      minPrice: Math.min(...matching.map((p) => p.price)),
      image: matching[0]?.images[0] ?? '',
    };
  });

  return (
    <LandingClient
      featuredProducts={featuredProducts}
      categoryCards={categoryCards}
    />
  );
}
