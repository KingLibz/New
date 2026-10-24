import { ProposalRecord, SupplierMaterial, SolarLead, LeadIngestItem } from '../types';

export interface BufferedIncident {
  id: string;
  leadName: string;
  phone: string;
  location: string;
  scope: string;
  failedAt: string;
  errorReason: string;
  persona: 'Analytical' | 'Driver' | 'Expressive' | 'Amiable';
}

// Clean safety buffer vault - starts afresh for real-world incidents
export const INITIAL_SAFETY_BUFFER_VAULT: BufferedIncident[] = [];

export const PROPOSALS_LEDGER: ProposalRecord[] = [];

export const SUPPLIER_MATERIALS: SupplierMaterial[] = [
  {
    id: 'MAT-01',
    name: 'PPC Surebuild Cement (42.5N Strength)',
    category: 'Cement',
    unit: '50kg Bag',
    supplierPrice: 10.40,
    clientPrice: 11.80,
    commission: 1.40,
    inStock: true,
    supplierCode: 'PPC-HAR-425'
  },
  {
    id: 'MAT-02',
    name: 'High Yield Deformed Rebar Y12 (6m Lengths)',
    category: 'Steel',
    unit: 'Metric Tonne',
    supplierPrice: 1220.00,
    clientPrice: 1350.00,
    commission: 130.00,
    inStock: true,
    supplierCode: 'STL-Y12-6M'
  },
  {
    id: 'MAT-03',
    name: 'Washed River Sand (Coarse Concrete Sand)',
    category: 'Aggregates',
    unit: '20m³ Tipper Load',
    supplierPrice: 280.00,
    clientPrice: 340.00,
    commission: 60.00,
    inStock: true,
    supplierCode: 'AGG-RIV-20M'
  },
  {
    id: 'MAT-04',
    name: '19mm Crushed Granite Quarry Stone',
    category: 'Aggregates',
    unit: '20m³ Tipper Load',
    supplierPrice: 320.00,
    clientPrice: 390.00,
    commission: 70.00,
    inStock: true,
    supplierCode: 'AGG-GRA-19MM'
  },
  {
    id: 'MAT-05',
    name: 'Chromadek 0.58mm IBR Roofing Sheeting (Traffic Green / Charcoal)',
    category: 'Roofing',
    unit: 'Linear Meter',
    supplierPrice: 11.50,
    clientPrice: 13.50,
    commission: 2.00,
    inStock: true,
    supplierCode: 'ROOF-CHR-58'
  },
  {
    id: 'MAT-06',
    name: 'High-Density Solid Compressed Clay Common Bricks',
    category: 'Masonry',
    unit: '1,000 Bricks',
    supplierPrice: 115.00,
    clientPrice: 135.00,
    commission: 20.00,
    inStock: true,
    supplierCode: 'BRK-SOL-CLAY'
  }
];

export const SOLAR_DESK_LEADS: SolarLead[] = [];

export const VERIFIED_LEADS: LeadIngestItem[] = [];

export const CONSTRUCTION_POSTS_LIBRARY = [
  {
    id: 'POST-001',
    category: 'Diaspora Trust Psychology',
    title: 'Why 72% of Diaspora Builds Fail (And How 50/30/20 Escrow Solves It)',
    target: 'UK & South Africa Diaspora',
    hook: 'Stop wiring money to uncles who buy commuter omnibuses instead of your foundation cement.',
    body: `If you are sending $5,000 every month to Zimbabwe for your house and have only seen 3 blurry WhatsApp photos of unplastered brickwork, STOP.\n\nDemash Construction operates on an independent 50/30/20 escrow charter:\n1. 50% mobilization released only upon certified structural raft slab signoff.\n2. 30% released when roof is sealed & tested.\n3. 20% released upon keys in hand.\n\nEvery Friday, receive 4K drone video inspection straight to your phone. Speak directly with Managing Director Liberman Magaya (+263 78 421 9178).`,
    cta: 'DM for free Stand Geotechnical Evaluation in Harare.',
    status: 'Published'
  },
  {
    id: 'POST-002',
    category: 'Engineering & Setting-Out',
    title: '1mm Setting-Out Accuracy: Why We Laser Level Every Footing',
    target: 'Harare Homeowners & Investors',
    hook: 'A 15mm difference at foundation level equals a 60mm roof truss sag.',
    body: `Most contractors use string lines tied to bent steel rods on wet soil. When the first rains hit Harare, uneven soil settlement causes diagonal wall cracks.\n\nDemash uses optical theodolites and laser receivers to guarantee 1mm setting-out tolerance. Tested 30MPa cube crushing strength on all structural concrete.\n\nBuild once, build forever. WhatsApp Director Liberman: +263 78 421 9178.`,
    cta: 'Book your Harare stand civil survey today.',
    status: 'Scheduled'
  },
  {
    id: 'POST-003',
    category: 'Swimming Pools & Luxury',
    title: 'Gunite vs Fibreglass Pools in Zimbabwe’s Climate',
    target: 'Borrowdale, Highlands & Glen Lorne',
    hook: 'Never install a thin fibreglass shell in expansive red clay.',
    body: `In Harare North, ground moisture shifts drastically between wet summer and dry winter. Fibreglass pools pop out or buckle under hydro-pressure.\n\nDemash Gunite Pools feature double-caged high-tensile steel reinforcement, 30MPa pneumatically shot concrete, and natural travertine coping with automated saltwater chlorination. Backed by a 10-year structural warranty.`,
    cta: 'Get your custom pool 3D plan & BOQ today.',
    status: 'Ready'
  }
];
