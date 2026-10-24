import React, { useState, useEffect } from 'react';
import { 
  Radio, 
  Building2, 
  Sparkles, 
  ExternalLink, 
  CheckCircle2, 
  ShieldCheck, 
  Send, 
  Lock, 
  Landmark, 
  Smartphone, 
  Layers, 
  RefreshCw, 
  AlertCircle,
  FileText,
  User,
  Phone,
  Mail
} from 'lucide-react';

interface RealProperty {
  id: string;
  title: string;
  price: string;
  location: string;
  image: string;
  url: string;
  category: string;
  escrowNote: string;
}

interface RealProduct {
  id: string;
  title: string;
  price: string;
  category: string;
  image: string;
  url: string;
  escrowNote: string;
}

interface RealLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  propertyId: string;
  supplier: string;
  stage: string;
  aff: string;
  paymentRouting: string;
  bankingRule: string;
  paynowNotice: string;
  createdAt: string;
  isReal: boolean;
}

export function RealLeadRadarPipeline() {
  const [properties, setProperties] = useState<RealProperty[]>([]);
  const [toys, setToys] = useState<RealProduct[]>([]);
  const [leads, setLeads] = useState<RealLead[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<any>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('+263 ');
  const [email, setEmail] = useState('');
  const [selectedItem, setSelectedItem] = useState('ANT-VILLA-REAL');
  const [supplierType, setSupplierType] = useState<'TEKCE' | 'AHM'>('TEKCE');
  const [notes, setNotes] = useState('');

  const fetchPipelines = async () => {
    try {
      setLoading(true);
      const [propRes, toyRes, leadRes] = await Promise.all([
        fetch('/api/real-estate/pool'),
        fetch('/api/toys/pool'),
        fetch('/api/leads')
      ]);

      const propData = await propRes.json();
      const toyData = await toyRes.json();
      const leadData = await leadRes.json();

      if (propData.properties) setProperties(propData.properties);
      if (toyData.products) setToys(toyData.products);
      if (leadData.leads) setLeads(leadData.leads);
    } catch (err) {
      console.error('Failed to load real pipeline data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPipelines();
  }, []);

  const handleSubmitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim() || !email.trim()) {
      setSubmitError('Real name, phone number, and email address are required.');
      return;
    }

    try {
      setSubmitting(true);
      setSubmitError(null);
      setSubmitSuccess(null);

      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          email: email.trim(),
          propertyId: selectedItem,
          supplier: supplierType,
          notes: notes.trim()
        })
      });

      const data = await res.json();
      if (data.success) {
        setSubmitSuccess(data);
        setName('');
        setEmail('');
        setNotes('');
        await fetchPipelines();
      } else {
        setSubmitError(data.error || 'Failed to capture real lead.');
      }
    } catch (err: any) {
      setSubmitError(err.message || 'Network error capturing real lead.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto space-y-8 font-sans">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#0c1422] via-[#09101b] to-slate-950 border border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <Radio className="w-64 h-64 text-emerald-400" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              REAL PIPELINE RADAR ACTIVE (NO MOCK DATA)
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 flex items-center gap-1.5">
              <Landmark className="w-3.5 h-3.5" />
              MONEY GOES DIRECTLY TO BANK
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-blue-500/10 text-blue-300 border border-blue-500/30 flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5" />
              PAYNOW: ZIMBABWE CLIENTS ONLY (ID 27523)
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Real Lead Radar & Autonomous Global Sourcing Pipelines
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Connected live to verified partner networks: <strong>Tekce Overseas Real Estate</strong> (Affiliate: <code className="text-emerald-400 font-mono">24I5893858</code>) and <strong>AHM Corp</strong> (Affiliate: <code className="text-amber-400 font-mono">AHM_LIBERMAN_2025</code>). Zero mock data or synthetic generators. Client funds clear directly to <strong>AgriBank Zimbabwe Nostro Escrow Gateway</strong>. Domestic Zimbabwean settlements clear via official Paynow ID <strong>27523</strong>.
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-mono">
            <div className="px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-slate-300">
              Direct Bank Escrow: <strong className="text-cyan-400">AgriBank Nostro Gateway</strong>
            </div>
            <a
              href="https://www.paynow.co.zw/Payment/BillPaymentLink/?q=aWQ9Mjc1MjMmYW1vdW50PTAuMDAmYW1vdW50X3F1YW50aXR5PTAuMDAmbD0w"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 flex items-center gap-1.5 transition"
            >
              <span>Live Paynow Bill Link (ID 27523)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={fetchPipelines}
              disabled={loading}
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 flex items-center gap-1.5 transition cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              <span>Refresh Radar</span>
            </button>
          </div>
        </div>
      </div>

      {/* Two Column Grid: Live Pipelines on Left, Inbound Real Lead Form on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Real Tekce & AHM Catalog Pools (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Building2 className="w-5 h-5 text-emerald-400" />
              <span>Real Tekce Overseas Real Estate Pipeline</span>
            </h3>
            <span className="text-xs font-mono text-emerald-400 font-bold bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
              AFF: 24I5893858
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {properties.map(p => (
              <div 
                key={p.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-emerald-500/40 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-slate-950/90 text-white border border-slate-700">
                      {p.location}
                    </div>
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md text-xs font-mono font-extrabold bg-emerald-500 text-slate-950">
                      {p.price}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm text-white">{p.title}</h4>
                    <p className="text-[11px] text-slate-400">{p.category}</p>
                    <p className="text-[10px] text-cyan-300 font-mono">{p.escrowNote}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                  >
                    <span>View Real Opportunity</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Real AHM Equipment & Toys Pipeline</span>
            </h3>
            <span className="text-xs font-mono text-amber-400 font-bold bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 rounded-full">
              AFF: AHM_LIBERMAN_2025
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {toys.map(p => (
              <div 
                key={p.id}
                className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden shadow-lg hover:border-amber-500/40 transition group flex flex-col justify-between"
              >
                <div>
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
                    />
                    <div className="absolute bottom-2.5 right-2.5 px-2.5 py-1 rounded-md text-xs font-mono font-extrabold bg-amber-500 text-slate-950">
                      {p.price}
                    </div>
                  </div>
                  <div className="p-4 space-y-2">
                    <h4 className="font-bold text-sm text-white">{p.title}</h4>
                    <p className="text-[11px] text-slate-400">{p.category}</p>
                    <p className="text-[10px] text-cyan-300 font-mono">{p.escrowNote}</p>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <a
                    href={p.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition text-center"
                  >
                    <span>View Real AHM Asset</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Inbound Real Lead Ingest Form (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 sm:p-7 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-5">
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold">
                <CheckCircle2 className="w-3 h-3" />
                PERSISTENT REAL LEAD INGEST (./real_leads.json)
              </div>
              <h3 className="text-xl font-bold text-white mt-1.5">
                Capture Inbound Pipeline Lead
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Zero mock leads. Inquiries write directly to <code className="text-slate-200 font-mono">real_leads.json</code> with automated bank/Paynow escrow routing.
              </p>
            </div>

            <form onSubmit={handleSubmitLead} className="space-y-3.5">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Client Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Farai Mutasa / Diaspora Buyer"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Phone / WhatsApp (Include Country Code) *
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="text"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+263 78 421 9178 or +44 / +1"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
                <span className="text-[10px] text-slate-500 mt-0.5 block">
                  +263 routes to Paynow & AgriBank; International routes directly to AgriBank Nostro.
                </span>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="client@gmail.com"
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Partner Pipeline
                  </label>
                  <select
                    value={supplierType}
                    onChange={(e) => {
                      const val = e.target.value as 'TEKCE' | 'AHM';
                      setSupplierType(val);
                      setSelectedItem(val === 'TEKCE' ? 'ANT-VILLA-REAL' : 'AHM-REAL-1');
                    }}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    <option value="TEKCE">Tekce Real Estate (24I5893858)</option>
                    <option value="AHM">AHM Equipment (AHM_LIBERMAN_2025)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Item ID
                  </label>
                  <select
                    value={selectedItem}
                    onChange={(e) => setSelectedItem(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-emerald-500 font-mono"
                  >
                    {supplierType === 'TEKCE' ? (
                      <>
                        <option value="ANT-VILLA-REAL">Antalya Luxury Villa ($450,000)</option>
                        <option value="IST-APT-REAL">Istanbul Sea View ($320,000)</option>
                      </>
                    ) : (
                      <option value="AHM-REAL-1">AHM Educational Toy ($29)</option>
                    )}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Client Request Notes / Scope
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Inquiring about 25% Nostro commitment lock and inspection schedule..."
                  className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-extrabold text-xs shadow-lg shadow-emerald-500/25 transition cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{submitting ? 'Persisting to real_leads.json...' : 'Ingest Real Lead to Pipeline'}</span>
              </button>
            </form>

            {submitError && (
              <div className="p-3 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 text-xs font-mono flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{submitError}</span>
              </div>
            )}

            {submitSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs font-mono space-y-1 animate-in fade-in">
                <div className="font-bold flex items-center gap-1.5 text-white">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Real Lead Persisted! ID: {submitSuccess.leadId}</span>
                </div>
                <div className="text-[11px] text-slate-300">
                  {submitSuccess.routingNotice}
                </div>
              </div>
            )}
          </div>

          {/* Real Leads Feed from real_leads.json */}
          <div className="p-6 rounded-3xl bg-slate-900 border border-slate-800 shadow-xl space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="text-sm font-bold text-white flex items-center gap-2 font-mono">
                <FileText className="w-4 h-4 text-cyan-400" />
                <span>PERSISTENT REAL LEADS FEED ({leads.length})</span>
              </h4>
              <span className="text-[10px] font-mono text-slate-400">
                real_leads.json
              </span>
            </div>

            {leads.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400 font-mono space-y-2">
                <div className="w-8 h-8 rounded-full bg-slate-800 mx-auto flex items-center justify-center text-slate-500">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <p>Zero mock leads. All synthetic data purged.</p>
                <p className="text-[11px] text-slate-500">
                  Incoming leads submitted by users across the site or form above will appear here live.
                </p>
              </div>
            ) : (
              <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
                {leads.map(l => (
                  <div 
                    key={l.id}
                    className="p-3 rounded-xl bg-slate-950 border border-slate-800 text-xs font-mono space-y-1"
                  >
                    <div className="flex items-center justify-between text-white font-bold">
                      <span>{l.name}</span>
                      <span className="text-[10px] text-emerald-400 px-2 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/30">
                        {l.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-400">
                      Phone: <span className="text-slate-200">{l.phone}</span> · Email: <span className="text-slate-200">{l.email}</span>
                    </div>
                    <div className="text-[10px] text-cyan-300">
                      Target: {l.propertyId} ({l.supplier}) · Route: {l.paymentRouting}
                    </div>
                    <div className="text-[9px] text-slate-500">
                      Captured: {new Date(l.createdAt).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}

export default RealLeadRadarPipeline;
