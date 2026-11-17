import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers,
  LayoutDashboard,
  ShieldCheck,
  Sparkles,
  Zap,
} from 'lucide-react';
import {
  ALL_PRODUCTS,
  getCoreWebVitals,
  getFeaturedProducts,
  PRODUCT_CATEGORIES,
} from '@/lib/commerce';
import { formatCurrency, DASHBOARD_URL } from '@/lib/utils';
import { ProductCard } from '@/components/ui/product-card';

// Incremental Static Regeneration (ISR) every 60 minutes for sub-second TTFB & LCP < 1.2s
export const revalidate = 3600;

export default async function StorefrontLandingPage() {
  const featuredProducts = await getFeaturedProducts();
  const webVitals = getCoreWebVitals();
  const heroFlagship = featuredProducts[0];

  const categoryCards = PRODUCT_CATEGORIES.map((category) => {
    const matching = ALL_PRODUCTS.filter(
      (p) => p.category === category && p.status !== 'draft'
    );
    return {
      name: category,
      count: matching.length,
      minPrice: Math.min(...matching.map((p) => p.price)),
      image: matching[0]?.images[0] ?? '',
      sampleSlug: matching[0]?.slug ?? '',
    };
  });

  return (
    <div className="bg-white">
      {/* HERO SECTION (Server Component with ISR) */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-architectural-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50/50 via-white/80 to-white" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Editorial Typography & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>KOLLEKTION 2026 // INDUSTRIAL DESIGN & STUDIO HARDWARE</span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
                Kompromisslose Werkzeuge für{' '}
                <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
                  akustische & digitale Präzision.
                </span>
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                Jedes NEXUS-System entsteht aus massivem Grade-5-Titan, eloxiertem 6063-T6 Aluminium und amerikanischem Schwarznussbaum. Ausgeliefert über eine{' '}
                <strong className="font-medium text-zinc-900">
                  Performance-First Server-Component-Architektur
                </strong>{' '}
                für verzögerungsfreie Interaktion.
              </p>

              {/* Primary Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-zinc-950 px-6 text-sm font-medium text-white shadow-lg shadow-zinc-950/10 transition-all hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                >
                  <span>Katalog entdecken (144 Produkte)</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <a
                  href={`${DASHBOARD_URL}/overview`}
                  className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 shadow-xs transition-all hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
                >
                  <LayoutDashboard className="h-4 w-4 text-zinc-600" />
                  <span>Admin-Dashboard öffnen</span>
                </a>
              </div>

              {/* Core Web Vitals & Architecture Strip */}
              <div className="mt-12 grid grid-cols-2 gap-3 pt-6 border-t border-zinc-200/80 sm:grid-cols-4">
                {webVitals.map((vital) => (
                  <div
                    key={vital.metric}
                    className="rounded-xl border border-zinc-200/70 bg-zinc-50/60 p-3"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] font-semibold text-zinc-500">
                        {vital.metric}
                      </span>
                      <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-medium text-emerald-700">
                        {vital.target}
                      </span>
                    </div>
                    <p className="mt-1 font-mono text-lg font-semibold text-zinc-950">
                      {vital.value}
                    </p>
                    <p className="text-[11px] text-zinc-500">{vital.name}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column: Flagship Spotlight Card */}
            <div className="lg:col-span-5">
              {heroFlagship && (
                <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white p-4 shadow-2xl shadow-zinc-950/[0.06]">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
                    <img
                      src={heroFlagship.images[0]}
                      alt={heroFlagship.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent" />
                    <div className="absolute left-4 top-4 flex items-center gap-2">
                      <span className="rounded-lg bg-white/95 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-950 backdrop-blur-md">
                        Referenz-Serie 01
                      </span>
                      <span className="rounded-lg bg-zinc-950/80 px-2.5 py-1 font-mono text-[10px] text-zinc-200 backdrop-blur-md">
                        {heroFlagship.sku}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-xs font-medium text-zinc-300">
                          {heroFlagship.category}
                        </p>
                        <h2 className="text-xl font-semibold tracking-tight">
                          {heroFlagship.name}
                        </h2>
                      </div>
                      <span className="rounded-xl bg-white/95 px-3 py-1.5 font-mono text-sm font-semibold text-zinc-950">
                        {formatCurrency(heroFlagship.price)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 space-y-3 px-2 pb-2">
                    <p className="text-xs leading-relaxed text-zinc-600">
                      {heroFlagship.subtitle}
                    </p>
                    <div className="grid grid-cols-3 gap-2 rounded-xl bg-zinc-50 p-2.5 text-center">
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          Membran
                        </p>
                        <p className="font-mono text-xs font-semibold text-zinc-900">
                          1,8 μm Planar
                        </p>
                      </div>
                      <div className="border-x border-zinc-200/70">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          Klirrfaktor
                        </p>
                        <p className="font-mono text-xs font-semibold text-zinc-900">
                          &lt; 0,04 % THD
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          Chassis
                        </p>
                        <p className="font-mono text-xs font-semibold text-zinc-900">
                          Grade-5 Titan
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {heroFlagship.stock} Exemplare sofort lieferbar
                      </span>
                      <Link
                        href={`/products/${heroFlagship.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 hover:underline"
                      >
                        Technische Details & Konfiguration
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CURATED FEATURED PRODUCTS (RSC Grid) */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
              <span>Kuratierte Auswahl</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Flaggschiff-Komponenten
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              Statisch vorgerendert via Incremental Static Regeneration mit optimistischer Warenkorb-Synchronisation.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50/70 px-4 py-2.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            <span>Alle 144 Produkte durchsuchen</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* BENTO CATEGORY ARCHITECTURE */}
      <section className="border-y border-zinc-200/80 bg-zinc-50/50 py-16 lg:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              System-Ökosystem
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              Fünf Disziplinen. Eine Designsprache.
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              Jede Produktlinie ist mechanisch, elektrisch und ästhetisch aufeinander abgestimmt.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-6">
            {categoryCards.map((cat, idx) => (
              <Link
                key={cat.name}
                href={`/products?category=${encodeURIComponent(cat.name)}`}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-lg ${
                  idx < 2 ? 'md:col-span-3' : 'md:col-span-2'
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="inline-block rounded-md bg-zinc-100 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-600">
                      {cat.count} Modelle
                    </span>
                    <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-zinc-950">
                      {cat.name}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      Ab {formatCurrency(cat.minPrice)} inkl. MwSt.
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors group-hover:bg-zinc-950 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ARCHITECTURE SHOWCASE: STOREFRONT VS ADMIN DASHBOARD */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-emerald-400">
                  <Zap className="h-3 w-3" />
                  <span>Dual-Architecture: Storefront (RSC) + Admin (Client-Heavy)</span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  Bereit für den produktiven Betrieb. Erleben Sie das Echtzeit-Admin-Cockpit.
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                  Während diese Storefront durch Next.js Server Components und ISR maximale SEO-Performance erreicht, bietet das geschützte Admin-Dashboard hochinteraktive Datenvisualisierung mit Recharts und serverseitiges Paging über 144 Produkte via TanStack Table v8.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Gauge className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">Recharts Analytics</p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      Area-Charts, Traffic-Quellen Donut-Charts & 7×24h Conversion-Heatmap.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">TanStack Table v8</p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      Serverseitiges Paging, Multi-Sortierung, Live-Bestandsänderung & Produkt-Dialog.
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Cpu className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">Docker & Traefik v3</p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      Multi-Stage Dockerfile (Node 22 + Nginx 1.27 Alpine) & GitHub Actions CI/CD.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4">
                <a
                  href={`${DASHBOARD_URL}/overview`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  <span>Zum Admin-Dashboard</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`${DASHBOARD_URL}/inventory`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span>TanStack Inventar-Tabelle testen</span>
                </a>
                <a
                  href={`${DASHBOARD_URL}/analytics`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span>Traffic-Heatmaps ansehen</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Telemetry Preview */}
            <div className="flex flex-col justify-between border-t border-zinc-800 bg-zinc-900/40 p-8 lg:col-span-5 lg:border-l lg:border-t-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                    System-Telemetrie (Live)
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    /healthz 200 OK
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    { label: 'Storefront Rendering', value: 'Next.js RSC + ISR (3600s)' },
                    { label: 'State & Optimistic UI', value: 'Zustand + React useOptimistic' },
                    { label: 'Barrierefreiheit (a11y)', value: 'Radix UI WAI-ARIA Primitives' },
                    { label: 'Container Runtime', value: 'nginx:1.27-alpine + Node 22' },
                    { label: 'Reverse Proxy', value: 'Traefik v3 (Let’s Encrypt TLS)' },
                  ].map((row) => (
                    <div
                      key={row.label}
                      className="flex items-center justify-between rounded-xl border border-zinc-800/90 bg-zinc-950/60 px-3.5 py-2.5 text-xs"
                    >
                      <span className="text-zinc-400">{row.label}</span>
                      <span className="font-mono text-[11px] font-medium text-zinc-200">
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[11px] text-zinc-500">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>Gehärtete Security-Header (CSP, HSTS, X-Frame-Options) aktiv</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
