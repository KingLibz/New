export type TabType = 
  | 'overview' 
  | 'services' 
  | 'pools' 
  | 'blueprints' 
  | 'estimator' 
  | 'diaspora' 
  | 'global-estates'
  | 'real-pipelines'
  | 'projects' 
  | 'proposals'
  | 'supplier-pos'
  | 'payments'
  | 'executive-admin'
  | 'contact';

export type AdminSubSection = 
  | 'proposals'
  | 'posts'
  | 'solar'
  | 'pos'
  | 'ingest'
  | 'vault'
  | 'pools-boq'
  | 'psycho-ads'
  | 'token-queue'
  | 'financial'
  | 'alibaba-sync'
  | 'affiliate-core'
  | 'global-matrix'
  | 'competitor-intercept'
  | 'supplier-contracts'
  | 'buyer-acquisition'
  | 'gateway-latency'
  | 'global-grid'
  | 'cross-border'
  | 'advantage-registry'
  | 'freight-logistics'
  | 'sms-cash-stream'
  | 'cold-vault'
  | 'gmail-affiliate-hub'
  | 'intent-firewall'
  | 'cognitive-sourcing'
  | 'drawing-takeoff-boq'
  | 'real-lead-radar';

export interface LoggedAffiliateDeal {
  id: string;
  sourcePlatform: 'Alibaba' | 'Made-in-China' | 'Global Sources' | 'DHgate' | 'Direct Manufacturer';
  productName: string;
  category: string;
  supplierName: string;
  supplierEmail: string;
  factoryLocation: string;
  moq: string;
  basePriceUSD: number;
  targetResaleUSD: number;
  affiliateCommissionPct: number;
  projectedProfitUSD: number;
  affiliateUrl: string;
  trackingToken: string;
  dealStatus: 'DISCOVERED' | 'LOGGED' | 'NEGOTIATING' | 'SAMPLE_ORDERED' | 'LOCKED_IN_ESCROW' | 'CLOSED_PAID';
  sourcedFromGmailMessageId?: string;
  dateLogged: string;
  notes: string;
}

export interface AffiliateSearchLink {
  id: string;
  platform: 'Alibaba' | 'Made-in-China' | 'DHgate' | 'Global Sources';
  title: string;
  category: string;
  directUrl: string;
  affiliateUrl: string;
  commissionTier: string;
  rating: number;
  minOrder: string;
  priceRange: string;
}

export interface AutoSendEmailPayload {
  to: string;
  subject: string;
  htmlBody: string;
  fromName?: string;
  templateType?: string;
  dealId?: string;
}

export interface AffiliateProgram {
  key: string;
  name: string;
  structure: 'FLAT_500' | 'RECURRING_30' | 'LIFETIME_VAR' | 'PERCENT_7' | 'PERCENT_5' | 'PERCENT_3';
  baseCommission: number;
  trackingRef: string;
  trackingUrl: string;
  category: string;
}

export interface AffiliateMatchRecord {
  id: string;
  targetProgramKey: string;
  programName: string;
  detectedPersona: string;
  prospectLead: string;
  contactTarget: string;
  rawContent: string;
  personalizedPitch: string;
  trackingUrl: string;
  estimatedCommissionUSD: number;
  status: 'PENDING' | 'DISPATCHED' | 'CONVERTED';
  timestamp: string;
}

export interface ProposalRecord {
  id: string;
  clientName: string;
  location: string;
  scope: string;
  totalUsd: number;
  stage: 'Draft' | 'Dispatched' | 'Signed' | 'Escrow Funded' | 'Active Build';
  milestones: {
    m1_50: number;
    m2_30: number;
    m3_20: number;
  };
  phone: string;
  diasporaOrigin?: string;
  date: string;
}

export interface SupplierMaterial {
  id: string;
  name: string;
  category: 'Cement' | 'Aggregates' | 'Steel' | 'Roofing' | 'Masonry' | 'Electrical';
  unit: string;
  supplierPrice: number;
  clientPrice: number;
  commission: number;
  inStock: boolean;
  supplierCode: string;
}

export interface SolarLead {
  id: string;
  client: string;
  suburb: string;
  systemSize: string;
  batteryCapacity: string;
  totalQuote: number;
  status: 'Audited' | 'Proposal Sent' | 'Deposit Paid' | 'Commissioned';
  monthlyZesaSavings: number;
}

export interface LeadIngestItem {
  id: string;
  phoneNumber: string;
  name: string;
  source: 'WhatsApp' | 'Facebook Lead' | 'Google' | 'Diaspora Referral';
  interest: string;
  verified: boolean;
  challengeStatus: 'Pass' | 'Pending' | 'Flagged';
  timestamp: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: 'Residential' | 'Commercial' | 'Swimming Pool' | 'Civil Engineering';
  location: string;
  year: string;
  description: string;
  image: string;
  stats: {
    area: string;
    timeline: string;
    spec: string;
  };
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  features: string[];
  icon: string;
}

export interface EstimateOptions {
  city: string;
  buildingType: string;
  squareMeters: number;
  finishTier: 'standard' | 'executive' | 'luxury';
  hasPool: boolean;
  hasBoreholeSolar: boolean;
  hasSolarSystem: boolean;
  hasBoundaryWall: boolean;
  hasPaving: boolean;
}

export interface EstimateResult {
  baseCost: number;
  addonsCost: number;
  totalCost: number;
  currency: string;
  ratePerSqm: number;
  breakdown: {
    category: string;
    amount: number;
    percentage: number;
  }[];
  milestones: {
    phase: string;
    percentage: number;
    amount: number;
    trigger: string;
  }[];
}

export interface EquipmentItem {
  sku: string;
  title: string;
  category: string;
  price: number;
  commission: number;
  specs: string[];
  targetUrl: string;
  inStock: boolean;
}

export interface NetworkScope {
  id: number;
  ip_range: string;
  country_code: string;
  business_vertical: string;
  last_scanned_at: string;
  status: 'ACTIVE' | 'IDLE' | 'SCANNING';
}

export interface B2BProposalLead {
  id: string;
  raw_content: string;
  business_vertical: string;
  processing_status: 'PENDING' | 'PROPOSAL_SENT' | 'DISPATCH_ERROR';
  recipient_email: string;
  agency_name: string;
  timestamp: string;
}
