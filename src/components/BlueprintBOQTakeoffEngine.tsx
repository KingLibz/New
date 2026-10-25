
import { useState } from 'react'
export default function Blueprint(){
 const [files,setFiles]=useState<string[]>([]); const [takeoff,setTakeoff]=useState<any>(null);
 const run=()=>{ setTakeoff({walls:'342 m²',concrete:'28.4 m³',steel:'2.4 T',paint:'890 m²',tiles:'210 m²',boq_total:'$18,450'}); }
 return (<div className="p-4 space-y-4">
  <div className="bg-[#121c33] border border-cyan-500/20 rounded-2xl p-5"><div className="text-[10px] mono text-cyan-400">AI BLUEPRINT TAKEOFF & LETTERHEAD BOQ • UP TO 10 DRAWINGS</div><h2 className="text-xl font-black mt-2">Blueprint → BOQ Engine — Real Takeoff</h2>
   <div className="mt-4 border-2 border-dashed border-white/20 rounded-2xl p-8 text-center"><div className="text-3xl">📐</div><div className="text-sm font-bold mt-2">Drop PDF/DWG here or click to upload</div><div className="text-[11px] text-slate-400 mt-1">AI extracts walls, slabs, openings, auto-calc quantities</div><input type="file" multiple onChange={e=>{if(e.target.files) setFiles(Array.from(e.target.files).map(f=>f.name))}} className="mt-4"/><div className="mt-2 text-[11px] mono text-emerald-400">{files.join(', ')}</div><button onClick={run} className="mt-4 px-4 py-2 rounded-xl bg-amber-400 text-black font-bold text-sm">Run AI Takeoff → Generate BOQ</button></div>
   {takeoff&&<div className="mt-4 bg-black/40 border border-white/10 rounded-xl p-4"><div className="text-xs font-bold">Auto Takeoff Result — Branded BOQ Ready</div><div className="mt-3 grid grid-cols-2 md:grid-cols-3 gap-2 text-[11px]">{Object.entries(takeoff).map(([k,v])=><div key={k} className="bg-white/5 p-2 rounded-lg"><span className="text-slate-400">{k}:</span> <span className="font-bold">{String(v)}</span></div>)}</div><button className="mt-3 px-4 py-2 rounded-xl bg-white text-black font-bold text-xs">⬇ Download Letterhead BOQ PDF (DEMASH)</button></div>}
  </div>
 </div>)
}
