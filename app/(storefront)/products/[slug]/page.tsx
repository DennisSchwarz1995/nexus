import React from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/commerce';
import { ProductDetailClient } from './product-detail-client';

export const revalidate = 3600;

export async function generateStaticParams() {
  return ALL_PRODUCTS.slice(0, 24).map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Produkt nicht gefunden' };
  }
  return {
    title: `${product.name} (${product.sku})`,
    description: product.subtitle,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = await getProductBySlug(params.slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(
    product.slug,
    product.category
  );

  return (
    <ProductDetailClient
      product={product}
      relatedProducts={relatedProducts}
    />
  );
}
