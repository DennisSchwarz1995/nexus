'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { CartItem, Product, ProductStatus } from '@/types';
import { ALL_PRODUCTS } from '@/lib/commerce';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
  promoCode: string | null;
  discountPercent: number;
  lastAddedTimestamp: number | null;
  addItem: (item: Omit<CartItem, 'id'>, quantity?: number) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  setCartOpen: (open: boolean) => void;
  applyPromoCode: (code: string) => { valid: boolean; message: string };
  removePromoCode: () => void;
}

const VALID_PROMOS: Record<string, { percent: number; label: string }> = {
  NEXUS10: { percent: 10, label: '10 % Studio-Willkommensrabatt' },
  ARCHITECT15: { percent: 15, label: '15 % Architektur-Partner-Kondition' },
  VIP20: { percent: 20, label: '20 % Kuratoren-Privileg' },
};

// Initial pre-populated item so first-time visitors can immediately test Cart & Checkout if desired,
// or add more items with optimistic updates.
const INITIAL_CART_ITEMS: CartItem[] = [
  {
    id: 'prod-002:var-002-a',
    productId: 'prod-002',
    slug: 'monolith-k1-mechanical-console',
    name: 'Monolith K1 Eingabekonsole',
    subtitle: 'Gasket-Mount Präzisionstastatur mit Hall-Effekt-Sensoren & Drehregler',
    category: 'Precision Input',
    price: 540,
    image:
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
    variantId: 'var-002-a',
    variantName: 'Graphite Slate (DE-ISO)',
    variantHex: '#27272a',
    sku: 'NX-INP-002-GRP',
    quantity: 1,
    maxStock: 25,
  },
];

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: INITIAL_CART_ITEMS,
      isOpen: false,
      promoCode: null,
      discountPercent: 0,
      lastAddedTimestamp: null,

      addItem: (newItem, quantity = 1) =>
        set((state) => {
          const compositeId = `${newItem.productId}:${newItem.variantId}`;
          const existingIndex = state.items.findIndex((i) => i.id === compositeId);

          if (existingIndex > -1) {
            const updated = [...state.items];
            const current = updated[existingIndex];
            const nextQty = Math.min(current.maxStock, current.quantity + quantity);
            updated[existingIndex] = { ...current, quantity: nextQty };
            return {
              items: updated,
              lastAddedTimestamp: Date.now(),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...newItem,
                id: compositeId,
                quantity: Math.min(newItem.maxStock, quantity),
              },
            ],
            lastAddedTimestamp: Date.now(),
          };
        }),

      removeItem: (id) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== id),
        })),

      updateQuantity: (id, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return { items: state.items.filter((item) => item.id !== id) };
          }
          return {
            items: state.items.map((item) =>
              item.id === id
                ? { ...item, quantity: Math.min(item.maxStock, quantity) }
                : item
            ),
          };
        }),

      clearCart: () =>
        set({
          items: [],
          promoCode: null,
          discountPercent: 0,
        }),

      setCartOpen: (open) => set({ isOpen: open }),

      applyPromoCode: (rawCode) => {
        const normalized = rawCode.trim().toUpperCase();
        const promo = VALID_PROMOS[normalized];
        if (!promo) {
          return {
            valid: false,
            message: 'Ungültiger Code. Tipp: Testen Sie "NEXUS10" oder "ARCHITECT15".',
          };
        }
        set({
          promoCode: normalized,
          discountPercent: promo.percent,
        });
        return {
          valid: true,
          message: `${promo.label} (${promo.percent} %) wurde angewendet.`,
        };
      },

      removePromoCode: () =>
        set({
          promoCode: null,
          discountPercent: 0,
        }),
    }),
    {
      name: 'nexus-cart-storage-v1',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        items: state.items,
        promoCode: state.promoCode,
        discountPercent: state.discountPercent,
      }),
    }
  )
);

interface InventoryAdminState {
  products: Product[];
  updateProductStock: (id: string, delta: number) => void;
  updateProductStatus: (id: string, status: ProductStatus) => void;
  createProduct: (product: Omit<Product, 'id' | 'updatedAt' | 'monthlySales' | 'revenueGenerated'>) => Product;
  updateProduct: (id: string, patch: Partial<Product>) => void;
  deleteProducts: (ids: string[]) => void;
  resetInventory: () => void;
}

export const useInventoryStore = create<InventoryAdminState>((set) => ({
  products: ALL_PRODUCTS,

  updateProductStock: (id, delta) =>
    set((state) => ({
      products: state.products.map((p) => {
        if (p.id !== id) return p;
        const nextStock = Math.max(0, p.stock + delta);
        let nextStatus: ProductStatus = p.status;
        if (nextStock === 0) nextStatus = 'out_of_stock';
        else if (nextStock < 10 && p.status !== 'draft') nextStatus = 'low_stock';
        else if (nextStock >= 10 && p.status !== 'draft') nextStatus = 'active';
        return {
          ...p,
          stock: nextStock,
          status: nextStatus,
          updatedAt: new Date().toISOString(),
        };
      }),
    })),

  updateProductStatus: (id, status) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, status, updatedAt: new Date().toISOString() } : p
      ),
    })),

  createProduct: (input) => {
    const newProd: Product = {
      ...input,
      id: `prod-${Date.now()}`,
      updatedAt: new Date().toISOString(),
      monthlySales: 1,
      revenueGenerated: input.price,
    };
    set((state) => ({
      products: [newProd, ...state.products],
    }));
    return newProd;
  },

  updateProduct: (id, patch) =>
    set((state) => ({
      products: state.products.map((p) =>
        p.id === id ? { ...p, ...patch, updatedAt: new Date().toISOString() } : p
      ),
    })),

  deleteProducts: (ids) =>
    set((state) => ({
      products: state.products.filter((p) => !ids.includes(p.id)),
    })),

  resetInventory: () => set({ products: ALL_PRODUCTS }),
}));
