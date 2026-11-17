'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Compass,
  Layers,
  ShieldCheck,
  Sparkles,
  Award,
} from 'lucide-react';
import { Product, ProductCategory } from '@/types';
import { useLocale, localizeProduct, translateCategory } from '@/lib/i18n';
import { formatCurrency } from '@/lib/utils';
import { ProductCard } from '@/components/ui/product-card';

interface CategoryCardData {
  name: ProductCategory;
  count: number;
  minPrice: number;
  image: string;
}

export function LandingClient({
  featuredProducts,
  categoryCards,
}: {
  featuredProducts: Product[];
  categoryCards: CategoryCardData[];
}) {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  const heroFlagship = featuredProducts[0]
    ? localizeProduct(featuredProducts[0], locale)
    : null;

  const craftPillars = isDe
    ? [
        {
          label: 'Werkstoff-Reinheit',
          value: 'Grade-5 Titan',
          sub: '6063-T6 Alu & Massivholz',
        },
        {
          label: 'Fertigungstoleranz',
          value: '± 0,02 mm',
          sub: '5-Achsen CNC-Manufaktur',
        },
        {
          label: 'Werksgarantie',
          value: '5 Jahre',
          sub: 'Modulare Ersatzteilgarantie',
        },
        {
          label: 'Logistik',
          value: '24h Express',
          sub: 'Versicherter Direktversand',
        },
      ]
    : [
        {
          label: 'Material Purity',
          value: 'Grade-5 Ti',
          sub: '6063-T6 Alu & Solid Timber',
        },
        {
          label: 'Milling Tolerance',
          value: '± 0.02 mm',
          sub: '5-Axis CNC Manufacture',
        },
        {
          label: 'Factory Warranty',
          value: '5 Years',
          sub: 'Modular Spare Parts Guarantee',
        },
        {
          label: 'Fulfillment',
          value: '24h Express',
          sub: 'Insured Direct Courier',
        },
      ];

  return (
    <div className="bg-white">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-architectural-grid">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-50/50 via-white/80 to-white" />

        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12">
            {/* Left Column: Editorial Typography & CTAs */}
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white/90 px-3.5 py-1.5 text-xs font-medium text-zinc-700 shadow-xs">
                <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                <span>
                  {isDe
                    ? 'ATELIER KOLLEKTION 2026 // INDUSTRIAL DESIGN & STUDIO HARDWARE'
                    : 'ATELIER COLLECTION 2026 // INDUSTRIAL DESIGN & STUDIO HARDWARE'}
                </span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-zinc-950 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.06]">
                {isDe ? (
                  <>
                    Kompromisslose Werkzeuge für{' '}
                    <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
                      akustische & räumliche Präzision.
                    </span>
                  </>
                ) : (
                  <>
                    Uncompromising instruments for{' '}
                    <span className="bg-gradient-to-r from-zinc-950 via-zinc-700 to-zinc-500 bg-clip-text text-transparent">
                      acoustic & spatial precision.
                    </span>
                  </>
                )}
              </h1>

              <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-600 sm:text-lg">
                {isDe
                  ? 'Jedes NEXUS-System entsteht aus massivem Grade-5-Titan, harteloxiertem Flugzeugaluminium und handverlesenem amerikanischem Schwarznussbaum. Konzipiert in München für Tonstudios, Architekturbüros und anspruchsvolle Arbeitsplätze.'
                  : 'Every NEXUS system is crafted from solid Grade-5 titanium, hard-anodized aerospace aluminum, and hand-selected American black walnut. Engineered in Munich for mastering studios, architectural practices, and discerning workspaces.'}
              </p>

              {/* Primary Action Buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link
                  href="/products"
                  className="inline-flex h-12 items-center gap-2.5 rounded-xl bg-zinc-950 px-6 text-sm font-medium text-white shadow-lg shadow-zinc-950/10 transition-all hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
                >
                  <span>
                    {isDe
                      ? 'Kollektion entdecken (144 Modelle)'
                      : 'Explore Collection (144 Models)'}
                  </span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                {heroFlagship && (
                  <Link
                    href={`/products/${heroFlagship.slug}`}
                    className="inline-flex h-12 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-sm font-medium text-zinc-900 shadow-xs transition-all hover:border-zinc-300 hover:bg-zinc-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
                  >
                    <span>
                      {isDe
                        ? 'Aether One Referenz ansehen'
                        : 'Discover Aether One Reference'}
                    </span>
                  </Link>
                )}
              </div>

              {/* Craftsmanship & Material Standards Strip */}
              <div className="mt-12 grid grid-cols-2 gap-3 border-t border-zinc-200/80 pt-6 sm:grid-cols-4">
                {craftPillars.map((pillar) => (
                  <div
                    key={pillar.label}
                    className="rounded-xl border border-zinc-200/70 bg-zinc-50/60 p-3"
                  >
                    <span className="text-[11px] font-medium text-zinc-500">
                      {pillar.label}
                    </span>
                    <p className="mt-1 font-mono text-base font-semibold text-zinc-950">
                      {pillar.value}
                    </p>
                    <p className="text-[11px] text-zinc-500">{pillar.sub}</p>
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
                        {isDe ? 'Referenz-Serie 01' : 'Reference Series 01'}
                      </span>
                      <span className="rounded-lg bg-zinc-950/80 px-2.5 py-1 font-mono text-[10px] text-zinc-200 backdrop-blur-md">
                        {heroFlagship.sku}
                      </span>
                    </div>
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white">
                      <div>
                        <p className="text-xs font-medium text-zinc-300">
                          {translateCategory(heroFlagship.category, locale)}
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
                          {isDe ? 'Membran' : 'Diaphragm'}
                        </p>
                        <p className="font-mono text-xs font-semibold text-zinc-900">
                          1.8 μm Planar
                        </p>
                      </div>
                      <div className="border-x border-zinc-200/70">
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          {isDe ? 'Klirrfaktor' : 'Distortion'}
                        </p>
                        <p className="font-mono text-xs font-semibold text-zinc-900">
                          &lt; 0.04% THD
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-wider text-zinc-400">
                          Chassis
                        </p>
                        <p className="font-mono text-xs font-semibold text-zinc-900">
                          Grade-5 Ti
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-1">
                      <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-700">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        {isDe
                          ? `${heroFlagship.stock} Exemplare sofort lieferbar`
                          : `${heroFlagship.stock} units ready for dispatch`}
                      </span>
                      <Link
                        href={`/products/${heroFlagship.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950 hover:underline"
                      >
                        <span>
                          {isDe ? 'Modell konfigurieren' : 'Configure Model'}
                        </span>
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

      {/* CURATED FEATURED PRODUCTS */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-zinc-400">
              <Sparkles className="h-3.5 w-3.5 text-zinc-900" />
              <span>{isDe ? 'Kuratierte Auswahl' : 'Curated Selection'}</span>
            </div>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {isDe ? 'Flaggschiff-Editionen' : 'Signature Flagship Editions'}
            </h2>
            <p className="mt-1 text-sm text-zinc-500">
              {isDe
                ? 'Unsere meistgefragten Referenz-Systeme für Tonstudios, Mastering-Räume und moderne Arbeitsarchitektur.'
                : 'Our most sought-after reference systems for mastering suites, acoustic studios, and modern workspace architecture.'}
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-zinc-50/70 px-4 py-2.5 text-xs font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
          >
            <span>
              {isDe
                ? 'Alle 144 Modelle ansehen'
                : 'Browse all 144 models'}
            </span>
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
              {isDe ? 'System-Ökosystem' : 'System Ecosystem'}
            </span>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
              {isDe
                ? 'Fünf Disziplinen. Eine Designsprache.'
                : 'Five Disciplines. One Design Language.'}
            </h2>
            <p className="mt-2 text-sm text-zinc-500">
              {isDe
                ? 'Jede Produktlinie ist mechanisch, akustisch und ästhetisch präzise aufeinander abgestimmt.'
                : 'Every product line is mechanically, acoustically, and aesthetically engineered to work in harmony.'}
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
                      {cat.count} {isDe ? 'Modelle' : 'Models'}
                    </span>
                    <h3 className="mt-2.5 text-lg font-semibold tracking-tight text-zinc-950">
                      {translateCategory(cat.name, locale)}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-500">
                      {isDe
                        ? `Ab ${formatCurrency(cat.minPrice)} inkl. MwSt.`
                        : `From ${formatCurrency(cat.minPrice)} incl. VAT`}
                    </p>
                  </div>
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-600 transition-colors group-hover:bg-zinc-950 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </div>

                <div className="mt-6 aspect-[16/9] overflow-hidden rounded-xl bg-zinc-100">
                  <img
                    src={cat.image}
                    alt={translateCategory(cat.name, locale)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ATELIER CRAFTSMANSHIP & STUDIO PHILOSOPHY */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-emerald-400">
                  <Award className="h-3.5 w-3.5" />
                  <span>
                    {isDe
                      ? 'MÜNCHNER MANUFAKTUR & AKUSTIK-LABOR'
                      : 'MUNICH MANUFACTORY & ACOUSTIC LAB'}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {isDe
                    ? 'Gebaut für Jahrzehnte. Nicht für Produktzyklen.'
                    : 'Built for decades. Not for product cycles.'}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                  {isDe
                    ? 'Wir verzichten bewusst auf verklebte Gehäuse und kurzlebige Kunststoffe. Jedes NEXUS-Produkt ist vollständig verschraubt, modular wartbar und wird vor dem Versand in unserer Münchner Manufaktur einzeln akustisch und elektrisch kalibriert.'
                    : 'We deliberately reject glued housings and short-lived plastics. Every NEXUS instrument is fully modular, serviceable, and individually calibrated in our Munich acoustic laboratory prior to dispatch.'}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Compass className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">
                      {isDe ? 'Einzel-Kalibrierung' : 'Individual Calibration'}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {isDe
                        ? 'Jede Einheit wird mit einem signierten Prüf- und Frequenzprotokoll ausgeliefert.'
                        : 'Every unit ships with a signed acoustic & electrical measurement certificate.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">
                      {isDe ? 'Modulare Bauweise' : 'Modular Construction'}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {isDe
                        ? 'Ohrpolster, Treiber, Schalter und Netzteile lassen sich werkzeuglos tauschen.'
                        : 'Ear pads, drivers, switches, and power modules can be replaced without specialized tools.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <ShieldCheck className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">
                      {isDe ? '30 Tage Studio-Test' : '30-Day Studio Trial'}
                    </p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {isDe
                        ? 'Erleben Sie unsere Systeme unverbindlich in Ihrer eigenen Raumakustik.'
                        : 'Audition our systems risk-free within your own acoustic environment.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4">
                <Link
                  href="/products"
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  <span>
                    {isDe ? 'Gesamte Kollektion entdecken' : 'Explore Full Collection'}
                  </span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  href="/products/atelier-desk-system-walnut"
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span>
                    {isDe ? 'Atelier Tischsystem konfigurieren' : 'Configure Atelier Desk System'}
                  </span>
                </Link>
              </div>
            </div>

            {/* Right Column: Material Provenance & Studio Standards */}
            <div className="flex flex-col justify-between border-t border-zinc-800 bg-zinc-900/40 p-8 lg:col-span-5 lg:border-l lg:border-t-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-400">
                    {isDe ? 'Werkstoff-Herkunft' : 'Material Provenance'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    ISO 9001 · FSC
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      label: isDe ? 'Titan-Legierung' : 'Titanium Alloy',
                      value: 'Ti-6Al-4V (Grade 5)',
                    },
                    {
                      label: isDe ? 'Aluminium-Chassis' : 'Aluminum Billet',
                      value: '6063-T6 Type-III Anodized',
                    },
                    {
                      label: isDe ? 'Massivholz' : 'Solid Hardwood',
                      value: isDe ? 'Amerikanischer Schwarznussbaum' : 'American Black Walnut',
                    },
                    {
                      label: isDe ? 'Akustik-Leder & Filz' : 'Acoustic Leather & Felt',
                      value: isDe ? '100 % Merinofilz (Süddeutschland)' : '100% German Merino Wool Felt',
                    },
                    {
                      label: isDe ? 'Signalführung' : 'Signal Conductors',
                      value: '7N OCC Ohno Continuous Cast',
                    },
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
                <span>
                  {isDe
                    ? 'Klimaneutraler Direktversand ab Manufaktur München'
                    : 'Carbon-neutral direct dispatch from our Munich manufactory'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
