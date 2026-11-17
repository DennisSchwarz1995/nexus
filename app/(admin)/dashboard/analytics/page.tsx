"use client";

import React, { useMemo } from "react";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Activity,
  Gauge,
  Flame,
  TrendingUp,
  CheckCircle2,
  Download,
} from "lucide-react";
import {
  getCoreWebVitals,
  getRevenueTimeSeries,
  getTrafficHeatmap,
  getTrafficSources,
} from "@/lib/commerce";
import { useLocale } from "@/lib/i18n";
import { TrafficHeatmap } from "@/components/charts/traffic-heatmap";
import { TrafficDonutChart } from "@/components/charts/traffic-donut-chart";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminAnalyticsPage() {
  const { locale } = useLocale();
  const isDe = locale === "de";

  const heatmapCells = useMemo(() => getTrafficHeatmap(), []);
  const trafficSources = useMemo(() => getTrafficSources(), []);
  const webVitals = useMemo(() => getCoreWebVitals(), []);
  const orderSeries = useMemo(() => getRevenueTimeSeries("30d"), []);

  const funnelSteps = [
    {
      stage: isDe
        ? "1. Storefront Landing (RSC)"
        : "1. Storefront Landing (RSC)",
      users: 125800,
      rate: 100,
    },
    {
      stage: isDe
        ? "2. Produktdetailseite (SSG)"
        : "2. Product Detail View (SSG)",
      users: 68400,
      rate: 54.4,
    },
    {
      stage: isDe ? "3. Optimistic Add-to-Cart" : "3. Optimistic Add-to-Cart",
      users: 14920,
      rate: 11.9,
    },
    {
      stage: isDe ? "4. Checkout-Initiierung" : "4. Checkout Initiated",
      users: 7640,
      rate: 6.1,
    },
    {
      stage: isDe
        ? "5. Stripe Zahlung verifiziert"
        : "5. Stripe Payment Verified",
      users: 4830,
      rate: 3.84,
    },
  ];

  return (
    <div className="mx-auto max-w-7xl space-y-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            Deep-Dive Telemetry // Recharts & Heatmaps
          </span>
          <h1 className="mt-1 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
            {isDe
              ? "Traffic-Heatmaps, Funnel & Performance"
              : "Traffic Heatmaps, Funnel & Performance"}
          </h1>
          <p className="mt-1 text-xs text-zinc-500">
            {isDe
              ? "Stundengenaue Besucher- und Conversion-Matrix (7×24h), Akquisitionskanäle und Core Web Vitals."
              : "Hourly visitor and conversion matrix (7×24h), acquisition channels, and Core Web Vitals."}
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            toast.success(
              isDe
                ? "Telemetrie-Report generiert"
                : "Telemetry report generated",
              {
                description: isDe
                  ? "Analytics-Snapshot als JSON/CSV bereitgestellt."
                  : "Analytics snapshot exported as JSON/CSV.",
              },
            )
          }
          className="inline-flex h-10 items-center gap-2 self-start rounded-xl border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-900 shadow-xs hover:bg-zinc-50 sm:self-auto"
        >
          <Download className="h-3.5 w-3.5" />
          <span>
            {isDe ? "Telemetrie-Report exportieren" : "Export Telemetry Report"}
          </span>
        </button>
      </div>

      {/* Core Web Vitals & Edge Performance Telemetry */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {webVitals.map((vital) => (
          <div
            key={vital.metric}
            className="rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-xs"
          >
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-zinc-950">
                <Gauge className="h-3.5 w-3.5 text-emerald-600" />
                {vital.metric}
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-700 border border-emerald-200">
                <CheckCircle2 className="h-2.5 w-2.5" />
                P75: {vital.percentile75}%
              </span>
            </div>
            <div className="mt-3 flex items-baseline justify-between">
              <span className="font-mono text-2xl font-semibold text-zinc-950">
                {vital.value}
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                {isDe ? "Ziel:" : "Target:"} {vital.target}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-zinc-800">
              {vital.name}
            </p>
            <p className="mt-1 text-[11px] leading-relaxed text-zinc-500">
              {vital.description}
            </p>
          </div>
        ))}
      </div>

      {/* 7x24h Interactive Traffic & Conversion Heatmap */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="flex flex-col justify-between gap-2 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center">
          <div>
            <div className="flex items-center gap-2">
              <Flame className="h-4 w-4 text-zinc-900" />
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe
                  ? "Wochentag × Uhrzeit Traffic- & Conversion-Heatmap (168 Zeitfenster)"
                  : "Day of Week × Hour Traffic & Conversion Heatmap (168 Time Slots)"}
              </h2>
            </div>
            <p className="mt-0.5 text-xs text-zinc-500">
              {isDe
                ? "Bewegen Sie den Mauszeiger über eine Zelle, um exakte Besucherzahlen und abgeschlossene Checkouts einzusehen."
                : "Hover over any cell to inspect exact visitor counts and completed checkouts."}
            </p>
          </div>
          <span className="font-mono text-xs font-medium text-emerald-700">
            {isDe
              ? "Peak-Conversion: Di–Do, 20:00–22:00 Uhr (4,85 % CVR)"
              : "Peak Conversion: Tue–Thu, 20:00–22:00 (4.85% CVR)"}
          </span>
        </div>

        <div className="mt-5">
          <TrafficHeatmap cells={heatmapCells} />
        </div>
      </div>

      {/* Split Row: Conversion Funnel & Daily Order Volume BarChart */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* E-Commerce Conversion Funnel */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe
                  ? "Storefront Conversion-Funnel (30 Tage)"
                  : "Storefront Conversion Funnel (30 Days)"}
              </h2>
              <p className="text-xs text-zinc-500">
                {isDe
                  ? "Vom ersten Server-Component-Aufruf bis zum Stripe-Webhook"
                  : "From initial Server Component request to verified Stripe webhook"}
              </p>
            </div>
            <TrendingUp className="h-4 w-4 text-emerald-600" />
          </div>

          <div className="mt-5 space-y-4">
            {funnelSteps.map((step) => (
              <div key={step.stage} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-800">
                    {step.stage}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-zinc-500">
                      {formatNumber(step.users)} {isDe ? "Nutzer" : "users"}
                    </span>
                    <span className="w-14 text-right font-mono font-semibold text-zinc-950">
                      {step.rate.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-zinc-950 transition-all duration-500"
                    style={{ width: `${Math.max(6, step.rate)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Daily Orders & AOV BarChart */}
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs lg:col-span-6">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <div>
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe
                  ? "Bestellvolumen & Durchschnittlicher Warenkorbwert"
                  : "Order Volume & Average Order Value"}
              </h2>
              <p className="text-xs text-zinc-500">
                {isDe
                  ? "Abgeschlossene Bestellungen pro Messintervall (Recharts BarChart)"
                  : "Completed orders per interval (Recharts BarChart)"}
              </p>
            </div>
            <Activity className="h-4 w-4 text-zinc-500" />
          </div>

          <div className="mt-4 h-[260px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={orderSeries}
                margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f4f4f5"
                />
                <XAxis
                  dataKey="label"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717a", fontSize: 11 }}
                />
                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#71717a", fontSize: 11 }}
                />
                <Tooltip
                  cursor={{ fill: "#f4f4f5" }}
                  content={({ active, payload, label }) => {
                    if (!active || !payload || !payload.length) return null;
                    const p = payload[0].payload;
                    return (
                      <div className="rounded-xl border border-zinc-200 bg-white p-3 text-xs shadow-xl">
                        <p className="font-semibold text-zinc-950">{label}</p>
                        <p className="mt-1 text-zinc-600">
                          {isDe ? "Bestellungen:" : "Orders:"}{" "}
                          <strong className="font-mono text-zinc-950">
                            {p.orders}
                          </strong>
                        </p>
                        <p className="text-zinc-600">
                          {isDe ? "Umsatz:" : "Revenue:"}{" "}
                          <strong className="font-mono text-zinc-950">
                            {formatCurrency(p.revenue)}
                          </strong>
                        </p>
                      </div>
                    );
                  }}
                />
                <Bar
                  dataKey="orders"
                  fill="#18181b"
                  radius={[6, 6, 0, 0]}
                  animationDuration={800}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Traffic Sources Donut Full View */}
      <div className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-xs">
        <div className="border-b border-zinc-100 pb-4">
          <h2 className="text-sm font-semibold text-zinc-950">
            {isDe
              ? "Traffic-Quellen & Kanal-Rentabilität (Donut Chart)"
              : "Traffic Sources & Channel Profitability (Donut Chart)"}
          </h2>
          <p className="text-xs text-zinc-500">
            {isDe
              ? "Organischer SEO-Traffic durch Next.js Server Components generiert 42 % aller Sitzungen ohne Werbekosten."
              : "Organic SEO traffic driven by Next.js Server Components generates 42% of all sessions at zero ad spend."}
          </p>
        </div>
        <div className="mt-6">
          <TrafficDonutChart data={trafficSources} />
        </div>
      </div>
    </div>
  );
}
