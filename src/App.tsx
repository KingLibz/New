/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { TabType } from './types';
import { COMPANY_INFO, PROJECTS } from './data/companyData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CostEstimator } from './components/CostEstimator';
import { AIBlueprintAdvisor } from './components/AIBlueprintAdvisor';
import { SwimmingPoolsSection } from './components/SwimmingPoolsSection';
import { ServicesSection } from './components/ServicesSection';
import { DiasporaPortal } from './components/DiasporaPortal';
import { ProjectShowcase } from './components/ProjectShowcase';
import { ProposalDispatch } from './components/ProposalDispatch';
import { SupplierPOS } from './components/SupplierPOS';
import { PaymentsAndPublicPortal } from './components/PaymentsAndPublicPortal';
import { ExecutiveAdmin } from './components/ExecutiveAdmin';
import { DirectorConnectModal } from './components/DirectorConnectModal';
import { DownloadBrochureModal } from './components/DownloadBrochureModal';
import { GlobalEstateCatalog } from './components/GlobalEstateCatalog';
import { MobileAppDownloadModal } from './components/MobileAppDownloadModal';
import { FloatingMobileAppButton } from './components/FloatingMobileAppButton';
import RealLeadRadarPipeline from './components/RealLeadRadarPipeline';
import { Footer } from './components/Footer';

import { openWhatsAppLink } from './utils/navigation';
import { 
  ShieldCheck, 
  Ruler, 
  Lock, 
  Sparkles, 
  Waves, 
  Building2, 
  ArrowRight, 
  MessageSquare, 
  Phone, 
  MapPin, 
  CheckCircle2, 
  Clock, 
  Layers,
  Send,
  HelpCircle
} from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [directorModalOpen, setDirectorModalOpen] = useState(false);
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [downloadAppModalOpen, setDownloadAppModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenDirectorModal={() => setDirectorModalOpen(true)}
        onOpenBrochureModal={() => setBrochureModalOpen(true)}
        onOpenDownloadModal={() => setDownloadAppModalOpen(true)}
      />

      {/* Main Content Body */}
      <main className="flex-1">
        
        {/* TAB 1: OVERVIEW */}
        {activeTab === 'overview' && (
          <div>
            {/* Hero Section */}
            <Hero
              setActiveTab={setActiveTab}
              onOpenDirectorModal={() => setDirectorModalOpen(true)}
            />

            {/* Quick Metrics Bar */}
            <section className="border-y border-slate-800 bg-[#05080f] py-8">
              <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                  {COMPANY_INFO.stats.map((stat, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono tracking-tight">
                        {stat.value}
                      </div>
                      <div className="text-xs font-semibold text-slate-200">
                        {stat.label}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {stat.desc}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Asymmetric Bento Showcase */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
              <div className="space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono">
                  <Layers className="w-3.5 h-3.5" />
                  <span>CORE PILLARS OF EXCELLENCE</span>
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
                  Engineered with Mathematical Rigor
                </h2>
                <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
                  Every residential foundation, commercial warehouse slab, and swimming pool is constructed to strict structural standards with zero shortcuts.
                </p>
              </div>

              {/* Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                
                {/* Bento Card 1: 1mm Setting-out & Civil Engineering (8 cols) */}
                <div className="md:col-span-8 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 relative group flex flex-col justify-between p-6 sm:p-8">
                  <div className="relative z-10 space-y-3 max-w-xl">
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
                      Civil Substructure & Foundations
                    </span>
                    <h3 className="text-2xl font-bold text-white leading-snug">
                      1mm Laser Setting-Out & Certified Raft Slabs
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Differential soil movement in Zimbabwe’s red clay and sloped hillsides is the #1 cause of cracked walls. We engineer high-tensile reinforced raft slabs and rock-anchored footings tested to 30MPa cube crushing strength.
                    </p>
                    <div className="pt-2 flex items-center gap-4 text-xs text-slate-300">
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Laser Theodolite Alignment
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        Engineer Stamped Signoff
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setActiveTab('services')}
                      className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>Explore Civil Works</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono text-slate-500">Borrowdale · Shawasha · Msasa</span>
                  </div>
                </div>

                {/* Bento Card 2: 50/30/20 Escrow Handover (4 cols) */}
                <div className="md:col-span-4 rounded-2xl bg-gradient-to-br from-slate-900 to-[#0e1626] border border-amber-500/30 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      50/30/20 Milestone Escrow
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Funds are held securely and released in tranches only when verified milestone inspection certificates are issued. Zero upfront 100% payments.
                    </p>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Phase 1: Foundation & Slab</span>
                      <span className="font-mono text-amber-400 font-bold">50%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Phase 2: Roof & Plaster</span>
                      <span className="font-mono text-amber-400 font-bold">30%</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-400">Phase 3: Turnkey Finishes</span>
                      <span className="font-mono text-amber-400 font-bold">20%</span>
                    </div>

                    <button
                      onClick={() => setActiveTab('diaspora')}
                      className="w-full mt-3 py-2 px-3 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
                    >
                      Diaspora Escrow Charter
                    </button>
                  </div>
                </div>

                {/* Bento Card 3: Luxury Swimming Pools (4 cols) */}
                <div className="md:col-span-4 rounded-2xl overflow-hidden bg-slate-900 border border-slate-800 p-6 sm:p-8 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Waves className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-white">
                      Luxury Gunite & Infinity Pools
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      Custom resort-style swimming pools with crystal clear solar-heated water, travertine coping, and 10-year structural shell warranties.
                    </p>
                  </div>

                  <button
                    onClick={() => setActiveTab('pools')}
                    className="py-2.5 px-4 text-xs font-semibold text-cyan-400 bg-cyan-950/40 hover:bg-cyan-900/40 border border-cyan-500/30 rounded-xl transition-colors flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>View Pool Gallery & Pricing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Bento Card 4: AI Blueprint & Cost Estimator (8 cols) */}
                <div className="md:col-span-8 rounded-2xl bg-slate-900/80 border border-slate-800 p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                  <div className="space-y-3 max-w-lg">
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Interactive Planning Suite
                    </span>
                    <h3 className="text-2xl font-bold text-white">
                      Instant Zimbabwe Construction Cost Estimator
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      Select your suburb, stand size, finish specification, and optional solar/borehole systems to generate an immediate itemized Bill of Quantities (BOQ).
                    </p>
                  </div>

                  <div className="flex flex-col gap-2.5 w-full sm:w-auto shrink-0">
                    <button
                      onClick={() => setActiveTab('estimator')}
                      className="py-3 px-5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-md transition-all cursor-pointer whitespace-nowrap"
                    >
                      Launch Cost Estimator
                    </button>
                    <button
                      onClick={() => setActiveTab('blueprints')}
                      className="py-2.5 px-5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl transition-all cursor-pointer whitespace-nowrap"
                    >
                      AI Blueprint Studio
                    </button>
                  </div>
                </div>

              </div>
            </section>

            {/* Project Portfolio Teaser */}
            <section className="py-12 bg-[#05080f] border-t border-slate-800">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                  <div>
                    <span className="text-xs font-mono font-semibold text-amber-400 uppercase">
                      Current Portfolio
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white mt-1">
                      Recent Projects in Harare
                    </h2>
                  </div>

                  <button
                    onClick={() => setActiveTab('projects')}
                    className="text-xs font-semibold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>View all completed builds</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {PROJECTS.slice(0, 3).map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => setActiveTab('projects')}
                      className="group rounded-xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all"
                    >
                      <div className="aspect-[16/10] overflow-hidden bg-slate-950">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-4 space-y-1.5">
                        <div className="text-[11px] font-mono text-amber-400">{item.location}</div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                        <div className="text-xs text-slate-400 line-clamp-2">{item.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Real Pipeline Radar & Sourcing Stream */}
            <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
              <RealLeadRadarPipeline />
            </section>

            {/* Direct Connect Strip with Director Liberman */}
            <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6">
              <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-slate-900 via-[#0d1527] to-slate-900 border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="space-y-3 max-w-xl text-center md:text-left">
                  <span className="text-xs font-mono uppercase text-emerald-400 font-semibold flex items-center justify-center md:justify-start gap-1.5">
                    <ShieldCheck className="w-4 h-4" />
                    Direct Managing Director Access
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-bold text-white">
                    Ready to build your landmark home or commercial facility?
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Speak directly with Managing Director Liberman Magaya on WhatsApp or schedule an on-site civil survey across Harare, Bulawayo, or your stand.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <button
                    onClick={() => setDirectorModalOpen(true)}
                    className="py-3.5 px-6 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Speak with Director Liberman</span>
                  </button>

                  <a
                    href={`tel:${COMPANY_INFO.phone}`}
                    className="py-3.5 px-5 text-xs font-semibold text-slate-200 bg-slate-950 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>Call {COMPANY_INFO.phoneDisplay}</span>
                  </a>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* TAB 2: SERVICES */}
        {activeTab === 'services' && (
          <ServicesSection
            setActiveTab={setActiveTab}
            onOpenDirectorModal={() => setDirectorModalOpen(true)}
          />
        )}

        {/* TAB 3: SWIMMING POOLS */}
        {activeTab === 'pools' && (
          <SwimmingPoolsSection />
        )}

        {/* TAB 4: AI BLUEPRINTS */}
        {activeTab === 'blueprints' && (
          <AIBlueprintAdvisor />
        )}

        {/* TAB 5: COST ESTIMATOR */}
        {activeTab === 'estimator' && (
          <CostEstimator />
        )}

        {/* TAB 6: DIASPORA PORTAL */}
        {activeTab === 'diaspora' && (
          <DiasporaPortal
            setActiveTab={setActiveTab}
            onOpenDirectorModal={() => setDirectorModalOpen(true)}
          />
        )}

        {/* TAB: REAL LEAD RADAR & SOURCING PIPELINES */}
        {activeTab === 'real-pipelines' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6">
            <RealLeadRadarPipeline />
          </div>
        )}

        {/* TAB: GLOBAL LUXURY ESTATES & EQUIPMENT MATRIX */}
        {activeTab === 'global-estates' && (
          <GlobalEstateCatalog />
        )}

        {/* TAB 7: PROJECTS */}
        {activeTab === 'projects' && (
          <ProjectShowcase
            onOpenDirectorModal={() => setDirectorModalOpen(true)}
          />
        )}

        {/* TAB 8: PROPOSAL DISPATCH */}
        {activeTab === 'proposals' && (
          <ProposalDispatch />
        )}

        {/* TAB 9: SUPPLIER POS */}
        {activeTab === 'supplier-pos' && (
          <SupplierPOS />
        )}

        {/* TAB: PAYPAL & PAYNOW DUAL GATEWAY ESCROW PORTAL */}
        {activeTab === 'payments' && (
          <PaymentsAndPublicPortal onOpenDirectorModal={() => setDirectorModalOpen(true)} />
        )}

        {/* TAB 10: EXECUTIVE ADMIN */}
        {activeTab === 'executive-admin' && (
          <ExecutiveAdmin />
        )}

        {/* TAB 11: CONTACT / DIRECTOR CONNECT */}
        {activeTab === 'contact' && (
          <div className="py-12 max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
            <div className="space-y-3">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>DIRECT EXECUTIVE CONSULTATION</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight font-display">
                Connect Directly with Leadership
              </h2>
              <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
                At Demash Construction, your project is managed with direct executive oversight. Reach Managing Director Liberman Magaya on his personal line or book an on-site survey.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Direct details */}
              <div className="lg:col-span-5 space-y-6">
                
                {/* Director Card */}
                <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 shadow-xl">
                  <div className="flex items-center gap-3.5">
                    <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 text-lg font-bold">
                      LM
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white">{COMPANY_INFO.director}</h3>
                      <p className="text-xs text-amber-400">{COMPANY_INFO.directorTitle}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">Demash Construction Pvt Ltd</p>
                    </div>
                  </div>

                  <div className="space-y-2.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                    <a
                      href={COMPANY_INFO.whatsappUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 hover:text-emerald-200"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-400" />
                      <span>WhatsApp: {COMPANY_INFO.phoneDisplay} (Immediate Response)</span>
                    </a>

                    <a
                      href={`tel:${COMPANY_INFO.phone}`}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800 hover:text-white"
                    >
                      <Phone className="w-4 h-4 text-amber-400" />
                      <span>Direct Mobile: {COMPANY_INFO.phoneDisplay}</span>
                    </a>

                    <div className="flex items-center gap-2.5 p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                      <MapPin className="w-4 h-4 text-amber-400" />
                      <span>Harare Head Office: Highlands & Borrowdale Business Corridor</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setDirectorModalOpen(true)}
                    className="w-full py-2.5 px-4 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-all cursor-pointer"
                  >
                    Open Director Consultation Form
                  </button>
                </div>

                {/* Operating coverage */}
                <div className="p-5 rounded-2xl bg-slate-900/50 border border-slate-800 space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
                    Zimbabwe Operating Regions
                  </h4>
                  <p className="text-xs text-slate-400">
                    Active turnkey residential sites, civil foundations, and commercial infrastructure in:
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs">
                    {COMPANY_INFO.operatingCities.map((city, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-slate-300">
                        {city}
                      </span>
                    ))}
                  </div>
                </div>

              </div>

              {/* Right Column: Direct Quick Inquiries */}
              <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 p-6 sm:p-8 rounded-2xl space-y-6">
                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-white">Instant WhatsApp Topic Launcher</h3>
                  <p className="text-xs text-slate-400">
                    Select your project category to launch WhatsApp with a pre-configured technical brief:
                  </p>
                </div>

                <div className="space-y-3">
                  {[
                    {
                      label: 'Luxury Residential Turnkey Mansion',
                      desc: '4+ Bedroom architectural home with high-end finishes in Harare North (Borrowdale, Glen Lorne, Mt Pleasant)',
                      msg: 'Hello Director Liberman Magaya, I would like to discuss building a luxury turnkey residential home in Harare with Demash Construction.'
                    },
                    {
                      label: 'Diaspora Escrow Construction Consultation',
                      desc: 'UK, SA, or Overseas based client requiring 50/30/20 milestone escrow and weekly 4K drone progress audits',
                      msg: 'Hello Director Liberman, I am a Zimbabwean based in the diaspora and would like to consult on building my property with your 50/30/20 milestone escrow framework.'
                    },
                    {
                      label: 'Custom Gunite / Infinity Swimming Pool',
                      desc: 'Engineered concrete shell, solar thermal heating, and rim-flow design survey',
                      msg: 'Hello Director Liberman, I need an on-site survey and quotation for a custom gunite/infinity swimming pool in Harare.'
                    },
                    {
                      label: 'Civil Works & Commercial Structural Steel',
                      desc: 'Industrial warehouse foundation, retaining wall, heavy concrete slab, or mass earthworks',
                      msg: 'Hello Director Liberman, we have a commercial civil engineering / structural steel project in Zimbabwe requiring estimation.'
                    }
                  ].map((topic, i) => (
                    <div 
                      key={i}
                      onClick={() => {
                        openWhatsAppLink('263784219178', topic.msg);
                      }}
                      className="p-4 rounded-xl bg-slate-950 border border-slate-800 hover:border-emerald-500/50 cursor-pointer transition-colors group flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1">
                        <div className="text-xs font-bold text-slate-200 group-hover:text-emerald-400 transition-colors flex items-center gap-2">
                          <span>{topic.label}</span>
                          <MessageSquare className="w-3.5 h-3.5 text-emerald-400 opacity-60 group-hover:opacity-100" />
                        </div>
                        <p className="text-[11px] text-slate-400 leading-relaxed">
                          {topic.desc}
                        </p>
                      </div>

                      <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 shrink-0 mt-1 transition-transform group-hover:translate-x-1" />
                    </div>
                  ))}
                </div>

                <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-between text-xs text-amber-300">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Need preliminary estimates before chatting?</span>
                  </div>
                  <button
                    onClick={() => setActiveTab('estimator')}
                    className="font-bold underline text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    Open Cost Estimator
                  </button>
                </div>

              </div>

            </div>
          </div>
        )}

      </main>

      {/* Floating Quick WhatsApp Action Button */}
      <aside aria-label="Direct WhatsApp Contact" className="fixed bottom-5 right-5 z-40 flex items-center gap-2.5">
        <a
          href={COMPANY_INFO.whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs rounded-full shadow-2xl shadow-emerald-500/40 hover:scale-105 transition-all cursor-pointer"
          aria-label="Direct WhatsApp message to Director Liberman"
        >
          <MessageSquare className="w-4 h-4 fill-current" />
          <span className="hidden sm:inline">WhatsApp Director</span>
        </a>
      </aside>

      {/* Footer */}
      <Footer
        setActiveTab={setActiveTab}
        onOpenDirectorModal={() => setDirectorModalOpen(true)}
        onOpenBrochureModal={() => setBrochureModalOpen(true)}
        onOpenDownloadModal={() => setDownloadAppModalOpen(true)}
      />

      {/* Floating Mobile App Download Action Button */}
      <FloatingMobileAppButton
        onOpenDownloadModal={() => setDownloadAppModalOpen(true)}
      />

      {/* Modals */}
      <DirectorConnectModal
        isOpen={directorModalOpen}
        onClose={() => setDirectorModalOpen(false)}
      />

      <DownloadBrochureModal
        isOpen={brochureModalOpen}
        onClose={() => setBrochureModalOpen(false)}
        onOpenAppModal={() => setDownloadAppModalOpen(true)}
      />

      <MobileAppDownloadModal
        isOpen={downloadAppModalOpen}
        onClose={() => setDownloadAppModalOpen(false)}
      />

    </div>
  );
}
