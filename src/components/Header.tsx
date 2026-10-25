
import { COMPANY } from '../data/companyData'
export default function Header({tab,setTab}:{tab:string,setTab:any}){
 const tabs=['Executive Admin','Proposal Dispatch','Cost Estimator','Blueprint BOQ','Pools & Turnkey','Treasury','Global Estates'];
 return (<div className="sticky top-0 z-50 bg-[#0a0e1a]/95 backdrop-blur border-b border-white/10">
  <div className="px-4 py-2 flex items-center gap-2 text-[10px] mono text-emerald-400 border-b border-white/5"><span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>{COMPANY.registered} • {COMPANY.director} • WhatsApp: {COMPANY.whatsapp} • TEKCE 24I5893858 • AHM mnpixfvf</div>
  <div className="px-4 py-3 flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-amber-500 flex items-center justify-center text-black font-black">D</div><div><div className="font-black tracking-wider">DEMASH <span className="text-amber-400">CONSTRUCTION</span></div><div className="text-[10px] text-slate-400">{COMPANY.tagline}</div></div></div><div className="hidden md:flex text-[10px] text-slate-400 mono">{COMPANY.location}</div></div>
  <div className="flex gap-2 px-4 py-2 overflow-x-auto scrollbar-hide">{tabs.map(t=>{const a=tab===t; return <button key={t} onClick={()=>setTab(t)} className={`px-3 py-2 rounded-xl text-[11px] font-bold whitespace-nowrap border ${a?'bg-amber-400 text-black border-amber-400':'bg-white/5 text-slate-400 border-white/10'}`}>{t}</button>})}</div>
 </div>)
}
