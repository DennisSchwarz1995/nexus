'use client';

import React from 'react';
import { useLocale } from '@/lib/i18n';
import { InventoryTable } from '@/components/tables/inventory-table';

export default function AdminInventoryPage() {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  return (
    <div className="mx-auto max-w-7xl space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
          Warehouse & Catalog Engine // TanStack Table v8
        </span>
        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
          {isDe
            ? 'Produktverwaltung & Lagerbestand'
            : 'Product Management & Inventory'}
        </h1>
        <p className="mt-1 text-xs text-zinc-500">
          {isDe
            ? 'Serverseitiges Paging, Multi-Spalten-Sortierung, Echtzeit-Filterung und Sofort-Bestandsanpassungen mit Toast-Bestätigung.'
            : 'Server-side paging, multi-column sorting, real-time filtering, and instant stock adjustments with toast notifications.'}
        </p>
      </div>

      <InventoryTable />
    </div>
  );
}
