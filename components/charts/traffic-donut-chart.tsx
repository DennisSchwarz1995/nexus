'use client';

import React from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';
import { TrafficSourcePoint } from '@/types';
import { formatCurrency, formatNumber } from '@/lib/utils';

interface DonutTooltipProps {
  active?: boolean;
  payload?: Array<{
    payload: TrafficSourcePoint;
  }>;
}

function CustomDonutTooltip({ active, payload }: DonutTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;
  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-zinc-200 bg-white/95 p-3 shadow-xl backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span
          className="h-2.5 w-2.5 rounded-full"
          style={{ backgroundColor: item.color }}
        />
        <span className="text-xs font-semibold text-zinc-950">{item.name}</span>
      </div>
      <div className="mt-2 space-y-1 text-[11px] text-zinc-600">
        <div className="flex justify-between gap-4">
          <span>Anteil:</span>
          <span className="font-mono font-semibold text-zinc-950">{item.value}%</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Sitzungen:</span>
          <span className="font-mono text-zinc-900">{formatNumber(item.sessions)}</span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Conversion-Rate:</span>
          <span className="font-mono text-emerald-700">
            {item.conversionRate.toFixed(2)}%
          </span>
        </div>
        <div className="flex justify-between gap-4">
          <span>Umsatz:</span>
          <span className="font-mono font-medium text-zinc-950">
            {formatCurrency(item.revenue)}
          </span>
        </div>
      </div>
    </div>
  );
}

export function TrafficDonutChart({ data }: { data: TrafficSourcePoint[] }) {
  const totalSessions = data.reduce((sum, item) => sum + item.sessions, 0);

  return (
    <div className="grid grid-cols-1 items-center gap-6 lg:grid-cols-12">
      <div className="relative h-[240px] w-full lg:col-span-5">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={64}
              outerRadius={92}
              paddingAngle={3}
              dataKey="value"
              stroke="none"
              animationDuration={850}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomDonutTooltip />} />
          </PieChart>
        </ResponsiveContainer>

        {/* Center Donut Label */}
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
            Sessions
          </span>
          <span className="font-mono text-lg font-semibold text-zinc-950">
            {(totalSessions / 1000).toFixed(1)}k
          </span>
          <span className="text-[10px] text-emerald-600">+16,2 %</span>
        </div>
      </div>

      {/* Detailed Legend Table */}
      <div className="space-y-2.5 lg:col-span-7">
        {data.map((source) => (
          <div
            key={source.name}
            className="flex items-center justify-between rounded-xl border border-zinc-200/70 bg-zinc-50/50 px-3.5 py-2.5 text-xs"
          >
            <div className="flex items-center gap-2.5">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: source.color }}
              />
              <div>
                <p className="font-medium text-zinc-900">{source.name}</p>
                <p className="text-[11px] text-zinc-400">
                  {formatNumber(source.sessions)} Sitzungen · CVR{' '}
                  <span className="font-mono text-zinc-600">
                    {source.conversionRate.toFixed(2)}%
                  </span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="font-mono text-xs font-semibold text-zinc-950">
                {source.value}%
              </span>
              <p className="font-mono text-[11px] text-zinc-500">
                {formatCurrency(source.revenue)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
