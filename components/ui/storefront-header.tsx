"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {
  ShoppingBag,
  Search,
  LayoutDashboard,
  X,
  Plus,
  Minus,
  ArrowRight,
  Trash2,
  ShieldCheck,
  Globe,
} from "lucide-react";
import { useCartStore } from "@/lib/store";
import { ALL_PRODUCTS } from "@/lib/commerce";
import { useLocale, localizeProduct } from "@/lib/i18n";
import { cn, formatCurrency, DASHBOARD_URL } from "@/lib/utils";
import { toast } from "sonner";

export function StorefrontHeader() {
  const pathname = usePathname();
  const { locale, setLocale } = useLocale();
  const isDe = locale === "de";

  const { items, isOpen, setCartOpen, updateQuantity, removeItem } =
    useCartStore();
  const [mounted, setMounted] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const totalCount = mounted
    ? items.reduce((acc, item) => acc + item.quantity, 0)
    : 0;
  const subtotal = mounted
    ? items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    : 0;

  const localizedCatalog = useMemo(
    () => ALL_PRODUCTS.map((p) => localizeProduct(p, locale)),
    [locale],
  );

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return localizedCatalog.slice(0, 5);
    return localizedCatalog
      .filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.sku.toLowerCase().includes(q) ||
          p.subtitle.toLowerCase().includes(q),
      )
      .slice(0, 6);
  }, [searchQuery, localizedCatalog]);

  const navLinks = [
    { href: "/", label: "Atelier" },
    { href: "/products", label: "Collection" },
    {
      href: "/products/audio",
      label: "Audio",
    },
    {
      href: "/products/input",
      label: isDe ? "Eingabe" : "Input",
    },
    {
      href: "/products/desk-systems",
      label: isDe ? "Raum & Tisch" : "Desk Systems",
    },
    { href: "/cart", label: isDe ? "Warenkorb" : "Bag" },
  ];

  return (
    <>
      <div className="border-b border-zinc-200/70 bg-zinc-950 text-zinc-200">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-[11px] tracking-wide sm:px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <span className="inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span>
              {isDe ? (
                <>
                  Kostenfreier 24h-Expressversand ab 250 € · 10 %
                  Willkommensprivileg mit Code{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
                    NEXUS10
                  </code>
                </>
              ) : (
                <>
                  Complimentary 24h Express Shipping on orders over €250 · 10%
                  welcome privilege with code{" "}
                  <code className="rounded bg-zinc-800 px-1.5 py-0.5 font-mono text-[10px] text-emerald-300">
                    NEXUS10
                  </code>
                </>
              )}
            </span>
          </div>
          <div className="hidden items-center gap-4 text-zinc-400 md:flex">
            <span>
              {isDe
                ? "5 Jahre Manufaktur-Garantie · 30 Tage Probehören"
                : "5-Year Manufacture Warranty · 30-Day Studio Trial"}
            </span>
          </div>
        </div>
      </div>

      <header className="sticky top-0 z-40 w-full border-b border-zinc-200/80 bg-white/85 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="group flex items-center gap-2.5 text-sm font-semibold tracking-[0.18em] text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 rounded-md"
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-950 text-[11px] font-bold tracking-normal text-white transition-transform group-hover:scale-105">
                NX
              </span>
              <span>NEXUS</span>
            </Link>

            <nav
              aria-label={isDe ? "Hauptnavigation" : "Main Navigation"}
              className="hidden items-center gap-1 md:flex"
            >
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "rounded-lg px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900",
                      isActive
                        ? "bg-zinc-900/5 text-zinc-950 font-semibold"
                        : "text-zinc-500 hover:bg-zinc-100/70 hover:text-zinc-950",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right Utility Controls */}
          <div className="flex items-center gap-2">
            {/* Quick Search Button (Radix Dialog Trigger) */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label={isDe ? "Produktsuche öffnen" : "Open product search"}
              className="flex h-9 items-center gap-2 rounded-xl border border-zinc-200/90 bg-zinc-50/70 px-3 text-xs text-zinc-500 transition-all hover:border-zinc-300 hover:bg-white hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950"
            >
              <Search className="h-3.5 w-3.5 text-zinc-400" />
              <span className="hidden sm:inline">
                {isDe ? "Suche..." : "Search..."}
              </span>
              <kbd className="hidden rounded border border-zinc-200 bg-white px-1.5 py-0.5 font-mono text-[10px] text-zinc-400 lg:inline-block">
                ⌘K
              </kbd>
            </button>

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
                    : "text-zinc-500 hover:text-zinc-900",
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
                    : "text-zinc-500 hover:text-zinc-900",
                )}
              >
                EN
              </button>
            </div>

            <a
              href={`${DASHBOARD_URL}/overview`}
              title={
                isDe ? "Zum Betreiber-Dashboard" : "Open Operator Dashboard"
              }
              className="hidden h-9 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-700 shadow-xs transition-all hover:border-zinc-300 hover:bg-zinc-50 hover:text-zinc-950 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 sm:inline-flex"
            >
              <LayoutDashboard className="h-3.5 w-3.5 text-zinc-600" />
              <span className="hidden lg:inline">Dashboard</span>
            </a>

            <button
              type="button"
              onClick={() => setCartOpen(true)}
              aria-label={
                isDe
                  ? `Warenkorb öffnen (${totalCount} Artikel)`
                  : `Open shopping bag (${totalCount} items)`
              }
              className="relative inline-flex h-9 items-center gap-2 rounded-xl bg-zinc-950 px-3.5 text-xs font-medium text-white shadow-xs transition-all hover:bg-zinc-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2"
            >
              <ShoppingBag className="h-3.5 w-3.5" />
              <span className="font-mono text-xs">{totalCount}</span>
            </button>
          </div>
        </div>
      </header>

      <DialogPrimitive.Root open={searchOpen} onOpenChange={setSearchOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-xs" />
          <DialogPrimitive.Content
            aria-label={
              isDe ? "Schnellsuche im Produktkatalog" : "Product catalog search"
            }
            className="fixed left-1/2 top-[14%] z-50 w-[92vw] max-w-xl -translate-x-1/2 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl focus:outline-none"
          >
            <DialogPrimitive.Title className="sr-only">
              {isDe ? "Produktsuche" : "Product Search"}
            </DialogPrimitive.Title>
            <div className="flex items-center border-b border-zinc-100 px-4">
              <Search className="h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={
                  isDe
                    ? "Modell, Artikelnummer (z. B. NX-AUD-001) oder Kategorie suchen..."
                    : "Search by model, SKU (e.g. NX-AUD-001), or category..."
                }
                autoFocus
                className="h-12 w-full bg-transparent px-3 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none"
              />
              <DialogPrimitive.Close
                aria-label={isDe ? "Suche schließen" : "Close search"}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              <div className="px-2.5 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">
                {searchQuery.trim()
                  ? isDe
                    ? "Suchergebnisse"
                    : "Search Results"
                  : isDe
                    ? "Ausgewählte Referenz-Modelle"
                    : "Featured Reference Models"}
              </div>
              {searchResults.length === 0 ? (
                <div className="py-8 text-center text-xs text-zinc-500">
                  {isDe
                    ? `Keine passenden Produkte für „${searchQuery}“ gefunden.`
                    : `No matching products found for "${searchQuery}".`}
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.slug}`}
                      onClick={() => setSearchOpen(false)}
                      className="flex items-center justify-between rounded-xl p-2.5 transition-colors hover:bg-zinc-50 focus:bg-zinc-100 focus:outline-none"
                    >
                      <div className="flex items-center gap-3">
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="h-11 w-11 rounded-lg border border-zinc-200/70 object-cover"
                        />
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-zinc-900">
                              {product.name}
                            </span>
                            <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] text-zinc-500">
                              {product.sku}
                            </span>
                          </div>
                          <p className="line-clamp-1 text-[11px] text-zinc-500">
                            {product.subtitle}
                          </p>
                        </div>
                      </div>
                      <span className="font-mono text-xs font-semibold text-zinc-900">
                        {formatCurrency(product.price)}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-zinc-100 bg-zinc-50/70 px-4 py-2.5 text-[11px] text-zinc-500">
              <span>{isDe ? "ESC zum Schließen" : "Press ESC to close"}</span>
              <Link
                href="/products"
                onClick={() => setSearchOpen(false)}
                className="font-medium text-zinc-900 hover:underline"
              >
                {isDe
                  ? "Gesamte Kollektion ansehen →"
                  : "View full collection →"}
              </Link>
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <DialogPrimitive.Root open={isOpen} onOpenChange={setCartOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-zinc-950/40 backdrop-blur-xs transition-opacity" />
          <DialogPrimitive.Content
            aria-label={isDe ? "Warenkorb" : "Shopping Bag"}
            className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col border-l border-zinc-200 bg-white shadow-2xl focus:outline-none"
          >
            <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-5">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4 w-4 text-zinc-900" />
                <DialogPrimitive.Title className="text-sm font-semibold tracking-tight text-zinc-950">
                  {isDe
                    ? `Warenkorb (${totalCount})`
                    : `Shopping Bag (${totalCount})`}
                </DialogPrimitive.Title>
              </div>
              <DialogPrimitive.Close
                aria-label={isDe ? "Warenkorb schließen" : "Close bag"}
                className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-900"
              >
                <X className="h-4 w-4" />
              </DialogPrimitive.Close>
            </div>

            <div className="border-b border-zinc-100 bg-zinc-50/70 px-6 py-3">
              {subtotal >= 250 ? (
                <div className="flex items-center gap-2 text-xs font-medium text-emerald-700">
                  <span>
                    {isDe
                      ? "Qualifiziert für kostenfreien 24h-Kurier-Expressversand."
                      : "Qualified for complimentary 24h Express Courier delivery."}
                  </span>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs text-zinc-600">
                    <span>
                      {isDe
                        ? `Noch ${formatCurrency(250 - subtotal)} bis zum Gratis-Expressversand`
                        : `${formatCurrency(250 - subtotal)} away from complimentary Express Shipping`}
                    </span>
                    <span className="font-mono">
                      {Math.round((subtotal / 250) * 100)}%
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200">
                    <div
                      className="h-full bg-zinc-900 transition-all duration-300"
                      style={{
                        width: `${Math.min(100, (subtotal / 250) * 100)}%`,
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
                    <ShoppingBag className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-zinc-900">
                    {isDe
                      ? "Ihr Warenkorb ist leer"
                      : "Your shopping bag is empty"}
                  </p>
                  <p className="mt-1 max-w-xs text-xs text-zinc-500">
                    {isDe
                      ? "Entdecken Sie unsere präzisionsgefertigten Audio-, Licht- und Workstation-Systeme."
                      : "Explore our precision-machined audio, lighting, and workstation systems."}
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setCartOpen(false)}
                    className="mt-5 inline-flex items-center gap-2 rounded-xl bg-zinc-950 px-4 py-2.5 text-xs font-medium text-white hover:bg-zinc-800"
                  >
                    <span>
                      {isDe ? "Kollektion entdecken" : "Explore Collection"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              ) : (
                <ul className="divide-y divide-zinc-100">
                  {items.map((item) => (
                    <li key={item.id} className="flex gap-4 py-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl border border-zinc-200/70 bg-zinc-50 object-cover"
                      />
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex items-start justify-between gap-2">
                            <Link
                              href={`/products/${item.slug}`}
                              onClick={() => setCartOpen(false)}
                              className="text-xs font-semibold text-zinc-900 hover:underline"
                            >
                              {item.name}
                            </Link>
                            <button
                              type="button"
                              onClick={() => {
                                removeItem(item.id);
                                toast.info(
                                  isDe
                                    ? `${item.name} wurde aus dem Warenkorb entfernt.`
                                    : `${item.name} was removed from your bag.`,
                                );
                              }}
                              aria-label={
                                isDe
                                  ? `${item.name} entfernen`
                                  : `Remove ${item.name}`
                              }
                              className="text-zinc-400 transition-colors hover:text-red-600"
                            >
                              <Trash2 className="h-3.5 w-3.5" />
                            </button>
                          </div>
                          <div className="mt-1 flex items-center gap-1.5 text-[11px] text-zinc-500">
                            <span
                              className="inline-block h-2.5 w-2.5 rounded-full border border-zinc-300"
                              style={{ backgroundColor: item.variantHex }}
                            />
                            <span>{item.variantName}</span>
                          </div>
                        </div>

                        <div className="mt-3 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-lg border border-zinc-200 bg-zinc-50/60">
                            <button
                              type="button"
                              aria-label={
                                isDe ? "Menge verringern" : "Decrease quantity"
                              }
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="px-2 py-1 text-zinc-600 hover:text-zinc-950"
                            >
                              <Minus className="h-3 w-3" />
                            </button>
                            <span className="min-w-[1.75rem] text-center font-mono text-xs font-medium text-zinc-900">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              aria-label={
                                isDe ? "Menge erhöhen" : "Increase quantity"
                              }
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="px-2 py-1 text-zinc-600 hover:text-zinc-950"
                            >
                              <Plus className="h-3 w-3" />
                            </button>
                          </div>
                          <span className="font-mono text-xs font-semibold text-zinc-950">
                            {formatCurrency(item.price * item.quantity)}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-zinc-200 bg-zinc-50/60 p-6">
                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-zinc-500">
                    <span>
                      {isDe
                        ? "Versand (DHL Express)"
                        : "Shipping (DHL Express)"}
                    </span>
                    <span>
                      {subtotal >= 250
                        ? isDe
                          ? "Kostenfrei"
                          : "Complimentary"
                        : formatCurrency(14.9)}
                    </span>
                  </div>
                  <div className="flex justify-between pt-1 text-sm font-semibold text-zinc-950">
                    <span>
                      {isDe
                        ? "Zwischensumme (inkl. MwSt.)"
                        : "Subtotal (incl. VAT)"}
                    </span>
                    <span className="font-mono">
                      {formatCurrency(subtotal)}
                    </span>
                  </div>
                </div>
                <div className="mt-4 grid grid-cols-1 gap-2">
                  <Link
                    href="/cart"
                    onClick={() => setCartOpen(false)}
                    className="flex w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-4 py-3 text-xs font-semibold text-white shadow-xs transition-all hover:bg-zinc-800"
                  >
                    <span>
                      {isDe
                        ? "Zum Warenkorb & Kasse"
                        : "Proceed to Bag & Checkout"}
                    </span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
                <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    {isDe
                      ? "Sichere Zahlung · 30 Tage Rückgaberecht"
                      : "Encrypted Checkout · 30-Day Return Policy"}
                  </span>
                </div>
              </div>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </>
  );
}
