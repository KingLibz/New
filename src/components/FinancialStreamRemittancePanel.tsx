import React, { useState, useEffect } from 'react';
import { 
  Landmark, 
  Smartphone, 
  Wallet, 
  ArrowUpRight, 
  RefreshCw, 
  Send, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Lock, 
  Cpu, 
  Activity,
  Layers,
  Clock,
  AlertCircle
} from 'lucide-react';
import { openWhatsAppLink } from '../utils/navigation';

interface FinancialBalances {
  id: number;
  ecocash_balance_usd: number;
  agric_balance_usd: number;
  last_transaction_ref: string;
  updated_at: string;
}

interface RemittanceRecord {
  id: string;
  amountUSD: number;
  phone: string;
  carrierCode: string;
  status: string;
  scheduledTime: string;
  timestamp: string;
}

interface ColdStorageSnapshot {
  backupId: string;
  fileName: string;
  checksumSha256: string;
  recordCount: number;
  allocatedBytes: number;
  committedAt: string;
}

export default function FinancialStreamRemittancePanel() {
  const [balances, setBalances] = useState<FinancialBalances>({
    id: 1,
    ecocash_balance_usd: 0.00,
    agric_balance_usd: 0.00,
    last_transaction_ref: "READY_FOR_LIVE_FEED",
    updated_at: new Date().toISOString()
  });

  const [remittanceLogs, setRemittanceLogs] = useState<RemittanceRecord[]>([]);
  const [snapshots, setSnapshots] = useState<ColdStorageSnapshot[]>([]);
  const [health, setHealth] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // SMS Tester State
  const [smsFrom, setSmsFrom] = useState('AgriBank-Alerts');
  const [smsMessage, setSmsMessage] = useState('AgriBank Alert: Credit of $1,078.00 USD received. Avail Bal is $85,328.00 USD. Ref: TRX-AGRI-99201.');
  const [smsResult, setSmsResult] = useState<any>(null);
  const [processingSms, setProcessingSms] = useState(false);

  // Remittance State
  const [remitting, setRemitting] = useState(false);
  const [remittanceResult, setRemittanceResult] = useState<any>(null);
  const [remittanceError, setRemittanceError] = useState<string | null>(null);

  // Paynow Telemetry & Webhook Ping State
  const [testingPaynow, setTestingPaynow] = useState(false);
  const [paynowPingResult, setPaynowPingResult] = useState<any>(null);

  const handleTestPaynowPing = async () => {
    try {
      setTestingPaynow(true);
      setPaynowPingResult(null);
      const res = await fetch('/api/v1/gateways/payments/paynow-webhook', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          reference: `PNW-PING-${Date.now().toString().slice(-4)}`,
          amount: 50.00,
          status: "Paid",
          format: "json"
        })
      });
      const data = await res.json();
      setPaynowPingResult(data);
      fetchAllTelemetry();
    } catch (err: any) {
      setPaynowPingResult({ error: err.message });
    } finally {
      setTestingPaynow(false);
    }
  };

  // Cold Vault State
  const [generatingBackup, setGeneratingBackup] = useState(false);
  const [backupReceipt, setBackupReceipt] = useState<string | null>(null);

  const fetchAllTelemetry = async () => {
    try {
      setLoading(true);
      const [balRes, remitRes, snapRes, healthRes] = await Promise.all([
        fetch('/api/v1/gateways/live-balances'),
        fetch('/api/v1/treasury/remittance-logs'),
        fetch('/api/v1/system/cold-storage-status'),
        fetch('/api/v1/leads/health')
      ]);

      const balData = await balRes.json();
      const remitData = await remitRes.json();
      const snapData = await snapRes.json();
      const healthData = await healthRes.json();

      if (balData.success) setBalances(balData.balances);
      if (remitData.success) setRemittanceLogs(remitData.logs || []);
      if (snapData.success) setSnapshots(snapData.snapshots || []);
      if (healthData.success) setHealth(healthData);
    } catch (err) {
      console.error('Failed to load financial telemetry:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllTelemetry();
  }, []);

  const handleTestSmsListener = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setProcessingSms(true);
      setSmsResult(null);

      const res = await fetch('/api/v1/gateways/sms-listener', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ from: smsFrom, message: smsMessage })
      });

      const data = await res.json();
      if (data.success) {
        setSmsResult(data);
        await fetchAllTelemetry();
      }
    } catch (err) {
      console.error('SMS parser failed:', err);
    } finally {
      setProcessingSms(false);
    }
  };

  const handleExecuteRemittance = async () => {
    // 1. Strict client guard: prevent accidental double-clicks or execution where there is no money
    if (remitting) return;

    const availableNostro = balances.agric_balance_usd || 0;
    if (availableNostro <= 0) {
      setRemittanceError("TRANSACTION REJECTED: AgriBank Nostro treasury has $0.00 USD. System safeguards are actively locked to prevent execution where there is no money.");
      setRemittanceResult(null);
      return;
    }

    if (availableNostro < 300) {
      setRemittanceError(`TRANSACTION REJECTED: Available Nostro balance is $${availableNostro.toFixed(2)} USD (insufficient for $300.00 USD split). Duplicate execution blocked.`);
      setRemittanceResult(null);
      return;
    }

    try {
      setRemitting(true);
      setRemittanceResult(null);
      setRemittanceError(null);

      const idempotencyKey = `REMIT-CLI-${Date.now()}`;
      const res = await fetch('/api/v1/treasury/deploy-remittance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amountUSD: 300.00,
          phone: "263784219178",
          idempotencyKey
        })
      });

      const data = await res.json();
      if (data.success) {
        setRemittanceResult(data);
        await fetchAllTelemetry();
      } else {
        setRemittanceError(data.error || "Remittance dispatch rejected by server treasury guard.");
      }
    } catch (err: any) {
      setRemittanceError(err?.message || 'Remittance execution failed.');
    } finally {
      // Keep disabled for 3 seconds post-completion to prevent accidental second clicks
      setTimeout(() => setRemitting(false), 3000);
    }
  };

  const handleTriggerColdStorage = async () => {
    try {
      setGeneratingBackup(true);
      setBackupReceipt(null);

      const res = await fetch('/api/v1/system/cold-storage-backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      });

      const data = await res.json();
      if (data.success) {
        setBackupReceipt(data.receiptText);
        await fetchAllTelemetry();
      }
    } catch (err) {
      console.error('Cold backup failed:', err);
    } finally {
      setGeneratingBackup(false);
    }
  };

  return (
    <div className="space-y-6 text-slate-100">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <Landmark className="w-5 h-5" />
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Real-Time Treasury, SMS Stream & Remittance Motor
            </h3>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Live AgriBank Nostro & EcoCash ledger balances, daily $300 Paynow remittance motor, and SHA-256 cryptographic compliance cold storage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            NOSTRO GATEWAY: ACTIVE
          </span>
          <button
            onClick={fetchAllTelemetry}
            disabled={loading}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-slate-800 hover:bg-slate-700 border border-slate-700 transition cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      {/* Primary Financial Balances Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* AgriBank Nostro Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 via-[#070c14] to-slate-950 border border-emerald-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
              AGRIBANK NOSTRO USD (PRIMARY)
            </span>
            <Landmark className="w-5 h-5 text-emerald-400" />
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">Available Liquid Nostro Balance</div>
            <div className="text-3xl font-extrabold font-mono text-emerald-400 mt-0.5">
              ${balances.agric_balance_usd?.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Corporate Escrow Gateway</span>
            <span>Highlands / Nelson Mandela</span>
          </div>
        </div>

        {/* EcoCash Mobile Wallet Card */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-cyan-950/40 via-[#070c14] to-slate-950 border border-cyan-500/40 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-cyan-400/20 text-cyan-300 border border-cyan-400/30">
              ECOCASH CORPORATE USD WALLET
            </span>
            <Smartphone className="w-5 h-5 text-cyan-400" />
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">Live Mobile Remittance Balance</div>
            <div className="text-3xl font-extrabold font-mono text-cyan-400 mt-0.5">
              ${balances.ecocash_balance_usd?.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-400">
            <span>Line: +263 78 421 9178</span>
            <span>Daily Profit Split Pool</span>
          </div>
        </div>

        {/* Active Transaction Reference Card */}
        <div className="p-5 rounded-2xl bg-[#070c14] border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              LATEST TRANSACTION AUDIT
            </span>
            <Activity className="w-5 h-5 text-amber-400" />
          </div>

          <div>
            <div className="text-[11px] font-mono uppercase text-slate-400">Trace Reference Number</div>
            <div className="text-xl font-bold font-mono text-white mt-1">
              {balances.last_transaction_ref}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-800 text-[11px] font-mono text-slate-400">
            Synced: {new Date(balances.updated_at).toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Live Linked Paynow Account Status Banner */}
      <div className="p-4 rounded-xl bg-slate-900 border border-emerald-500/40 flex flex-wrap items-center justify-between gap-4 font-mono text-xs">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-white font-bold">LINKED PAYNOW ACCOUNT: txt.co.zw (Webdev Zimbabwe)</span>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                STATUS: PAID
              </span>
            </div>
            <div className="text-[11px] text-slate-400 mt-0.5">
              Ref: <span className="text-emerald-300 font-bold">65593919</span> · Merchant Ref: <span className="text-cyan-300">TXT-261018154454335</span> · EcoCash: <span className="text-cyan-300">MP261018.1608.T5461940</span> · Amount: <span className="text-amber-400 font-bold">ZWG 10.00</span>
            </div>
          </div>
        </div>
        <div className="text-right text-[11px] text-slate-400">
          <div>Payee: payments+txt@webdev.co.zw</div>
          <div className="text-slate-500">Phone: 04 702906 · Clearing to AgriBank Nostro Gateway</div>
        </div>
      </div>

      {/* Live Paynow Production Gateway Health & Settlement Ping */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-blue-950/30 via-slate-900 to-slate-950 border border-blue-500/30 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-400" />
            <h4 className="text-base font-bold text-white">
              Paynow Production Gateway Rail · Integration ID: 27523 (Bill Payment Link) · EcoCash +263784219178
            </h4>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              ZIMBABWE CLIENTS ONLY
            </span>
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Multi-currency local mobile settlement rails (EcoCash USD/ZWG, OneMoney, Zimswitch) clear live to AgriBank Zimbabwe Nostro Escrow Gateway. Merchant Integration ID: <strong className="text-emerald-400 font-mono">27523</strong> (ZimPropel / Demash Global). Paynow works exclusively for Zimbabwe clients only. Money goes directly to bank. Managed by Director Liberman Magaya (<strong className="text-amber-400 font-mono">libermanmagaya@gmail.com</strong>).
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleTestPaynowPing}
            disabled={testingPaynow}
            className="flex items-center gap-2 px-5 py-3 text-xs font-bold rounded-xl bg-gradient-to-r from-blue-400 to-cyan-500 hover:from-blue-300 hover:to-cyan-400 text-slate-950 shadow-lg shadow-blue-500/25 transition cursor-pointer disabled:opacity-50"
          >
            <Activity className={`w-4 h-4 ${testingPaynow ? 'animate-spin' : ''}`} />
            <span>{testingPaynow ? 'Testing Webhook...' : 'Test Paynow Webhook Ping ($50 USD)'}</span>
          </button>
        </div>
      </div>

      {paynowPingResult && (
        <div className="p-4 rounded-xl bg-blue-950/50 border border-blue-500/40 text-xs font-mono space-y-1.5 animate-in fade-in">
          <div className="flex items-center justify-between font-bold text-blue-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Paynow Mobile Settlement Verified Clear! Reference: {paynowPingResult.reference}
            </span>
            <span className="text-white">${paynowPingResult.amount?.toFixed(2)} USD Received</span>
          </div>
          <div className="text-slate-300 text-[11px]">
            Locked into {paynowPingResult.settledTo} · Mobile Rail: {paynowPingResult.ecocashPhone} · Comptroller: {paynowPingResult.comptrollerEmail}
          </div>
        </div>
      )}

      {/* Production Remittance Motor Trigger */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/30 via-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center gap-2">
            <Wallet className="w-5 h-5 text-emerald-400" />
            <h4 className="text-base font-bold text-white">Daily Production Remittance Motor (Paynow Production)</h4>
            {(balances.agric_balance_usd || 0) < 300 ? (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                {(balances.agric_balance_usd || 0) <= 0 ? 'ZERO-FUNDS GUARD: NOSTRO $0.00' : 'INSUFFICIENT FUNDS (< $300)'}
              </span>
            ) : (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3" />
                TREASURY BACKED: READY
              </span>
            )}
          </div>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Automated at 20:50 PM every single evening via crontab <strong className="text-emerald-400 font-mono">50 20 * * *</strong> to transfer a verified <strong className="text-white font-mono">$300.00 USD</strong> profit split directly to the corporate EcoCash mobile wallet line (+263784219178).
          </p>
          {(balances.agric_balance_usd || 0) < 300 && (
            <p className="text-[11px] text-amber-300/90 flex items-center gap-1">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Idempotency & Zero-Funds Guard active: Accidental multiple clicks when Nostro balance is $0.00 are automatically intercepted to prevent repeating transactions.</span>
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
          <button
            onClick={handleExecuteRemittance}
            disabled={remitting || (balances.agric_balance_usd || 0) < 300}
            className={`flex items-center justify-center gap-2 px-5 py-3 text-xs font-bold rounded-xl shadow-lg transition cursor-pointer ${
              (balances.agric_balance_usd || 0) < 300
                ? 'bg-slate-800 text-slate-400 border border-slate-700 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-300 hover:to-green-400 text-slate-950 shadow-emerald-500/25'
            }`}
          >
            <ArrowUpRight className="w-4 h-4" />
            {remitting
              ? 'Executing Real Paynow Remittance...'
              : (balances.agric_balance_usd || 0) < 300
              ? 'Remittance Locked ($0.00 Nostro Funds)'
              : 'Deploy $300.00 USD Cash Split to EcoCash'}
          </button>
        </div>
      </div>

      {/* Remittance Error Notice */}
      {remittanceError && (
        <div className="p-4 rounded-xl bg-rose-950/50 border border-rose-500/40 text-xs font-mono space-y-1 animate-in fade-in text-rose-300">
          <div className="flex items-center gap-2 font-bold text-rose-200">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>Safeguard Interception: Duplicate / Zero-Balance Transaction Prevented</span>
          </div>
          <div className="text-[11px] text-rose-300/90 pl-6">
            {remittanceError}
          </div>
        </div>
      )}

      {/* Remittance Confirmation Banner */}
      {remittanceResult && (
        <div className={`p-4 rounded-xl text-xs font-mono space-y-2 animate-in fade-in ${
          remittanceResult.duplicated 
            ? 'bg-amber-950/50 border border-amber-500/40 text-amber-200' 
            : 'bg-emerald-950/50 border border-emerald-500/40 text-emerald-200'
        }`}>
          <div className="flex items-center justify-between font-bold">
            <span className="flex items-center gap-1.5">
              {remittanceResult.duplicated ? (
                <ShieldCheck className="w-4 h-4 text-amber-400" />
              ) : (
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              )}
              {remittanceResult.message}
            </span>
            <span>Carrier Ref: {remittanceResult.remittance?.carrierCode}</span>
          </div>
          <div className="text-slate-300 text-[11px]">
            New EcoCash Balance: ${remittanceResult.updatedEcoCashBalance?.toFixed(2)} USD · Reconciliation Target: AgriBank {remittanceResult.treasuryNostro}
          </div>
        </div>
      )}

      {/* Two-Column Middle Section: Inbound SMS Parser & Cryptographic Vault */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left: Inbound SMS Listener Webhook Tester */}
        <div className="p-6 rounded-2xl bg-[#070c14] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-cyan-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Inbound SMS Listener Webhook Gateway
              </h4>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-bold">Port 5000 / SMS Gateway</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Parses forwarded confirmation messages from mobile network operators to extract balances and transaction references directly into the relational single-row financial index.
          </p>

          <form onSubmit={handleTestSmsListener} className="space-y-3 text-xs">
            <div>
              <label className="block text-slate-400 mb-1 font-medium">Forwarding Mobile Sender *</label>
              <input
                type="text"
                required
                value={smsFrom}
                onChange={(e) => setSmsFrom(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>

            <div>
              <label className="block text-slate-400 mb-1 font-medium">Raw SMS Notification Text Body *</label>
              <textarea
                rows={2}
                required
                value={smsMessage}
                onChange={(e) => setSmsMessage(e.target.value)}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-white font-mono"
              />
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={processingSms}
                className="flex items-center gap-2 px-4 py-2 text-xs font-bold rounded-lg bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-cyan-500/30 transition cursor-pointer disabled:opacity-50"
              >
                <Smartphone className="w-3.5 h-3.5" />
                {processingSms ? 'Parsing Payload...' : 'Process Inbound SMS Message'}
              </button>
            </div>
          </form>

          {smsResult && (
            <div className="p-3 rounded-lg bg-slate-950 border border-cyan-500/30 text-xs font-mono space-y-1">
              <div className="text-cyan-400 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                {smsResult.message}
              </div>
              <div className="text-slate-300 text-[11px]">
                Updated AgriBank: ${smsResult.balances?.agric_balance_usd} USD | EcoCash: ${smsResult.balances?.ecocash_balance_usd} USD
              </div>
            </div>
          )}
        </div>

        {/* Right: Cryptographic Cold Storage Vault */}
        <div className="p-6 rounded-2xl bg-[#070c14] border border-slate-800 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" />
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Cryptographic Cold Storage Vault
              </h4>
            </div>
            <span className="text-[10px] font-mono text-amber-400 font-bold">SHA-256 Checksum Sealed</span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Wakes up automatically every Saturday night at 23:30 PM. Compiles settled transaction rows to encrypted CSV, signs them with SHA-256 hashing, and stores an off-site archive requiring zero local device data connections.
          </p>

          <div className="flex justify-between items-center pt-2">
            <div className="text-xs font-mono text-slate-400">
              Total Archival Snapshots: <strong className="text-white">{snapshots.length}</strong>
            </div>

            <button
              onClick={handleTriggerColdStorage}
              disabled={generatingBackup}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-slate-950 transition cursor-pointer disabled:opacity-50"
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              {generatingBackup ? 'Hashing & Sealing...' : 'Generate SHA-256 Vault Backup'}
            </button>
          </div>

          {backupReceipt && (
            <div className="p-4 rounded-xl bg-slate-950 border border-amber-500/40 text-xs font-mono space-y-2 animate-in fade-in">
              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  Off-Site Vault Snapshot Signed
                </span>
                <button
                  onClick={() => openWhatsAppLink('263784219178', backupReceipt)}
                  className="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] hover:bg-emerald-500"
                >
                  Forward Receipt to WhatsApp
                </button>
              </div>
              <pre className="text-[11px] text-slate-300 whitespace-pre-wrap leading-relaxed overflow-x-auto bg-slate-900/80 p-2.5 rounded border border-slate-800">
                {backupReceipt}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Remittance & Payout History Table */}
      <div className="p-6 rounded-2xl bg-[#070c14] border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-400" />
            <h4 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
              Verified Production Remittance Logs
            </h4>
          </div>
          <span className="text-[11px] font-mono text-emerald-400">Scheduled Daily at 20:50 PM · Paynow Production</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950 text-slate-400 font-mono text-[11px] uppercase border-b border-slate-800">
              <tr>
                <th className="py-2.5 px-3">Remittance ID</th>
                <th className="py-2.5 px-3">Recipient Phone</th>
                <th className="py-2.5 px-3">Amount USD</th>
                <th className="py-2.5 px-3">Paynow Carrier Code</th>
                <th className="py-2.5 px-3">Execution Status</th>
                <th className="py-2.5 px-3">Scheduled Time</th>
                <th className="py-2.5 px-3 text-right">Audit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 font-sans">
              {remittanceLogs.map((item) => (
                <tr key={item.id} className="hover:bg-slate-900/60 transition">
                  <td className="py-3 px-3 font-mono font-bold text-emerald-400">{item.id}</td>
                  <td className="py-3 px-3 font-mono text-slate-200">+{item.phone}</td>
                  <td className="py-3 px-3 font-mono font-bold text-white">${item.amountUSD.toFixed(2)} USD</td>
                  <td className="py-3 px-3 font-mono text-cyan-400 font-bold">{item.carrierCode}</td>
                  <td className="py-3 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-400 text-[11px]">{item.scheduledTime}</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        const note = `*PAYNOW REMITTANCE RECEIPT*\n*ID:* ${item.id}\n*Amount:* $${item.amountUSD} USD\n*Code:* ${item.carrierCode}\n*Status:* ${item.status}\n*Line:* +${item.phone}\n*Settled to:* AgriBank Nostro Escrow Gateway`;
                        openWhatsAppLink('263784219178', note);
                      }}
                      className="px-2.5 py-1 text-[11px] font-semibold bg-slate-800 hover:bg-slate-700 text-white rounded border border-slate-700 transition cursor-pointer"
                    >
                      Audit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
