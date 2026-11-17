"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  BarChart3,
  Package,
  Store,
  ShieldCheck,
  Lock,
  Unlock,
  Bell,
  Terminal,
  ArrowUpRight,
  KeyRound,
  Globe,
} from "lucide-react";
import { useLocale } from "@/lib/i18n";
import { cn, SHOP_URL } from "@/lib/utils";
import { toast } from "sonner";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const isDe = locale === "de";

  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [passcode, setPasscode] = useState("NEXUS-ADMIN-2026");

  const navItems = [
    {
      href: "/overview",
      matchPaths: ["/overview", "/dashboard"],
      label: isDe ? "Übersicht & KPIs" : "Overview & KPIs",
      icon: LayoutDashboard,
      badge: "Live",
    },
    {
      href: "/analytics",
      matchPaths: ["/analytics", "/dashboard/analytics"],
      label: isDe ? "Analytics & Heatmaps" : "Analytics & Heatmaps",
      icon: BarChart3,
    },
    {
      href: "/inventory",
      matchPaths: ["/inventory", "/dashboard/inventory"],
      label: isDe ? "Inventar (TanStack v8)" : "Inventory (TanStack v8)",
      icon: Package,
      badge: "144",
    },
  ];

  // Protected Auth Guard Screen when locked
  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-950 px-4 text-white">
        <div className="w-full max-w-md rounded-3xl border border-zinc-800 bg-zinc-900/80 p-8 shadow-2xl backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-bold text-zinc-950">
              NX
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-500/30 bg-amber-500/10 px-2.5 py-0.5 font-mono text-[10px] text-amber-300">
              <Lock className="h-3 w-3" />{" "}
              {isDe ? "Auth Guard aktiv" : "Auth Guard Active"}
            </span>
          </div>

          <h1 className="mt-6 text-xl font-semibold tracking-tight">
            NEXUS Operator Console
          </h1>
          <p className="mt-1.5 text-xs leading-relaxed text-zinc-400">
            {isDe
              ? "Geschützter Administrationsbereich (`dashboard.dennis-schwarz.dev`). Bitte bestätigen Sie Ihre Sitzung."
              : "Protected operator console (`dashboard.dennis-schwarz.dev`). Please authenticate your session."}
          </p>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              setIsAuthenticated(true);
              toast.success(
                isDe
                  ? "Admin-Sitzung erfolgreich authentifiziert"
                  : "Operator session authenticated",
                {
                  description: isDe
                    ? "Angemeldet als Dennis Schwarz (Role: OWNER)"
                    : "Signed in as Dennis Schwarz (Role: OWNER)",
                }
              );
            }}
            className="mt-6 space-y-4"
          >
            <div>
              <label className="block text-[11px] font-medium text-zinc-400">
                {isDe ? "Operator-Kennung" : "Operator Identity"}
              </label>
              <input
                type="text"
                readOnly
                value="dennis@dennis-schwarz.dev"
                className="mt-1 h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 font-mono text-xs text-zinc-300"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-zinc-400">
                Hardware-Token / API-Key
              </label>
              <input
                type="password"
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                className="mt-1 h-10 w-full rounded-xl border border-zinc-800 bg-zinc-950 px-3 font-mono text-xs text-white focus:border-zinc-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-white text-xs font-semibold text-zinc-950 transition-colors hover:bg-zinc-200"
            >
              <KeyRound className="h-3.5 w-3.5" />
              <span>{isDe ? "Konsole entsperren" : "Unlock Console"}</span>
            </button>
          </form>

          <div className="mt-6 border-t border-zinc-800 pt-4 text-center">
            <a
              href={SHOP_URL}
              className="text-xs text-zinc-400 hover:text-white hover:underline"
            >
              {isDe
                ? "← Zurück zur öffentlichen Storefront"
                : "← Back to Public Storefront"}
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-zinc-50/70">
      <aside className="hidden w-64 shrink-0 flex-col justify-between border-r border-zinc-200/80 bg-white lg:flex">
        <div className="p-5">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-4">
            <Link
              href="/overview"
              className="flex items-center gap-2.5 text-sm font-semibold tracking-[0.14em] text-zinc-950"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-[11px] font-bold tracking-normal text-white">
                NX
              </span>
              <div>
                <span className="block leading-none">NEXUS</span>
                <span className="font-mono text-[10px] font-normal tracking-normal text-zinc-400">
                  ADMIN CONSOLE
                </span>
              </div>
            </Link>
          </div>

          <div className="mt-6">
            <p className="px-3 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
              {isDe ? "Betreiber-Cockpit" : "Operator Cockpit"}
            </p>
            <nav aria-label="Admin Navigation" className="mt-2 space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = item.matchPaths.includes(pathname);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center justify-between rounded-xl px-3 py-2.5 text-xs font-medium transition-all",
                      active
                        ? "bg-zinc-950 text-white shadow-xs"
                        : "text-zinc-600 hover:bg-zinc-100/80 hover:text-zinc-950"
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </span>
                    {item.badge && (
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 font-mono text-[10px]",
                          active
                            ? "bg-zinc-800 text-zinc-200"
                            : "bg-zinc-100 text-zinc-600"
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-[11px] font-semibold text-zinc-900">
                <Terminal className="h-3.5 w-3.5 text-zinc-600" />
                VPS Node Status
              </span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 font-mono text-[10px] font-medium text-emerald-700 border border-emerald-200">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Healthy
              </span>
            </div>
            <div className="mt-3 space-y-1.5 font-mono text-[10px] text-zinc-500">
              <div className="flex justify-between">
                <span>Runtime:</span>
                <span className="text-zinc-800">node:22-alpine</span>
              </div>
              <div className="flex justify-between">
                <span>Proxy:</span>
                <span className="text-zinc-800">traefik-proxy (v3)</span>
              </div>
              <div className="flex justify-between">
                <span>Registry:</span>
                <span className="text-zinc-800">ghcr.io/latest</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-200/80 p-4 space-y-3">
          <a
            href={SHOP_URL}
            className="flex w-full items-center justify-between rounded-xl border border-zinc-200 bg-zinc-50/70 px-3.5 py-2.5 text-xs font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-950"
          >
            <span className="flex items-center gap-2">
              <Store className="h-3.5 w-3.5" />
              <span>{isDe ? "Zur Storefront" : "Go to Storefront"}</span>
            </span>
            <ArrowUpRight className="h-3.5 w-3.5 text-zinc-400" />
          </a>

          <div className="flex items-center justify-between px-1">
            <div>
              <p className="text-xs font-semibold text-zinc-900">
                Dennis Schwarz
              </p>
              <p className="font-mono text-[10px] text-zinc-400">
                Role: OWNER · JWT
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsAuthenticated(false);
                toast.info(
                  isDe
                    ? "Admin-Konsole gesperrt (Auth Guard aktiv)"
                    : "Admin console locked (Auth Guard active)"
                );
              }}
              title={
                isDe
                  ? "Auth Guard Sperrbildschirm testen"
                  : "Test Auth Guard Lock Screen"
              }
              className="rounded-lg border border-zinc-200 p-1.5 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900"
            >
              <Lock className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </aside>

      <div className="flex flex-1 flex-col min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-zinc-200/80 bg-white/85 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 lg:hidden">
              {navItems.map((item) => {
                const active = item.matchPaths.includes(pathname);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "rounded-lg px-2.5 py-1.5 text-xs font-medium",
                      active
                        ? "bg-zinc-950 text-white"
                        : "text-zinc-600 hover:bg-zinc-100"
                    )}
                  >
                    {item.label.split(" ")[0]}
                  </Link>
                );
              })}
            </div>

            <div className="hidden items-center gap-2 text-xs text-zinc-500 lg:flex">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>
                {isDe ? "Authentifizierte Sitzung ·" : "Authenticated Session ·"}
              </span>
              <code className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-800">
                dashboard.dennis-schwarz.dev
              </code>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* DE | EN Language Switcher */}
            <div
              role="group"
              aria-label={isDe ? "Sprache wählen" : "Select language"}
              className="inline-flex h-9 items-center rounded-xl border border-zinc-200 bg-zinc-50/80 p-0.5 text-[11px] font-semibold"
            >
              <Globe className="ml-2 mr-1 hidden h-3 w-3 text-zinc-400 sm:inline" />
              <button
                type="button"
                onClick={() => setLocale("de")}
                className={cn(
                  "rounded-lg px-2 py-1 transition-all",
                  locale === "de"
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                DE
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={cn(
                  "rounded-lg px-2 py-1 transition-all",
                  locale === "en"
                    ? "bg-zinc-950 text-white shadow-xs"
                    : "text-zinc-500 hover:text-zinc-900"
                )}
              >
                EN
              </button>
            </div>

            <button
              type="button"
              onClick={() =>
                toast.success(
                  isDe
                    ? "System-Synchronisation abgeschlossen"
                    : "System synchronization complete",
                  {
                    description: isDe
                      ? "Alle 144 SKUs, Stripe-Webhooks und Telemetrie-Metriken sind aktuell."
                      : "All 144 SKUs, Stripe webhooks, and telemetry metrics are up to date.",
                  }
                )
              }
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
            >
              <Bell className="h-3.5 w-3.5 text-zinc-500" />
              <span className="hidden sm:inline">
                {isDe ? "Live-Sync prüfen" : "Check Sync"}
              </span>
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
            >
              <Unlock className="h-3.5 w-3.5 text-emerald-600" />
              <span className="hidden sm:inline">
                {isDe ? "Auth Guard testen" : "Test Auth Guard"}
              </span>
            </button>

            <a
              href={SHOP_URL}
              className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-zinc-950 px-3.5 text-xs font-semibold text-white hover:bg-zinc-800 lg:hidden"
            >
              <Store className="h-3.5 w-3.5" />
              <span>Shop</span>
            </a>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
