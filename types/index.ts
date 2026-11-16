export type ProductCategory =
  | 'Audio & Acoustics'
  | 'Workstations'
  | 'Architectural Lighting'
  | 'Precision Input'
  | 'Modular Desk';

export type ProductStatus = 'active' | 'low_stock' | 'out_of_stock' | 'draft';

export interface ProductVariant {
  id: string;
  name: string;
  finish: string;
  hex: string;
  priceDelta: number;
  sku: string;
  stock: number;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Product {
  id: string;
  sku: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  category: ProductCategory;
  price: number;
  compareAtPrice?: number;
  currency: 'EUR';
  rating: number;
  reviewCount: number;
  stock: number;
  status: ProductStatus;
  featured: boolean;
  badge?: string;
  images: string[];
  variants: ProductVariant[];
  specs: ProductSpec[];
  dimensions: string;
  weight: string;
  materials: string[];
  leadTime: string;
  updatedAt: string;
  monthlySales: number;
  revenueGenerated: number;
}

export interface CartItem {
  id: string;
  productId: string;
  slug: string;
  name: string;
  subtitle: string;
  category: ProductCategory;
  price: number;
  image: string;
  variantId: string;
  variantName: string;
  variantHex: string;
  sku: string;
  quantity: number;
  maxStock: number;
}

export interface KpiMetric {
  id: string;
  label: string;
  value: string;
  rawValue: number;
  changePercent: number;
  trend: 'up' | 'down' | 'neutral';
  comparisonLabel: string;
  sparkline: number[];
}

export interface RevenueDataPoint {
  date: string;
  label: string;
  revenue: number;
  previousRevenue: number;
  orders: number;
  aov: number;
}

export interface TrafficSourcePoint {
  name: string;
  value: number;
  sessions: number;
  conversionRate: number;
  revenue: number;
  color: string;
}

export interface HourlyHeatmapCell {
  day: string;
  dayIndex: number;
  hour: number;
  hourLabel: string;
  visitors: number;
  conversions: number;
  conversionRate: number;
  intensity: number; // 0 to 100
}

export interface RecentOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  city: string;
  country: string;
  total: number;
  itemsCount: number;
  status: 'paid' | 'processing' | 'shipped' | 'refunded';
  createdAt: string;
  paymentMethod: string;
}

export interface CoreWebVitalMetric {
  metric: string;
  name: string;
  value: string;
  target: string;
  percentile75: number;
  status: 'optimal' | 'good';
  description: string;
}

export interface InventoryQueryParams {
  pageIndex: number;
  pageSize: number;
  search?: string;
  category?: string;
  status?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedProductsResponse {
  data: Product[];
  totalItems: number;
  totalPages: number;
  pageIndex: number;
  pageSize: number;
  summary: {
    totalCatalogValue: number;
    activeCount: number;
    lowStockCount: number;
    outOfStockCount: number;
  };
}
