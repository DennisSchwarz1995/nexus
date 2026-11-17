"use client";

import React, { useState, useOptimistic, useTransition } from "react";
import {
  ShoppingBag,
  Check,
  Plus,
  Minus,
  ShieldCheck,
  Truck,
} from "lucide-react";
import { Product, ProductVariant } from "@/types";
import { useCartStore } from "@/lib/store";
import { useLocale, localizeProduct } from "@/lib/i18n";
import { cn, formatCurrency } from "@/lib/utils";
import { toast } from "sonner";

export function AddToCart({ product: rawProduct }: { product: Product }) {
  const { locale } = useLocale();
  const isDe = locale === "de";
  const product = localizeProduct(rawProduct, locale);

  const { items, addItem, setCartOpen } = useCartStore();
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant>(
    product.variants[0],
  );
  const [quantity, setQuantity] = useState<number>(1);
  const [isPending, startTransition] = useTransition();

  const currentCartQty = items
    .filter(
      (i) => i.productId === product.id && i.variantId === selectedVariant?.id,
    )
    .reduce((sum, i) => sum + i.quantity, 0);

  const [optimisticCartQty, addOptimisticQty] = useOptimistic(
    currentCartQty,
    (state: number, added: number) => state + added,
  );

  const [justAdded, setJustAdded] = useState(false);

  const effectivePrice = product.price + (selectedVariant?.priceDelta ?? 0);
  const isOutOfStock =
    product.status === "out_of_stock" ||
    product.stock <= 0 ||
    (selectedVariant && selectedVariant.stock <= 0);

  const handleAddToCart = () => {
    if (isOutOfStock || !selectedVariant) return;

    startTransition(() => {
      addOptimisticQty(quantity);
      addItem(
        {
          productId: product.id,
          slug: product.slug,
          name: product.name,
          subtitle: product.subtitle,
          category: product.category,
          price: effectivePrice,
          image: product.images[0],
          variantId: selectedVariant.id,
          variantName: selectedVariant.name,
          variantHex: selectedVariant.hex,
          sku: selectedVariant.sku,
          quantity,
          maxStock: Math.max(1, selectedVariant.stock),
        },
        quantity,
      );

      setJustAdded(true);
      setTimeout(() => setJustAdded(false), 1800);

      toast.success(
        isDe
          ? `${quantity}× ${product.name} im Warenkorb`
          : `Added ${quantity}× ${product.name} to your bag`,
        {
          description: `${selectedVariant.name} (${selectedVariant.sku}) · ${formatCurrency(
            effectivePrice * quantity,
          )}`,
          action: {
            label: isDe ? "Warenkorb öffnen" : "View Bag",
            onClick: () => setCartOpen(true),
          },
        },
      );
    });
  };

  return (
    <div className="space-y-6 rounded-2xl border border-zinc-200/90 bg-zinc-50/50 p-6">
      <div className="flex items-baseline justify-between border-b border-zinc-200/80 pb-5">
        <div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-mono text-3xl font-semibold tracking-tight text-zinc-950">
              {formatCurrency(effectivePrice)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-sm text-zinc-400 line-through">
                {formatCurrency(
                  product.compareAtPrice + (selectedVariant?.priceDelta ?? 0),
                )}
              </span>
            )}
          </div>
          <p className="mt-1 text-[11px] text-zinc-500">
            {isDe
              ? "Inkl. 19 % gesetzl. MwSt. · Kostenfreier Expressversand"
              : "Incl. 19% VAT · Complimentary Express Shipping"}
          </p>
        </div>

        <div className="text-right">
          <span className="block font-mono text-xs font-medium text-zinc-700">
            SKU: {selectedVariant?.sku ?? product.sku}
          </span>
          {isOutOfStock ? (
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-amber-700">
              <span className="h-2 w-2 rounded-full bg-amber-500" />
              {isDe ? "Nachproduktion läuft" : "Currently Restocking"}
            </span>
          ) : (
            <span className="mt-1 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              {isDe
                ? `${selectedVariant?.stock ?? product.stock} Stk. auf Lager`
                : `${selectedVariant?.stock ?? product.stock} units in stock`}
            </span>
          )}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between text-xs">
          <span className="font-semibold uppercase tracking-wider text-zinc-500">
            {isDe
              ? "Ausführung & Oberflächen-Finish"
              : "Edition & Surface Finish"}
          </span>
          <span className="font-medium text-zinc-900">
            {selectedVariant?.finish}
          </span>
        </div>

        <div
          role="radiogroup"
          aria-label={
            isDe ? "Produktvariante wählen" : "Select product variant"
          }
          className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2"
        >
          {product.variants.map((variant) => {
            const active = selectedVariant?.id === variant.id;
            return (
              <button
                key={variant.id}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setSelectedVariant(variant)}
                className={cn(
                  "flex items-center justify-between rounded-xl border p-3.5 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950",
                  active
                    ? "border-zinc-950 bg-white shadow-xs ring-1 ring-zinc-950"
                    : "border-zinc-200 bg-white/70 hover:border-zinc-300 hover:bg-white",
                )}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="h-5 w-5 shrink-0 rounded-full border border-zinc-300 shadow-inner"
                    style={{ backgroundColor: variant.hex }}
                  />
                  <div>
                    <p className="text-xs font-semibold text-zinc-950">
                      {variant.name}
                    </p>
                    <p className="text-[11px] text-zinc-500">
                      {variant.finish}
                    </p>
                  </div>
                </div>
                {variant.priceDelta > 0 && (
                  <span className="font-mono text-[11px] font-medium text-zinc-600">
                    +{formatCurrency(variant.priceDelta)}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="inline-flex h-12 items-center justify-between rounded-xl border border-zinc-200 bg-white px-3 sm:w-36">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            disabled={quantity <= 1 || isOutOfStock}
            aria-label={isDe ? "Menge reduzieren" : "Decrease quantity"}
            className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 disabled:opacity-40"
          >
            <Minus className="h-3.5 w-3.5" />
          </button>
          <span className="font-mono text-sm font-semibold text-zinc-950">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() =>
              setQuantity((q) =>
                Math.min(selectedVariant?.stock ?? product.stock, q + 1),
              )
            }
            disabled={
              isOutOfStock ||
              quantity >= (selectedVariant?.stock ?? product.stock)
            }
            aria-label={isDe ? "Menge erhöhen" : "Increase quantity"}
            className="rounded-lg p-1.5 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950 disabled:opacity-40"
          >
            <Plus className="h-3.5 w-3.5" />
          </button>
        </div>

        <button
          type="button"
          onClick={handleAddToCart}
          disabled={isOutOfStock || isPending}
          className={cn(
            "flex h-12 flex-1 items-center justify-center gap-2.5 rounded-xl px-6 text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2",
            isOutOfStock
              ? "cursor-not-allowed bg-zinc-200 text-zinc-500"
              : justAdded
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-600/20"
                : "bg-zinc-950 text-white shadow-lg shadow-zinc-950/10 hover:bg-zinc-800",
          )}
        >
          {isOutOfStock ? (
            <span>
              {isDe ? "Derzeit in Nachproduktion" : "Currently Restocking"}
            </span>
          ) : justAdded ? (
            <>
              <Check className="h-4 w-4" />
              <span>
                {isDe
                  ? `Im Warenkorb (${optimisticCartQty}× gesamt)`
                  : `Added to Bag (${optimisticCartQty}× total)`}
              </span>
            </>
          ) : (
            <>
              <ShoppingBag className="h-4 w-4" />
              <span>
                {isDe ? "In den Warenkorb" : "Add to Bag"} ·{" "}
                {formatCurrency(effectivePrice * quantity)}
              </span>
            </>
          )}
        </button>
      </div>

      {optimisticCartQty > 0 && (
        <div className="flex items-center justify-between rounded-xl border border-emerald-200/80 bg-emerald-50/70 px-3.5 py-2.5 text-xs text-emerald-900">
          <span>
            {isDe ? (
              <>
                Bereits{" "}
                <strong className="font-mono">{optimisticCartQty}×</strong> in
                Ihrem Warenkorb hinterlegt
              </>
            ) : (
              <>
                Currently{" "}
                <strong className="font-mono">{optimisticCartQty}×</strong> in
                your shopping bag
              </>
            )}
          </span>
          <button
            type="button"
            onClick={() => setCartOpen(true)}
            className="font-semibold underline underline-offset-2 hover:text-emerald-950"
          >
            {isDe ? "Warenkorb anzeigen →" : "View Bag →"}
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2.5 border-t border-zinc-200/80 pt-4 text-xs text-zinc-600 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <Truck className="h-4 w-4 shrink-0 text-zinc-900" />
          <span>{product.leadTime}</span>
        </div>
        <div className="flex items-center gap-2">
          <ShieldCheck className="h-4 w-4 shrink-0 text-zinc-900" />
          <span>{isDe ? "5 Jahre Werksgarantie" : "5-Year Warranty"}</span>
        </div>
        <div className="flex items-center gap-2">
          <span>
            {isDe ? "30 Tage Studio-Testphase" : "30-Day Studio Trial"}
          </span>
        </div>
      </div>
    </div>
  );
}
