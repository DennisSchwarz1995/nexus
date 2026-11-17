import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ChevronRight,
  Star,
  Cpu,
  Ruler,
  Scale,
  ArrowLeft,
  CheckCircle2,
} from 'lucide-react';
import {
  ALL_PRODUCTS,
  getProductBySlug,
  getRelatedProducts,
} from '@/lib/commerce';
import { AddToCart } from './add-to-cart';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ProductCard } from '@/components/ui/product-card';

export const revalidate = 3600;

export async function generateStaticParams() {
  // Pre-generate static routes (SSG) for the top 24 products; others generated on-demand via ISR
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
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      {/* Breadcrumb Navigation */}
      <nav
        aria-label="Breadcrumb"
        className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-200/80 pb-5 text-xs text-zinc-500"
      >
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="hover:text-zinc-950">
              Storefront
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
          <li>
            <Link href="/products" className="hover:text-zinc-950">
              Katalog
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
          <li>
            <Link
              href={`/products?category=${encodeURIComponent(product.category)}`}
              className="hover:text-zinc-950"
            >
              {product.category}
            </Link>
          </li>
          <ChevronRight className="h-3.5 w-3.5 text-zinc-300" />
          <li className="font-medium text-zinc-950">{product.name}</li>
        </ol>

        <Link
          href="/products"
          className="inline-flex items-center gap-1.5 font-medium text-zinc-700 hover:text-zinc-950"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span>Zurück zum Katalog</span>
        </Link>
      </nav>

      {/* Main Split Product Layout */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-12">
        {/* Left Column: High-Resolution Visuals & Technical Blueprint */}
        <div className="space-y-4 lg:col-span-6">
          <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-100">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.badge && (
              <span className="absolute left-4 top-4 rounded-xl bg-zinc-950/90 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                {product.badge}
              </span>
            )}
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-2 gap-4">
              {product.images.slice(1).map((imgUrl, idx) => (
                <div
                  key={idx}
                  className="aspect-[4/3] overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-100"
                >
                  <img
                    src={imgUrl}
                    alt={`${product.name} Detailansicht ${idx + 2}`}
                    className="h-full w-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          {/* Physical Dimensions & Materials Card */}
          <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/50 p-6">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Physische Parameter & Werkstoffe
            </h2>
            <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-start gap-2.5">
                <Ruler className="mt-0.5 h-4 w-4 text-zinc-500" />
                <div>
                  <p className="text-[11px] text-zinc-400">Abmessungen</p>
                  <p className="font-mono text-xs font-semibold text-zinc-900">
                    {product.dimensions}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Scale className="mt-0.5 h-4 w-4 text-zinc-500" />
                <div>
                  <p className="text-[11px] text-zinc-400">Nettogewicht</p>
                  <p className="font-mono text-xs font-semibold text-zinc-900">
                    {product.weight}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2.5">
                <Cpu className="mt-0.5 h-4 w-4 text-zinc-500" />
                <div>
                  <p className="text-[11px] text-zinc-400">Rendering</p>
                  <p className="font-mono text-xs font-semibold text-zinc-900">
                    SSG + ISR (3600s)
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-1.5 border-t border-zinc-200/70 pt-4">
              {product.materials.map((mat) => (
                <span
                  key={mat}
                  className="rounded-lg border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-700"
                >
                  {mat}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Product Header, Interactive Client AddToCart, Specs & Radix Accordion */}
        <div className="space-y-8 lg:col-span-6">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-500">
                {product.category}
              </span>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-3 py-1 text-xs">
                <Star className="h-3.5 w-3.5 fill-zinc-950 text-zinc-950" />
                <span className="font-mono font-semibold text-zinc-950">
                  {product.rating.toFixed(2)}
                </span>
                <span className="text-zinc-400">
                  ({product.reviewCount} verifizierte Bewertungen)
                </span>
              </div>
            </div>

            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
              {product.name}
            </h1>

            <p className="mt-2 text-base font-medium text-zinc-600">
              {product.subtitle}
            </p>

            <p className="mt-4 text-sm leading-relaxed text-zinc-600">
              {product.description}
            </p>
          </div>

          {/* Client Component: Interactive Variant & Optimistic Cart Action */}
          <AddToCart product={product} />

          {/* Technical Specifications Table */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              Technische Spezifikationen
            </h2>
            <dl className="mt-3 divide-y divide-zinc-200/80 rounded-2xl border border-zinc-200/80 bg-white">
              {product.specs.map((spec) => (
                <div
                  key={spec.label}
                  className="grid grid-cols-1 gap-1 px-4 py-3 text-xs sm:grid-cols-3 sm:gap-4"
                >
                  <dt className="font-medium text-zinc-500">{spec.label}</dt>
                  <dd className="font-mono font-medium text-zinc-900 sm:col-span-2">
                    {spec.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Accessible Radix UI Accordion */}
          <div className="rounded-2xl border border-zinc-200/80 bg-white px-5">
            <Accordion type="single" collapsible defaultValue="item-1">
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  Fertigungstoleranzen & Qualitätsprüfung
                </AccordionTrigger>
                <AccordionContent>
                  Jede Einheit wird nach der 5-Achsen-CNC-Bearbeitung optisch vermessen und einem 24-stündigen Burn-In-Zyklus unterzogen. Ein individuell signiertes Messprotokoll mit Seriennummer liegt jeder Auslieferung bei.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>
                  Lieferumfang & Nachhaltige Verpackung
                </AccordionTrigger>
                <AccordionContent>
                  Geliefert in einem maßgefertigten Transportkoffer aus recyceltem Verbundwerkstoff mit hochdichter Formschaumeinlage, inklusive Kalibrierungszertifikat, geflochtenem Anschlusskabel und Mikrofasertuch.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="border-b-0">
                <AccordionTrigger>
                  5 Jahre NEXUS Manufaktur-Garantie & 30 Tage Rückgaberecht
                </AccordionTrigger>
                <AccordionContent>
                  Testen Sie das System 30 Tage lang unverbindlich in Ihrer eigenen Studio- oder Arbeitsumgebung. Sollte es Ihre Erwartungen nicht übertreffen, organisieren wir die kostenfreie Abholung per DHL Express.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="mt-20 border-t border-zinc-200/80 pt-14">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
                System-Erweiterung
              </span>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
                Kompatible Komponenten aus {product.category}
              </h2>
            </div>
            <CheckCircle2 className="h-5 w-5 text-zinc-300" />
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
