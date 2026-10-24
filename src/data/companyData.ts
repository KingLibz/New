import { ProjectItem, ServiceItem } from '../types';

export const COMPANY_INFO = {
  name: 'Demash Construction Pvt Ltd',
  shortName: 'Demash Construction',
  tagline: 'Civil Engineering · Turnkey Construction · Demash Global',
  director: 'Liberman Magaya',
  directorTitle: 'Managing Director & Principal Project Lead',
  phone: '+263 78 421 9178',
  phoneDisplay: '+263 78 421 9178',
  whatsappUrl: 'https://wa.me/263784219178',
  email: 'info@demashglobal.com',
  adminEmail: 'libermanmagaya@gmail.com',
  location: 'Norton & Harare, Zimbabwe',
  address: 'K17412, Katanga, Norton, Zimbabwe (Workshop Base) & Highlands Commercial Corridor, Harare',
  headquarters: 'K17412, Katanga, Norton, Zimbabwe',
  workshopBase: 'K17412, Katanga, Norton, Zimbabwe',
  productionDomain: 'demashglobal.live',
  operatingCities: ['Harare', 'Norton', 'Bulawayo', 'Mutare', 'Gweru', 'Masvingo', 'Victoria Falls'],
  stats: [
    { label: 'Setting-out Accuracy', value: '1mm', desc: 'Laser-guided civil alignment' },
    { label: 'Milestone Escrow', value: '50/30/20', desc: 'Secure staged release framework' },
    { label: 'Turnkey Handover', value: '100%', desc: 'Zero uncompleted projects' },
    { label: 'Active Projects', value: '18+', desc: 'Across Harare & major provinces' }
  ]
};

export const SERVICES: ServiceItem[] = [
  {
    id: 'turnkey-residential',
    title: 'Turnkey Luxury Residential Construction',
    tagline: 'From raw land to turnkey luxury handover',
    description: 'Bespoke contemporary mansions, single and double-storey villas, and modern cluster homes across Harare North and prestigious suburbs. Full architectural execution with zero omitted consumables.',
    deliverables: [
      'Excavation, reinforced foundation & certified raft slabs',
      'Double-brick structural masonry with steel lintels',
      'Engineered timber/steel trusses & Chromadek/slate roofing',
      'Master suite plaster skims, porcelain floor tiling & imported sanitaryware'
    ],
    features: ['1mm setting-out tolerance', 'Fixed lump-sum contracts', 'Dedicated resident site engineer'],
    icon: 'home'
  },
  {
    id: 'civil-engineering',
    title: 'Precision Civil Engineering & Infrastructure',
    tagline: 'Heavy civil works, structural concrete & steel framing',
    description: 'Commercial substructures, warehouse structural steelwork, retaining walls, industrial concrete aprons, and multi-tier civil groundworks compliant with Zimbabwe national building standards.',
    deliverables: [
      'Site clearing, soil compaction tests & mass earthworks',
      'Structural steel portal frames and heavy load slabs',
      'Stormwater management, drainage channels & retention ponds',
      'Concrete retaining systems for hilly and slope topographies'
    ],
    features: ['Engineer-stamped certifications', 'Tested cube crushing strength', 'Laser-levelled flatwork'],
    icon: 'building'
  },
  {
    id: 'swimming-pools',
    title: 'Luxury Gunite & Infinity Swimming Pools',
    tagline: 'Architectural pool engineering & resort outdoor living',
    description: 'Reinforced concrete gunite swimming pools, modern rim-flow infinity edges, glass mosaic tiling, integrated mood illumination, solar heat pumps, and automated saltwater filtration plants.',
    deliverables: [
      'Engineered double-cage rebar structural shell casting',
      'Waterproof marblite plaster or full glass mosaic tiling',
      'Solar thermal heating manifolds & energy-efficient pumps',
      'Non-slip travertine/granite coping & pool surround decking'
    ],
    features: ['10-year structural warranty', 'Low chemical saltwater systems', 'Custom submerged sun-shelves'],
    icon: 'waves'
  },
  {
    id: 'diaspora-management',
    title: 'Remote Diaspora Project Management & Escrow',
    tagline: 'Guaranteed peace of mind for Zimbabweans abroad',
    description: 'Designed specifically for Zimbabweans in the UK, USA, South Africa, Australia, and the diaspora. Avoid family disputes and diverted funds with legally binding 50/30/20 escrow milestones and weekly 4K drone progress audits.',
    deliverables: [
      'Independent escrow account with milestone-conditional drawdown',
      'Weekly 4K drone videography & high-resolution photo logs',
      'Manufacturer-direct materials purchase receipts and site inventory',
      'Direct WhatsApp and video walkthroughs with Director Liberman Magaya'
    ],
    features: ['No upfront 100% funding', 'Third-party engineer sign-off', 'Zero inflation risk on locked contracts'],
    icon: 'shield-check'
  },
  {
    id: 'borehole-solar',
    title: 'Borehole Siting, Drilling & Solar Backups',
    tagline: 'Complete self-sufficient off-grid water and power systems',
    description: 'Geophysical hydro-siting, high-yield casing drilling, submersible DC solar pumps, elevated 5,000L–10,000L storage tanks, and hybrid 8–15kVA solar inverter systems with lithium-ion storage.',
    deliverables: [
      'Hydro-geological survey with high-yield aquifer mapping',
      'Heavy-duty PVC casing down to bedrock and gravel packing',
      'Submersible solar pump with automatic dry-run protection',
      'Integrated hybrid solar battery backup for 24/7 uninterrupted power'
    ],
    features: ['Clean potable water yield', 'Zero ZESA load-shedding downtime', 'Automated pressure boosting'],
    icon: 'droplets'
  },
  {
    id: 'perimeter-security',
    title: 'Boundary Walls, Paving & Perimeter Security',
    tagline: 'High-security boundary engineering & durable paving',
    description: '2.4m–3m reinforced brick boundary walls with concrete columns, motorized sliding gates, high-voltage electric fencing with razor wire, and interlocking stone block paving for expansive driveways.',
    deliverables: [
      'Deep strip footing foundation to prevent wall subsidence',
      'Interlocking heavy-load cement paving blocks (60mm / 80mm)',
      'Certified high-voltage electric fence with siren & alarm interface',
      'Heavy-gauge galvanized sliding gates with heavy-duty motor tracks'
    ],
    features: ['Anti-climb engineering', 'Crack-resistant expansion joints', 'Architectural stone coping'],
    icon: 'fence'
  }
];

export const PROJECTS: ProjectItem[] = [
  {
    id: 'borrowdale-luxury-residence',
    title: 'The Borrowdale Modern Villa & Pavillion',
    category: 'Residential',
    location: 'Borrowdale Brooke, Harare',
    year: '2025 - 2026',
    description: 'A 680m² ultra-contemporary 5-bedroom residence featuring cantilevered second-storey balconies, expansive glass curtains, 12-meter infinity pool, and off-grid solar infrastructure.',
    image: '/src/assets/images/demash_luxury_residence_1791654545514.jpg',
    stats: {
      area: '680 m²',
      timeline: '8 Months Turnkey',
      spec: 'Ultra-Luxury Executive'
    }
  },
  {
    id: 'highlands-infinity-pool',
    title: 'Highlands Rim-Flow Infinity Pool & Sun Deck',
    category: 'Swimming Pool',
    location: 'Highlands, Harare',
    year: '2025',
    description: 'A bespoke 14m x 5m gunite infinity pool with glass mosaic accents, sunken martini lounge, integrated cascading shear descent fountains, and solar thermal heating.',
    image: '/src/assets/images/demash_swimming_pool_1791654558199.jpg',
    stats: {
      area: '70 m² Pool + Deck',
      timeline: '6 Weeks',
      spec: 'Resort Grade Gunite'
    }
  },
  {
    id: 'msasa-civil-engineering',
    title: 'Msasa Logistics Structural Steel Facility',
    category: 'Commercial',
    location: 'Msasa Industrial, Harare',
    year: '2025',
    description: 'Turnkey industrial warehouse spanning 1,800m² with 12m clear height, engineered high-tolerance concrete slab, reinforced truck docking bays, and stormwater containment.',
    image: '/src/assets/images/demash_commercial_project_1791654583768.jpg',
    stats: {
      area: '1,800 m²',
      timeline: '6 Months',
      spec: 'Heavy Industrial Civil'
    }
  },
  {
    id: 'shawasha-hills-estate',
    title: 'Shawasha Hills Engineered Sloped Foundation',
    category: 'Civil Engineering',
    location: 'Shawasha Hills, Harare',
    year: '2025 - 2026',
    description: 'Precision civil earthworks, stepped retaining walls, and rock-anchored foundation piers engineered for steep granite terrain, preventing differential soil settlement.',
    image: '/src/assets/images/demash_civil_engineering_1791654573283.jpg',
    stats: {
      area: '850 m² Footprint',
      timeline: '4 Months Foundation',
      spec: 'Rock Anchored Raft'
    }
  }
];

export const TESTIMONIALS = [
  {
    quote: "Building while living in London used to be my biggest fear after hearing horror stories from friends. Demash Construction changed everything. The 50/30/20 milestone escrow and weekly drone footage made the process completely transparent. Liberman called me every Friday without fail.",
    author: "Dr. Tawanda Chiweshe",
    location: "London, UK (Project in Glen Lorne, Harare)",
    project: "4-Bedroom Double Storey Mansion"
  },
  {
    quote: "Demash delivered our 12m infinity pool and patio within six weeks. The 1mm setting-out accuracy was real—every coping stone aligns like clockwork. Hands down the most professional contractor in Zimbabwe.",
    author: "Farai & Chipo Marange",
    location: "Borrowdale, Harare",
    project: "Infinity Pool & Outdoor Entertainment"
  },
  {
    quote: "We contracted Demash Construction for our warehouse steel framework and concrete floor in Msasa. Delivered on schedule, under budget, and council inspections passed on first submission.",
    author: "Kudzai Sithole",
    location: "Harare, Zimbabwe",
    project: "Commercial Logistics Hub"
  }
];
