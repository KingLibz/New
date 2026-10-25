
import { useState } from 'react'
import Header from './components/Header'
import ExecutiveAdmin from './components/ExecutiveAdmin'
import RealLeadRadar from './components/RealLeadRadarPipeline'
import CostEstimator from './components/CostEstimator'
import Blueprint from './components/BlueprintBOQTakeoffEngine'
import Treasury from './components/FinancialStreamRemittancePanel'
import Hero from './components/Hero'
export default function App(){
 const [tab,setTab]=useState('Executive Admin')
 return (<div className="min-h-screen bg-[#0a0e1a] text-white">
  <Header tab={tab} setTab={setTab}/>
  {tab==='Executive Admin'&&<ExecutiveAdmin/>}
  {tab==='Proposal Dispatch'&&<RealLeadRadar/>}
  {tab==='Cost Estimator'&&<CostEstimator/>}
  {tab==='Blueprint BOQ'&&<Blueprint/>}
  {tab==='Pools & Turnkey'&&<Hero/>}
  {tab==='Treasury'&&<Treasury/>}
  {tab==='Global Estates'&&<RealLeadRadar/>}
  <div className="h-24"></div>
  <div className="fixed bottom-4 left-4 right-4 flex justify-between z-40"><button className="px-4 py-3 rounded-full bg-amber-400 text-black font-bold text-xs shadow-lg">📱 DOWNLOAD APP • TEKCE 24I5893858</button><button className="w-12 h-12 rounded-full bg-emerald-500 flex items-center justify-center shadow-lg">💬</button></div>
 </div>)
}
