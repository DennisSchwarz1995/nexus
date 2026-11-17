'use client';

import { useEffect, useState } from 'react';
import { create } from 'zustand';
import { Product, ProductCategory } from '@/types';

export type Locale = 'de' | 'en';

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

function readCookieLocale(): Locale | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(/(?:^|;\s*)nexus_locale=(de|en)/);
  return match ? (match[1] as Locale) : null;
}

function writeCookieLocale(locale: Locale) {
  if (typeof document === 'undefined') return;
  const host = window.location.hostname;
  const domainPart = host.endsWith('dennis-schwarz.dev')
    ? '; domain=.dennis-schwarz.dev'
    : '';
  document.cookie = `nexus_locale=${locale}; path=/${domainPart}; max-age=31536000; SameSite=Lax`;
  try {
    localStorage.setItem('nexus-locale', locale);
  } catch {
    // ignore storage errors
  }
}

export const useLocaleStore = create<LocaleState>((set) => ({
  locale: 'de',
  setLocale: (locale) => {
    writeCookieLocale(locale);
    set({ locale });
  },
}));

export function useLocale() {
  const { locale, setLocale } = useLocaleStore();
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const cookieLoc = readCookieLocale();
    let storedLoc: Locale | null = null;
    try {
      const raw = localStorage.getItem('nexus-locale');
      if (raw === 'de' || raw === 'en') storedLoc = raw;
    } catch {
      // ignore
    }
    const initial = cookieLoc || storedLoc || 'de';
    if (initial !== locale) {
      setLocale(initial);
    }
    setHydrated(true);
  }, [locale, setLocale]);

  return {
    locale: hydrated ? locale : 'de',
    setLocale,
  };
}

export function translateCategory(category: ProductCategory, locale: Locale): string {
  if (locale === 'en') return category;
  const map: Record<ProductCategory, string> = {
    'Audio & Acoustics': 'Audio & Akustik',
    Workstations: 'Workstations & Docks',
    'Architectural Lighting': 'Architektur-Licht',
    'Precision Input': 'Präzisions-Eingabe',
    'Modular Desk': 'Modulare Tischsysteme',
  };
  return map[category] || category;
}

const EN_FLAGSHIP_TRANSLATIONS: Record<
  string,
  {
    name?: string;
    subtitle: string;
    description: string;
    badge?: string;
    specs: { label: string; value: string }[];
    materials: string[];
    leadTime: string;
  }
> = {
  'prod-001': {
    name: 'Aether One Planar Studio',
    subtitle: 'Reference planar-magnetic headphones machined from Grade-5 titanium',
    description:
      'The Aether One pairs an ultra-thin 1.8-micrometer planar diaphragm with an acoustically transparent housing milled from solid Grade-5 titanium. Engineered for uncompromising transient response, vanishingly low harmonic distortion (< 0.04% THD), and fatigue-free mastering sessions.',
    badge: 'Flagship',
    specs: [
      { label: 'Driver Architecture', value: '98 mm Planar Magnetic (N55 Neodymium Array)' },
      { label: 'Frequency Response', value: '5 Hz – 58,000 Hz (±1.5 dB)' },
      { label: 'Impedance', value: '32 Ω (linear, purely resistive)' },
      { label: 'Total Harmonic Distortion', value: '< 0.04% @ 1 kHz / 100 dB SPL' },
      { label: 'Connectivity', value: 'Dual 4.4 mm Pentaconn & balanced 4-pin XLR (OCC Copper)' },
    ],
    materials: ['Grade-5 Titanium', 'Lambskin & Alcantara Hybrid', 'Spring Steel', 'OCC Pure Copper'],
    leadTime: 'In stock · Ships within 24h via Express',
  },
  'prod-002': {
    name: 'Monolith K1 Input Console',
    subtitle: 'Gasket-mount precision keyboard with Hall-effect sensors & rotary encoder',
    description:
      'Milled from a solid 3.4 kg billet of aerospace-grade aluminum, the Monolith K1 features contactless magnetic Hall-effect switches with customizable actuation (0.1 mm to 3.8 mm) and a dual-bearing CNC rotary encoder for timeline scrubbing and studio level control.',
    badge: 'Bestseller',
    specs: [
      { label: 'Chassis', value: '6063-T6 CNC Aluminum + PVD Brass Internal Weight' },
      { label: 'Switches', value: 'NEXUS Linear Magnetic (0.1 – 3.8 mm Rapid Trigger)' },
      { label: 'Polling Rate', value: '8,000 Hz Native USB-C / 1,000 Hz Ultra-Low-Latency Wireless' },
      { label: 'Keycaps', value: 'Double-Shot PBT (1.7 mm wall thickness, subtle laser legends)' },
      { label: 'Battery', value: '6,000 mAh Li-Po (up to 320 hours with illumination off)' },
    ],
    materials: ['6063-T6 Aluminum', 'PVD-Coated Brass', 'Poron Acoustic Foam', 'PBT Polymer'],
    leadTime: 'In stock · Ships within 24h via Express',
  },
  'prod-003': {
    name: 'Solaris Arc Task Luminaire',
    subtitle: 'CRI 99+ full-spectrum architectural light bar with circadian adaptation',
    description:
      'Solaris Arc floats effortlessly above your workspace. An asymmetric optical micro-prism system illuminates your desk surface with zero screen glare or monitor reflections, while color temperature (2,700K – 6,500K) tracks natural daylight.',
    badge: 'Red Dot Winner',
    specs: [
      { label: 'Color Rendering Index', value: 'Ra > 99 (R9 > 96 for color-critical grading)' },
      { label: 'Luminous Flux', value: '1,400 Lumens (stepless dimming 1% – 100%)' },
      { label: 'Color Temperature', value: '2,700 K – 6,500 K Circadian Sync' },
      { label: 'Control', value: 'Wireless Aluminum Rotary Puck & Matter/Thread' },
    ],
    materials: ['Extruded Aluminum', 'PMMA Micro-Prism Optics', 'Weighted Steel Base'],
    leadTime: 'In stock · Ships within 24h via Express',
  },
  'prod-004': {
    name: 'ChronoDock TB5 Studio Hub',
    subtitle: '120 Gbps Thunderbolt 5 docking station with dual NVMe RAID bay',
    description:
      'A single cable transforms your notebook into a full studio workstation. The fanless all-metal chassis with machined cooling fins houses three Thunderbolt 5 downstream ports, 10GbE networking, UHS-II SD/CFexpress readers, 140W Power Delivery, and two M.2 PCIe 4.0 NVMe slots.',
    badge: 'Limited Edition',
    specs: [
      { label: 'Host Interface', value: 'Thunderbolt 5 (80 Gbps bi-directional, 120 Gbps Bandwidth Boost)' },
      { label: 'Display Support', value: 'Up to 3× 8K @ 60Hz or 2× 6K Studio Display + 4K @ 240Hz' },
      { label: 'Networking', value: '10 Gigabit Ethernet (Marvell AQtion Controller)' },
      { label: 'Power Delivery', value: '140 W USB-PD 3.1 EPR (Integrated GaN Power Supply)' },
    ],
    materials: ['CNC Aluminum Heatsink Chassis', 'Industrial Thermal Interface Pads'],
    leadTime: 'Low stock · Ready for immediate dispatch',
  },
  'prod-005': {
    name: 'Atelier Modular Desk 180',
    subtitle: 'Solid American black walnut sit-stand desk with magnetic cable architecture',
    description:
      'The centerpiece of modern workspace architecture. The 38 mm solid American black walnut tabletop is hand-finished in seven coats of natural resin oil. Beneath the surface lies a full-length magnetically accessible steel trough for completely invisible cable routing.',
    badge: 'Bespoke Craft',
    specs: [
      { label: 'Height Adjustment', value: 'Dual Brushless Drive (61 cm – 127 cm, 48 mm/s, < 36 dB)' },
      { label: 'Load Capacity', value: '160 kg dynamic / 220 kg static' },
      { label: 'Cable Management', value: 'Integrated MagRail steel trough + 6-way PD power rail' },
      { label: 'Timber Thickness', value: '38 mm full-length staves (FSC-certified)' },
    ],
    materials: ['American Black Walnut', 'Powder-Coated Structural Steel', 'Merino Wool Felt'],
    leadTime: 'White-glove freight delivery (3–5 business days)',
  },
  'prod-006': {
    name: 'Vela R2R Reference DAC & Amp',
    subtitle: 'Discrete 24-bit R2R resistor ladder converter with Class-A output stage',
    description:
      'Built for purists who demand digital precision paired with analog dimensionality. Vela employs 0.01% hand-matched precision resistors in a fully balanced R2R ladder topology, driving a discrete Class-A amplifier delivering 6.4W into 32 ohms.',
    specs: [
      { label: 'Converter Topology', value: 'Fully Balanced 24-Bit R2R Ladder Array + DSD1024' },
      { label: 'Output Power', value: '2× 6,400 mW @ 32 Ω / 2× 850 mW @ 300 Ω' },
      { label: 'Signal-to-Noise Ratio', value: '127 dB (A-weighted)' },
      { label: 'Volume Control', value: '64-step relay-switched resistor attenuator (dual mono)' },
    ],
    materials: ['CNC Billet Aluminum', 'Mu-Metal Shielded Toroidal Transformer', 'OLED Dot Matrix'],
    leadTime: 'In stock · Ships within 24h via Express',
  },
  'prod-007': {
    name: 'Vector Zero Magnesium Mouse',
    subtitle: 'Ultra-lightweight 41g magnesium alloy exoskeleton mouse with 8K polling',
    description:
      'Formed via thixomolding from high-strength AZ91D magnesium alloy, Vector Zero combines structural rigidity with a featherweight 41-gram mass. Optical microswitches eliminate double-clicking permanently.',
    badge: '41g Ultra-Light',
    specs: [
      { label: 'Sensor', value: 'PAW3950 Pro (30,000 DPI, 750 IPS, 50G Acceleration)' },
      { label: 'Mass', value: '41 g (±1 g)' },
      { label: 'Receiver', value: '8,000 Hz Wireless Desk Dongle with status LED' },
      { label: 'Skates', value: '100% Virgin-Grade PTFE (chamfered edges)' },
    ],
    materials: ['AZ91D Magnesium Alloy', 'Virgin-Grade PTFE'],
    leadTime: 'In stock · Ships within 24h via Express',
  },
  'prod-008': {
    name: 'Kanso Dual Display Shelf',
    subtitle: 'Floating desk cockpit riser crafted from walnut and anodized spring steel',
    description:
      'Elevate your workspace across two architectural tiers. The Kanso Cockpit Shelf creates dedicated space for audio interfaces, Mac Studio, or input peripherals below your monitors while integrating a machined aluminum MagSafe charging pad.',
    specs: [
      { label: 'Width', value: '1,200 mm (accommodates up to 2× 32" reference displays)' },
      { label: 'Load Rating', value: 'Up to 45 kg with zero deflection' },
      { label: 'Storage Tray', value: 'Integrated drawer lined with German Merino wool felt' },
    ],
    materials: ['American Black Walnut', 'Anodized Structural Steel', '100% Merino Wool Felt'],
    leadTime: 'In stock · Ships within 24h via Express',
  },
};

const EN_SUBTITLE_MAP: Record<string, string> = {
  'Symmetrische Studio-Signalführung mit 7N OCC-Silberlitze':
    'Balanced studio signal interconnect with 7N OCC silver-plated conductors',
  'Koaxialer 2-Wege-Nahfeldmonitor mit Beryllium-Hochtöner':
    'Coaxial 2-way nearfield studio monitor with pure beryllium tweeter',
  'Architektonischer 2D-QRD-Akustikabsorber aus Massivholz':
    'Architectural 2D QRD acoustic diffuser & absorber crafted from solid timber',
  'Resonanzabsorber für Studiomonitore und Verstärker (4er-Set)':
    'Precision acoustic isolation decouplers for studio monitors & amps (Set of 4)',
  'Hybride Röhren-Vorstufe mit selektierten NOS-Trioden':
    'Hybrid vacuum tube preamplifier stage with matched NOS triodes',
  '6-Treiber-In-Ear-Monitor mit elektrostatischem Superhochtöner':
    '6-driver reference in-ear monitor with electrostatic super-tweeter',
  'Schwerkraft-klemmender Dual-Dock-Ständer aus 2,4 kg Aluminium':
    'Gravity-clamping vertical dual laptop dock milled from 2.4 kg aluminum',
  'Gasdruckfeder-Tragarm für Ultrawide-Displays bis 22 kg':
    'Pneumatic articulated monitor arm for ultrawide displays up to 22 kg',
  'Optisches Hochgeschwindigkeitskabel (3,0 m) ohne Signalverlust':
    'Active optical high-speed Thunderbolt cable (3.0 m) with zero signal loss',
  'Passiv gekühltes CNC-Gehäuse für M.2 2280 PCIe Gen4 SSDs':
    'Passively cooled CNC aluminum enclosure for M.2 2280 PCIe Gen4 NVMe SSDs',
  'Modulares 19-Zoll-Tischrack mit schwingungsgedämpften Schienen':
    'Modular 3U desktop studio rack with vibration-damped mounting rails',
  'Netzfilter mit Überspannungsschutz und digitaler Spannungsanzeige':
    '8-port studio power conditioner with surge protection & voltage readout',
  'Blendfreie Bildschirmleuchte mit asymmetrischem Strahlengang':
    'Glare-free monitor light bar with asymmetric optical projection',
  '6500K D65-Normlicht-Hintergrundbeleuchtung für Color Grading':
    '6500K D65 reference bias backlight strip for color grading suites',
  'Skulpturale Tischleuchte aus gebürstetem Messing und Opalglas':
    'Sculptural desk monolith lamp crafted from brushed brass and opal glass',
  'Bi-Color Flächenleuchte mit lautloser Konvektionskühlung':
    'CRI 98 bi-color studio LED panel with silent convection cooling',
  'Abgehängte Pendelleuchte mit direktem und indirektem Lichtanteil':
    'Architectural linear pendant luminaire with direct and indirect distribution',
  'Magnetischer Dreh-Controller für Matter-kompatible Lichtszenen':
    'Magnetic aluminum rotary dimmer puck for Matter-compatible lighting scenes',
  'Programmierbares QMK/VIA-Makropad mit zwei Drehreglern':
    'Programmable 12-key QMK/VIA macro pad with dual CNC rotary encoders',
  '148-teiliges Tastenkappenset im Cherry-Profil (1,7 mm PBT)':
    '148-key artisan keycap set in Cherry profile (1.7 mm thick PBT)',
  'Wasserabweisende Hochgeschwindigkeits-Unterlage mit vernähten Kanten':
    'Water-repellent Cordura speed deskmat XL with precision stitched edges',
  'Handgefertigtes Push-Pull-Metallsteckerkabel mit Techflex-Mantel':
    'Handcrafted coiled aviator cable with LEMO-spec push-pull connector',
  'Ergonomische Handballenauflage mit 7-Grad-Neigungswinkel':
    'Ergonomic solid walnut & CNC aluminum wrist rest with 7-degree angle',
  'Optischer Studio-Trackball mit Saphirglas-Kugellagerung':
    'Optical studio precision trackball with sapphire crystal bearings',
  'Schwenkbare Untertisch-Schublade mit magnetischem Verschluss':
    'Swiveling under-desk organizer tray with magnetic latch mechanism',
  '4 mm starker 100 % deutscher Merinofilz mit Naturkautschuk-Basis':
    '4 mm thick 100% German Merino wool felt desk pad with natural rubber base',
  'Ablageschale aus vegetabil gerbtem Leder mit 15W Qi2-Ladepad':
    'Vegetable-tanned leather & aluminum valet tray with 15W Qi2 wireless charging',
  'Wandpaneel aus pulverbeschichtetem Stahl für Werkzeuge & Kopfhörer':
    'Powder-coated steel modular pegboard wall system for studio accessories',
  'Rollcontainer mit Soft-Close-Auszügen und Zahlenschloss':
    '3-drawer rolling studio pedestal with soft-close slides and combination lock',
  'Flexible vertikale Kabelführung vom Schreibtisch zum Boden':
    'Magnetic articulated cable spine routing from desk to floor',
};

export function localizeProduct(product: Product, locale: Locale): Product {
  if (locale === 'de') return product;

  const flagship = EN_FLAGSHIP_TRANSLATIONS[product.id];
  if (flagship) {
    return {
      ...product,
      name: flagship.name || product.name,
      subtitle: flagship.subtitle,
      description: flagship.description,
      badge: flagship.badge ?? product.badge,
      specs: flagship.specs,
      materials: flagship.materials,
      leadTime: flagship.leadTime,
    };
  }

  return {
    ...product,
    subtitle: EN_SUBTITLE_MAP[product.subtitle] || product.subtitle,
    description: `${product.name} is engineered to exacting industrial standards for professional studio and workspace environments. Every unit undergoes multi-stage quality inspection and combines durable materials such as anodized aluminum, stainless steel, and sustainably sourced natural timber.`,
    badge:
      product.badge === 'Neuheit'
        ? 'New Release'
        : product.badge === 'Limitiert'
        ? 'Limited'
        : product.badge,
    specs: [
      { label: 'Manufacturing', value: '5-Axis CNC Precision Milling (±0.02 mm tolerance)' },
      { label: 'Surface Finish', value: 'Hard-Anodized Type III (MIL-A-8625)' },
      { label: 'Warranty', value: '5-Year NEXUS Manufacture Warranty' },
      { label: 'Origin', value: 'Engineered in Munich / Crafted in the EU' },
    ],
    materials: ['6061-T6 Aluminum', 'Stainless Steel', 'EPDM Acoustic Damping'],
    leadTime:
      product.status === 'out_of_stock'
        ? 'Restocking (approx. 10 business days)'
        : 'In stock · Ships within 24h via Express',
  };
}
