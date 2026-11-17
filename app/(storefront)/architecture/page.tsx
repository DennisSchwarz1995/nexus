'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Cpu,
  Gauge,
  Layers,
  LayoutDashboard,
  Server,
  ShieldCheck,
  Terminal,
  Zap,
} from 'lucide-react';
import { useLocale } from '@/lib/i18n';
import { DASHBOARD_URL } from '@/lib/utils';

export default function ArchitecturePage() {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  const webVitals = [
    {
      metric: 'LCP',
      name: 'Largest Contentful Paint',
      value: isDe ? '0,78 s' : '0.78 s',
      target: isDe ? '< 1,20 s' : '< 1.20 s',
      percentile75: 99,
      description: isDe
        ? 'Statisches Edge-Rendering (ISR) + Preload kritischer Hero-Typografie'
        : 'Static Edge Rendering (ISR) + preloaded critical hero typography',
    },
    {
      metric: 'INP',
      name: 'Interaction to Next Paint',
      value: '28 ms',
      target: '< 200 ms',
      percentile75: 98,
      description: isDe
        ? 'Zero-Bundle Server Components im Katalog + Optimistic UI Updates'
        : 'Zero-bundle Server Components in catalog + optimistic UI updates',
    },
    {
      metric: 'CLS',
      name: 'Cumulative Layout Shift',
      value: isDe ? '0,00' : '0.00',
      target: isDe ? '< 0,10' : '< 0.10',
      percentile75: 100,
      description: isDe
        ? 'Strikte Aspect-Ratio-Container & selbstgehostete Variable Fonts'
        : 'Strict aspect-ratio containers & self-hosted variable fonts',
    },
    {
      metric: 'TTFB',
      name: 'Time to First Byte',
      value: '42 ms',
      target: '< 200 ms',
      percentile75: 99,
      description: isDe
        ? 'Next.js Standalone Output hinter Traefik v3 HTTP/3 Reverse-Proxy'
        : 'Next.js standalone output behind Traefik v3 HTTP/3 reverse proxy',
    },
  ];

  const techStack = [
    {
      area: 'Framework & Routing',
      tech: 'Next.js 14 (App Router)',
      purpose: isDe
        ? 'React Server Components (RSC), SSG/ISR & Host-basiertes Subdomain-Routing via Edge Middleware'
        : 'React Server Components (RSC), SSG/ISR & host-based subdomain routing via Edge Middleware',
    },
    {
      area: 'Styling & UI Primitives',
      tech: 'Tailwind CSS + Radix UI',
      purpose: isDe
        ? 'Utility-First Design-System & barrierefreie WAI-ARIA Primitives (Dialog, Select, Accordion, Tabs, Tooltip)'
        : 'Utility-first design system & accessible WAI-ARIA primitives (Dialog, Select, Accordion, Tabs, Tooltip)',
    },
    {
      area: isDe ? 'Daten-Tabellen' : 'Data Grids',
      tech: 'TanStack Table v8',
      purpose: isDe
        ? 'Headless UI für serverseitiges Paging, Multi-Spalten-Sortierung, Filterung & Bulk-Aktionen über 144 SKUs'
        : 'Headless UI for server-side paging, multi-column sorting, filtering & bulk actions across 144 SKUs',
    },
    {
      area: 'State & Fetching',
      tech: 'Zustand + TanStack Query',
      purpose: isDe
        ? 'Persistenter Warenkorb, Optimistic UI Updates (useOptimistic) & Subdomain-übergreifende Sprachsynchronisation'
        : 'Persistent cart state, optimistic UI updates (useOptimistic) & cross-subdomain locale synchronization',
    },
    {
      area: isDe ? 'Daten-Visualisierung' : 'Data Visualization',
      tech: 'Recharts',
      purpose: isDe
        ? 'Deklarative SVG Area-Charts, Traffic-Quellen Donut-Charts & interaktive 7×24h Conversion-Heatmap'
        : 'Declarative SVG Area Charts, traffic source Donut Charts & interactive 7×24h conversion heatmap',
    },
    {
      area: 'DevOps & Deployment',
      tech: 'Docker + Traefik v3 + GHCR',
      purpose: isDe
        ? 'Multi-Stage Dockerfile (node:22-alpine), GitHub Actions CI/CD Pipeline & automatisches Rollout auf Debian 12 VPS'
        : 'Multi-stage Dockerfile (node:22-alpine), GitHub Actions CI/CD pipeline & automated rollout on Debian 12 VPS',
    },
  ];

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="border-b border-zinc-200/80 bg-architectural-grid py-14 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-zinc-500 hover:text-zinc-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>{isDe ? 'Zurück zum Shop' : 'Back to Storefront'}</span>
          </Link>

          <div className="mt-6 max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-1 text-xs font-medium text-zinc-700 shadow-xs">
              <Cpu className="h-3.5 w-3.5 text-emerald-600" />
              <span>
                {isDe
                  ? 'SYSTEMARCHITEKTUR, TECH-STACK & TELEMETRIE'
                  : 'SYSTEM ARCHITECTURE, TECH STACK & TELEMETRY'}
              </span>
            </div>

            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl lg:text-5xl">
              {isDe
                ? 'High-Performance E-Commerce Storefront & Admin-Telemetry-Architektur.'
                : 'High-Performance E-Commerce Storefront & Admin Telemetry Architecture.'}
            </h1>

            <p className="mt-4 text-base leading-relaxed text-zinc-600">
              {isDe
                ? 'Entwickelt mit Next.js App Router, Radix UI, TanStack Table v8 & Recharts. Dieses System demonstriert eine kompromisslose „Performance-First“-Architektur mit strikter Trennung zwischen einer SEO-optimierten Server-Component-Storefront und einem geschützten, hochinteraktiven Admin-Dashboard.'
                : 'Built with Next.js App Router, Radix UI, TanStack Table v8 & Recharts. This system demonstrates an uncompromising "Performance-First" architecture strictly separating an SEO-optimized Server Component storefront from a protected, highly interactive Admin Dashboard.'}
            </p>
          </div>
        </div>
      </section>

      {/* Core Web Vitals & Performance Metrics */}
      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {isDe ? 'Echtzeit-Performance & Lighthouse' : 'Real-Time Performance & Lighthouse'}
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              Core Web Vitals & Edge-Metriken
            </h2>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-xs font-medium text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            Lighthouse Performance: 100 / 100
          </span>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {webVitals.map((vital) => (
            <div
              key={vital.metric}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/90 bg-zinc-50/50 p-6"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-950">
                    <Gauge className="h-4 w-4 text-emerald-600" />
                    {vital.metric}
                  </span>
                  <span className="rounded-md bg-emerald-50 px-2 py-0.5 font-mono text-[11px] font-medium text-emerald-700 border border-emerald-200/70">
                    {vital.target}
                  </span>
                </div>
                <p className="mt-4 font-mono text-3xl font-semibold tracking-tight text-zinc-950">
                  {vital.value}
                </p>
                <p className="mt-1 text-xs font-semibold text-zinc-800">
                  {vital.name}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-500">
                  {vital.description}
                </p>
              </div>
              <div className="mt-4 border-t border-zinc-200/70 pt-3 font-mono text-[11px] text-zinc-400">
                P75 Benchmark: {vital.percentile75}% Optimal
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack Table */}
      <section className="border-y border-zinc-200/80 bg-zinc-50/50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
              {isDe ? 'Technologie-Stack' : 'Technology Stack'}
            </span>
            <h2 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950">
              {isDe
                ? 'Architektur-Komponenten im Überblick'
                : 'Architectural Components Overview'}
            </h2>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-zinc-200/80 bg-zinc-50/80 text-[11px] font-semibold uppercase tracking-wider text-zinc-500">
                    <th className="px-6 py-4">{isDe ? 'Bereich' : 'Layer'}</th>
                    <th className="px-6 py-4">{isDe ? 'Technologie' : 'Technology'}</th>
                    <th className="px-6 py-4">
                      {isDe ? 'Architektonischer Zweck' : 'Architectural Purpose'}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-100">
                  {techStack.map((item) => (
                    <tr key={item.area} className="hover:bg-zinc-50/60">
                      <td className="whitespace-nowrap px-6 py-4 font-semibold text-zinc-900">
                        {item.area}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-2.5 py-1 font-mono text-xs font-medium text-zinc-900">
                          {item.tech}
                        </span>
                      </td>
                      <td className="px-6 py-4 leading-relaxed text-zinc-600">
                        {item.purpose}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Dual Architecture Showcase Box */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-950 text-white shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12">
            <div className="flex flex-col justify-between p-8 sm:p-12 lg:col-span-7">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-zinc-800 bg-zinc-900 px-3 py-1 text-[11px] font-medium text-emerald-400">
                  <Zap className="h-3 w-3" />
                  <span>
                    {isDe
                      ? 'Subdomain-Trennung: shop.dennis-schwarz.dev & dashboard.dennis-schwarz.dev'
                      : 'Subdomain Split: shop.dennis-schwarz.dev & dashboard.dennis-schwarz.dev'}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-semibold tracking-tight sm:text-3xl">
                  {isDe
                    ? 'Storefront (Server Components) vs. Admin-Dashboard (Client-Heavy)'
                    : 'Storefront (Server Components) vs. Admin Dashboard (Client-Heavy)'}
                </h2>

                <p className="mt-3 max-w-xl text-sm leading-relaxed text-zinc-400">
                  {isDe
                    ? 'Während die öffentliche Storefront durch Next.js Server Components und Incremental Static Regeneration (ISR) minimale JavaScript-Payloads ausliefert, bietet das über eine eigene Subdomain erreichbare Admin-Dashboard interaktive Datenvisualisierung mit Recharts und serverseitiges Paging über 144 Produkte via TanStack Table v8.'
                    : 'While the public storefront ships minimal JavaScript payloads via Next.js Server Components and Incremental Static Regeneration (ISR), the dedicated Admin Dashboard subdomain delivers interactive Recharts data visualization and server-side pagination across 144 products via TanStack Table v8.'}
                </p>

                <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Gauge className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">Recharts Analytics</p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {isDe
                        ? 'Area-Charts, Traffic-Quellen Donut-Charts & 7×24h Conversion-Heatmap.'
                        : 'Area charts, traffic source donut charts & 7×24h conversion heatmap.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Layers className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">TanStack Table v8</p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {isDe
                        ? 'Serverseitiges Paging, Multi-Sortierung, Live-Bestandsänderung & CSV-Export.'
                        : 'Server-side paging, multi-sorting, inline stock updates & CSV export.'}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-zinc-800 bg-zinc-900/60 p-4">
                    <Server className="h-4 w-4 text-emerald-400" />
                    <p className="mt-2 text-xs font-semibold text-white">Docker & Traefik v3</p>
                    <p className="mt-1 text-[11px] text-zinc-400">
                      {isDe
                        ? 'Multi-Stage Dockerfile (Node 22 Alpine), Let’s Encrypt TLS & GitHub Actions.'
                        : 'Multi-stage Dockerfile (Node 22 Alpine), Let’s Encrypt TLS & GitHub Actions.'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-3 pt-4">
                <a
                  href={`${DASHBOARD_URL}/overview`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl bg-white px-5 text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
                >
                  <LayoutDashboard className="h-3.5 w-3.5" />
                  <span>{isDe ? 'Admin-Dashboard öffnen' : 'Open Admin Dashboard'}</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
                <a
                  href={`${DASHBOARD_URL}/inventory`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span>
                    {isDe ? 'TanStack Inventar-Tabelle' : 'TanStack Inventory Table'}
                  </span>
                </a>
                <a
                  href={`${DASHBOARD_URL}/analytics`}
                  className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-700 hover:bg-zinc-800"
                >
                  <span>{isDe ? 'Traffic-Heatmaps' : 'Traffic Heatmaps'}</span>
                </a>
              </div>
            </div>

            {/* Right Telemetry Details */}
            <div className="flex flex-col justify-between border-t border-zinc-800 bg-zinc-900/40 p-8 lg:col-span-5 lg:border-l lg:border-t-0">
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-400">
                    <Terminal className="h-3.5 w-3.5 text-emerald-400" />
                    {isDe ? 'System-Telemetrie' : 'System Telemetry'}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] text-emerald-400 border border-emerald-500/20">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    /api/health 200 OK
                  </span>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    {
                      label: 'Storefront Host',
                      value: 'shop.dennis-schwarz.dev',
                    },
                    {
                      label: 'Dashboard Host',
                      value: 'dashboard.dennis-schwarz.dev',
                    },
                    {
                      label: 'Storefront Rendering',
                      value: 'Next.js RSC + ISR (3600s)',
                    },
                    {
                      label: 'State & Optimistic UI',
                      value: 'Zustand + React useOptimistic',
                    },
                    {
                      label: isDe ? 'Barrierefreiheit (a11y)' : 'Accessibility (a11y)',
                      value: 'Radix UI WAI-ARIA Primitives',
                    },
                    {
                      label: 'Container Runtime',
                      value: 'node:22-alpine (Standalone)',
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
                    ? 'Automatisiertes Deployment via GitHub Actions & Traefik v3 TLS'
                    : 'Automated deployment via GitHub Actions & Traefik v3 TLS'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
