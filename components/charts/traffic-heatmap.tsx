'use client';

import React, { useState } from 'react';
import { HourlyHeatmapCell } from '@/types';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn, formatNumber } from '@/lib/utils';

const DAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
const HOURS = Array.from({ length: 24 }, (_, i) => i);

export function TrafficHeatmap({ cells }: { cells: HourlyHeatmapCell[] }) {
  const [metricMode, setMetricMode] = useState<'visitors' | 'conversions'>('visitors');

  const getCellColor = (intensity: number) => {
    if (intensity >= 82) return 'bg-zinc-950 text-white';
    if (intensity >= 65) return 'bg-zinc-800 text-white';
    if (intensity >= 48) return 'bg-zinc-600 text-white';
    if (intensity >= 32) return 'bg-zinc-400 text-zinc-950';
    if (intensity >= 18) return 'bg-zinc-200 text-zinc-800';
    return 'bg-zinc-100 text-zinc-400';
  };

  return (
    <div className="space-y-4">
      {/* Mode Switcher & Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="inline-flex rounded-xl bg-zinc-100 p-1">
          <button
            type="button"
            onClick={() => setMetricMode('visitors')}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-medium transition-all',
              metricMode === 'visitors'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            )}
          >
            Besucher-Dichte
          </button>
          <button
            type="button"
            onClick={() => setMetricMode('conversions')}
            className={cn(
              'rounded-lg px-3 py-1 text-xs font-medium transition-all',
              metricMode === 'conversions'
                ? 'bg-white text-zinc-950 shadow-xs'
                : 'text-zinc-500 hover:text-zinc-900'
            )}
          >
            Checkout-Conversions
          </button>
        </div>

        {/* Color Intensity Scale */}
        <div className="flex items-center gap-2 text-[11px] text-zinc-500">
          <span>Niedrig</span>
          <div className="flex items-center gap-1">
            <span className="h-3 w-5 rounded-xs bg-zinc-100 border border-zinc-200" />
            <span className="h-3 w-5 rounded-xs bg-zinc-200" />
            <span className="h-3 w-5 rounded-xs bg-zinc-400" />
            <span className="h-3 w-5 rounded-xs bg-zinc-600" />
            <span className="h-3 w-5 rounded-xs bg-zinc-800" />
            <span className="h-3 w-5 rounded-xs bg-zinc-950" />
          </div>
          <span>Peak (20:00–22:00 Uhr)</span>
        </div>
      </div>

      {/* Heatmap Matrix */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[720px]">
          {/* Hour Labels Header */}
          <div className="mb-1.5 grid grid-cols-[44px_repeat(24,minmax(0,1fr))] gap-1">
            <div className="text-[10px] font-mono text-zinc-400">Tag</div>
            {HOURS.map((hour) => (
              <div
                key={hour}
                className="text-center font-mono text-[10px] text-zinc-400"
              >
                {hour % 2 === 0 ? `${String(hour).padStart(2, '0')}h` : ''}
              </div>
            ))}
          </div>

          {/* Rows per Day */}
          <div className="space-y-1">
            {DAYS.map((day, dIdx) => {
              const rowCells = cells.filter((c) => c.dayIndex === dIdx);
              return (
                <div
                  key={day}
                  className="grid grid-cols-[44px_repeat(24,minmax(0,1fr))] items-center gap-1"
                >
                  <div className="font-mono text-xs font-medium text-zinc-600">
                    {day}
                  </div>
                  {rowCells.map((cell) => (
                    <Tooltip key={`${cell.day}-${cell.hour}`}>
                      <TooltipTrigger asChild>
                        <button
                          type="button"
                          aria-label={`${cell.day} ${cell.hourLabel}: ${cell.visitors} Besucher, ${cell.conversions} Bestellungen`}
                          className={cn(
                            'h-7 w-full rounded-md font-mono text-[9px] transition-transform hover:z-10 hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500',
                            getCellColor(cell.intensity)
                          )}
                        >
                          {metricMode === 'conversions' && cell.conversions > 15
                            ? cell.conversions
                            : ''}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <div className="space-y-0.5">
                          <p className="font-semibold">
                            {cell.day}, {cell.hourLabel} – {String((cell.hour + 1) % 24).padStart(2, '0')}:00 Uhr
                          </p>
                          <p className="text-zinc-300">
                            Besucher: <span className="font-mono text-white">{formatNumber(cell.visitors)}</span>
                          </p>
                          <p className="text-zinc-300">
                            Bestellungen: <span className="font-mono text-emerald-400">{cell.conversions}</span> ({cell.conversionRate}%)
                          </p>
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
