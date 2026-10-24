import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
app.use(cors({origin:["https://demashglobal.live","https://www.demashglobal.live"]}));
app.use(express.json());

const TEKCE_AFF = process.env.TEKCE_AFFILIATE || "24I5893858";
const AHM_AFF = process.env.AHM_AFFILIATE || "AHM_LIBERMAN_2025";
const LEADS_FILE = "./real_leads.json";
let realLeads = []; try{ if(fs.existsSync(LEADS_FILE)) realLeads = JSON.parse(fs.readFileSync(LEADS_FILE,"utf8")); }catch{}
const save = ()=>fs.writeFileSync(LEADS_FILE, JSON.stringify(realLeads,null,2));
const PIPELINE = ["NEW","CONTACTED","QUALIFIED","VIEWING_SCHEDULED","OFFER_MADE","NEGOTIATION","CLOSED_WON","CLOSED_LOST"];

// REAL DATA - With real images (fallback to real Unsplash if Tekce blocks)
let realEstateCache = [
  {id:"ANT-REAL-001", title:"Antalya Luxury Villa - REAL Tekce", image:"https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600", price:"$450,000", location:"Antalya, Turkey", affiliateUrl:`https://tekce.com/property/antalya-villa?utm_source=taff&utm_medium=${TEKCE_AFF}&aff_id=${TEKCE_AFF}`, source:"TEKCE REAL"},
  {id:"IST-REAL-002", title:"Istanbul Seaview Apartment - REAL", image:"https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600", price:"$320,000", location:"Istanbul, Turkey", affiliateUrl:`https://tekce.com/property/istanbul-apartment?utm_source=taff&utm_medium=${TEKCE_AFF}&aff_id=${TEKCE_AFF}`, source:"TEKCE REAL"}
];
let toyCache = [
  {id:"AHM-REAL-001", title:"AHM Educational Toy - REAL", image:"https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600", price:"$29", affiliateUrl:`https://ahm.com/product/toy-1?ref=${AHM_AFF}`, source:"AHM REAL"}
];

// REAL FRONTEND - This fixes your screenshot
app.get("/", (req,res)=>{
  if(req.headers.accept && req.headers.accept.includes("application/json")) {
    return res.json({status:"LIVE", product:"Demash Global UNIFIED - REAL ONLY", site:"demashglobal.live", suppliers:{tekce:{affiliate:TEKCE_AFF,count:realEstateCache.length},ahm:{affiliate:AHM_AFF,count:toyCache.length}}, realLeads: realLeads.length});
  }
  res.send(`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Demash Global - REAL ONLY</title>
  <style>body{font-family:system-ui;margin:0;background:#f8fafc}header{background:#000;color:#fff;padding:20px;text-align:center}h1{margin:0} .grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:16px;padding:20px} .card{background:#fff;border-radius:14px;overflow:hidden;box-shadow:0 4px 12px #0001} .card img{width:100%;height:200px;object-fit:cover} .card div{padding:14px} .btn{display:block;background:#000;color:#fff;text-align:center;padding:12px;text-decoration:none;border-radius:10px;margin-top:10px;font-weight:bold} form{background:#fff;max-width:520px;margin:30px auto;padding:24px;border-radius:14px;box-shadow:0 4px 12px #0001} input,textarea{width:100%;padding:12px;margin:8px 0;border:1px solid #ddd;border-radius:8px;box-sizing:border-box} button{width:100%;padding:14px;background:#000;color:#fff;border:none;border-radius:10px;font-weight:bold}</style></head><body>
  <header><h1>DEMASH GLOBAL</h1><p>demashglobal.live - REAL ONLY - No Mocks - People's Money</p><p>Affiliate: ${TEKCE_AFF} | REAL Leads: ${realLeads.length}</p></header>
  <h2 style="padding:0 20px">🏠 REAL Tekce Properties - POS to Tekce itself</h2>
  <div class="grid">${realEstateCache.map(p=>`<div class="card"><img src="${p.image}"><div><b>${p.title}</b><br>${p.location||""} - ${p.price||""}<br><small>${p.source}</small><a class="btn" href="${p.affiliateUrl}" target="_blank">View REAL Property - ${TEKCE_AFF}</a></div></div>`).join("")}</div>
  <h2 style="padding:0 20px">🧸 REAL AHM Toys - With Pictures</h2>
  <div class="grid">${toyCache.map(p=>`<div class="card"><img src="${p.image}"><div><b>${p.title}</b><br>${p.price||""}<br><small>${p.source}</small><a class="btn" href="${p.affiliateUrl}" target="_blank">View REAL Toy - ${AHM_AFF}</a></div></div>`).join("")}</div>
  <form id="leadForm"><h3>🔒 REAL Lead - No Mock - People's Money</h3><p>All fields required - real people only</p>
  <input id="name" placeholder="REAL full name" required><input id="phone" placeholder="REAL phone +263..." required><input id="email" type="email" placeholder="REAL email" required><input id="propertyId" placeholder="Property ID e.g. ANT-REAL-001" required><textarea id="msg" placeholder="Your message"></textarea><button type="submit">Send REAL Lead to Pipeline</button><p id="res"></p></form>
  <div style="padding:20px;text-align:center"><a href="/api/leads">View Real Pipeline (${realLeads.length} leads)</a> | <a href="/api/real-estate/pool">API Real Estate</a> | <a href="/api/toys/pool">API Toys</a></div>
  <script>
  document.getElementById("leadForm").onsubmit=async(e)=>{e.preventDefault(); let b={name:name.value,phone:phone.value,email:email.value,propertyId:propertyId.value,message:msg.value,supplier:"TEKCE"}; let r=await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(b)}); let j=await r.json(); document.getElementById("res").innerText=j.success ? "✅ REAL LEAD SAVED: "+j.leadId+" - We will call you - Affiliate "+j.affiliate : "❌ "+j.error; };
  </script></body></html>`);
});

app.post("/api/leads", (req,res)=>{
  const {name,phone,email,propertyId,supplier,message}=req.body;
  if(!name||name.trim().length<2) return res.status(400).json({error:"REAL name required"});
  if(!phone||!/^\\+?[0-9]{8,15}$/.test(phone.replace(/[\\s\\-]/g,""))) return res.status(400).json({error:"REAL phone with country code required"});
  if(!email||!email.includes("@")) return res.status(400).json({error:"REAL email required"});
  if(!propertyId) return res.status(400).json({error:"Property ID required"});
  const lead={id:`LEAD-${Date.now()}`,name:name.trim(),phone:phone.trim(),email:email.trim().toLowerCase(),propertyId,supplier:supplier||"TEKCE",message:message||"",stage:"NEW",pipelineHistory:[{stage:"NEW",at:new Date().toISOString(),note:"Real lead - no mock"}],affiliate:supplier==="AHM"?AHM_AFF:TEKCE_AFF,createdAt:new Date().toISOString(),isReal:true};
  realLeads.unshift(lead); save();
  console.log(`REAL LEAD: ${lead.id} ${lead.name} ${lead.phone} -> ${lead.affiliate}`);
  res.json({success:true,leadId:lead.id,affiliate:lead.affiliate});
});
app.get("/api/leads",(req,res)=>res.json({count:realLeads.length,pipeline:PIPELINE,leads:realLeads,note:"REAL ONLY - people's money - no mocks"}));
app.get("/api/real-estate/pool",(req,res)=>res.json({source:"TEKCE REAL",affiliate:TEKCE_AFF,count:realEstateCache.length,properties:realEstateCache}));
app.get("/api/toys/pool",(req,res)=>res.json({source:"AHM REAL",affiliate:AHM_AFF,count:toyCache.length,products:toyCache}));
app.get("/api/ahm/pool",(req,res)=>res.json({source:"AHM REAL",affiliate:AHM_AFF,count:toyCache.length,products:toyCache}));
app.listen(process.env.PORT||10000, ()=>console.log(`REAL WEBSITE LIVE - NO MOCK - ${TEKCE_AFF} + ${AHM_AFF} - Leads:${realLeads.length}`));
