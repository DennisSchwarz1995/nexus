import {
  CoreWebVitalMetric,
  HourlyHeatmapCell,
  InventoryQueryParams,
  KpiMetric,
  PaginatedProductsResponse,
  Product,
  ProductCategory,
  ProductStatus,
  RecentOrder,
  RevenueDataPoint,
  TrafficSourcePoint,
} from '@/types';

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  'Audio & Acoustics',
  'Workstations',
  'Architectural Lighting',
  'Precision Input',
  'Modular Desk',
];

const FLAGSHIP_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    sku: 'NX-AUD-001',
    slug: 'aether-one-planar-headphones',
    name: 'Aether One Planar Studio',
    subtitle: 'Magnetostatischer Referenz-Kopfhörer aus CNC-gefrästem Titan',
    description:
      'Der Aether One kombiniert eine ultradünne 1,8-Mikrometer-Planarmembran mit einem akustisch transparenten Gehäuse aus Grade-5-Titan. Entwickelt für kompromisslose Impulstreue, extrem geringe harmonische Verzerrung (< 0,04 % THD) und ermüdungsfreies Mastering über Stunden.',
    category: 'Audio & Acoustics',
    price: 1290,
    compareAtPrice: 1450,
    currency: 'EUR',
    rating: 4.9,
    reviewCount: 142,
    stock: 28,
    status: 'active',
    featured: true,
    badge: 'Flaggschiff',
    images: [
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-001-a',
        name: 'Anodized Obsidian',
        finish: 'Mattes Titan Schwarz',
        hex: '#18181b',
        priceDelta: 0,
        sku: 'NX-AUD-001-OBS',
        stock: 18,
      },
      {
        id: 'var-001-b',
        name: 'Raw Bead-Blasted Titanium',
        finish: 'Natur-Titan Glasperlgestrahlt',
        hex: '#a1a1aa',
        priceDelta: 90,
        sku: 'NX-AUD-001-RAW',
        stock: 10,
      },
    ],
    specs: [
      { label: 'Treiber-Architektur', value: '98 mm Planar-Magnetostat (N55 Neodym-Array)' },
      { label: 'Frequenzgang', value: '5 Hz – 58.000 Hz (±1,5 dB)' },
      { label: 'Impedanz', value: '32 Ω (linear, rein ohmsch)' },
      { label: 'Klirrfaktor (THD)', value: '< 0,04 % bei 1 kHz / 100 dB SPL' },
      { label: 'Anschluss', value: 'Dual 4,4 mm Pentaconn & XLR-4 symmetrisch (OCC-Kupfer)' },
    ],
    dimensions: '210 × 185 × 105 mm',
    weight: '395 g (ohne Kabel)',
    materials: ['Grade-5-Titan', 'Lammleder-Alcantara-Hybrid', 'Edelstahl-Federstahl', 'OCC-Reinkupfer'],
    leadTime: 'Sofort versandfertig (24h Express)',
    updatedAt: '2026-11-15T14:20:00Z',
    monthlySales: 86,
    revenueGenerated: 110940,
  },
  {
    id: 'prod-002',
    sku: 'NX-INP-002',
    slug: 'monolith-k1-mechanical-console',
    name: 'Monolith K1 Eingabekonsole',
    subtitle: 'Gasket-Mount Präzisionstastatur mit Hall-Effekt-Sensoren & Drehregler',
    description:
      'Aus einem massiven 3,4 kg Block Flugzeugaluminium gefertigt, bietet die Monolith K1 kontaktlose magnetische Hall-Effekt-Schalter mit frei programmierbarem Auslösepunkt (0,1 mm bis 3,8 mm) sowie einen kugelgelagerten CNC-Drehencoder für Timeline- und Audio-Steuerung.',
    category: 'Precision Input',
    price: 540,
    currency: 'EUR',
    rating: 4.95,
    reviewCount: 219,
    stock: 42,
    status: 'active',
    featured: true,
    badge: 'Bestseller',
    images: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-002-a',
        name: 'Graphite Slate (DE-ISO)',
        finish: 'Harteloxiert Graphit',
        hex: '#27272a',
        priceDelta: 0,
        sku: 'NX-INP-002-GRP',
        stock: 25,
      },
      {
        id: 'var-002-b',
        name: 'Arctic Silver (ANSI)',
        finish: 'Silber Eloxiert + Messinggewicht',
        hex: '#e4e4e7',
        priceDelta: 40,
        sku: 'NX-INP-002-SLV',
        stock: 17,
      },
    ],
    specs: [
      { label: 'Gehäuse', value: '6063-T6 CNC-Aluminium + PVD-Messing-Dämpfer' },
      { label: 'Schalter', value: 'NEXUS Linear Magnetic (0,1 – 3,8 mm Rapid Trigger)' },
      { label: 'Abfragerate', value: '8.000 Hz Nativ USB-C / 1.000 Hz Ultra-Low-Latency Wireless' },
      { label: 'Tastenkappen', value: 'Double-Shot PBT (1,7 mm Wandstärke, subtile Laser-Legende)' },
      { label: 'Akku', value: '6.000 mAh Li-Po (bis zu 320 Stunden ohne Backlight)' },
    ],
    dimensions: '328 × 138 × 31 mm',
    weight: '2.180 g',
    materials: ['6063-T6 Aluminium', 'PVD-beschichtetes Messing', 'Poron-Akustikschaum', 'PBT-Polymer'],
    leadTime: 'Sofort versandfertig (24h Express)',
    updatedAt: '2026-11-16T09:15:00Z',
    monthlySales: 164,
    revenueGenerated: 88560,
  },
  {
    id: 'prod-003',
    sku: 'NX-LGT-003',
    slug: 'solaris-arc-architectural-lamp',
    name: 'Solaris Arc Arbeitsplatzleuchte',
    subtitle: 'CRI 99+ Vollspektrum-Lichtleiste mit automatischer Umgebungsadaptation',
    description:
      'Die Solaris Arc schwebt nahezu schwerelos über Ihrem Setup. Ein asymmetrisches optisches Linsensystem beleuchtet die Arbeitsfläche vollkommen blendfrei, während sämtliche Reflexionen auf Monitoren eliminiert werden. Farbtemperatur (2.700K – 6.500K) folgt auf Wunsch dem natürlichen Tageslichtverlauf.',
    category: 'Architectural Lighting',
    price: 420,
    compareAtPrice: 480,
    currency: 'EUR',
    rating: 4.85,
    reviewCount: 98,
    stock: 19,
    status: 'active',
    featured: true,
    badge: 'Red Dot Winner',
    images: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-003-a',
        name: 'Matte Carbon',
        finish: 'Tiefschwarz Pulverbeschichtet',
        hex: '#171717',
        priceDelta: 0,
        sku: 'NX-LGT-003-CRB',
        stock: 12,
      },
      {
        id: 'var-003-b',
        name: 'Warm Champagne',
        finish: 'Gebürstetes Champagner-Gold',
        hex: '#d6d3d1',
        priceDelta: 30,
        sku: 'NX-LGT-003-CHP',
        stock: 7,
      },
    ],
    specs: [
      { label: 'Farbwiedergabeindex', value: 'Ra > 99 (R9 > 96 für farbverbindliches Arbeiten)' },
      { label: 'Lichtstrom', value: '1.400 Lumen (stufenlos dimmbar 1 % – 100 %)' },
      { label: 'Farbtemperatur', value: '2.700 K – 6.500 K Circadian Sync' },
      { label: 'Steuerung', value: 'Drahtloser Puck-Controller (Aluminium) & Matter/Thread' },
    ],
    dimensions: '920 × 450 × 24 mm',
    weight: '1.450 g',
    materials: ['Stranggepresstes Aluminium', 'PMMA-Mikroprismen-Optik', 'Stahl-Gegengewicht'],
    leadTime: 'Sofort versandfertig (24h Express)',
    updatedAt: '2026-11-14T18:45:00Z',
    monthlySales: 112,
    revenueGenerated: 47040,
  },
  {
    id: 'prod-004',
    sku: 'NX-WRK-004',
    slug: 'chrono-dock-tb5-workstation-hub',
    name: 'ChronoDock TB5 Studio Hub',
    subtitle: '120 Gbit/s Thunderbolt 5 Docking-Station mit integriertem NVMe-RAID-Einschub',
    description:
      'Ein einziges Kabel verwandelt Ihr Notebook in eine vollwertige Studio-Workstation. Das lüfterlose Vollmetall-Chassis mit gefrästen Kühlrippen beherbergt drei Thunderbolt-5-Downstream-Ports, 10-GbE-Netzwerk, UHS-II SD/CFexpress-Leser, 140W Power Delivery und zwei M.2 PCIe 4.0 NVMe-Slots.',
    category: 'Workstations',
    price: 680,
    currency: 'EUR',
    rating: 4.92,
    reviewCount: 74,
    stock: 9,
    status: 'low_stock',
    featured: true,
    badge: 'Limitiert',
    images: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-004-a',
        name: 'Base Dock (ohne SSD)',
        finish: 'Space Black CNC',
        hex: '#18181b',
        priceDelta: 0,
        sku: 'NX-WRK-004-BASE',
        stock: 6,
      },
      {
        id: 'var-004-b',
        name: 'Studio Edition (inkl. 4 TB NVMe RAID 0)',
        finish: 'Space Black CNC + 4TB',
        hex: '#3f3f46',
        priceDelta: 340,
        sku: 'NX-WRK-004-4TB',
        stock: 3,
      },
    ],
    specs: [
      { label: 'Host-Schnittstelle', value: 'Thunderbolt 5 (80 Gbit/s bidirektional, 120 Gbit/s Bandwidth Boost)' },
      { label: 'Display-Support', value: 'Bis zu 3× 8K @ 60Hz oder 2× 6K Studio Display + 4K @ 240Hz' },
      { label: 'Netzwerk', value: '10 Gigabit Ethernet (Marvell AQtion Controller)' },
      { label: 'Stromversorgung', value: '140 W USB-PD 3.1 EPR (GaN-Netzteil integriert)' },
    ],
    dimensions: '240 × 112 × 36 mm',
    weight: '1.120 g',
    materials: ['CNC-Aluminium-Kühlkörper', 'Wärmeleitpads in Industriequalität'],
    leadTime: 'Wenige Exemplare auf Lager',
    updatedAt: '2026-11-16T11:00:00Z',
    monthlySales: 95,
    revenueGenerated: 64600,
  },
  {
    id: 'prod-005',
    sku: 'NX-DSK-005',
    slug: 'atelier-desk-system-walnut',
    name: 'Atelier Modul-Schreibtisch 180',
    subtitle: 'Amerikanischer Schwarznuss-Massivholz-Tisch mit magnetischer Kabelführung',
    description:
      'Das Herzstück moderner Arbeitsarchitektur. Die 38 mm starke Tischplatte aus nachhaltig gewonnenem amerikanischem Schwarznussbaum wird in sieben Durchgängen von Hand mit Naturharzöl veredelt. Unter der Oberfläche verbirgt sich eine durchgehende, magnetisch zugängliche Stahlwanne für vollkommen unsichtbares Kabelmanagement.',
    category: 'Modular Desk',
    price: 1890,
    compareAtPrice: 2150,
    currency: 'EUR',
    rating: 4.98,
    reviewCount: 63,
    stock: 14,
    status: 'active',
    featured: true,
    badge: 'Manufaktur',
    images: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-005-a',
        name: 'American Black Walnut (180 × 85 cm)',
        finish: 'Amerikanischer Nussbaum geölt',
        hex: '#451a03',
        priceDelta: 0,
        sku: 'NX-DSK-005-WAL',
        stock: 9,
      },
      {
        id: 'var-005-b',
        name: 'Nordic Smoked Oak (180 × 85 cm)',
        finish: 'Geräucherte Eiche matt',
        hex: '#57534e',
        priceDelta: 100,
        sku: 'NX-DSK-005-OAK',
        stock: 5,
      },
    ],
    specs: [
      { label: 'Höhenverstellung', value: 'Dual-Brushless-Antrieb (61 cm – 127 cm, 48 mm/s, < 36 dB)' },
      { label: 'Tragkraft', value: '160 kg dynamisch / 220 kg statisch' },
      { label: 'Kabelmanagement', value: 'Integrierte MagRail-Stahlwanne + 6-fach PD-Steckdosenleiste' },
      { label: 'Holzstärke', value: '38 mm durchgehende Lamelle (FSC-zertifiziert)' },
    ],
    dimensions: '1800 × 850 × 610–1270 mm',
    weight: '68,5 kg',
    materials: ['Amerikanischer Schwarznussbaum', 'Pulverbeschichteter Baustahl', 'Wollfilz-Einlage'],
    leadTime: 'Versand per Spedition (3–5 Werktage)',
    updatedAt: '2026-11-13T16:10:00Z',
    monthlySales: 38,
    revenueGenerated: 71820,
  },
  {
    id: 'prod-006',
    sku: 'NX-AUD-006',
    slug: 'vela-dac-reference-amplifier',
    name: 'Vela R2R DAC & Kopfhörerverstärker',
    subtitle: 'Diskreter 24-Bit R2R-Widerstandsnetzwerk-Wandler mit Class-A Ausgangsstufe',
    description:
      'Für Puristen, die digitale Präzision mit analoger Wärme verbinden möchten. Der Vela nutzt 0,01 % selektierte Präzisionswiderstände in einer vollsymmetrischen R2R-Leiterarchitektur, kombiniert mit einer diskreten Class-A-Verstärkerschaltung, die bis zu 6,4 Watt an 32 Ohm liefert.',
    category: 'Audio & Acoustics',
    price: 980,
    currency: 'EUR',
    rating: 4.88,
    reviewCount: 87,
    stock: 21,
    status: 'active',
    featured: true,
    images: [
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-006-a',
        name: 'Obsidian Matte',
        finish: 'Schwarz Eloxiert',
        hex: '#18181b',
        priceDelta: 0,
        sku: 'NX-AUD-006-OBS',
        stock: 15,
      },
      {
        id: 'var-006-b',
        name: 'Raw Aluminum',
        finish: 'Silber Gebürstet',
        hex: '#d4d4d8',
        priceDelta: 0,
        sku: 'NX-AUD-006-SLV',
        stock: 6,
      },
    ],
    specs: [
      { label: 'Wandler-Architektur', value: 'Vollsymmetrisches 24-Bit R2R Ladder Array + DSD1024' },
      { label: 'Ausgangsleistung', value: '2× 6.400 mW @ 32 Ω / 2× 850 mW @ 300 Ω' },
      { label: 'Rauschabstand (SNR)', value: '127 dB (A-gewichtet)' },
      { label: 'Lautstärkeregelung', value: '64-stufiges Relais-Widerstandsnetzwerk (kanalgetrennt)' },
    ],
    dimensions: '220 × 190 × 52 mm',
    weight: '2.840 g',
    materials: ['CNC-Aluminium', 'Ringkerntransformator mit Mu-Metall-Schirmung', 'OLED-Punktmatrix'],
    leadTime: 'Sofort versandfertig (24h Express)',
    updatedAt: '2026-11-15T10:30:00Z',
    monthlySales: 54,
    revenueGenerated: 52920,
  },
  {
    id: 'prod-007',
    sku: 'NX-INP-007',
    slug: 'vector-zero-magnesium-mouse',
    name: 'Vector Zero Magnesium Maus',
    subtitle: 'Ultraleichte 41g Exoskelett-Maus aus Magnesiumlegierung mit 8K-Polling',
    description:
      'Gefertigt im Thixomolding-Verfahren aus einer hochfesten AZ91D-Magnesiumlegierung vereint die Vector Zero extreme Verwindungssteifigkeit mit einem Gewicht von nur 41 Gramm. Optische Mikroschalter verhindern Doppelklicks dauerhaft.',
    category: 'Precision Input',
    price: 189,
    currency: 'EUR',
    rating: 4.82,
    reviewCount: 312,
    stock: 64,
    status: 'active',
    featured: false,
    badge: '41g Ultra-Light',
    images: [
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=1200&q=85',
      'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-007-a',
        name: 'Carbon Stealth',
        finish: 'Magnesium Schwarz',
        hex: '#18181b',
        priceDelta: 0,
        sku: 'NX-INP-007-BLK',
        stock: 40,
      },
      {
        id: 'var-007-b',
        name: 'Titanium Frost',
        finish: 'Magnesium Weiß-Silber',
        hex: '#f4f4f5',
        priceDelta: 10,
        sku: 'NX-INP-007-WHT',
        stock: 24,
      },
    ],
    specs: [
      { label: 'Sensor', value: 'PAW3950 Pro (30.000 DPI, 750 IPS, 50G Beschleunigung)' },
      { label: 'Gewicht', value: '41 g (±1 g)' },
      { label: 'Empfänger', value: '8.000 Hz Wireless Desk-Dongle mit Status-LED' },
      { label: 'Gleitfüße', value: '100 % ungefärbtes Virgin-PTFE (abgerundete Kanten)' },
    ],
    dimensions: '121 × 62 × 37 mm',
    weight: '41 g',
    materials: ['AZ91D-Magnesiumlegierung', 'Virgin-Grade PTFE'],
    leadTime: 'Sofort versandfertig (24h Express)',
    updatedAt: '2026-11-15T19:00:00Z',
    monthlySales: 245,
    revenueGenerated: 46305,
  },
  {
    id: 'prod-008',
    sku: 'NX-WRK-008',
    slug: 'kanso-display-riser-shelf',
    name: 'Kanso Dual-Monitor-Architektur',
    subtitle: 'Schwebendes Cockpit-Shelf aus Nussbaum und eloxiertem Federstahl',
    description:
      'Strukturieren Sie Ihren Schreibtisch auf zwei Ebenen. Das Kanso Cockpit-Shelf schafft Platz für Audio-Interfaces, Mac Studio oder Eingabegeräte unterhalb der Monitorebene und verfügt über eine gefräste MagSafe-Ladestation aus Aluminium.',
    category: 'Modular Desk',
    price: 290,
    currency: 'EUR',
    rating: 4.91,
    reviewCount: 178,
    stock: 35,
    status: 'active',
    featured: false,
    images: [
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=1200&q=85',
    ],
    variants: [
      {
        id: 'var-008-a',
        name: 'Walnut & Black Steel (120 cm)',
        finish: 'Nussbaum / Mattschwarz',
        hex: '#451a03',
        priceDelta: 0,
        sku: 'NX-WRK-008-WAL',
        stock: 22,
      },
      {
        id: 'var-008-b',
        name: 'Smoked Oak & Silver (120 cm)',
        finish: 'Räuchereiche / Silber',
        hex: '#57534e',
        priceDelta: 0,
        sku: 'NX-WRK-008-OAK',
        stock: 13,
      },
    ],
    specs: [
      { label: 'Breite', value: '1.200 mm (passend für bis zu 2× 32" Displays)' },
      { label: 'Belastbarkeit', value: 'Bis zu 45 kg ohne Durchbiegung' },
      { label: 'Ablagefach', value: 'Mit Merino-Wollfilz ausgekleidete Schublade' },
    ],
    dimensions: '1200 × 240 × 115 mm',
    weight: '5,8 kg',
    materials: ['Amerikanischer Nussbaum', 'Eloxierter Stahl', '100 % deutscher Merino-Wollfilz'],
    leadTime: 'Sofort versandfertig (24h Express)',
    updatedAt: '2026-11-12T12:00:00Z',
    monthlySales: 132,
    revenueGenerated: 38280,
  },
];

// Deterministic catalog expansion so the storefront Infinite Scroll and Admin TanStack Table
// operate over a rich dataset of 144 products across all 5 categories.
const SERIES_TEMPLATES: {
  category: ProductCategory;
  prefix: string;
  baseNames: string[];
  subtitles: string[];
  basePrice: number;
  imagePool: string[];
}[] = [
  {
    category: 'Audio & Acoustics',
    prefix: 'NX-AUD',
    baseNames: [
      'Aether Reference Cable XLR',
      'Sonosynthesis Nearfield Monitor M5',
      'Acoustic Resonator Diffuser Panel',
      'IsoPuck Titanium Decoupler Set',
      'Phantom Tube Preamp Stage',
      'Prism Mastering IEM',
    ],
    subtitles: [
      'Symmetrische Studio-Signalführung mit 7N OCC-Silberlitze',
      'Koaxialer 2-Wege-Nahfeldmonitor mit Beryllium-Hochtöner',
      'Architektonischer 2D-QRD-Akustikabsorber aus Massivholz',
      'Resonanzabsorber für Studiomonitore und Verstärker (4er-Set)',
      'Hybride Röhren-Vorstufe mit selektierten NOS-Trioden',
      '6-Treiber-In-Ear-Monitor mit elektrostatischem Superhochtöner',
    ],
    basePrice: 320,
    imagePool: [
      'https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558089687-f282ffcbc126?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    category: 'Workstations',
    prefix: 'NX-WRK',
    baseNames: [
      'Monolith Vertical Laptop Stand',
      'Hydraulic Articulated Monitor Arm',
      'Thunderbolt 5 Active Optical Cable',
      'NVMe Pro Enclosure 80Gbps',
      'Studio Rack Mount Chassis 3U',
      'Precision Power Conditioner 8-Port',
    ],
    subtitles: [
      'Schwerkraft-klemmender Dual-Dock-Ständer aus 2,4 kg Aluminium',
      'Gasdruckfeder-Tragarm für Ultrawide-Displays bis 22 kg',
      'Optisches Hochgeschwindigkeitskabel (3,0 m) ohne Signalverlust',
      'Passiv gekühltes CNC-Gehäuse für M.2 2280 PCIe Gen4 SSDs',
      'Modulares 19-Zoll-Tischrack mit schwingungsgedämpften Schienen',
      'Netzfilter mit Überspannungsschutz und digitaler Spannungsanzeige',
    ],
    basePrice: 210,
    imagePool: [
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    category: 'Architectural Lighting',
    prefix: 'NX-LGT',
    baseNames: [
      'Lumen Bar Pro Monitor Light',
      'Ambient Bias Backlight Strip',
      'Helios Desk Monolith Lamp',
      'Chroma Key Studio Panel CRI98',
      'Linear Pendant Task Light 150',
      'Smart Rotary Dimmer Puck',
    ],
    subtitles: [
      'Blendfreie Bildschirmleuchte mit asymmetrischem Strahlengang',
      '6500K D65-Normlicht-Hintergrundbeleuchtung für Color Grading',
      'Skulpturale Tischleuchte aus gebürstetem Messing und Opalglas',
      'Bi-Color Flächenleuchte mit lautloser Konvektionskühlung',
      'Abgehängte Pendelleuchte mit direktem und indirektem Lichtanteil',
      'Magnetischer Dreh-Controller für Matter-kompatible Lichtszenen',
    ],
    basePrice: 195,
    imagePool: [
      'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1540932239986-30128078f3c5?auto=format&fit=crop&w=900&q=80',
    ],
  },
  {
    category: 'Precision Input',
    prefix: 'NX-INP',
    baseNames: [
      'Tactile Macro Pad 12-Key + Encoder',
      'Artisan Keycap Set PBT Graphite',
      'Cordura Pro Speed Deskmat XL',
      'Coiled Aviator Cable LEMO-Spec',
      'Ergonomic Wrist Rest Walnut CNC',
      'Trackball Studio Precision Orb',
    ],
    subtitles: [
      'Programmierbares QMK/VIA-Makropad mit zwei Drehreglern',
      '148-teiliges Tastenkappenset im Cherry-Profil (1,7 mm PBT)',
      'Wasserabweisende Hochgeschwindigkeits-Unterlage mit vernähten Kanten',
      'Handgefertigtes Push-Pull-Metallsteckerkabel mit Techflex-Mantel',
      'Ergonomische Handballenauflage mit 7-Grad-Neigungswinkel',
      'Optischer Studio-Trackball mit Saphirglas-Kugellagerung',
    ],
    basePrice: 125,
    imagePool: [
      'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=900&q=85',
      'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&w=900&q=85',
    ],
  },
  {
    category: 'Modular Desk',
    prefix: 'NX-DSK',
    baseNames: [
      'MagTray Under-Desk Organizer',
      'Merino Wool Desk Pad 90x40',
      'Valet Charging Tray Leather & Alu',
      'Modular Pegboard Wall System',
      'Rolling Studio Pedestal 3-Drawer',
      'Magnetic Cable Spine Vertebrae',
    ],
    subtitles: [
      'Schwenkbare Untertisch-Schublade mit magnetischem Verschluss',
      '4 mm starker 100 % deutscher Merinofilz mit Naturkautschuk-Basis',
      'Ablageschale aus vegetabil gerbtem Leder mit 15W Qi2-Ladepad',
      'Wandpaneel aus pulverbeschichtetem Stahl für Werkzeuge & Kopfhörer',
      'Rollcontainer mit Soft-Close-Auszügen und Zahlenschloss',
      'Flexible vertikale Kabelführung vom Schreibtisch zum Boden',
    ],
    basePrice: 160,
    imagePool: [
      'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1593062096033-9a26b09da705?auto=format&fit=crop&w=900&q=80',
      'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?auto=format&fit=crop&w=900&q=80',
    ],
  },
];

function buildCatalog(): Product[] {
  const catalog: Product[] = [...FLAGSHIP_PRODUCTS];
  const editions = ['Mk II', 'Studio Edition', 'Pro', 'Atelier Series', 'Carbon', 'Titanium'];

  let index = FLAGSHIP_PRODUCTS.length + 1;
  for (let round = 0; round < 5; round++) {
    for (const group of SERIES_TEMPLATES) {
      for (let i = 0; i < group.baseNames.length; i++) {
        if (catalog.length >= 144) break;
        const numStr = String(index).padStart(3, '0');
        const edition = editions[(round + i) % editions.length];
        const baseName = group.baseNames[i];
        const fullName = round === 0 ? baseName : `${baseName} ${edition}`;
        const slug = `${fullName
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)/g, '')}-${numStr}`;

        const price = Math.round((group.basePrice + i * 45 + round * 65) / 5) * 5;
        const hasDiscount = index % 5 === 0;
        const compareAtPrice = hasDiscount ? Math.round(price * 1.15) : undefined;

        const stockSeed = (index * 17) % 85;
        let status: ProductStatus = 'active';
        let stock = stockSeed;
        if (index % 19 === 0) {
          status = 'out_of_stock';
          stock = 0;
        } else if (index % 13 === 0) {
          status = 'draft';
          stock = 15;
        } else if (stockSeed < 10) {
          status = 'low_stock';
          stock = Math.max(2, stockSeed);
        }

        const monthlySales = ((index * 23) % 140) + 12;
        const rating = Number((4.65 + ((index * 7) % 34) / 100).toFixed(2));
        const reviewCount = ((index * 19) % 180) + 14;
        const imgPrimary = group.imagePool[i % group.imagePool.length];
        const imgSecondary = group.imagePool[(i + 1) % group.imagePool.length];

        catalog.push({
          id: `prod-${numStr}`,
          sku: `${group.prefix}-${numStr}`,
          slug,
          name: fullName,
          subtitle: group.subtitles[i],
          description: `${fullName} wurde nach strengen industriellen Maßstäben für professionelle Studio- und Arbeitsumgebungen konzipiert. Jedes Bauteil durchläuft eine mehrstufige Qualitätskontrolle und kombiniert langlebige Materialien wie eloxiertes Aluminium, Edelstahl und nachhaltige Naturwerkstoffe.`,
          category: group.category,
          price,
          compareAtPrice,
          currency: 'EUR',
          rating,
          reviewCount,
          stock,
          status,
          featured: false,
          badge: hasDiscount ? 'Edition' : index % 9 === 0 ? 'Neuheit' : undefined,
          images: [imgPrimary, imgSecondary],
          variants: [
            {
              id: `var-${numStr}-a`,
              name: 'Obsidian Black',
              finish: 'Feinstruktur Mattschwarz',
              hex: '#18181b',
              priceDelta: 0,
              sku: `${group.prefix}-${numStr}-BLK`,
              stock: Math.ceil(stock * 0.65),
            },
            {
              id: `var-${numStr}-b`,
              name: 'Natural Silver',
              finish: 'Eloxiertes Silber',
              hex: '#d4d4d8',
              priceDelta: 20,
              sku: `${group.prefix}-${numStr}-SLV`,
              stock: Math.floor(stock * 0.35),
            },
          ],
          specs: [
            { label: 'Fertigung', value: '5-Achsen CNC-Präzisionsfertigung (Toleranz ±0,02 mm)' },
            { label: 'Oberfläche', value: 'Harteloxiert nach MIL-A-8625 Typ III' },
            { label: 'Garantie', value: '5 Jahre NEXUS Herstellergarantie' },
            { label: 'Herkunft', value: 'Entwickelt in München / Gefertigt in der EU' },
          ],
          dimensions: '280 × 140 × 42 mm',
          weight: '840 g',
          materials: ['6061-T6 Aluminium', 'Rostfreier Edelstahl', 'EPDM-Dämpfung'],
          leadTime:
            status === 'out_of_stock'
              ? 'Nachproduktion läuft (ca. 10 Werktage)'
              : 'Sofort versandfertig (24h Express)',
          updatedAt: new Date(Date.UTC(2026, 10, 16 - (index % 15), 10, index % 60)).toISOString(),
          monthlySales,
          revenueGenerated: monthlySales * price,
        });

        index++;
      }
    }
  }

  return catalog;
}

export const ALL_PRODUCTS: Product[] = buildCatalog();

export async function getFeaturedProducts(): Promise<Product[]> {
  return ALL_PRODUCTS.filter((p) => p.featured);
}

export async function getAllPublicProducts(): Promise<Product[]> {
  return ALL_PRODUCTS.filter((p) => p.status !== 'draft');
}

export async function getProductBySlug(slug: string): Promise<Product | undefined> {
  return ALL_PRODUCTS.find((p) => p.slug === slug);
}

export async function getRelatedProducts(currentSlug: string, category: ProductCategory): Promise<Product[]> {
  return ALL_PRODUCTS.filter(
    (p) => p.slug !== currentSlug && p.category === category && p.status !== 'draft'
  ).slice(0, 4);
}

export function queryInventory(
  products: Product[],
  params: InventoryQueryParams
): PaginatedProductsResponse {
  const {
    pageIndex = 0,
    pageSize = 12,
    search = '',
    category = 'ALL',
    status = 'ALL',
    sortBy = 'updatedAt',
    sortOrder = 'desc',
  } = params;

  const summary = {
    totalCatalogValue: products.reduce((sum, p) => sum + p.price * p.stock, 0),
    activeCount: products.filter((p) => p.status === 'active').length,
    lowStockCount: products.filter((p) => p.status === 'low_stock').length,
    outOfStockCount: products.filter((p) => p.status === 'out_of_stock').length,
  };

  let filtered = [...products];

  if (search.trim()) {
    const q = search.toLowerCase().trim();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.subtitle.toLowerCase().includes(q)
    );
  }

  if (category && category !== 'ALL') {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (status && status !== 'ALL') {
    filtered = filtered.filter((p) => p.status === status);
  }

  filtered.sort((a, b) => {
    const dir = sortOrder === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name, 'de') * dir;
      case 'sku':
        return a.sku.localeCompare(b.sku, 'de') * dir;
      case 'price':
        return (a.price - b.price) * dir;
      case 'stock':
        return (a.stock - b.stock) * dir;
      case 'monthlySales':
        return (a.monthlySales - b.monthlySales) * dir;
      case 'revenueGenerated':
        return (a.revenueGenerated - b.revenueGenerated) * dir;
      case 'updatedAt':
      default:
        return (new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()) * dir;
    }
  });

  const totalItems = filtered.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
  const safePageIndex = Math.min(Math.max(0, pageIndex), totalPages - 1);
  const start = safePageIndex * pageSize;
  const data = filtered.slice(start, start + pageSize);

  return {
    data,
    totalItems,
    totalPages,
    pageIndex: safePageIndex,
    pageSize,
    summary,
  };
}

export function getDashboardKpis(range: '7d' | '30d' | '90d' | '1y' = '30d'): KpiMetric[] {
  const multiplier = range === '7d' ? 0.26 : range === '30d' ? 1 : range === '90d' ? 2.85 : 11.4;

  return [
    {
      id: 'kpi-revenue',
      label: 'Netto-Umsatz',
      value: new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        maximumFractionDigits: 0,
      }).format(Math.round(482940 * multiplier)),
      rawValue: Math.round(482940 * multiplier),
      changePercent: 18.4,
      trend: 'up',
      comparisonLabel: 'ggü. Vorperiode',
      sparkline: [32, 38, 35, 44, 49, 46, 54, 61, 59, 68, 74, 82],
    },
    {
      id: 'kpi-orders',
      label: 'Abgeschlossene Bestellungen',
      value: new Intl.NumberFormat('de-DE').format(Math.round(842 * multiplier)),
      rawValue: Math.round(842 * multiplier),
      changePercent: 12.7,
      trend: 'up',
      comparisonLabel: 'ggü. Vorperiode',
      sparkline: [50, 52, 58, 55, 63, 68, 70, 74, 79, 81, 86, 92],
    },
    {
      id: 'kpi-aov',
      label: 'Ø Warenkorbwert (AOV)',
      value: '573,56 €',
      rawValue: 573.56,
      changePercent: 5.1,
      trend: 'up',
      comparisonLabel: 'ggü. 545,70 € zuvor',
      sparkline: [520, 535, 530, 548, 552, 560, 558, 565, 571, 569, 575, 574],
    },
    {
      id: 'kpi-conversion',
      label: 'Storefront Conversion-Rate',
      value: '3,84 %',
      rawValue: 3.84,
      changePercent: 0.62,
      trend: 'up',
      comparisonLabel: 'Branchen-Benchmark: 2,1 %',
      sparkline: [3.1, 3.2, 3.25, 3.4, 3.38, 3.55, 3.6, 3.68, 3.72, 3.79, 3.81, 3.84],
    },
  ];
}

export function getRevenueTimeSeries(range: '7d' | '30d' | '90d' | '1y' = '30d'): RevenueDataPoint[] {
  const count = range === '7d' ? 7 : range === '30d' ? 15 : range === '90d' ? 12 : 12;
  const points: RevenueDataPoint[] = [];

  const monthNames = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

  for (let i = 0; i < count; i++) {
    const wave = Math.sin(i * 0.65) * 3200 + i * 1450;
    const base = range === '1y' ? 380000 : range === '90d' ? 98000 : 24500;
    const revenue = Math.round(base + wave * (range === '1y' ? 12 : range === '90d' ? 3.2 : 1));
    const previousRevenue = Math.round(revenue * (0.81 + ((i * 3) % 9) * 0.01));
    const orders = Math.max(12, Math.round(revenue / 573));

    let label = '';
    if (range === '1y') {
      label = monthNames[i % 12];
    } else if (range === '90d') {
      label = `KW ${35 + i}`;
    } else if (range === '7d') {
      const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
      label = days[i % 7];
    } else {
      const dayNum = i * 2 + 1;
      label = `${String(dayNum).padStart(2, '0')}. Nov`;
    }

    points.push({
      date: `2026-11-${String(Math.min(30, i + 1)).padStart(2, '0')}`,
      label,
      revenue,
      previousRevenue,
      orders,
      aov: Math.round(revenue / orders),
    });
  }

  return points;
}

export function getTrafficSources(): TrafficSourcePoint[] {
  return [
    {
      name: 'Organische Suche (SEO / RSC)',
      value: 42,
      sessions: 52840,
      conversionRate: 4.35,
      revenue: 214800,
      color: '#18181b',
    },
    {
      name: 'Direktzugriffe & Stammkunden',
      value: 26,
      sessions: 32710,
      conversionRate: 5.12,
      revenue: 142300,
      color: '#52525b',
    },
    {
      name: 'Kuratiertes Creator-Netzwerk',
      value: 18,
      sessions: 22640,
      conversionRate: 3.45,
      revenue: 76400,
      color: '#10b981',
    },
    {
      name: 'Editorial Newsletter',
      value: 9,
      sessions: 11320,
      conversionRate: 6.2,
      revenue: 36940,
      color: '#a1a1aa',
    },
    {
      name: 'Paid Performance (Search)',
      value: 5,
      sessions: 6290,
      conversionRate: 2.15,
      revenue: 12500,
      color: '#d4d4d8',
    },
  ];
}

export function getTrafficHeatmap(): HourlyHeatmapCell[] {
  const days = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'];
  const cells: HourlyHeatmapCell[] = [];

  for (let d = 0; d < days.length; d++) {
    for (let h = 0; h < 24; h++) {
      // Realistic European e-commerce curve: peaks 10:00–13:00 and 19:00–22:00
      const morningPeak = Math.exp(-Math.pow(h - 11, 2) / 10);
      const eveningPeak = Math.exp(-Math.pow(h - 20.5, 2) / 8) * 1.25;
      const weekendFactor = d >= 5 ? 0.88 : 1.08;
      const midweekBoost = d === 1 || d === 2 || d === 3 ? 1.12 : 1.0;

      const rawScore = (morningPeak + eveningPeak) * weekendFactor * midweekBoost;
      const intensity = Math.min(100, Math.max(6, Math.round(rawScore * 78)));
      const visitors = Math.round(intensity * 14.5 + ((d * 7 + h * 11) % 35));
      const conversionRate = Number((2.1 + (intensity / 100) * 2.8).toFixed(2));
      const conversions = Math.max(0, Math.round((visitors * conversionRate) / 100));

      cells.push({
        day: days[d],
        dayIndex: d,
        hour: h,
        hourLabel: `${String(h).padStart(2, '0')}:00`,
        visitors,
        conversions,
        conversionRate,
        intensity,
      });
    }
  }

  return cells;
}

export function getRecentOrders(): RecentOrder[] {
  return [
    {
      id: 'ord-9941',
      orderNumber: '#NX-9941',
      customerName: 'Dr. Lukas Bergmann',
      customerEmail: 'l.bergmann@architektur-muc.de',
      city: 'München',
      country: 'DE',
      total: 1830.0,
      itemsCount: 2,
      status: 'paid',
      createdAt: 'Vor 4 Minuten',
      paymentMethod: 'Apple Pay (Stripe)',
    },
    {
      id: 'ord-9940',
      orderNumber: '#NX-9940',
      customerName: 'Clara von Waldeck',
      customerEmail: 'clara@studio-waldeck.ch',
      city: 'Zürich',
      country: 'CH',
      total: 2430.0,
      itemsCount: 2,
      status: 'shipped',
      createdAt: 'Vor 19 Minuten',
      paymentMethod: 'Kreditkarte •••• 4821',
    },
    {
      id: 'ord-9939',
      orderNumber: '#NX-9939',
      customerName: 'Jonas Lindqvist',
      customerEmail: 'jonas@krono-sound.se',
      city: 'Stockholm',
      country: 'SE',
      total: 1290.0,
      itemsCount: 1,
      status: 'paid',
      createdAt: 'Vor 42 Minuten',
      paymentMethod: 'Klarna Sofort',
    },
    {
      id: 'ord-9938',
      orderNumber: '#NX-9938',
      customerName: 'Maximilian Richter',
      customerEmail: 'm.richter@tonstudio-berlin.de',
      city: 'Berlin',
      country: 'DE',
      total: 960.0,
      itemsCount: 2,
      status: 'processing',
      createdAt: 'Vor 1 Stunde',
      paymentMethod: 'SEPA-Echtzeitüberweisung',
    },
    {
      id: 'ord-9937',
      orderNumber: '#NX-9937',
      customerName: 'Sophie Laurent',
      customerEmail: 's.laurent@atelier-paris.fr',
      city: 'Paris',
      country: 'FR',
      total: 540.0,
      itemsCount: 1,
      status: 'shipped',
      createdAt: 'Vor 2 Stunden',
      paymentMethod: 'Kreditkarte •••• 9012',
    },
    {
      id: 'ord-9936',
      orderNumber: '#NX-9936',
      customerName: 'Hendrik Vance',
      customerEmail: 'hv@vance-capital.nl',
      city: 'Amsterdam',
      country: 'NL',
      total: 3180.0,
      itemsCount: 3,
      status: 'shipped',
      createdAt: 'Vor 3 Stunden',
      paymentMethod: 'Apple Pay (Stripe)',
    },
  ];
}

export function getCoreWebVitals(): CoreWebVitalMetric[] {
  return [
    {
      metric: 'LCP',
      name: 'Largest Contentful Paint',
      value: '0,78 s',
      target: '< 1,20 s',
      percentile75: 99,
      status: 'optimal',
      description: 'Statisches Edge-Rendering (ISR) + Preload kritischer Hero-Typografie',
    },
    {
      metric: 'INP',
      name: 'Interaction to Next Paint',
      value: '28 ms',
      target: '< 200 ms',
      percentile75: 98,
      status: 'optimal',
      description: 'Zero-Bundle Server Components im Katalog + Optimistic UI Updates',
    },
    {
      metric: 'CLS',
      name: 'Cumulative Layout Shift',
      value: '0,00',
      target: '< 0,10',
      percentile75: 100,
      status: 'optimal',
      description: 'Strikte Aspect-Ratio-Container & selbstgehostete Variable Fonts',
    },
    {
      metric: 'TTFB',
      name: 'Time to First Byte',
      value: '42 ms',
      target: '< 200 ms',
      percentile75: 99,
      status: 'optimal',
      description: 'Nginx 1.27 Alpine Reverse-Proxy Cache & Traefik v3 HTTP/3 TLS',
    },
  ];
}
