import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Shield, Cpu, Layers } from 'lucide-react';
import { DASHBOARD_URL } from '@/lib/utils';

export function StorefrontFooter() {
  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/60 text-zinc-600">
      {/* Architectural Performance Banner */}
      <div className="border-b border-zinc-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-zinc-200/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-start gap-4 p-6 lg:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Cpu className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                Performance-First RSC
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Zero-Client-Overhead Server Components mit Incremental Static Regeneration (LCP &lt; 0,8s).
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 lg:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                Präzisions-Manufaktur
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                CNC-gefrästes Grade-5-Titan, 6063-T6 Flugzeugaluminium und FSC-zertifiziertes Massivholz.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 lg:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                5 Jahre Werksgarantie
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                Modulare Ersatzteilversorgung, 30 Tage Probehören im eigenen Studio & Express-Austausch.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Links & Brand Info */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-zinc-950">
              <span className="flex h-6 w-6 items-center justify-center rounded-md bg-zinc-950 text-[10px] font-bold tracking-normal text-white">
                NX
              </span>
              <span>NEXUS ATELIER</span>
            </div>
            <p className="text-xs leading-relaxed text-zinc-500">
              High-Performance E-Commerce Storefront & Admin-Telemetry-Architektur. Entwickelt mit Next.js App Router, Radix UI, TanStack Table v8 & Recharts.
            </p>
            <div className="pt-1 font-mono text-[11px] text-zinc-400">
              shop.dennis-schwarz.dev · Traefik v3 Ready
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              Kollektionen
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/products?category=Audio+%26+Acoustics" className="hover:text-zinc-950">
                  Audio & Acoustics
                </Link>
              </li>
              <li>
                <Link href="/products?category=Precision+Input" className="hover:text-zinc-950">
                  Precision Input
                </Link>
              </li>
              <li>
                <Link href="/products?category=Workstations" className="hover:text-zinc-950">
                  Thunderbolt 5 Workstations
                </Link>
              </li>
              <li>
                <Link href="/products?category=Architectural+Lighting" className="hover:text-zinc-950">
                  Architectural Lighting
                </Link>
              </li>
              <li>
                <Link href="/products?category=Modular+Desk" className="hover:text-zinc-950">
                  Modular Desk Systems
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              Architektur & Navigation
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-zinc-950">
                  Landing Page (ISR / RSC)
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-zinc-950">
                  Katalog & Infinite Scroll
                </Link>
              </li>
              <li>
                <Link href="/products/aether-one-planar-headphones" className="hover:text-zinc-950">
                  Referenz-Produktdetailseite (SSG)
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-zinc-950">
                  Warenkorb & Checkout-Simulation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              Betreiber-Konsole (Admin)
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <a
                  href={`${DASHBOARD_URL}/overview`}
                  className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:underline"
                >
                  Executive KPI Dashboard <ArrowUpRight className="h-3 w-3" />
                </a>
              </li>
              <li>
                <a
                  href={`${DASHBOARD_URL}/analytics`}
                  className="hover:text-zinc-950"
                >
                  Traffic-Heatmaps & Recharts
                </a>
              </li>
              <li>
                <a
                  href={`${DASHBOARD_URL}/inventory`}
                  className="hover:text-zinc-950"
                >
                  Inventar (TanStack Table v8)
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/70 pt-6 text-[11px] text-zinc-400 sm:flex-row">
          <p>© {new Date().getFullYear()} NEXUS Industrial Design GmbH. Alle Rechte vorbehalten.</p>
          <div className="flex items-center gap-4">
            <span>LCP: 0.78s</span>
            <span>·</span>
            <span>CLS: 0.00</span>
            <span>·</span>
            <span>Docker nginx:1.27-alpine</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
