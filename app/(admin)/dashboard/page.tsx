'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  ArrowUpRight,
  Package,
  BarChart3,
  RefreshCw,
  CheckCircle2,
  Clock,
  Truck,
} from 'lucide-react';
import {
  getDashboardKpis,
  getRecentOrders,
  getRevenueTimeSeries,
  getTrafficSources,
} from '@/lib/commerce';
import { useLocale } from '@/lib/i18n';
import { RevenueAreaChart } from '@/components/charts/revenue-area-chart';
import { TrafficDonutChart } from '@/components/charts/traffic-donut-chart';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

export default function AdminDashboardOverviewPage() {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  const [range, setRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const kpis = useMemo(() => {
    const raw = getDashboardKpis(range);
    if (isDe) return raw;
    const labelMap: Record<string, { label: string; comp: string }> = {
      'kpi-revenue': { label: 'Net Revenue', comp: 'vs. previous period' },
      'kpi-orders': { label: 'Completed Orders', comp: 'vs. previous period' },
      'kpi-aov': { label: 'Average Order Value (AOV)', comp: 'vs. €545.70 prior' },
      'kpi-conversion': {
        label: 'Storefront Conversion Rate',
        comp: 'Industry benchmark: 2.1%',
      },
    };
    return raw.map((item) => ({
      ...item,
      label: labelMap[item.id]?.label || item.label,
      comparisonLabel: labelMap[item.id]?.comp || item.comparisonLabel,
    }));
  }, [range, isDe]);

  const revenueSeries = useMemo(() => getRevenueTimeSeries(range), [range]);
  const trafficSources = useMemo(() => getTrafficSources(), []);
  const recentOrders = useMemo(() => getRecentOrders(), []);

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Page Title & Time Range Tabs */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {isDe
              ? 'Executive Cockpit // Echtzeit-Telemetrie'
              : 'Executive Cockpit // Real-Time Telemetry'}
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {isDe ? 'Storefront & Umsatz-Übersicht' : 'Storefront & Revenue Overview'}
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            {isDe
              ? 'Aggregierte Kennzahlen, Recharts-Umsatzverläufe und Live-Bestelleingänge.'
              : 'Aggregated KPIs, Recharts revenue trajectories, and live incoming orders.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Tabs
            value={range}
            onValueChange={(v) => setRange(v as '7d' | '30d' | '90d' | '1y')}
          >
            <TabsList>
              <TabsTrigger value="7d">{isDe ? '7 Tage' : '7 Days'}</TabsTrigger>
              <TabsTrigger value="30d">{isDe ? '30 Tage' : '30 Days'}</TabsTrigger>
              <TabsTrigger value="90d">{isDe ? '90 Tage' : '90 Days'}</TabsTrigger>
              <TabsTrigger value="1y">{isDe ? '12 Monate' : '12 Months'}</TabsTrigger>
            </TabsList>
          </Tabs>

          <button
            type="button"
            onClick={() =>
              toast.success(
                isDe ? 'Kennzahlen aktualisiert' : 'Metrics refreshed',
                {
                  description: isDe
                    ? `Zeitraum "${range.toUpperCase()}" neu berechnet.`
                    : `Recalculated time window "${range.toUpperCase()}".`,
                }
              )
            }
            aria-label={isDe ? 'Daten neu laden' : 'Refresh data'}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950"
          >
            <RefreshCw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {kpis.map((kpi) => {
          const maxSpark = Math.max(...kpi.sparkline);
          return (
            <div
              key={kpi.id}
              className="flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs transition-all hover:border-zinc-300"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-zinc-500">
                    {kpi.label}
                  </span>
                  <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-semibold text-emerald-700">
                    <TrendingUp className="h-3 w-3" />+{kpi.changePercent}%
                  </span>
                </div>
                <p className="mt-3 font-mono text-2xl font-semibold tracking-tight text-zinc-950">
                  {kpi.value}
                </p>
                <p className="mt-1 text-[11px] text-zinc-400">
                  {kpi.comparisonLabel}
                </p>
              </div>

              {/* Minimalist Sparkline Bars */}
              <div className="mt-4 flex h-8 items-end gap-1 pt-2">
                {kpi.sparkline.map((val, idx) => (
                  <div
                    key={idx}
                    className={cn(
                      'flex-1 rounded-t-xs transition-all',
                      idx === kpi.sparkline.length - 1
                        ? 'bg-zinc-950'
                        : 'bg-zinc-200'
                    )}
                    style={{
                      height: `${Math.max(20, Math.round((val / maxSpark) * 100))}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Primary Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Revenue Area Chart */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs lg:col-span-7">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe
                  ? 'Umsatzentwicklung & Vorperioden-Vergleich'
                  : 'Revenue Trajectory & Prior Period Comparison'}
              </h2>
              <p className="text-xs text-zinc-500">
                {isDe
                  ? 'Recharts AreaChart mit SVG-Linear-Gradienten (Netto-Umsatz in EUR)'
                  : 'Recharts AreaChart with SVG linear gradients (Net Revenue in EUR)'}
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1.5 text-zinc-700">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-950" />
                {isDe ? 'Aktuell' : 'Current'}
              </span>
              <span className="flex items-center gap-1.5 text-zinc-400">
                <span className="h-2.5 w-2.5 rounded-full bg-zinc-300" />
                {isDe ? 'Vorperiode' : 'Previous'}
              </span>
            </div>
          </div>

          <div className="mt-4">
            <RevenueAreaChart data={revenueSeries} />
          </div>
        </div>

        {/* Traffic Sources Donut Chart */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs lg:col-span-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe
                  ? 'Akquisitions-Kanäle & Attribution'
                  : 'Acquisition Channels & Attribution'}
              </h2>
              <p className="text-xs text-zinc-500">
                {isDe
                  ? 'Sitzungsverteilung & Conversion-Effizienz'
                  : 'Session distribution & conversion efficiency'}
              </p>
            </div>
            <Link
              href="/analytics"
              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 hover:underline"
            >
              <span>Heatmaps</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="mt-4">
            <TrafficDonutChart data={trafficSources} />
          </div>
        </div>
      </div>

      {/* Bottom Section: Recent Orders & Quick Module Links */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Recent Orders Feed */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white shadow-xs lg:col-span-8">
          <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe
                  ? 'Letzte Bestelleingänge (Stripe Live-Feed)'
                  : 'Recent Incoming Orders (Stripe Live Feed)'}
              </h2>
              <p className="text-xs text-zinc-500">
                {isDe
                  ? 'Verifizierte Transaktionen über `/api/webhooks/stripe`'
                  : 'Verified transactions via `/api/webhooks/stripe`'}
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-[11px] font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              {isDe ? 'Echtzeit' : 'Real-Time'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-zinc-100 bg-zinc-50/60 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
                  <th className="px-6 py-3">{isDe ? 'Bestellung' : 'Order'}</th>
                  <th className="px-4 py-3">
                    {isDe ? 'Kunde / Studio' : 'Customer / Studio'}
                  </th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">
                    {isDe ? 'Zahlungsart' : 'Payment Method'}
                  </th>
                  <th className="px-6 py-3 text-right">
                    {isDe ? 'Betrag' : 'Amount'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-100">
                {recentOrders.map((ord) => (
                  <tr
                    key={ord.id}
                    onClick={() =>
                      toast.info(
                        `${isDe ? 'Bestelldetails' : 'Order details'} ${ord.orderNumber}`,
                        {
                          description: `${ord.customerName} (${ord.city}, ${ord.country}) · ${formatCurrency(ord.total)}`,
                        }
                      )
                    }
                    className="cursor-pointer transition-colors hover:bg-zinc-50/80"
                  >
                    <td className="whitespace-nowrap px-6 py-3.5">
                      <span className="font-mono font-semibold text-zinc-950">
                        {ord.orderNumber}
                      </span>
                      <p className="text-[11px] text-zinc-400">{ord.createdAt}</p>
                    </td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-zinc-900">{ord.customerName}</p>
                      <p className="text-[11px] text-zinc-400">
                        {ord.city}, {ord.country} · {ord.itemsCount}{' '}
                        {isDe ? 'Pos.' : 'items'}
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5">
                      {ord.status === 'paid' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-[11px] font-medium text-emerald-800">
                          <CheckCircle2 className="h-3 w-3" />{' '}
                          {isDe ? 'Bezahlt' : 'Paid'}
                        </span>
                      )}
                      {ord.status === 'shipped' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-zinc-200 bg-zinc-100 px-2.5 py-0.5 text-[11px] font-medium text-zinc-800">
                          <Truck className="h-3 w-3" />{' '}
                          {isDe ? 'Versendet' : 'Shipped'}
                        </span>
                      )}
                      {ord.status === 'processing' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[11px] font-medium text-amber-800">
                          <Clock className="h-3 w-3" />{' '}
                          {isDe ? 'Kommissionierung' : 'Processing'}
                        </span>
                      )}
                    </td>
                    <td className="whitespace-nowrap px-4 py-3.5 text-zinc-600">
                      {ord.paymentMethod}
                    </td>
                    <td className="whitespace-nowrap px-6 py-3.5 text-right font-mono font-semibold text-zinc-950">
                      {formatCurrency(ord.total)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Quick Action Cards */}
        <div className="space-y-4 lg:col-span-4">
          <Link
            href="/inventory"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-zinc-950 p-6 text-white shadow-lg transition-all hover:bg-zinc-900"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-800 text-emerald-400">
                  <Package className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-white" />
              </div>
              <h3 className="mt-4 text-base font-semibold">
                {isDe
                  ? 'Produktverwaltung (TanStack Table v8)'
                  : 'Inventory Management (TanStack Table v8)'}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
                {isDe
                  ? 'Verwalten Sie 144 SKUs mit serverseitigem Paging, Multi-Spalten-Sortierung, Bestandsbuchungen und CSV-Export.'
                  : 'Manage 144 SKUs with server-side paging, multi-column sorting, inline stock adjustments, and CSV export.'}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              {isDe ? 'Inventar öffnen →' : 'Open Inventory →'}
            </span>
          </Link>

          <Link
            href="/analytics"
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs transition-all hover:border-zinc-300"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-zinc-200 bg-zinc-50 text-zinc-900">
                  <BarChart3 className="h-5 w-5" />
                </span>
                <ArrowUpRight className="h-4 w-4 text-zinc-400 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-zinc-950" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-zinc-950">
                {isDe
                  ? 'Detaillierte Traffic-Heatmaps & Funnel'
                  : 'Detailed Traffic Heatmaps & Funnel'}
              </h3>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">
                {isDe
                  ? 'Analysieren Sie Besucherströme im 7×24-Stunden-Raster, Core Web Vitals und Checkout-Konvertierung.'
                  : 'Analyze visitor traffic across a 7×24-hour matrix, Core Web Vitals, and checkout conversion rates.'}
              </p>
            </div>
            <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-zinc-950">
              {isDe ? 'Deep-Dive Analytics →' : 'Deep-Dive Analytics →'}
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
