'use client';

import React, { useOptimistic, useTransition } from 'react';
import Link from 'next/link';
import { Plus, Check, Star, ArrowUpRight } from 'lucide-react';
import { Product } from '@/types';
import { formatCurrency } from '@/lib/utils';
import { useCartStore } from '@/lib/store';
import { toast } from 'sonner';

export function ProductCard({ product }: { product: Product }) {
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useCartStore((s) => s.setCartOpen);
  const [isPending, startTransition] = useTransition();
  const [optimisticAdded, setOptimisticAdded] = useOptimistic(false);

  const defaultVariant = product.variants[0];
  const isOutOfStock = product.status === 'out_of_stock' || product.stock <= 0;

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock || !defaultVariant) return;

    startTransition(() => {
      setOptimisticAdded(true);
      addItem(
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          subtitle: product.subtitle,
          category: product.category,
          price: product.price + defaultVariant.priceDelta,
          image: product.images[0],
          variantId: defaultVariant.id,
          variantName: defaultVariant.name,
          variantHex: defaultVariant.hex,
          sku: defaultVariant.sku,
          quantity: 1,
          maxStock: Math.max(1, product.stock),
        },
        1
      );

      toast.success(`${product.name} zum Warenkorb hinzugefügt`, {
        description: `${defaultVariant.name} · ${formatCurrency(product.price + defaultVariant.priceDelta)}`,
        action: {
          label: 'Warenkorb',
          onClick: () => setCartOpen(true),
        },
      });
    });
  };

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-xl hover:shadow-zinc-950/[0.04]">
      {/* Image Container */}
      <Link
        href={`/products/${product.slug}`}
        className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-100 focus-visible:outline-none"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover object-center transition-transform duration-500 ease-out group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/20 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        {/* Top Badges */}
        <div className="absolute left-3 top-3 flex flex-wrap items-center gap-1.5">
          {product.badge && (
            <span className="rounded-lg bg-zinc-950/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
              {product.badge}
            </span>
          )}
          {product.status === 'low_stock' && (
            <span className="rounded-lg border border-amber-300/80 bg-amber-50/95 px-2 py-0.5 text-[10px] font-medium text-amber-800 backdrop-blur-md">
              Nur noch {product.stock} Stk.
            </span>
          )}
          {isOutOfStock && (
            <span className="rounded-lg bg-zinc-800/90 px-2.5 py-1 text-[10px] font-medium text-zinc-200">
              Nachproduktion
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        {!isOutOfStock && (
          <button
            type="button"
            onClick={handleQuickAdd}
            disabled={isPending}
            aria-label={`${product.name} direkt in den Warenkorb legen`}
            className="absolute bottom-3 right-3 inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white/95 px-3 text-xs font-semibold text-zinc-950 shadow-lg backdrop-blur-md transition-all hover:bg-zinc-950 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
          >
            {optimisticAdded ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-500" />
                <span>Hinzugefügt</span>
              </>
            ) : (
              <>
                <Plus className="h-3.5 w-3.5" />
                <span>Schnellkauf</span>
              </>
            )}
          </button>
        )}
      </Link>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="flex items-center justify-between gap-2 text-[11px] text-zinc-400">
            <span className="font-medium uppercase tracking-wider text-zinc-500">
              {product.category}
            </span>
            <span className="inline-flex items-center gap-1 font-mono text-zinc-600">
              <Star className="h-3 w-3 fill-zinc-900 text-zinc-900" />
              {product.rating.toFixed(1)}
              <span className="text-zinc-400">({product.reviewCount})</span>
            </span>
          </div>

          <Link
            href={`/products/${product.slug}`}
            className="mt-1.5 flex items-start justify-between gap-2 group/title focus-visible:outline-none"
          >
            <h3 className="text-sm font-semibold tracking-tight text-zinc-950 group-hover/title:underline">
              {product.name}
            </h3>
            <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-zinc-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-900" />
          </Link>

          <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-zinc-500">
            {product.subtitle}
          </p>
        </div>

        <div className="mt-4 flex items-end justify-between border-t border-zinc-100 pt-3.5">
          {/* Variant Color Swatches */}
          <div className="flex items-center gap-1.5">
            {product.variants.map((v) => (
              <span
                key={v.id}
                title={v.name}
                className="h-3.5 w-3.5 rounded-full border border-zinc-300 shadow-inner"
                style={{ backgroundColor: v.hex }}
              />
            ))}
            <span className="ml-1 font-mono text-[10px] text-zinc-400">{product.sku}</span>
          </div>

          {/* Price */}
          <div className="text-right">
            {product.compareAtPrice && (
              <span className="mr-1.5 font-mono text-[11px] text-zinc-400 line-through">
                {formatCurrency(product.compareAtPrice)}
              </span>
            )}
            <span className="font-mono text-sm font-semibold text-zinc-950">
              {formatCurrency(product.price)}
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}
