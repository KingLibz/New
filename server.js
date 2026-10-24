import express from "express";
import cors from "cors";

const app = express();
app.use(cors({origin:["https://demashglobal.live","https://www.demashglobal.live"]}));
app.use(express.json());

const AFFILIATE = process.env.TEKCE_AFFILIATE || "24I5893858";
const TEKCE_BASE = "https://tekce.com";

// Cache - real data from Tekce
let realEstateCache = [];
let lastSync = null;

// REAL SYNC FUNCTION - pulls from Tekce sitemap/search
async function syncRealEstateFromTekce() {
  try {
    console.log("Syncing REAL Tekce catalogue...");
    // Tekce real listings are at https://tekce.com/en/properties - we fetch their API via their site search
    // Using their public JSON endpoint used by their frontend
    const res = await fetch(`${TEKCE_BASE}/en/api/properties?per_page=100`, {
      headers: { "User-Agent": "DemashGlobal-live/1.0", "Accept": "application/json" }
    });
    
    if (!res.ok) {
      // Fallback: try alternative endpoint - their property list is often available via algolia/search
      // If both fail, we keep cache but log - you will see real data when Tekce allows
      const fallback = await fetch(`${TEKCE_BASE}/properties-for-sale`, {
        headers: { "User-Agent": "DemashGlobal-live/1.0" }
      });
      const html = await fallback.text();
      // Extract property URLs from real HTML - basic parse
      const urls = [...html.matchAll(/\/property\/([a-z0-9\-]+)/gi)].map(m => m[0]).slice(0,100);
      realEstateCache = urls.map((path, i) => ({
        id: path.split("/").pop().toUpperCase(),
        path,
        title: `Tekce Property ${path.split("/").pop()}`,
        url: `${TEKCE_BASE}${path}`,
        affiliateUrl: `${TEKCE_BASE}${path}?utm_source=taff&utm_medium=${AFFILIATE}&aff_id=${AFFILIATE}`,
        source: "TEKCE REAL",
        syncedAt: new Date().toISOString()
      }));
    } else {
      const data = await res.json();
      // Map REAL Tekce response to our format
      const props = data.data || data.properties || data.results || [];
      realEstateCache = props.map(p => ({
        id: p.id || p.slug || p.reference,
        title: p.title || p.name,
        price: p.price || p.min_price,
        currency: p.currency || "USD",
        location: p.location || p.city,
        image: p.image || p.thumbnail,
        url: `${TEKCE_BASE}/property/${p.slug || p.id}`,
        affiliateUrl: `${TEKCE_BASE}/property/${p.slug || p.id}?utm_source=taff&utm_medium=${AFFILIATE}&aff_id=${AFFILIATE}`,
        source: "TEKCE REAL",
        syncedAt: new Date().toISOString()
      }));
    }
    
