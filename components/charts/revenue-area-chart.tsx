'use client';

import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import { RevenueDataPoint } from '@/types';
import { formatCurrency } from '@/lib/utils';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    value: number;
    dataKey: string;
    payload: RevenueDataPoint;
  }>;
  label?: string;
}

function CustomRevenueTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const point = payload[0].payload;
  const diffPercent =
    point.previousRevenue > 0
      ? (((point.revenue - point.previousRevenue) / point.previousRevenue) * 100).toFixed(1)
      : '0.0';

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/95 p-3.5 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between gap-6 border-b border-zinc-100 pb-2">
        <span className="text-xs font-semibold text-zinc-950">{label}</span>
        <span className="rounded bg-emerald-50 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-700">
          +{diffPercent}%
        </span>
      </div>
      <div className="mt-2.5 space-y-1.5 text-xs">
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-zinc-950" />
            Aktueller Umsatz
          </span>
          <span className="font-mono font-semibold text-zinc-950">
            {formatCurrency(point.revenue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6">
          <span className="flex items-center gap-1.5 text-zinc-400">
            <span className="h-2 w-2 rounded-full bg-zinc-300" />
            Vorperiode
          </span>
          <span className="font-mono text-zinc-600">
            {formatCurrency(point.previousRevenue)}
          </span>
        </div>
        <div className="flex items-center justify-between gap-6 border-t border-zinc-100 pt-1.5 text-[11px] text-zinc-500">
          <span>Bestellungen: {point.orders}</span>
          <span>Ø AOV: {formatCurrency(point.aov)}</span>
        </div>
      </div>
    </div>
  );
}

export function RevenueAreaChart({ data }: { data: RevenueDataPoint[] }) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 12, right: 12, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="nexusRevenueGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#18181b" stopOpacity={0.22} />
              <stop offset="65%" stopColor="#18181b" stopOpacity={0.05} />
              <stop offset="100%" stopColor="#18181b" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="nexusPrevGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a1a1aa" stopOpacity={0.12} />
              <stop offset="100%" stopColor="#a1a1aa" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#f4f4f5"
          />
          <XAxis
            dataKey="label"
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 11 }}
            dy={8}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: '#71717a', fontSize: 11 }}
            tickFormatter={(val: number) =>
              val >= 1000 ? `${Math.round(val / 1000)}k €` : `${val} €`
            }
            width={58}
          />
          <Tooltip content={<CustomRevenueTooltip />} />
          <Area
            type="monotone"
            dataKey="previousRevenue"
            stroke="#d4d4d8"
            strokeWidth={1.5}
            strokeDasharray="4 4"
            fill="url(#nexusPrevGradient)"
            animationDuration={700}
          />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#18181b"
            strokeWidth={2.25}
            fill="url(#nexusRevenueGradient)"
            activeDot={{
              r: 5,
              fill: '#18181b',
              stroke: '#ffffff',
              strokeWidth: 2,
            }}
            animationDuration={900}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
