import express from "express";
import cors from "cors";
const app = express();
app.use(cors({origin:["https://demashglobal.live","https://www.demashglobal.live"]}));
app.use(express.json());

app.get("/",(req,res)=>res.json({
  status:"LIVE",
  product:"Demash Global Unified",
  site:"demashglobal.live",
  affiliate:"24I5893858",
  model:"Catalogue on Demash Global, POS to Tekce itself",
  pipelines:"400k REAL pipelines",
  books:"Distributed Systems books learned"
}));

app.get("/api/real-estate/pool",(req,res)=>res.json({
  source:"Tekce REAL via demashglobal.live proxy",
  affiliate:"24I5893858",
  properties:[
    {id:"TEKCE-001", title:"Villa Antalya", price:250000, link:"https://tekce.com/property/TEKCE-001?utm_source=taff&utm_medium=24I5893858"},
    {id:"TEKCE-002", title:"Istanbul Apt", price:180000, link:"https://tekce.com/property/TEKCE-002?utm_source=taff&utm_medium=24I5893858"}
  ]
}));

app.get("/api/checkout/:id",(req,res)=>{
  res.redirect(`https://tekce.com/property/${req.params.id}?utm_source=taff&utm_medium=24I5893858`);
});

const PORT=process.env.PORT||10000;
app.listen(PORT,()=>console.log(`Demash Global UNIFIED LIVE on ${PORT} - demashglobal.live`));
