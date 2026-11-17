'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import {
  Search,
  SlidersHorizontal,
  RotateCcw,
  Loader2,
  CheckCircle2,
  Sparkles,
  ChevronRight,
} from 'lucide-react';
import { Product } from '@/types';
import {
  getCategoryBySlug,
  getCategoryByValue,
  getCategoryPath,
  PRODUCT_CATEGORIES,
} from '@/lib/commerce';
import { useLocale, localizeProduct, translateCategory } from '@/lib/i18n';
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

export function CatalogClient({
  initialProducts,
  activeCategorySlug,
}: {
  initialProducts: Product[];
  activeCategorySlug?: string;
}) {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  const searchParams = useSearchParams();
  const router = useRouter();

  const activeCategoryConfig = activeCategorySlug
    ? getCategoryBySlug(activeCategorySlug)
    : undefined;

  const selectedCategory = activeCategoryConfig ? activeCategoryConfig.value : 'ALL';

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<number>(2200);
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [visibleCount, setVisibleCount] = useState<number>(BATCH_SIZE);
  const [isLoadingMore, setIsLoadingMore] = useState<boolean>(false);

  const loadMoreTriggerRef = useRef<HTMLDivElement | null>(null);

  // Backwards compatibility: redirect legacy /products?category=... to /products/[category-slug]
  useEffect(() => {
    if (activeCategorySlug) return;
    const legacyCategoryParam = searchParams.get('category');
    if (legacyCategoryParam) {
      const mapped = getCategoryByValue(legacyCategoryParam);
      if (mapped) {
        router.replace(`/products/${mapped.slug}`);
      } else {
        router.replace('/products');
      }
    }
  }, [activeCategorySlug, searchParams, router]);

  useEffect(() => {
    setVisibleCount(BATCH_SIZE);
  }, [selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const filteredProducts = useMemo(() => {
    let result = initialProducts.map((p) => localizeProduct(p, locale));

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
  }, [initialProducts, locale, selectedCategory, searchQuery, maxPrice, inStockOnly, sortBy]);

  const visibleProducts = useMemo(
    () => filteredProducts.slice(0, visibleCount),
    [filteredProducts, visibleCount]
  );

  const hasMore = visibleCount < filteredProducts.length;

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
    setSearchQuery('');
    setMaxPrice(2200);
    setInStockOnly(false);
    setSortBy('featured');
    if (activeCategorySlug) {
      router.push('/products');
    }
  };

  const activeCategoryDisplayName = activeCategoryConfig
    ? isDe
      ? activeCategoryConfig.labelDe
      : activeCategoryConfig.labelEn
    : 'Collection';

  const activeCategoryDescription = activeCategoryConfig
    ? isDe
      ? activeCategoryConfig.descriptionDe
      : activeCategoryConfig.descriptionEn
    : isDe
    ? `Entdecken Sie alle ${initialProducts.length} gefertigten Modelle aus unseren fünf Atelier-Disziplinen.`
    : `Explore all ${initialProducts.length} precision-crafted models across our five studio disciplines.`;

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Page Header with Dynamic Breadcrumbs & h1 */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-200/80 pb-8 md:flex-row md:items-end">
        <div>
          {activeCategoryConfig ? (
            <nav
              aria-label="Breadcrumb"
              className="mb-2.5 flex items-center gap-1.5 text-xs text-zinc-500"
            >
              <Link
                href="/products"
                className="font-medium text-zinc-500 transition-colors hover:text-zinc-950"
              >
                Collection
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
              <span className="font-semibold text-zinc-950">
                {activeCategoryDisplayName}
              </span>
            </nav>
          ) : (
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
              <span>
                {isDe ? 'Atelier Kollektion // 2026' : 'Atelier Collection // 2026'}
              </span>
            </div>
          )}

          <h1 className="mt-1 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {activeCategoryDisplayName}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-zinc-500">
            {activeCategoryDescription}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start md:self-auto">
          <div className="rounded-xl border border-zinc-200 bg-zinc-50/80 px-3.5 py-2 text-xs text-zinc-600">
            {isDe ? (
              <>
                Zeige{' '}
                <strong className="font-mono font-semibold text-zinc-950">
                  {visibleProducts.length}
                </strong>{' '}
                von{' '}
                <strong className="font-mono font-semibold text-zinc-950">
                  {filteredProducts.length}
                </strong>{' '}
                Modellen
              </>
            ) : (
              <>
                Showing{' '}
                <strong className="font-mono font-semibold text-zinc-950">
                  {visibleProducts.length}
                </strong>{' '}
                of{' '}
                <strong className="font-mono font-semibold text-zinc-950">
                  {filteredProducts.length}
                </strong>{' '}
                models
              </>
            )}
          </div>
        </div>
      </div>

      {/* Speaking URL Category Pills Bar */}
      <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
        <Link
          href="/products"
          className={cn(
            'shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
            selectedCategory === 'ALL'
              ? 'bg-zinc-950 text-white shadow-xs'
              : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
          )}
        >
          {isDe
            ? `Alle Modelle (${initialProducts.length})`
            : `All Models (${initialProducts.length})`}
        </Link>
        {PRODUCT_CATEGORIES.map((category) => {
          const count = initialProducts.filter((p) => p.category === category).length;
          const active = selectedCategory === category;
          const categoryHref = getCategoryPath(category);
          return (
            <Link
              key={category}
              href={categoryHref}
              className={cn(
                'shrink-0 rounded-xl px-4 py-2 text-xs font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950',
                active
                  ? 'bg-zinc-950 text-white shadow-xs'
                  : 'border border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-950'
              )}
            >
              {translateCategory(category, locale)}{' '}
              <span className="ml-1 font-mono opacity-65">({count})</span>
            </Link>
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
            placeholder={
              isDe
                ? 'Modell, Werkstoff oder Artikelnummer filtern...'
                : 'Filter by model, material, or SKU...'
            }
            aria-label={isDe ? 'Produkte filtern' : 'Filter products'}
            className="h-10 w-full rounded-xl border border-zinc-200 bg-white pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none focus:ring-1 focus:ring-zinc-950"
          />
        </div>

        {/* Price Ceiling Slider */}
        <div className="flex items-center gap-3 rounded-xl border border-zinc-200 bg-white px-3.5 py-2 md:col-span-3">
          <SlidersHorizontal className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
          <div className="flex-1">
            <div className="flex justify-between text-[11px]">
              <span className="text-zinc-500">
                {isDe ? 'Max. Preis' : 'Max. Price'}
              </span>
              <span className="font-mono font-semibold text-zinc-900">
                {maxPrice >= 2200
                  ? isDe
                    ? 'Alle Preise'
                    : 'Any Price'
                  : formatCurrency(maxPrice)}
              </span>
            </div>
            <input
              type="range"
              min={150}
              max={2200}
              step={50}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              aria-label={isDe ? 'Maximaler Preis' : 'Maximum price'}
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
            {isDe ? 'Auf Lager' : 'In Stock'}
          </label>
          <Switch
            id="stock-switch"
            checked={inStockOnly}
            onCheckedChange={setInStockOnly}
            aria-label={
              isDe
                ? 'Nur sofort lieferbare Produkte anzeigen'
                : 'Show in-stock items only'
            }
          />
        </div>

        {/* Sort Select (Radix Select) */}
        <div className="flex items-center gap-2 md:col-span-3">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger aria-label={isDe ? 'Sortierung wählen' : 'Sort by'}>
              <SelectValue placeholder={isDe ? 'Sortierung' : 'Sort by'} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">
                {isDe ? 'Empfohlen & Flaggschiffe' : 'Featured & Flagships'}
              </SelectItem>
              <SelectItem value="sales">
                {isDe ? 'Meistgefragt' : 'Most Popular'}
              </SelectItem>
              <SelectItem value="rating">
                {isDe ? 'Beste Bewertung' : 'Highest Rated'}
              </SelectItem>
              <SelectItem value="price-asc">
                {isDe ? 'Preis: Aufsteigend' : 'Price: Low to High'}
              </SelectItem>
              <SelectItem value="price-desc">
                {isDe ? 'Preis: Absteigend' : 'Price: High to Low'}
              </SelectItem>
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
              title={isDe ? 'Filter zurücksetzen' : 'Reset filters'}
              aria-label={isDe ? 'Alle Filter zurücksetzen' : 'Reset all filters'}
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
            {isDe
              ? 'Keine Modelle entsprechen Ihrer aktuellen Auswahl'
              : 'No models match your current filter selection'}
          </p>
          <p className="mt-1 max-w-md text-xs text-zinc-500">
            {isDe
              ? 'Passen Sie den Preisrahmen oder den Suchbegriff an, um weitere Komponenten anzuzeigen.'
              : 'Adjust the price range or search term to explore additional instruments.'}
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-semibold text-white hover:bg-zinc-800"
          >
            <RotateCcw className="h-3.5 w-3.5" />
            <span>{isDe ? 'Alle Filter zurücksetzen' : 'Reset all filters'}</span>
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
                <span>
                  {isDe ? 'Angezeigte Modelle' : 'Models displayed'}
                </span>
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
                    <span>
                      {isDe ? 'Lade weitere Modelle...' : 'Loading more models...'}
                    </span>
                  </>
                ) : (
                  <span>
                    {isDe
                      ? `Weitere ${Math.min(
                          BATCH_SIZE,
                          filteredProducts.length - visibleCount
                        )} Modelle anzeigen`
                      : `Load ${Math.min(
                          BATCH_SIZE,
                          filteredProducts.length - visibleCount
                        )} more models`}
                  </span>
                )}
              </button>
            ) : (
              <div className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                <CheckCircle2 className="h-3.5 w-3.5" />
                <span>
                  {isDe
                    ? `Alle ${filteredProducts.length} Modelle dieser Ansicht geladen.`
                    : `All ${filteredProducts.length} models in this view loaded.`}
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
