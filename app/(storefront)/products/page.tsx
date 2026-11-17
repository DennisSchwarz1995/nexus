import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import { getAllPublicProducts } from '@/lib/commerce';
import { CatalogClient } from './catalog-client';

export const metadata: Metadata = {
  title: 'Produktkatalog (144 Systeme)',
  description:
    'Durchsuchen Sie 144 präzisionsgefertigte Audio-, Licht-, Input- und Workstation-Komponenten mit Echtzeit-Filter und Infinite Scroll.',
};

export const revalidate = 3600;

export default async function ProductsCatalogPage() {
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
      <CatalogClient initialProducts={products} />
    </Suspense>
  );
}
