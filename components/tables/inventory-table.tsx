'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  PaginationState,
  RowSelectionState,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Plus,
  Minus,
  MoreHorizontal,
  Download,
  RotateCcw,
  ExternalLink,
  Edit3,
  Trash2,
  PackagePlus,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileEdit,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';
import { Product, ProductCategory, ProductStatus } from '@/types';
import { PRODUCT_CATEGORIES, queryInventory } from '@/lib/commerce';
import { useInventoryStore } from '@/lib/store';
import { cn, formatCurrency, formatNumber } from '@/lib/utils';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';

const STATUS_CONFIG: Record<
  ProductStatus,
  { label: string; badgeClass: string; icon: React.ComponentType<{ className?: string }> }
> = {
  active: {
    label: 'Aktiv',
    badgeClass: 'border-emerald-200 bg-emerald-50 text-emerald-800',
    icon: CheckCircle2,
  },
  low_stock: {
    label: 'Knapp',
    badgeClass: 'border-amber-200 bg-amber-50 text-amber-800',
    icon: AlertTriangle,
  },
  out_of_stock: {
    label: 'Ausverkauft',
    badgeClass: 'border-red-200 bg-red-50 text-red-800',
    icon: XCircle,
  },
  draft: {
    label: 'Entwurf',
    badgeClass: 'border-zinc-200 bg-zinc-100 text-zinc-600',
    icon: FileEdit,
  },
};

export function InventoryTable() {
  const {
    products,
    updateProductStock,
    updateProductStatus,
    createProduct,
    updateProduct,
    deleteProducts,
    resetInventory,
  } = useInventoryStore();

  // Server-side / Controlled Table State
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [sorting, setSorting] = useState<SortingState>([
    { id: 'revenueGenerated', desc: true },
  ]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 12,
  });
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  // Create / Edit Product Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formName, setFormName] = useState('');
  const [formSku, setFormSku] = useState('');
  const [formSubtitle, setFormSubtitle] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Audio & Acoustics');
  const [formPrice, setFormPrice] = useState('490');
  const [formStock, setFormStock] = useState('25');
  const [formStatus, setFormStatus] = useState<ProductStatus>('active');

  const activeSort = sorting[0] ?? { id: 'updatedAt', desc: true };

  // Execute simulated server-side query over 144 products
  const queryResult = useMemo(
    () =>
      queryInventory(products, {
        pageIndex: pagination.pageIndex,
        pageSize: pagination.pageSize,
        search,
        category: categoryFilter,
        status: statusFilter,
        sortBy: activeSort.id,
        sortOrder: activeSort.desc ? 'desc' : 'asc',
      }),
    [
      products,
      pagination.pageIndex,
      pagination.pageSize,
      search,
      categoryFilter,
      statusFilter,
      activeSort.id,
      activeSort.desc,
    ]
  );

  const openCreateModal = () => {
    setEditingProduct(null);
    setFormName('');
    setFormSku(`NX-AUD-${Math.floor(200 + Math.random() * 799)}`);
    setFormSubtitle('Präzisionsgefertigte Studio-Hardware aus eloxiertem Aluminium');
    setFormCategory('Audio & Acoustics');
    setFormPrice('590');
    setFormStock('30');
    setFormStatus('active');
    setModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormSku(product.sku);
    setFormSubtitle(product.subtitle);
    setFormCategory(product.category);
    setFormPrice(String(product.price));
    setFormStock(String(product.stock));
    setFormStatus(product.status);
    setModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const numericPrice = Math.max(1, Number(formPrice) || 490);
    const numericStock = Math.max(0, Number(formStock) || 0);

    if (editingProduct) {
      updateProduct(editingProduct.id, {
        name: formName.trim(),
        sku: formSku.trim().toUpperCase(),
        subtitle: formSubtitle.trim(),
        category: formCategory,
        price: numericPrice,
        stock: numericStock,
        status: formStatus,
      });
      toast.success(`Produkt "${formName}" aktualisiert`, {
        description: `SKU ${formSku} · Neuer Preis: ${formatCurrency(numericPrice)}`,
      });
    } else {
      const slug = `${formName
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString().slice(-4)}`;
      createProduct({
        sku: formSku.trim().toUpperCase(),
        slug,
        name: formName.trim(),
        subtitle: formSubtitle.trim(),
        description: formSubtitle.trim(),
        category: formCategory,
        price: numericPrice,
        currency: 'EUR',
        rating: 5.0,
        reviewCount: 1,
        stock: numericStock,
        status: formStatus,
        featured: false,
        badge: 'Neuheit',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
        ],
        variants: [
          {
            id: `var-${Date.now()}`,
            name: 'Obsidian Black',
            finish: 'Harteloxiert Mattschwarz',
            hex: '#18181b',
            priceDelta: 0,
            sku: `${formSku.trim().toUpperCase()}-BLK`,
            stock: numericStock,
          },
        ],
        specs: [{ label: 'Fertigung', value: 'CNC-Manufaktur' }],
        dimensions: '240 × 140 × 45 mm',
        weight: '920 g',
        materials: ['6063-T6 Aluminium'],
        leadTime: 'Sofort versandfertig',
      });
      toast.success(`Neues Produkt "${formName}" angelegt`, {
        description: `SKU ${formSku} wurde dem Katalog hinzugefügt.`,
      });
    }
    setModalOpen(false);
  };

  const handleExportCsv = () => {
    const headers = ['SKU', 'Name', 'Kategorie', 'Status', 'Preis_EUR', 'Bestand', 'Monatsabsatz', 'Umsatz_EUR'];
    const rows = queryResult.data.map((p) =>
      [
        p.sku,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${p.category}"`,
        p.status,
        p.price,
        p.stock,
        p.monthlySales,
        p.revenueGenerated,
      ].join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nexus-inventory-page-${pagination.pageIndex + 1}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success('CSV-Export abgeschlossen', {
      description: `${queryResult.data.length} Datensätze der aktuellen Ansicht exportiert.`,
    });
  };

  const columns = useMemo<ColumnDef<Product>[]>(
    () => [
      {
        id: 'select',
        header: ({ table }) => (
          <input
            type="checkbox"
            aria-label="Alle Zeilen auf dieser Seite auswählen"
            checked={table.getIsAllPageRowsSelected()}
            onChange={table.getToggleAllPageRowsSelectedHandler()}
            className="h-3.5 w-3.5 rounded border-zinc-300 accent-zinc-950"
          />
        ),
        cell: ({ row }) => (
          <input
            type="checkbox"
            aria-label={`Zeile ${row.original.name} auswählen`}
            checked={row.getIsSelected()}
            onChange={row.getToggleSelectedHandler()}
            className="h-3.5 w-3.5 rounded border-zinc-300 accent-zinc-950"
          />
        ),
        size: 36,
      },
      {
        accessorKey: 'name',
        header: ({ column }) => {
          const isSorted = column.getIsSorted();
          return (
            <button
              type="button"
              onClick={() => column.toggleSorting(isSorted === 'asc')}
              className="inline-flex items-center gap-1.5 text-left font-semibold text-zinc-700 hover:text-zinc-950"
            >
              <span>Produkt & Spezifikation</span>
              {isSorted === 'asc' ? (
                <ArrowUp className="h-3.5 w-3.5 text-zinc-950" />
              ) : isSorted === 'desc' ? (
                <ArrowDown className="h-3.5 w-3.5 text-zinc-950" />
              ) : (
                <ArrowUpDown className="h-3.5 w-3.5 text-zinc-400" />
              )}
            </button>
          );
        },
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-3 py-1">
              <img
                src={p.images[0]}
                alt={p.name}
                className="h-10 w-10 shrink-0 rounded-lg border border-zinc-200/80 bg-zinc-50 object-cover"
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="truncate text-xs font-semibold text-zinc-950">
                    {p.name}
                  </span>
                  {p.featured && (
                    <span className="rounded bg-zinc-950 px-1.5 py-0.5 text-[9px] font-semibold uppercase text-white">
                      Hero
                    </span>
                  )}
                </div>
                <p className="truncate text-[11px] text-zinc-500">{p.category}</p>
              </div>
            </div>
          );
        },
      },
      {
        accessorKey: 'sku',
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950"
          >
            <span>SKU</span>
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="rounded-md border border-zinc-200 bg-zinc-50 px-2 py-1 font-mono text-[11px] font-medium text-zinc-700">
            {row.original.sku}
          </span>
        ),
      },
      {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ row }) => {
          const st = row.original.status;
          const cfg = STATUS_CONFIG[st];
          const Icon = cfg.icon;
          return (
            <span
              className={cn(
                'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium',
                cfg.badgeClass
              )}
            >
              <Icon className="h-3 w-3" />
              {cfg.label}
            </span>
          );
        },
      },
      {
        accessorKey: 'stock',
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950"
          >
            <span>Bestand</span>
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
          </button>
        ),
        cell: ({ row }) => {
          const p = row.original;
          return (
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                aria-label="Bestand um 1 reduzieren"
                onClick={() => {
                  updateProductStock(p.id, -1);
                  toast.info(`Bestand reduziert: ${p.sku}`, {
                    description: `Neuer Lagerbestand: ${Math.max(0, p.stock - 1)} Stk.`,
                  });
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              >
                <Minus className="h-3 w-3" />
              </button>
              <span
                className={cn(
                  'min-w-[2.2rem] text-center font-mono text-xs font-semibold',
                  p.stock === 0
                    ? 'text-red-600'
                    : p.stock < 10
                    ? 'text-amber-700'
                    : 'text-zinc-900'
                )}
              >
                {p.stock}
              </span>
              <button
                type="button"
                aria-label="Bestand um 1 erhöhen"
                onClick={() => {
                  updateProductStock(p.id, 1);
                  toast.success(`Bestand erhöht: ${p.sku}`, {
                    description: `Neuer Lagerbestand: ${p.stock + 1} Stk.`,
                  });
                }}
                className="flex h-6 w-6 items-center justify-center rounded-md border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 hover:text-zinc-950"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>
          );
        },
      },
      {
        accessorKey: 'price',
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950"
          >
            <span>VK-Preis</span>
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-zinc-950">
            {formatCurrency(row.original.price)}
          </span>
        ),
      },
      {
        accessorKey: 'monthlySales',
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950"
          >
            <span>Absatz / 30T</span>
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs text-zinc-700">
            {row.original.monthlySales} Stk.
          </span>
        ),
      },
      {
        accessorKey: 'revenueGenerated',
        header: ({ column }) => (
          <button
            type="button"
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            className="inline-flex items-center gap-1 font-semibold text-zinc-700 hover:text-zinc-950"
          >
            <span>30T-Umsatz</span>
            <ArrowUpDown className="h-3 w-3 text-zinc-400" />
          </button>
        ),
        cell: ({ row }) => (
          <span className="font-mono text-xs font-semibold text-zinc-950">
            {formatCurrency(row.original.revenueGenerated)}
          </span>
        ),
      },
      {
        id: 'actions',
        header: () => <span className="sr-only">Aktionen</span>,
        cell: ({ row }) => {
          const p = row.original;
          return (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  aria-label={`Aktionen für ${p.name}`}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-zinc-500 hover:bg-zinc-100 hover:text-zinc-950"
                >
                  <MoreHorizontal className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>SKU {p.sku}</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => openEditModal(p)}>
                  <Edit3 className="h-3.5 w-3.5 text-zinc-500" />
                  <span>Produkt bearbeiten</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    updateProductStock(p.id, 10);
                    toast.success(`Nachschub (+10 Stk.) für ${p.name} gebucht`);
                  }}
                >
                  <PackagePlus className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Wareneingang +10 Stk.</span>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/products/${p.slug}`}>
                    <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
                    <span>Im Storefront öffnen</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuLabel>Status setzen</DropdownMenuLabel>
                {(['active', 'low_stock', 'out_of_stock', 'draft'] as ProductStatus[]).map(
                  (st) => (
                    <DropdownMenuItem
                      key={st}
                      onClick={() => {
                        updateProductStatus(p.id, st);
                        toast.info(`Status für ${p.sku} auf "${STATUS_CONFIG[st].label}" geändert`);
                      }}
                    >
                      <span>Als &bdquo;{STATUS_CONFIG[st].label}&ldquo; markieren</span>
                    </DropdownMenuItem>
                  )
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    deleteProducts([p.id]);
                    toast.error(`${p.name} (${p.sku}) wurde gelöscht`);
                  }}
                  className="text-red-600 focus:bg-red-50 focus:text-red-700"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Produkt löschen</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          );
        },
      },
    ],
    [updateProductStock, updateProductStatus, deleteProducts]
  );

  const table = useReactTable({
    data: queryResult.data,
    columns,
    pageCount: queryResult.totalPages,
    state: {
      sorting,
      pagination,
      rowSelection,
    },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    manualSorting: true,
    manualFiltering: true,
    getRowId: (row) => row.id,
  });

  const selectedIds = Object.keys(rowSelection);

  return (
    <div className="space-y-6">
      {/* Top Inventory KPI Strip */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5">
          <p className="text-xs font-medium text-zinc-500">Gesamter Lagerbestandswert</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-zinc-950">
            {formatCurrency(queryResult.summary.totalCatalogValue)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">
            Über {products.length} verwaltete SKUs
          </p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5">
          <p className="text-xs font-medium text-zinc-500">Aktive Storefront-SKUs</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-emerald-700">
            {formatNumber(queryResult.summary.activeCount)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">Sofort versandfertig (24h)</p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5">
          <p className="text-xs font-medium text-zinc-500">Niedriger Bestand (&lt; 10 Stk.)</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-amber-600">
            {formatNumber(queryResult.summary.lowStockCount)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">Nachbestellung empfohlen</p>
        </div>
        <div className="rounded-2xl border border-zinc-200/80 bg-white p-5">
          <p className="text-xs font-medium text-zinc-500">Ausverkauft (Nachproduktion)</p>
          <p className="mt-2 font-mono text-2xl font-semibold text-red-600">
            {formatNumber(queryResult.summary.outOfStockCount)}
          </p>
          <p className="mt-1 text-[11px] text-zinc-400">Automatische Warteliste aktiv</p>
        </div>
      </div>

      {/* Filter & Actions Bar */}
      <div className="flex flex-col justify-between gap-4 rounded-2xl border border-zinc-200/80 bg-white p-4 lg:flex-row lg:items-center">
        <div className="grid flex-1 grid-cols-1 gap-3 sm:grid-cols-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPagination((p) => ({ ...p, pageIndex: 0 }));
              }}
              placeholder="SKU, Produktname suchen..."
              aria-label="Inventar durchsuchen"
              className="h-10 w-full rounded-xl border border-zinc-200 bg-zinc-50/60 pl-9 pr-3 text-xs text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-950 focus:bg-white focus:outline-none"
            />
          </div>

          {/* Category Select */}
          <Select
            value={categoryFilter}
            onValueChange={(val) => {
              setCategoryFilter(val);
              setPagination((p) => ({ ...p, pageIndex: 0 }));
            }}
          >
            <SelectTrigger aria-label="Nach Kategorie filtern">
              <SelectValue placeholder="Alle Kategorien" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Alle Kategorien ({products.length})</SelectItem>
              {PRODUCT_CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Status Select */}
          <Select
            value={statusFilter}
            onValueChange={(val) => {
              setStatusFilter(val);
              setPagination((p) => ({ ...p, pageIndex: 0 }));
            }}
          >
            <SelectTrigger aria-label="Nach Status filtern">
              <SelectValue placeholder="Alle Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">Alle Bestands-Status</SelectItem>
              <SelectItem value="active">Aktiv (Auf Lager)</SelectItem>
              <SelectItem value="low_stock">Niedriger Bestand</SelectItem>
              <SelectItem value="out_of_stock">Ausverkauft</SelectItem>
              <SelectItem value="draft">Entwurf</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Right Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          {selectedIds.length > 0 && (
            <button
              type="button"
              onClick={() => {
                deleteProducts(selectedIds);
                setRowSelection({});
                toast.error(`${selectedIds.length} ausgewählte Produkte gelöscht`);
              }}
              className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-red-200 bg-red-50 px-3.5 text-xs font-semibold text-red-700 hover:bg-red-100"
            >
              <Trash2 className="h-3.5 w-3.5" />
              <span>Auswahl löschen ({selectedIds.length})</span>
            </button>
          )}

          <button
            type="button"
            onClick={handleExportCsv}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3.5 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
          >
            <Download className="h-3.5 w-3.5" />
            <span>CSV Export</span>
          </button>

          <button
            type="button"
            onClick={() => {
              resetInventory();
              setSearch('');
              setCategoryFilter('ALL');
              setStatusFilter('ALL');
              setRowSelection({});
              toast.info('Katalog auf 144 Ausgangsprodukte zurückgesetzt');
            }}
            title="Daten zurücksetzen"
            className="inline-flex h-10 items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-3 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>

          <button
            type="button"
            onClick={openCreateModal}
            className="inline-flex h-10 items-center gap-1.5 rounded-xl bg-zinc-950 px-4 text-xs font-semibold text-white shadow-xs hover:bg-zinc-800"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Neues Produkt</span>
          </button>
        </div>
      </div>

      {/* TanStack Table v8 Data Grid */}
      <div className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr
                  key={headerGroup.id}
                  className="border-b border-zinc-200/80 bg-zinc-50/70"
                >
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="whitespace-nowrap px-4 py-3.5 text-[11px] font-semibold uppercase tracking-wider text-zinc-500"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td
                    colSpan={columns.length}
                    className="py-14 text-center text-sm text-zinc-500"
                  >
                    Keine Produkte für diese Filterkombination gefunden.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map((row) => (
                  <tr
                    key={row.id}
                    className={cn(
                      'transition-colors hover:bg-zinc-50/80',
                      row.getIsSelected() && 'bg-zinc-100/70'
                    )}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="whitespace-nowrap px-4 py-3">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Server-Side Pagination Controls Footer */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-zinc-200/80 bg-zinc-50/50 px-5 py-3.5 sm:flex-row">
          <div className="flex items-center gap-3 text-xs text-zinc-500">
            <span>
              Zeige{' '}
              <strong className="font-mono text-zinc-900">
                {queryResult.totalItems === 0
                  ? 0
                  : queryResult.pageIndex * queryResult.pageSize + 1}
              </strong>{' '}
              bis{' '}
              <strong className="font-mono text-zinc-900">
                {Math.min(
                  queryResult.totalItems,
                  (queryResult.pageIndex + 1) * queryResult.pageSize
                )}
              </strong>{' '}
              von{' '}
              <strong className="font-mono text-zinc-900">
                {queryResult.totalItems}
              </strong>{' '}
              SKUs
            </span>

            <span className="text-zinc-300">|</span>

            <div className="flex items-center gap-1.5">
              <span>Zeilen:</span>
              <select
                aria-label="Zeilen pro Seite"
                value={pagination.pageSize}
                onChange={(e) =>
                  setPagination({
                    pageIndex: 0,
                    pageSize: Number(e.target.value),
                  })
                }
                className="rounded-lg border border-zinc-200 bg-white px-2 py-1 font-mono text-xs text-zinc-900 focus:outline-none"
              >
                {[10, 12, 24, 50].map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
              aria-label="Erste Seite"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-40"
            >
              <ChevronsLeft className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              aria-label="Vorherige Seite"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-40"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
            </button>

            <span className="px-3 font-mono text-xs font-medium text-zinc-700">
              Seite {queryResult.pageIndex + 1} / {queryResult.totalPages}
            </span>

            <button
              type="button"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              aria-label="Nächste Seite"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-40"
            >
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
            <button
              type="button"
              onClick={() => table.setPageIndex(queryResult.totalPages - 1)}
              disabled={!table.getCanNextPage()}
              aria-label="Letzte Seite"
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-100 disabled:opacity-40"
            >
              <ChevronsRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Radix Dialog: Create / Edit Product Modal */}
      <Dialog open={modalOpen} onOpenChange={setModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingProduct
                ? `Produkt bearbeiten (${editingProduct.sku})`
                : 'Neues Manufaktur-Produkt anlegen'}
            </DialogTitle>
            <DialogDescription>
              Änderungen werden sofort im globalen Inventar-State übernommen und mit Toast-Feedback bestätigt.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSaveProduct} className="mt-2 space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-zinc-700">
                  Produktbezeichnung
                </label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="z. B. Aether Studio Monitor M8"
                  className="mt-1 h-9 w-full rounded-xl border border-zinc-200 px-3 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700">
                  SKU-Kennung
                </label>
                <input
                  type="text"
                  required
                  value={formSku}
                  onChange={(e) => setFormSku(e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-zinc-200 px-3 font-mono text-xs uppercase text-zinc-900 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-700">
                Technischer Untertitel
              </label>
              <input
                type="text"
                required
                value={formSubtitle}
                onChange={(e) => setFormSubtitle(e.target.value)}
                className="mt-1 h-9 w-full rounded-xl border border-zinc-200 px-3 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div>
                <label className="block text-xs font-medium text-zinc-700">
                  Kategorie
                </label>
                <select
                  value={formCategory}
                  onChange={(e) =>
                    setFormCategory(e.target.value as ProductCategory)
                  }
                  className="mt-1 h-9 w-full rounded-xl border border-zinc-200 bg-white px-2.5 text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                >
                  {PRODUCT_CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700">
                  VK-Preis (EUR)
                </label>
                <input
                  type="number"
                  min={1}
                  required
                  value={formPrice}
                  onChange={(e) => setFormPrice(e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-zinc-200 px-3 font-mono text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-zinc-700">
                  Lagerbestand
                </label>
                <input
                  type="number"
                  min={0}
                  required
                  value={formStock}
                  onChange={(e) => setFormStock(e.target.value)}
                  className="mt-1 h-9 w-full rounded-xl border border-zinc-200 px-3 font-mono text-xs text-zinc-900 focus:border-zinc-950 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3">
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Abbrechen
              </button>
              <button
                type="submit"
                className="rounded-xl bg-zinc-950 px-5 py-2 text-xs font-semibold text-white hover:bg-zinc-800"
              >
                {editingProduct ? 'Änderungen speichern' : 'Produkt erstellen'}
              </button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
