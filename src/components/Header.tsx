import React from 'react';
import { TabType } from '../types';
import { COMPANY_INFO } from '../data/companyData';
import { 
  Building2, 
  MessageSquare, 
  Download, 
  Menu, 
  X, 
  ShieldCheck, 
  Sparkles, 
  Calculator, 
  Waves, 
  Globe2, 
  Briefcase,
  CreditCard 
} from 'lucide-react';

interface HeaderProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  onOpenDirectorModal: () => void;
  onOpenBrochureModal: () => void;
  onOpenDownloadModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onOpenDirectorModal,
  onOpenBrochureModal,
  onOpenDownloadModal
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: null },
    { id: 'payments', label: 'PayPal & Paynow', icon: <CreditCard className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'real-pipelines', label: 'Real Lead Radar', icon: <Sparkles className="w-3.5 h-3.5 text-emerald-400" /> },
    { id: 'services', label: 'Services', icon: null },
    { id: 'pools', label: 'Swimming Pools', icon: <Waves className="w-3.5 h-3.5" /> },
    { id: 'blueprints', label: 'AI Blueprints', icon: <Sparkles className="w-3.5 h-3.5 text-amber-400" /> },
    { id: 'estimator', label: 'Cost Estimator', icon: <Calculator className="w-3.5 h-3.5" /> },
    { id: 'diaspora', label: 'Diaspora Escrow', icon: <Globe2 className="w-3.5 h-3.5" /> },
    { id: 'global-estates', label: 'Global Luxury', icon: <Globe2 className="w-3.5 h-3.5 text-cyan-400" /> },
    { id: 'supplier-pos', label: 'Supplier POS', icon: null },
    { id: 'proposals', label: 'Proposal Dispatch', icon: null },
    { id: 'executive-admin', label: 'Executive Admin', icon: null },
    { id: 'contact', label: 'Contact', icon: null }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80">
      {/* Top micro-bar for Zimbabwe registration & WhatsApp direct */}
      <div className="bg-[#05080f] border-b border-slate-900/90 py-1.5 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block animate-pulse"></span>
            <span className="tracking-wide uppercase font-semibold text-[11px] text-emerald-400">
              REGISTERED PRIVATE LIMITED COMPANY · ZIMBABWE
            </span>
          </div>

          <div className="flex items-center gap-4 text-slate-400 text-[11px]">
            <a 
              href={COMPANY_INFO.whatsappUrl} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors font-mono"
            >
              <MessageSquare className="w-3 h-3" />
              <span>WhatsApp: {COMPANY_INFO.phoneDisplay}</span>
            </a>
            <span className="text-slate-700 hidden sm:inline">|</span>
            <span className="hidden sm:inline text-slate-500">
              Harare Head Office · Highlands / Borrowdale
            </span>
          </div>
        </div>
      </div>

      {/* Main Header Brand Lockup */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
        {/* Brand Lockup */}
        <div 
          onClick={() => setActiveTab('overview')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-500/20 to-amber-600/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shadow-inner group-hover:border-amber-400 transition-colors">
            <Building2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5 leading-none">
              <span className="text-sm font-bold tracking-wider text-white">DEMASH</span>
              <span className="text-sm font-extrabold tracking-wider text-amber-400">CONSTRUCTION</span>
            </div>
            <div className="text-[11px] text-slate-400 mt-1 tracking-tight">
              Civil Engineering · Turnkey Construction · Demash Global
            </div>
          </div>
        </div>

        {/* Action Buttons Right */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer ${
              activeTab === 'payments'
                ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                : 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/25'
            }`}
          >
            <CreditCard className="w-3.5 h-3.5 text-emerald-400" />
            <span>Paynow & PayPal</span>
          </button>

          <button
            onClick={onOpenDownloadModal}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shadow-sm cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>Download App</span>
          </button>

          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-emerald-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg shadow-sm transition-colors whitespace-nowrap"
          >
            <MessageSquare className="w-3.5 h-3.5 fill-current" />
            <span>WhatsApp</span>
          </a>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex sm:hidden items-center gap-1.5">
          <button
            onClick={onOpenDownloadModal}
            className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg whitespace-nowrap shadow-sm cursor-pointer"
            aria-label="Download App"
          >
            <Download className="w-3.5 h-3.5 text-slate-950" />
            <span>App</span>
          </button>
          <a
            href={COMPANY_INFO.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="p-1.5 text-emerald-400 bg-emerald-950/40 border border-emerald-700/50 rounded-lg"
            aria-label="WhatsApp"
          >
            <MessageSquare className="w-4 h-4" />
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 text-slate-300 hover:text-white bg-slate-800/80 border border-slate-700 rounded-lg cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Primary Tab Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-2.5 overflow-x-auto no-scrollbar">
        <div className="flex items-center gap-1.5 min-w-max">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium rounded-lg transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/50 shadow-sm shadow-amber-950/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Mobile drawer if open */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-slate-800 bg-[#070b14] px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-slate-800">
            <button
              onClick={() => {
                onOpenDownloadModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs bg-amber-400 text-slate-950 font-bold rounded-lg shadow-sm"
            >
              <Download className="w-3.5 h-3.5 text-slate-950" />
              <span>Download App</span>
            </button>
            <button
              onClick={() => {
                onOpenDirectorModal();
                setMobileMenuOpen(false);
              }}
              className="flex items-center justify-center gap-1.5 py-2 px-3 text-xs bg-amber-500/20 text-amber-400 rounded-lg border border-amber-500/40"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Director Liberman</span>
            </button>
          </div>

          {/* Quick links list */}
          <div className="grid grid-cols-2 gap-1.5 text-xs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setMobileMenuOpen(false);
                }}
                className={`py-2 px-3 text-left rounded-lg text-xs font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-slate-900/80 text-slate-300 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
