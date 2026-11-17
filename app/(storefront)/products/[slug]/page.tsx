import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  ALL_PRODUCTS,
  CATEGORY_MAP,
  getAllPublicProducts,
  getCategoryBySlug,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/commerce';
import { CatalogClient } from '../catalog-client';
import { ProductDetailClient } from './product-detail-client';

export const revalidate = 3600;

export async function generateStaticParams() {
  const categorySlugs = Object.keys(CATEGORY_MAP).map((slug) => ({ slug }));
  const productSlugs = ALL_PRODUCTS.slice(0, 24).map((product) => ({
    slug: product.slug,
  }));
  return [...categorySlugs, ...productSlugs];
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const categoryConfig = getCategoryBySlug(params.slug);
  if (categoryConfig) {
    return {
      title: `${categoryConfig.labelEn} — Collection`,
      description: categoryConfig.descriptionDe,
    };
  }

  const product = await getProductBySlug(params.slug);
  if (!product) {
    return { title: 'Nicht gefunden' };
  }
  return {
    title: `${product.name} (${product.sku})`,
    description: product.subtitle,
  };
}

export default async function ProductOrCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  // 1. Check if slug matches a speaking category path (e.g. /products/audio, /products/input, /products/desk-systems)
  const categoryConfig = getCategoryBySlug(params.slug);
  if (categoryConfig) {
    const products = await getAllPublicProducts();
    return (
      <Suspense
        fallback={
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="h-10 w-64 animate-pulse rounded-xl bg-zinc-100" />
            <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div
                  key={idx}
                  className="h-96 animate-pulse rounded-2xl border border-zinc-200 bg-zinc-50"
                />
              ))}
            </div>
          </div>
        }
      >
        <CatalogClient
          initialProducts={products}
          activeCategorySlug={categoryConfig.slug}
        />
      </Suspense>
    );
  }

  // 2. Otherwise resolve as product detail slug
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
