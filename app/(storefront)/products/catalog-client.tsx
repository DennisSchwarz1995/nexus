'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Loader2,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { Product } from '@/types';
import { PRODUCT_CATEGORIES } from '@/lib/commerce';
import { ProductCard } from '@/components/ui/product-card';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn, formatCurrency } from '@/lib/utils';

const BATCH_SIZE = 12;

export function CatalogClient({ initialProducts }: { initialProducts: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialCategory = searchParams.get('category') || 'ALL';
  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2200);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const catParam = searchParams.get('category');
    if (catParam) {
      setSelectedCategory(catParam);
    } else {
      setSelectedCategory('ALL');
    }
  }, [searchParams]);

  // Reset visible count whenever filters change
  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = [...initialProducts];

    if (selectedCategory !== 'ALL') {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    if (maxPrice < 2200) {
      result = result.filter((p) => p.price <= maxPrice);
    }

    if (inStockOnly) {
      result = result.filter((p) => p.status !== 'out_of_stock' && p.stock > 0);
    }

    result.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'sales':
          return b.monthlySales - a.monthlySales;
        case 'featured':
        default:
          return Number(b.featured) - Number(a.featured) || b.monthlySales - a.monthlySales;
      }
    });

    return result;
  }, [initialProducts, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

  // IntersectionObserver for smooth Infinite Scroll
  useEffect(() => {
    const target = loadMoreTriggerRef.current;
    if (!target || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting && !isLoadingMore) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(filteredProducts.length, prev + BATCH_SIZE)
            );
            setIsLoadingMore(false);
          }, 220);
        }
      },
      { rootMargin: '240px' }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, [hasMore, isLoadingMore, filteredProducts.length]);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSearchQuery('');
    setMaxPrice(2200);
    setInStockOnly(false);
    setSortBy('featured');
    router.replace('/products', { scroll: false });
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-200/80 pb-8 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
            <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
            <span>Gesamtkatalog // 2026</span>
          </div>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            Präzisions-Komponenten & Systeme
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            Echtzeit-Filterung kombiniert mit verzögerungsfreiem Infinite-Scroll über alle {initialProducts.length} freigegebenen Manufaktur-Artikel.
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 py-2 text-xs text-zinc-600">
            Zeige <strong className="font-mono font-semibold text-zinc-950">{visibleProducts.length}</strong> von{' '}
            <strong className="font-mono font-semibold text-zinc-950">{filteredProducts.length}</strong> Produkten
          </div>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        <button
          type="button"
          onClick={() => setSelectedCategory('ALL')}
          className={cn(
            'shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
            selectedCategory === 'ALL'
              ? 'bg-zinc-950 text-white shadow-sm'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
          )}
        >
          Alle Disziplinen ({initialProducts.length})
        </button>
        {PRODUCT_CATEGORIES.map((category) => {
          const count = initialProducts.filter((p) => p.category === category).length;
          const active = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={cn(
                'shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
                active
                  ? 'bg-zinc-950 text-white shadow-sm'
                  : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
              )}
            >
              {category} <span className="ml-1 font-mono opacity-65">({count})</span>
            </button>
          );
        })}
      </div>

      {/* Filter & Sort Controls Toolbar */}
      <div className="mt-4 grid grid-cols-1 gap-3 rounded-2xl border border-zinc-200/80 bg-zinc-50/60 p-4 md:grid-cols-12 md:items-center">
        {/* Search Input */}
        <div className="relative md:col-span-4">
          <Search className="pointer-events-none absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Modell, Werkstoff oder SKU filtern..."
            aria-label="Produkte filtern"
            className="h-10 w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
        </div>

        {/* Price Ceiling Slider */}
        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 md:col-span-3">
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          <div className="flex-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">Max. Preis</span>
              <span className="font-mono font-semibold text-zinc-900">
                {maxPrice >= 2200 ? 'Unbegrenzt' : formatCurrency(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={150}
              max={2200}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label="Maximaler Preis"
              className="mt-1 h-1.5 w-full cursor-pointer appearance-none rounded-lg bg-zinc-200 accent-zinc-950"
            />
          </div>
        </div>

        {/* Availability Switch (Radix Switch) */}
        <div className="flex h-10 items-center justify-between gap-2 rounded-xl border border-zinc-200 bg-white px-3.5 md:col-span-2">
          <label
            htmlFor="stock-switch"
            className="cursor-pointer text-xs font-medium text-zinc-700"
          >
            Auf Lager
          </label>
          <Switch
            id="stock-switch"
            checked={inStockOnly}
            onCheckedChange={setInStockOnly}
            aria-label="Nur sofort lieferbare Produkte anzeigen"
          />
        </div>

        {/* Sort Select (Radix Select) */}
        <div className="flex items-center gap-2 md:col-span-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger aria-label="Sortierung wählen">
              <SelectValue placeholder="Sortierung" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Empfohlen & Flaggschiffe</SelectItem>
              <SelectItem value="sales">Meistverkauft</SelectItem>
              <SelectItem value="rating">Beste Bewertung</SelectItem>
              <SelectItem value="price-asc">Preis: Aufsteigend</SelectItem>
              <SelectItem value="price-desc">Preis: Absteigend</SelectItem>
            </SelectContent>
          </Select>

          {(selectedCategory !== 'ALL' ||
            searchQuery ||
            maxPrice < 2200 ||
            inStockOnly ||
            sortBy !== 'featured') && (
            <button
              type="button"
              onClick={handleResetFilters}
              title="Filter zurücksetzen"
              aria-label="Alle Filter zurücksetzen"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
            >
              <RotateCcw className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="my-16 flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/40 px-6 py-16 text-center">
          <p className="text-base font-semibold text-zinc-900">
            Keine Produkte entsprechen Ihren aktuellen Filterkriterien
          </p>
          <p className="mt-1 max-w-md text-xs text-zinc-500">
            Passen Sie den Preisrahmen oder den Suchbegriff an, um weitere Komponenten anzuzeigen.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Alle Filter zurücksetzen
          </button>
        </div>
      ) : (
        <>
          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          {/* Infinite Scroll Sentinel & Progress */}
          <div
            ref={loadMoreTriggerRef}
            className="mt-14 flex flex-col items-center justify-center border-t border-zinc-200/70 pt-10"
          >
            <div className="w-full max-w-xs">
              <div className="flex justify-between text-xs text-zinc-500">
                <span>Katalog-Fortschritt</span>
                <span className="font-mono font-medium text-zinc-900">
                  {visibleProducts.length} / {filteredProducts.length}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                <div
                  className="h-full bg-zinc-950 transition-all duration-300"
                  style={{
                    width: `${Math.min(
                      100,
                      (visibleProducts.length / Math.max(1, filteredProducts.length)) * 100
                    )}%`,
                  }}
                />
              </div>
            </div>

            {hasMore ? (
              <button
                type="button"
                onClick={() =>
                  setVisibleCount((prev) =>
                    Math.min(filteredProducts.length, prev + BATCH_SIZE)
                  )
                }
                disabled={isLoadingMore}
                className="mt-6 inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 text-xs font-semibold text-zinc-900 shadow-xs transition-all hover:border-zinc-300 hover:bg-zinc-50"
              >
                {isLoadingMore ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin text-zinc-500" />
                    <span>Lade weitere Produkte...</span>
                  </>
                ) : (
                  <span>Weitere {Math.min(BATCH_SIZE, filteredProducts.length - visibleCount)} Produkte laden (Auto-Scroll aktiv)</span>
                )}
              </button>
            ) : (
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>Alle {filteredProducts.length} Produkte dieser Ansicht geladen.</span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
