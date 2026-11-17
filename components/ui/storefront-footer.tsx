'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowUpRight, Shield, Layers, Compass } from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { DASHBOARD_URL } from '@/lib/utils';

export function StorefrontFooter() {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  return (
    <footer className="border-t border-zinc-200/80 bg-zinc-50/60 text-zinc-600">
      {/* Authentic Brand Value Pillars */}
      <div className="border-b border-zinc-200/70 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 divide-y divide-zinc-200/70 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          <div className="flex items-start gap-4 p-6 lg:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Compass className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                {isDe ? '5-Achsen CNC-Fertigung' : '5-Axis CNC Engineering'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {isDe
                  ? 'Jedes Gehäuse wird aus dem Vollen gefräst, glasperlgestrahlt und nach Industriestandard harteloxiert.'
                  : 'Every chassis is milled from solid billet, bead-blasted, and Type-III hard-anodized.'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 lg:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                {isDe ? 'Authentische Werkstoffe' : 'Authentic Materials'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {isDe
                  ? 'Grade-5-Titan, 6063-T6 Flugzeugaluminium, PVD-Messing und FSC-zertifizierter Schwarznussbaum.'
                  : 'Grade-5 titanium, 6063-T6 aerospace aluminum, PVD brass, and FSC-certified black walnut.'}
              </p>
            </div>
          </div>
          <div className="flex items-start gap-4 p-6 lg:p-8">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
              <Shield className="h-4 w-4" />
            </div>
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
                {isDe ? '5 Jahre Werksgarantie' : '5-Year Manufacture Warranty'}
              </h3>
              <p className="mt-1 text-xs leading-relaxed text-zinc-500">
                {isDe
                  ? 'Langfristige modulare Ersatzteilversorgung, 30 Tage Probehören im eigenen Studio & Express-Service.'
                  : 'Long-term modular spare parts availability, 30-day studio trial, and priority express service.'}
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
              {isDe
                ? 'Präzisionsgefertigte Audio-, Licht- und Arbeitsplatz-Systeme für Tonstudios, Architekten und anspruchsvolle Arbeitsumgebungen. Entwickelt in München.'
                : 'Precision-crafted audio, lighting, and workspace systems for mastering studios, architects, and discerning professionals. Engineered in Munich.'}
            </p>
            <div className="pt-1 font-mono text-[11px] text-zinc-400">
              {isDe
                ? 'München · Zürich · Stockholm'
                : 'Munich · Zurich · Stockholm'}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              {isDe ? 'Kollektionen' : 'Collections'}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/products?category=Audio+%26+Acoustics"
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Audio & Akustik' : 'Audio & Acoustics'}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Precision+Input"
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Präzisions-Eingabe' : 'Precision Input'}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Workstations"
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Workstations & Docks' : 'Thunderbolt 5 Workstations'}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Architectural+Lighting"
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Architektur-Licht' : 'Architectural Lighting'}
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Modular+Desk"
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Modulare Tischsysteme' : 'Modular Desk Systems'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              {isDe ? 'Kundenservice & Shop' : 'Client Services'}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link href="/products" className="hover:text-zinc-950">
                  {isDe ? 'Gesamtkatalog (144 Modelle)' : 'Full Catalog (144 Models)'}
                </Link>
              </li>
              <li>
                <Link
                  href="/products/aether-one-planar-headphones"
                  className="hover:text-zinc-950"
                >
                  Aether One Planar Studio
                </Link>
              </li>
              <li>
                <Link
                  href="/products/atelier-desk-system-walnut"
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Atelier Modul-Schreibtisch' : 'Atelier Modular Desk'}
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-zinc-950">
                  {isDe ? 'Warenkorb & Versand' : 'Shopping Bag & Shipping'}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-zinc-900">
              {isDe ? 'Plattform & System' : 'Platform & System'}
            </h4>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <Link
                  href="/architecture"
                  className="inline-flex items-center gap-1 font-medium text-zinc-900 hover:underline"
                >
                  <span>
                    {isDe
                      ? 'Systemarchitektur & Tech-Stack'
                      : 'Architecture & Tech Stack'}
                  </span>
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
              <li>
                <a
                  href={`${DASHBOARD_URL}/overview`}
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Admin-Dashboard (KPIs)' : 'Admin Dashboard (KPIs)'}
                </a>
              </li>
              <li>
                <a
                  href={`${DASHBOARD_URL}/analytics`}
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Traffic-Heatmaps & Analytics' : 'Traffic Heatmaps & Analytics'}
                </a>
              </li>
              <li>
                <a
                  href={`${DASHBOARD_URL}/inventory`}
                  className="hover:text-zinc-950"
                >
                  {isDe ? 'Inventarverwaltung' : 'Inventory Management'}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-zinc-200/70 pt-6 text-[11px] text-zinc-400 sm:flex-row">
          <p>
            © {new Date().getFullYear()} NEXUS Industrial Design GmbH.{' '}
            {isDe ? 'Alle Rechte vorbehalten.' : 'All rights reserved.'}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/architecture" className="hover:text-zinc-700">
              {isDe ? 'Core Web Vitals & Architektur' : 'Core Web Vitals & Architecture'}
            </Link>
            <span>·</span>
            <span>{isDe ? 'Impressum & Datenschutz' : 'Legal & Privacy'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
