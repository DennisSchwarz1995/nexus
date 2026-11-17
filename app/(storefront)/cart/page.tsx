'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  ShieldCheck,
  Tag,
  CheckCircle2,
  Loader2,
  CreditCard,
  Truck,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { ALL_PRODUCTS } from '@/lib/commerce';
import { useLocale, translateCategory } from '@/lib/i18n';
import { cn, formatCurrency } from '@/lib/utils';
import { toast } from 'sonner';

interface OrderReceipt {
  orderNumber: string;
  stripeSessionId: string;
  customerEmail: string;
  amountTotal: number;
  processedAt: string;
}

export default function CartAndCheckoutPage() {
  const { locale } = useLocale();
  const isDe = locale === 'de';

  const {
    items,
    promoCode,
    discountPercent,
    updateQuantity,
    removeItem,
    clearCart,
    applyPromoCode,
    removePromoCode,
    addItem,
  } = useCartStore();

  const [mounted, setMounted] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [shippingMethod, setShippingMethod] = useState<'express' | 'priority'>('express');
  const [paymentMethod, setPaymentMethod] = useState<'stripe' | 'card' | 'sepa'>('stripe');

  const [customerName, setCustomerName] = useState('Dennis Schwarz');
  const [customerEmail, setCustomerEmail] = useState('dennis@dennis-schwarz.dev');
  const [shippingAddress, setShippingAddress] = useState('Maximilianstraße 35, 80539 München');

  const [isProcessing, setIsProcessing] = useState(false);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const subtotal = mounted
    ? items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    : 0;
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingCost =
    subtotal === 0
      ? 0
      : shippingMethod === 'priority'
      ? 29.0
      : subtotal >= 250
      ? 0
      : 14.9;
  const finalTotal = Math.max(0, subtotal - discountAmount + shippingCost);
  const includedVat = finalTotal - finalTotal / 1.19;

  const handlePromoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyPromoCode(promoInput);
    if (res.valid) {
      toast.success(isDe ? 'Rabattcode aktiviert' : 'Privilege code applied', {
        description: res.message,
      });
      setPromoInput('');
    } else {
      toast.error(isDe ? 'Ungültiger Code' : 'Invalid code', {
        description: res.message,
      });
    }
  };

  const handleSimulateCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (items.length === 0) return;

    setIsProcessing(true);
    try {
      const response = await fetch('/api/webhooks/stripe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'stripe-signature': `t=${Math.floor(Date.now() / 1000)},v1=nexus_verified_sig`,
        },
        body: JSON.stringify({
          type: 'checkout.session.completed',
          amountTotal: finalTotal,
          customer: {
            name: customerName,
            email: customerEmail,
            address: shippingAddress,
          },
          items: items.map((i) => ({
            sku: i.sku,
            name: i.name,
            qty: i.quantity,
            price: i.price,
          })),
        }),
      });

      const data = await response.json();
      setReceipt({
        orderNumber: data.orderNumber,
        stripeSessionId: data.stripeSessionId,
        customerEmail: data.customerEmail,
        amountTotal: finalTotal,
        processedAt: data.processedAt,
      });

      clearCart();
      toast.success(
        isDe
          ? `Bestellung ${data.orderNumber} bestätigt`
          : `Order ${data.orderNumber} confirmed`,
        {
          description: isDe
            ? 'Ihre Auftragsbestätigung wurde per E-Mail versendet.'
            : 'Your order confirmation has been dispatched via email.',
        }
      );
    } catch {
      toast.error(
        isDe
          ? 'Zahlungsautorisierung fehlgeschlagen'
          : 'Payment authorization failed'
      );
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRestoreSampleCart = () => {
    const p1 = ALL_PRODUCTS[0];
    const p2 = ALL_PRODUCTS[1];
    if (p1 && p1.variants[0]) {
      addItem(
        {
          productId: p1.id,
          slug: p1.slug,
          name: p1.name,
          subtitle: p1.subtitle,
          category: p1.category,
          price: p1.price,
          image: p1.images[0],
          variantId: p1.variants[0].id,
          variantName: p1.variants[0].name,
          variantHex: p1.variants[0].hex,
          sku: p1.variants[0].sku,
          quantity: 1,
          maxStock: p1.stock,
        },
        1
      );
    }
    if (p2 && p2.variants[0]) {
      addItem(
        {
          productId: p2.id,
          slug: p2.slug,
          name: p2.name,
          subtitle: p2.subtitle,
          category: p2.category,
          price: p2.price,
          image: p2.images[0],
          variantId: p2.variants[0].id,
          variantName: p2.variants[0].name,
          variantHex: p2.variants[0].hex,
          sku: p2.variants[0].sku,
          quantity: 1,
          maxStock: p2.stock,
        },
        1
      );
    }
    setReceipt(null);
    toast.success(
      isDe
        ? 'Auswahl wiederhergestellt'
        : 'Sample selection restored'
    );
  };

  if (!mounted) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="h-96 animate-pulse rounded-3xl bg-zinc-100" />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-200/80 pb-8 sm:flex-row sm:items-end">
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-zinc-400">
            {isDe ? 'NEXUS Atelier // Bestellung' : 'NEXUS Atelier // Order'}
          </span>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-zinc-950 sm:text-4xl">
            {isDe ? 'Warenkorb & Kasse' : 'Shopping Bag & Checkout'}
          </h1>
          <p className="mt-1 text-sm text-zinc-500">
            {isDe
              ? 'Versicherter Direktversand ab Manufaktur München · 30 Tage Rückgaberecht.'
              : 'Insured direct courier delivery from our Munich manufactory · 30-day return policy.'}
          </p>
        </div>

        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-700 hover:text-zinc-950"
        >
          <span>{isDe ? 'Weiter einkaufen' : 'Continue Shopping'}</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>

      {/* Order Confirmation View */}
      {receipt ? (
        <div className="mt-10 overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-xl">
          <div className="border-b border-zinc-100 bg-zinc-950 p-8 text-white sm:p-10">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="h-3.5 w-3.5" />
              <span>
                {isDe ? 'Auftrag bestätigt & in Fertigungsprüfung' : 'Order Confirmed & Queued for Dispatch'}
              </span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
              {isDe
                ? `Vielen Dank für Ihre Bestellung, ${customerName}.`
                : `Thank you for your order, ${customerName}.`}
            </h2>
            <p className="mt-2 text-sm text-zinc-400">
              {isDe ? (
                <>
                  Ihre Auftragsbestätigung für Bestellung{' '}
                  <strong className="font-mono text-white">{receipt.orderNumber}</strong> wurde an{' '}
                  <span className="text-zinc-200 underline">{receipt.customerEmail}</span> gesendet.
                </>
              ) : (
                <>
                  Your confirmation for order{' '}
                  <strong className="font-mono text-white">{receipt.orderNumber}</strong> has been sent to{' '}
                  <span className="text-zinc-200 underline">{receipt.customerEmail}</span>.
                </>
              )}
            </p>
          </div>

          <div className="p-8 sm:p-10">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
              {isDe ? 'Auftragsübersicht' : 'Order Summary'}
            </h3>
            <div className="mt-4 max-w-2xl divide-y divide-zinc-100 rounded-2xl border border-zinc-200 bg-zinc-50/50 px-5">
              <div className="flex justify-between py-3.5 text-xs">
                <span className="text-zinc-500">
                  {isDe ? 'Bestellnummer' : 'Order Number'}
                </span>
                <span className="font-mono font-semibold text-zinc-950">
                  {receipt.orderNumber}
                </span>
              </div>
              <div className="flex justify-between py-3.5 text-xs">
                <span className="text-zinc-500">
                  {isDe ? 'Transaktions-Referenz' : 'Transaction Reference'}
                </span>
                <span className="font-mono text-zinc-800">{receipt.stripeSessionId}</span>
              </div>
              <div className="flex justify-between py-3.5 text-xs">
                <span className="text-zinc-500">
                  {isDe ? 'Gesamtbetrag (inkl. MwSt.)' : 'Total Amount (incl. VAT)'}
                </span>
                <span className="font-mono font-semibold text-zinc-950">
                  {formatCurrency(receipt.amountTotal)}
                </span>
              </div>
              <div className="flex justify-between py-3.5 text-xs">
                <span className="text-zinc-500">
                  {isDe ? 'Lieferanschrift' : 'Delivery Address'}
                </span>
                <span className="font-medium text-zinc-800">{shippingAddress}</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/products"
                className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-950 px-5 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                <span>{isDe ? 'Zurück zur Kollektion' : 'Return to Collection'}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <button
                type="button"
                onClick={handleRestoreSampleCart}
                className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-800 hover:bg-zinc-50"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>
                  {isDe ? 'Weitere Bestellung zusammenstellen' : 'Start Another Order'}
                </span>
              </button>
            </div>
          </div>
        </div>
      ) : items.length === 0 ? (
        <div className="mt-12 flex flex-col items-center justify-center rounded-3xl border border-dashed border-zinc-200 bg-zinc-50/50 px-6 py-20 text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400">
            <ShoppingBag className="h-6 w-6" />
          </div>
          <h2 className="mt-4 text-lg font-semibold text-zinc-950">
            {isDe ? 'Ihr Warenkorb ist aktuell leer' : 'Your shopping bag is currently empty'}
          </h2>
          <p className="mt-1 max-w-md text-xs text-zinc-500">
            {isDe
              ? 'Wählen Sie Modelle aus unserer Kollektion oder laden Sie unsere kuratierte Studio-Empfehlung.'
              : 'Select instruments from our collection or load our curated studio recommendation.'}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/products"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-zinc-950 px-5 text-xs font-semibold text-white hover:bg-zinc-800"
            >
              <span>{isDe ? 'Kollektion entdecken' : 'Explore Collection'}</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
            <button
              type="button"
              onClick={handleRestoreSampleCart}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 text-xs font-semibold text-zinc-900 hover:bg-zinc-50"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>
                {isDe ? 'Studio-Empfehlung in den Warenkorb legen' : 'Load Studio Recommendation'}
              </span>
            </button>
          </div>
        </div>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Left Column: Cart Items & Shipping Selection */}
          <div className="space-y-8 lg:col-span-7">
            <div className="rounded-2xl border border-zinc-200/90 bg-white">
              <div className="flex items-center justify-between border-b border-zinc-100 px-6 py-4">
                <h2 className="text-sm font-semibold text-zinc-950">
                  {isDe
                    ? `Ausgewählte Modelle (${items.reduce((a, b) => a + b.quantity, 0)})`
                    : `Selected Models (${items.reduce((a, b) => a + b.quantity, 0)})`}
                </h2>
                <button
                  type="button"
                  onClick={() => {
                    clearCart();
                    toast.info(
                      isDe ? 'Warenkorb wurde geleert' : 'Shopping bag cleared'
                    );
                  }}
                  className="text-xs font-medium text-zinc-400 hover:text-red-600"
                >
                  {isDe ? 'Alle entfernen' : 'Clear all'}
                </button>
              </div>

              <ul className="divide-y divide-zinc-100 px-6">
                {items.map((item) => (
                  <li key={item.id} className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-24 w-24 shrink-0 rounded-2xl border border-zinc-200/80 bg-zinc-50 object-cover"
                    />
                    <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[10px] font-medium text-zinc-400">
                            {item.sku}
                          </span>
                          <span className="text-[10px] text-zinc-300">•</span>
                          <span className="text-[11px] font-medium text-zinc-500">
                            {translateCategory(item.category, locale)}
                          </span>
                        </div>
                        <Link
                          href={`/products/${item.slug}`}
                          className="text-sm font-semibold text-zinc-950 hover:underline"
                        >
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 text-xs text-zinc-500">
                          <span
                            className="inline-block h-3 w-3 rounded-full border border-zinc-300"
                            style={{ backgroundColor: item.variantHex }}
                          />
                          <span>
                            {isDe ? 'Ausführung' : 'Finish'}: {item.variantName}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-5 sm:justify-end">
                        <div className="inline-flex items-center rounded-xl border border-zinc-200 bg-zinc-50/70">
                          <button
                            type="button"
                            aria-label={isDe ? 'Menge reduzieren' : 'Decrease quantity'}
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="px-2.5 py-1.5 text-zinc-600 hover:text-zinc-950"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="min-w-[2rem] text-center font-mono text-xs font-semibold text-zinc-950">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            aria-label={isDe ? 'Menge erhöhen' : 'Increase quantity'}
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-2.5 py-1.5 text-zinc-600 hover:text-zinc-950"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>

                        <div className="min-w-[6.5rem] text-right">
                          <p className="font-mono text-sm font-semibold text-zinc-950">
                            {formatCurrency(item.price * item.quantity)}
                          </p>
                          <p className="font-mono text-[11px] text-zinc-400">
                            {formatCurrency(item.price)} / {isDe ? 'Stk.' : 'ea.'}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() => removeItem(item.id)}
                          aria-label={isDe ? `${item.name} löschen` : `Remove ${item.name}`}
                          className="rounded-lg p-1.5 text-zinc-400 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Shipping Method Selection */}
            <div className="rounded-2xl border border-zinc-200/90 bg-white p-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                <Truck className="h-4 w-4 text-zinc-900" />
                <span>{isDe ? 'Logistik & Versandart' : 'Delivery & Logistics'}</span>
              </div>

              <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setShippingMethod('express')}
                  className={cn(
                    'flex flex-col justify-between rounded-xl border p-4 text-left transition-all',
                    shippingMethod === 'express'
                      ? 'border-zinc-950 bg-zinc-50/70 ring-1 ring-zinc-950'
                      : 'border-zinc-200 hover:border-zinc-300'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-950">
                      DHL Express Ident (24h)
                    </span>
                    <span className="font-mono text-xs font-semibold text-emerald-700">
                      {subtotal >= 250
                        ? isDe
                          ? 'Kostenfrei'
                          : 'Complimentary'
                        : formatCurrency(14.9)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    {isDe
                      ? 'Versicherter Direktversand bis 25.000 € mit persönlicher Übergabe.'
                      : 'Insured direct courier delivery up to €25,000 with signature confirmation.'}
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setShippingMethod('priority')}
                  className={cn(
                    'flex flex-col justify-between rounded-xl border p-4 text-left transition-all',
                    shippingMethod === 'priority'
                      ? 'border-zinc-950 bg-zinc-50/70 ring-1 ring-zinc-950'
                      : 'border-zinc-200 hover:border-zinc-300'
                  )}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-zinc-950">
                      UPS Studio White-Glove
                    </span>
                    <span className="font-mono text-xs font-semibold text-zinc-900">
                      {formatCurrency(29.0)}
                    </span>
                  </div>
                  <p className="mt-1.5 text-[11px] text-zinc-500">
                    {isDe
                      ? 'Terminierte Zustellung im 2-Stunden-Zeitfenster inkl. Verpackungsrücknahme.'
                      : 'Scheduled delivery within a 2-hour window including packaging removal.'}
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary, Promo Code & Checkout Form */}
          <div className="space-y-6 lg:col-span-5">
            <div className="rounded-2xl border border-zinc-200/90 bg-zinc-50/60 p-6">
              <h2 className="text-sm font-semibold text-zinc-950">
                {isDe ? 'Bestellübersicht & Konditionen' : 'Order Summary & Conditions'}
              </h2>

              {/* Promo Code Form */}
              <form onSubmit={handlePromoSubmit} className="mt-4">
                <label className="block text-[11px] font-medium text-zinc-500">
                  {isDe
                    ? 'Gutscheincode / Partner-Kennung'
                    : 'Privilege Code / Partner ID'}
                </label>
                <div className="mt-1.5 flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="NEXUS10"
                      className="h-10 w-full rounded-xl border border-zinc-200 bg-white pl-8 pr-3 font-mono text-xs uppercase text-zinc-900 placeholder:normal-case placeholder:text-zinc-400 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="rounded-xl border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-900 hover:bg-zinc-100"
                  >
                    {isDe ? 'Einlösen' : 'Apply'}
                  </button>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-1.5">
                  <span className="text-[10px] text-zinc-400">
                    {isDe ? 'Verfügbar:' : 'Available:'}
                  </span>
                  {['NEXUS10', 'ARCHITECT15', 'VIP20'].map((code) => (
                    <button
                      key={code}
                      type="button"
                      onClick={() => {
                        const res = applyPromoCode(code);
                        toast.success(res.message);
                      }}
                      className={cn(
                        'rounded-md border px-2 py-0.5 font-mono text-[10px] transition-colors',
                        promoCode === code
                          ? 'border-zinc-950 bg-zinc-950 text-white'
                          : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300'
                      )}
                    >
                      {code}
                    </button>
                  ))}
                  {promoCode && (
                    <button
                      type="button"
                      onClick={removePromoCode}
                      className="ml-auto text-[10px] text-zinc-400 underline hover:text-zinc-700"
                    >
                      {isDe ? 'Entfernen' : 'Remove'}
                    </button>
                  )}
                </div>
              </form>

              {/* Price Breakdown */}
              <div className="mt-6 space-y-2.5 border-t border-zinc-200/80 pt-4 text-xs">
                <div className="flex justify-between text-zinc-600">
                  <span>{isDe ? 'Zwischensumme' : 'Subtotal'}</span>
                  <span className="font-mono font-medium text-zinc-900">
                    {formatCurrency(subtotal)}
                  </span>
                </div>
                {discountPercent > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>
                      {isDe ? 'Nachlass' : 'Privilege Discount'} ({promoCode} ·{' '}
                      {discountPercent}%)
                    </span>
                    <span className="font-mono font-semibold">
                      -{formatCurrency(discountAmount)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between text-zinc-600">
                  <span>{isDe ? 'Versandkosten' : 'Shipping'}</span>
                  <span className="font-mono font-medium text-zinc-900">
                    {shippingCost === 0
                      ? isDe
                        ? 'Kostenfrei'
                        : 'Complimentary'
                      : formatCurrency(shippingCost)}
                  </span>
                </div>
                <div className="flex justify-between text-[11px] text-zinc-400">
                  <span>
                    {isDe
                      ? 'Enthaltene gesetzl. MwSt. (19 %)'
                      : 'Included VAT (19%)'}
                  </span>
                  <span className="font-mono">{formatCurrency(includedVat)}</span>
                </div>
                <div className="flex justify-between border-t border-zinc-200/80 pt-3 text-base font-semibold text-zinc-950">
                  <span>{isDe ? 'Gesamtsumme' : 'Total'}</span>
                  <span className="font-mono">{formatCurrency(finalTotal)}</span>
                </div>
              </div>

              {/* Customer & Payment Form */}
              <form
                onSubmit={handleSimulateCheckout}
                className="mt-6 space-y-4 border-t border-zinc-200/80 pt-6"
              >
                <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400">
                  {isDe
                    ? 'Lieferanschrift & Zahlungsart'
                    : 'Delivery Address & Payment Method'}
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600">
                      {isDe ? 'Vollständiger Name / Studio' : 'Full Name / Studio'}
                    </label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      className="mt-1 h-9 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600">
                      {isDe
                        ? 'E-Mail für Rechnung & Sendungsverfolgung'
                        : 'Email for Invoice & Tracking'}
                    </label>
                    <input
                      type="email"
                      required
                      value={customerEmail}
                      onChange={(e) => setCustomerEmail(e.target.value)}
                      className="mt-1 h-9 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-medium text-zinc-600">
                      {isDe ? 'Lieferanschrift' : 'Shipping Address'}
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingAddress}
                      onChange={(e) => setShippingAddress(e.target.value)}
                      className="mt-1 h-9 w-full rounded-xl border border-zinc-200 bg-white px-3 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Payment Method Pills */}
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {[
                    { id: 'stripe', label: 'Apple Pay' },
                    { id: 'card', label: isDe ? 'Kreditkarte' : 'Credit Card' },
                    { id: 'sepa', label: 'SEPA-Instant' },
                  ].map((pm) => (
                    <button
                      key={pm.id}
                      type="button"
                      onClick={() => setPaymentMethod(pm.id as 'stripe' | 'card' | 'sepa')}
                      className={cn(
                        'flex items-center justify-center gap-1.5 rounded-xl border py-2 text-xs font-medium transition-all',
                        paymentMethod === pm.id
                          ? 'border-zinc-950 bg-zinc-950 text-white'
                          : 'border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300'
                      )}
                    >
                      <CreditCard className="h-3 w-3" />
                      <span>{pm.label}</span>
                    </button>
                  ))}
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-zinc-950 px-6 text-sm font-semibold text-white shadow-lg shadow-zinc-950/10 transition-all hover:bg-zinc-800 disabled:opacity-50"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>
                        {isDe
                          ? 'Autorisiere Zahlung...'
                          : 'Authorizing payment...'}
                      </span>
                    </>
                  ) : (
                    <>
                      <span>
                        {isDe
                          ? `Zahlungspflichtig bestellen (${formatCurrency(finalTotal)})`
                          : `Complete Order (${formatCurrency(finalTotal)})`}
                      </span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-1.5 text-[11px] text-zinc-400">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>
                    {isDe
                      ? '256-Bit TLS-Verschlüsselung · Käuferschutz & 5 Jahre Garantie'
                      : '256-Bit TLS Encryption · Buyer Protection & 5-Year Warranty'}
                  </span>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
