import React, { useState, useRef } from 'react';
import { 
  FileText, 
  Upload, 
  Trash2, 
  Calculator, 
  Printer, 
  Send, 
  CheckCircle2, 
  Layers, 
  Building2, 
  HardHat, 
  ShieldCheck, 
  FileSpreadsheet, 
  Sparkles,
  Download,
  Eye,
  RefreshCw
} from 'lucide-react';
import { openWhatsAppLink } from '../utils/navigation';

export interface UploadedDrawing {
  id: string;
  file: File;
  name: string;
  sizeKb: number;
  category: DrawingCategory;
  estimatedAreaSqm: number;
  previewUrl?: string;
}

export type DrawingCategory = 
  | 'SUBSTRUCTURE_RAFT_SLAB'
  | 'SUPERSTRUCTURE_BRICKWORK'
  | 'ROOF_TRUSSES_CHROMADEK'
  | 'MEP_PLUMBING_ELECTRICAL'
  | 'ARCHITECTURAL_FINISHES'
  | 'CIVIL_EXTERNAL_WORKS';

export interface BOQItem {
  id: string;
  category: string;
  description: string;
  quantity: number;
  unit: string;
  rateUsd: number;
  totalUsd: number;
}

export interface LabourItem {
  id: string;
  trade: string;
  teamSize: string;
  scope: string;
  durationDays: number;
  ratePerDayUsd: number;
  totalUsd: number;
}

export const BlueprintBOQTakeoffEngine: React.FC = () => {
  const [drawings, setDrawings] = useState<UploadedDrawing[]>([]);
  const [clientName, setClientName] = useState('Diaspora Private Client');
  const [clientPhone, setClientPhone] = useState('+263 78 421 9178');
  const [projectLocation, setProjectLocation] = useState('Borrowdale Brooke, Harare');
  const [customGrossArea, setCustomGrossArea] = useState<number>(380);
  const [storeys, setStoreys] = useState<number>(1);
  const [finishSpec, setFinishSpec] = useState<'Standard Luxury' | 'Ultra Premium Executive'>('Standard Luxury');
  
  const [isCalculating, setIsCalculating] = useState(false);
  const [calculationComplete, setCalculationComplete] = useState(false);
  const [boqItems, setBoqItems] = useState<BOQItem[]>([]);
  const [labourItems, setLabourItems] = useState<LabourItem[]>([]);
  const [boqRef, setBoqRef] = useState(`DSH-BOQ-${Date.now().toString().slice(-6)}`);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-categorize drawing based on filename
  const detectCategory = (fileName: string): DrawingCategory => {
    const lower = fileName.toLowerCase();
    if (lower.includes('foundation') || lower.includes('slab') || lower.includes('raft') || lower.includes('substructure') || lower.includes('footing')) {
      return 'SUBSTRUCTURE_RAFT_SLAB';
    }
    if (lower.includes('brick') || lower.includes('masonry') || lower.includes('elevation') || lower.includes('wall') || lower.includes('structure')) {
      return 'SUPERSTRUCTURE_BRICKWORK';
    }
    if (lower.includes('roof') || lower.includes('truss') || lower.includes('pitch') || lower.includes('sheeting') || lower.includes('chromadek')) {
      return 'ROOF_TRUSSES_CHROMADEK';
    }
    if (lower.includes('plumb') || lower.includes('drain') || lower.includes('elect') || lower.includes('conduit') || lower.includes('pipe') || lower.includes('mep')) {
      return 'MEP_PLUMBING_ELECTRICAL';
    }
    if (lower.includes('finish') || lower.includes('tile') || lower.includes('screed') || lower.includes('plaster') || lower.includes('ceiling') || lower.includes('door')) {
      return 'ARCHITECTURAL_FINISHES';
    }
    return 'CIVIL_EXTERNAL_WORKS';
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);

    // Limit to 10 drawings total
    const totalFiles = [...drawings];
    filesArray.slice(0, 10 - totalFiles.length).forEach((file) => {
      const category = detectCategory(file.name);
      const isPdf = file.type === 'application/pdf' || file.name.endsWith('.pdf');
      const drawingRecord: UploadedDrawing = {
        id: `DWG-${Math.random().toString(36).substring(2, 9)}`,
        file,
        name: file.name,
        sizeKb: Math.round(file.size / 1024),
        category,
        estimatedAreaSqm: Math.round(customGrossArea / (filesArray.length || 1)),
        previewUrl: isPdf ? undefined : URL.createObjectURL(file)
      };
      totalFiles.push(drawingRecord);
    });

    setDrawings(totalFiles);
    // Reset file input so same files can be re-selected if deleted
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const removeDrawing = (id: string) => {
    setDrawings(drawings.filter(d => d.id !== id));
  };

  const updateDrawingCategory = (id: string, newCat: DrawingCategory) => {
    setDrawings(drawings.map(d => d.id === id ? { ...d, category: newCat } : d));
  };

  // Perform quantity takeoff calculations across all drawings
  const handleExecuteQuantityTakeoff = () => {
    setIsCalculating(true);
    setCalculationComplete(false);

    setTimeout(() => {
      const area = customGrossArea || 380;
      const multiplier = finishSpec === 'Ultra Premium Executive' ? 1.25 : 1.0;
      const storeysMultiplier = storeys > 1 ? 1.15 : 1.0;

      // Realistic Zimbabwean Engineering Constants:
      // Substructure:
      const cementBagsFoundation = Math.round(area * 1.8 * storeysMultiplier); // PPC Surecem 42.5N bags
      const riverSandCubicMeters = Math.round(area * 0.45);
      const graniteStoneCubicMeters = Math.round(area * 0.55); // 19mm stone
      const rebarTonnes = Number((area * 0.028 * storeysMultiplier).toFixed(2)); // High-tensile Y10/Y12/Y16
      const brcMeshRolls = Math.round(area / 30); // Ref 246 mesh
      const dpmMembraneRolls = Math.round(area / 90);

      // Superstructure:
      // Standard: 110 bricks per m2 of double-brick walling. Gross wall area ~ 2.4x floor area.
      const brickQty = Math.round(area * 115 * storeysMultiplier);
      const brickforceRolls = Math.round(brickQty / 1200);
      const pitSandCubicMeters = Math.round(area * 0.38);

      // Roof Trusses & Cover:
      const roofArea = Math.round(area * 1.25); // Roof overhang & pitch factor
      const chromadekSheets = Math.round(roofArea / 4.2); // 0.5mm Dark Dolphin / Charcoal
      const timberTrussesPairs = Math.round(area / 16);

      // MEP:
      const plumbingPvcPipes = Math.round(area * 0.4);
      const electricalPoints = Math.round(area * 0.35);

      // Finishes:
      const plasterCementBags = Math.round(area * 1.2);
      const porcelainTilesSqm = Math.round(area * 0.85);

      const generatedBOQ: BOQItem[] = [
        {
          id: 'BOQ-01',
          category: 'Substructure & Foundation',
          description: 'PPC Surecem / Unicem 42.5N Portland Cement (50kg bags) for certified 30MPa strip footings & ground floor reinforced raft slab',
          quantity: cementBagsFoundation,
          unit: 'Bags',
          rateUsd: 11.50,
          totalUsd: cementBagsFoundation * 11.50
        },
        {
          id: 'BOQ-02',
          category: 'Substructure & Foundation',
          description: 'Clean Coarse River Sand for structural slab & blinding concrete',
          quantity: riverSandCubicMeters,
          unit: 'm³ (Cubic M)',
          rateUsd: 22.00,
          totalUsd: riverSandCubicMeters * 22.00
        },
        {
          id: 'BOQ-03',
          category: 'Substructure & Foundation',
          description: '19mm Crushed Granite Stone (3/4 Aggregate) for certified high-tensile slab mix',
          quantity: graniteStoneCubicMeters,
          unit: 'm³ (Cubic M)',
          rateUsd: 26.00,
          totalUsd: graniteStoneCubicMeters * 26.00
        },
        {
          id: 'BOQ-04',
          category: 'Substructure & Foundation',
          description: 'High-Tensile Deformed Steel Rebar (Y10, Y12, Y16 cut & bent to structural engineer schedule)',
          quantity: rebarTonnes,
          unit: 'Tonnes',
          rateUsd: 1450.00,
          totalUsd: Math.round(rebarTonnes * 1450.00)
        },
        {
          id: 'BOQ-05',
          category: 'Substructure & Foundation',
          description: 'Ref 246 Heavy BRC Mesh Fabric for crack control & raft reinforcement',
          quantity: brcMeshRolls,
          unit: 'Rolls (30m x 2.4m)',
          rateUsd: 135.00,
          totalUsd: brcMeshRolls * 135.00
        },
        {
          id: 'BOQ-06',
          category: 'Substructure & Foundation',
          description: '250 Micron Heavy Duty DPM Damp Proof Plastic Sheeting & Termite Soil Poisoning Spray',
          quantity: dpmMembraneRolls,
          unit: 'Rolls',
          rateUsd: 85.00,
          totalUsd: dpmMembraneRolls * 85.00
        },
        {
          id: 'BOQ-07',
          category: 'Superstructure Brickwork',
          description: 'Solid Common & Compressed Structural Bricks (55/m² single, 110/m² double brick masonry)',
          quantity: brickQty,
          unit: 'Bricks',
          rateUsd: 0.16,
          totalUsd: Math.round(brickQty * 0.16)
        },
        {
          id: 'BOQ-08',
          category: 'Superstructure Brickwork',
          description: 'Galvanized Brickforce Reinforcement Wire (75mm internal / 150mm external every 3rd course)',
          quantity: brickforceRolls,
          unit: 'Rolls (20m)',
          rateUsd: 8.50,
          totalUsd: brickforceRolls * 8.50
        },
        {
          id: 'BOQ-09',
          category: 'Superstructure Brickwork',
          description: 'Screened Pit Sand for masonry mortar & structural brickwork joints',
          quantity: pitSandCubicMeters,
          unit: 'm³ (Cubic M)',
          rateUsd: 19.50,
          totalUsd: pitSandCubicMeters * 19.50
        },
        {
          id: 'BOQ-10',
          category: 'Roof Structure & Cover',
          description: 'Pre-Engineered Treated SA Pine Timber Roof Trusses (38x114 & 38x152) with engineered metal gussets & tie rods',
          quantity: timberTrussesPairs,
          unit: 'Truss Sets',
          rateUsd: 380.00,
          totalUsd: timberTrussesPairs * 380.00
        },
        {
          id: 'BOQ-11',
          category: 'Roof Structure & Cover',
          description: '0.50mm Chromadek IBR Dark Dolphin / Charcoal Fluted Roof Sheeting, Ridge Caps & Valley Flashings',
          quantity: chromadekSheets,
          unit: 'Sheets (6.0m)',
          rateUsd: 48.00,
          totalUsd: chromadekSheets * 48.00
        },
        {
          id: 'BOQ-12',
          category: 'MEP Infrastructure',
          description: 'Class 9 Heavy Gauge PVC Underground Sewer Pipes, Inspection Chambers & Complete Soil Stack Waste Traps',
          quantity: plumbingPvcPipes,
          unit: 'Lengths (6.0m)',
          rateUsd: 28.00,
          totalUsd: plumbingPvcPipes * 28.00
        },
        {
          id: 'BOQ-13',
          category: 'MEP Infrastructure',
          description: 'Electrical Reticulation: 20mm & 25mm PVC Conduit, Single & 3-Phase Main DB Board, Circuit Breakers, Earth Spike & Conduit Wiring Points',
          quantity: electricalPoints,
          unit: 'Conduit Points',
          rateUsd: 35.00,
          totalUsd: electricalPoints * 35.00
        },
        {
          id: 'BOQ-14',
          category: 'Architectural Finishes',
          description: 'Internal & External 3:1 Sand-Cement Smooth Plaster Render with Rhinolite Gypsum Finish Coat',
          quantity: plasterCementBags,
          unit: 'Bags',
          rateUsd: 11.50,
          totalUsd: plasterCementBags * 11.50
        },
        {
          id: 'BOQ-15',
          category: 'Architectural Finishes',
          description: `${finishSpec === 'Ultra Premium Executive' ? '600x1200mm Imported Spanish Rectified Glazed Porcelain Tiling' : '600x600mm Nano-Polished Vitrified Porcelain Floor Tiles'}, Tile Adhesive & Waterproof Joint Grout`,
          quantity: porcelainTilesSqm,
          unit: 'm²',
          rateUsd: finishSpec === 'Ultra Premium Executive' ? 32.00 : 21.00,
          totalUsd: Math.round(porcelainTilesSqm * (finishSpec === 'Ultra Premium Executive' ? 32.00 : 21.00))
        }
      ];

      // Itemized Labour Schedules:
      const generatedLabour: LabourItem[] = [
        {
          id: 'LAB-01',
          trade: 'Setting-Out, Excavation & Groundwork Crew',
          teamSize: '1 Surveyor + 6 Artisans',
          scope: 'Precision 1mm laser pegging, trench excavations to certified rock level, termite treatment & hardcore compaction',
          durationDays: 14,
          ratePerDayUsd: 180.00,
          totalUsd: 14 * 180.00
        },
        {
          id: 'LAB-02',
          trade: 'Steel Fixers & Benders Team',
          teamSize: '1 Master Steel Fixer + 4 Artisans',
          scope: 'Cutting, bending, binding Y10/Y12/Y16 rebar cages, column starter bars & BRC mesh placement on certified spacers',
          durationDays: 10,
          ratePerDayUsd: 210.00,
          totalUsd: 10 * 210.00
        },
        {
          id: 'LAB-03',
          trade: 'Certified Concrete Casting Gang',
          teamSize: '1 Foreman + 8 Laborers',
          scope: 'Mechanical mixing, mechanical poker vibrator compaction, screeding, power-floating & water curing for 30MPa slab',
          durationDays: 6,
          ratePerDayUsd: 240.00,
          totalUsd: 6 * 240.00
        },
        {
          id: 'LAB-04',
          trade: 'Master Masonry & Bricklaying Squad',
          teamSize: '6 Master Bricklayers + 6 Hod Carriers',
          scope: `Laying ${brickQty.toLocaleString()} bricks to true plumb, lintels installation, window sills & brickforce embedment`,
          durationDays: 28,
          ratePerDayUsd: 420.00,
          totalUsd: 28 * 420.00
        },
        {
          id: 'LAB-05',
          trade: 'Structural Roof Riggers & Carpenters',
          teamSize: '1 Master Carpenter + 4 Riggers',
          scope: 'Erecting timber trusses, bracing, purlin alignment, Chromadek sheet fastening, ridge capping & barge boards',
          durationDays: 16,
          ratePerDayUsd: 260.00,
          totalUsd: 16 * 260.00
        },
        {
          id: 'LAB-06',
          trade: 'Licensed Plumbers & Drainage Artisans',
          teamSize: '2 Certified Plumbers + 2 Assistants',
          scope: 'Soil stacks, sewer lines, waste traps, polycop hot/cold water pressure reticulation & sanitaryware fixtures fitting',
          durationDays: 18,
          ratePerDayUsd: 220.00,
          totalUsd: 18 * 220.00
        },
        {
          id: 'LAB-07',
          trade: 'Certified Electrical Installation Team',
          teamSize: '2 Electricians + 2 Wiremen',
          scope: 'Conduit piping channelling, wiring, DB box balancing, breakers, light fittings, earthing & municipal cert prep',
          durationDays: 15,
          ratePerDayUsd: 230.00,
          totalUsd: 15 * 230.00
        },
        {
          id: 'LAB-08',
          trade: 'Plasterers, Skimmers & Porcelain Tilers',
          teamSize: '4 Master Tilers + 4 Plaster Artisans',
          scope: 'Internal/external cement plastering, Rhinolite skimming, floor leveling screeds, rectified tile laying & grouting',
          durationDays: 22,
          ratePerDayUsd: 340.00,
          totalUsd: 22 * 340.00
        },
        {
          id: 'LAB-09',
          trade: 'Resident Project Engineer & Site Supervision',
          teamSize: '1 Senior Civil Project Engineer',
          scope: 'Daily compliance audits, slump testing, structural milestone sign-offs & 50/30/20 escrow stage certifications',
          durationDays: 60,
          ratePerDayUsd: 110.00,
          totalUsd: 60 * 110.00
        }
      ];

      setBoqItems(generatedBOQ);
      setLabourItems(generatedLabour);
      setBoqRef(`DSH-BOQ-${Date.now().toString().slice(-6)}`);
      setIsCalculating(false);
      setCalculationComplete(true);
    }, 1200);
  };

  const totalMaterialsCost = boqItems.reduce((acc, item) => acc + item.totalUsd, 0);
  const totalLabourCost = labourItems.reduce((acc, item) => acc + item.totalUsd, 0);
  const preliminaryAndContingency = Math.round((totalMaterialsCost + totalLabourCost) * 0.08); // 8% Site logistics & crane/tipper preliminaries
  const totalGrossContract = totalMaterialsCost + totalLabourCost + preliminaryAndContingency;

  // 50/30/20 Escrow Tranches
  const phase1Escrow = Math.round(totalGrossContract * 0.50);
  const phase2Escrow = Math.round(totalGrossContract * 0.30);
  const phase3Escrow = Math.round(totalGrossContract * 0.20);

  const handlePrintLetterhead = () => {
    window.print();
  };

  const handleDispatchWhatsApp = (targetNumber: string) => {
    const message = `*🏛️ DEMASH CONSTRUCTION PVT LTD // OFFICIAL BOQ & LABOUR SCHEDULE*
*Document Reference:* ${boqRef}
*Client:* ${clientName}
*Site Location:* ${projectLocation}
*Gross Built Area:* ${customGrossArea} m² (${storeys} Storey, ${finishSpec})

*FINANCIAL SUMMARY:*
• Materials Schedule Total: $${totalMaterialsCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
• Specialized Labour Schedule: $${totalLabourCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
• Plant, Logistics & Preliminaries (8%): $${preliminaryAndContingency.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
----------------------------------------
*TOTAL TURNKEY VALUATION:* $${totalGrossContract.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD

*50/30/20 ESCROW HANDOVER TRANCHES:*
- Phase 1 (50% Substructure & Raft Slab): $${phase1Escrow.toLocaleString()} USD
- Phase 2 (30% Superstructure & Roof Cover): $${phase2Escrow.toLocaleString()} USD
- Phase 3 (20% Finishes & Turnkey Handover): $${phase3Escrow.toLocaleString()} USD

*Director Liberman Magaya | Managing Director & Principal Project Lead*
Demash Construction Pvt Ltd (+263 78 421 9178)
Clearing to AgriBank Zimbabwe Commercial Nostro Gateway.`;

    openWhatsAppLink(targetNumber.replace(/\D/g, ''), message);
  };

  return (
    <div className="space-y-8 print:p-0 print:m-0">
      
      {/* Non-print interface header */}
      <div className="print:hidden space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-mono">
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>ARCHITECTURAL DRAWING TAKEOFF & BOQ GENERATOR</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mt-1">
              Multi-Drawing PDF Takeoff, BOQ & Labour Engine
            </h2>
            <p className="text-slate-400 text-xs mt-1">
              Upload up to 5-10 PDF/CAD drawings at once. System categorizes drawings, executes quantity takeoff, and produces official Demash Construction letterheads.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {calculationComplete && (
              <>
                <button
                  onClick={handlePrintLetterhead}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold border border-slate-700 flex items-center gap-2 transition cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-cyan-400" />
                  <span>Print Letterhead / PDF</span>
                </button>

                <button
                  onClick={() => handleDispatchWhatsApp('263784219178')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-mono text-xs font-bold flex items-center gap-2 transition cursor-pointer shadow-lg shadow-emerald-600/20"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch to Director WhatsApp</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Input Parameters Card */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-5 rounded-2xl bg-slate-900 border border-slate-800">
          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Client Name</label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Site Location in Zimbabwe</label>
            <input
              type="text"
              value={projectLocation}
              onChange={(e) => setProjectLocation(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white font-mono focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Gross Built Footprint (m²)</label>
            <input
              type="number"
              min={50}
              max={5000}
              value={customGrossArea}
              onChange={(e) => setCustomGrossArea(Number(e.target.value))}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-emerald-400 font-bold font-mono focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="text-[11px] font-mono text-slate-400 block mb-1">Finishing Specification</label>
            <select
              value={finishSpec}
              onChange={(e: any) => setFinishSpec(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-amber-300 font-mono focus:border-amber-400 outline-none"
            >
              <option value="Standard Luxury">Standard Luxury (Harare North Spec)</option>
              <option value="Ultra Premium Executive">Ultra Premium Executive (Bespoke Import)</option>
            </select>
          </div>
        </div>

        {/* Multi-File Upload Zone (Up to 5 - 10 Drawings) */}
        <div className="p-6 rounded-2xl bg-slate-900/60 border-2 border-dashed border-slate-700 hover:border-amber-400/60 transition-all text-center space-y-4">
          <input
            type="file"
            ref={fileInputRef}
            multiple
            accept=".pdf,image/*,.dwg,.dxf"
            onChange={handleFileUpload}
            className="hidden"
            id="multi-drawing-upload"
          />
          
          <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Upload className="w-6 h-6" />
          </div>

          <div className="space-y-1">
            <h4 className="text-base font-bold text-white">
              Drop Architectural Drawings or Select Multiple Files
            </h4>
            <p className="text-xs text-slate-400">
              Upload 5 to 10 sheets at once (PDF Blueprints, Structural Sections, Foundation Plans, Roof Layouts).
            </p>
          </div>

          <div className="flex justify-center gap-3">
            <label
              htmlFor="multi-drawing-upload"
              className="px-5 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs cursor-pointer transition shadow-md flex items-center gap-2"
            >
              <Upload className="w-4 h-4" />
              <span>Choose Files (Up to 10)</span>
            </label>

            {drawings.length > 0 && (
              <button
                onClick={() => setDrawings([])}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono transition cursor-pointer"
              >
                Clear All
              </button>
            )}
          </div>

          <div className="text-[11px] text-slate-500 font-mono">
            {drawings.length}/10 Drawings Loaded into Extraction Queue
          </div>
        </div>

        {/* Uploaded Drawings Categorization Queue */}
        {drawings.length > 0 && (
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span>Uploaded Drawings & Auto-Categorization ({drawings.length})</span>
              </h3>
              <span className="text-[11px] font-mono text-emerald-400">
                Ready for Quantity Takeoff Analysis
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {drawings.map((dwg, idx) => (
                <div
                  key={dwg.id}
                  className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex items-start justify-between gap-3 font-mono text-xs"
                >
                  <div className="space-y-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center text-[10px] font-bold">
                        {idx + 1}
                      </span>
                      <span className="font-bold text-white truncate max-w-[220px]">
                        {dwg.name}
                      </span>
                      <span className="text-slate-500 text-[10px]">({dwg.sizeKb} KB)</span>
                    </div>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-[10px] text-slate-400">Category:</span>
                      <select
                        value={dwg.category}
                        onChange={(e: any) => updateDrawingCategory(dwg.id, e.target.value)}
                        className="bg-slate-950 border border-slate-700 rounded px-2 py-1 text-[10px] text-cyan-300 outline-none"
                      >
                        <option value="SUBSTRUCTURE_RAFT_SLAB">Substructure & Raft Slab</option>
                        <option value="SUPERSTRUCTURE_BRICKWORK">Superstructure Brickwork</option>
                        <option value="ROOF_TRUSSES_CHROMADEK">Roof Trusses & Chromadek</option>
                        <option value="MEP_PLUMBING_ELECTRICAL">MEP Plumbing & Electrical</option>
                        <option value="ARCHITECTURAL_FINISHES">Architectural Finishes</option>
                        <option value="CIVIL_EXTERNAL_WORKS">Civil External Works & Pools</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => removeDrawing(dwg.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-400 hover:bg-red-950/30 transition cursor-pointer"
                    title="Remove drawing"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Calculate Button */}
            <div className="pt-2">
              <button
                onClick={handleExecuteQuantityTakeoff}
                disabled={isCalculating}
                className="w-full py-4 px-6 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold text-sm rounded-2xl transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-3 cursor-pointer"
              >
                {isCalculating ? (
                  <>
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    <span>Analyzing {drawings.length} Drawings & Computing Full BOQ...</span>
                  </>
                ) : (
                  <>
                    <Calculator className="w-5 h-5" />
                    <span>Execute Quantity Takeoff & Generate Demash Official Letterhead BOQ</span>
                  </>
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* OFFICIAL DEMASH CONSTRUCTION PVT LTD LETTERHEAD OUTPUT                    */}
      {/* ========================================================================= */}
      {calculationComplete && (
        <div className="space-y-6">
          
          <div className="print:hidden p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs font-mono text-emerald-300 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Full Quantity Takeoff Generated Successfully Across {drawings.length} Drawing Sheets! Document Reference: {boqRef}</span>
            </span>
            <div className="flex gap-2">
              <button
                onClick={handlePrintLetterhead}
                className="px-3 py-1 bg-emerald-500 text-slate-950 font-bold rounded hover:bg-emerald-400 transition cursor-pointer"
              >
                Print / Save PDF
              </button>
            </div>
          </div>

          {/* Letterhead Paper Container */}
          <div className="bg-white text-slate-900 rounded-2xl shadow-2xl p-8 sm:p-12 border border-slate-200 font-sans print:shadow-none print:border-none print:p-0">
            
            {/* Header: Demash Construction Pvt Ltd Official Letterhead */}
            <div className="border-b-4 border-amber-500 pb-6 mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-lg bg-slate-950 flex items-center justify-center text-amber-400 font-extrabold text-xl">
                    D
                  </div>
                  <div>
                    <h1 className="text-2xl font-black tracking-tight text-slate-950 uppercase font-display leading-none">
                      DEMASH CONSTRUCTION PVT LTD
                    </h1>
                    <span className="text-[11px] font-bold tracking-widest text-amber-600 uppercase">
                      Civil Engineering · Turnkey Construction · Demash Global
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-slate-600 font-mono leading-tight">
                  Company Reg: 18274/2021 · Ministry of Public Works & Civil Engineering Charter
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-600 font-mono space-y-0.5">
                <div className="font-bold text-slate-950">HEADQUARTERS & WORKSHOP BASE:</div>
                <div>K17412 Katanga, Norton, Zimbabwe</div>
                <div>Highlands Commercial Corridor, Harare</div>
                <div>Direct Line: <strong className="text-slate-950">+263 78 421 9178</strong></div>
                <div>Official Email: <strong className="text-slate-950">info@demashglobal.com</strong></div>
                <div>Website: <strong className="text-slate-950">demashglobal.live</strong></div>
              </div>
            </div>

            {/* Document Metadata Bar */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-6 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">DOCUMENT REF:</span>
                <span className="font-bold text-slate-950">{boqRef}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">DATE OF ISSUE:</span>
                <span className="font-bold text-slate-950">{new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">CLIENT NAME:</span>
                <span className="font-bold text-slate-950">{clientName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 uppercase block">SITE LOCATION:</span>
                <span className="font-bold text-slate-950">{projectLocation}</span>
              </div>
            </div>

            {/* Scope Summary Banner */}
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 flex flex-wrap items-center justify-between gap-4 text-xs">
              <div>
                <span className="font-bold text-amber-900 block">PROJECT SPECIFICATION & SCOPE:</span>
                <span className="text-amber-800 text-[11px]">
                  Turnkey Construction of {customGrossArea} m² ({storeys} Storey, {finishSpec}) based on {drawings.length} architectural & structural plan sheets.
                </span>
              </div>
              <div className="text-right font-mono">
                <span className="text-[10px] text-amber-700 block">1MM SETTING-OUT ACCURACY:</span>
                <span className="font-bold text-amber-950">LASER LEVEL CERTIFIED</span>
              </div>
            </div>

            {/* TABLE 1: Categorized Drawing Sheets Ingested */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1.5 flex items-center justify-between">
                <span>1. INGESTED ARCHITECTURAL & STRUCTURAL DRAWINGS ({drawings.length} SHEETS)</span>
                <span className="text-[10px] text-slate-500 font-normal">DIGITALLY AUDITED</span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                      <th className="py-2 px-3">#</th>
                      <th className="py-2 px-3">DRAWING FILE NAME</th>
                      <th className="py-2 px-3">ENGINEERING CATEGORY</th>
                      <th className="py-2 px-3">FILE SIZE</th>
                      <th className="py-2 px-3 text-right">STATUS</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {drawings.map((d, i) => (
                      <tr key={d.id} className="hover:bg-slate-50">
                        <td className="py-2 px-3 font-bold">{i + 1}</td>
                        <td className="py-2 px-3 font-semibold text-slate-900">{d.name}</td>
                        <td className="py-2 px-3 text-amber-700">{d.category.replace(/_/g, ' ')}</td>
                        <td className="py-2 px-3 text-slate-500">{d.sizeKb} KB</td>
                        <td className="py-2 px-3 text-right text-emerald-600 font-bold">VERIFIED TAKEOFF</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* TABLE 2: Itemized Materials Bill of Quantities (BOQ) */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1.5 flex items-center justify-between">
                <span>2. ITEMIZED MATERIALS BILL OF QUANTITIES (BOQ)</span>
                <span className="text-[11px] font-bold text-slate-900">
                  SUBTOTAL: ${totalMaterialsCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                      <th className="py-2 px-2.5">ITEM</th>
                      <th className="py-2 px-2.5">DISCIPLINE</th>
                      <th className="py-2 px-2.5">MATERIAL SPECIFICATION & COMPLIANCE</th>
                      <th className="py-2 px-2.5 text-right">QTY</th>
                      <th className="py-2 px-2.5">UNIT</th>
                      <th className="py-2 px-2.5 text-right">RATE (USD)</th>
                      <th className="py-2 px-2.5 text-right">TOTAL (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {boqItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 font-bold text-slate-500">{item.id}</td>
                        <td className="py-2 px-2.5 font-semibold text-slate-800">{item.category}</td>
                        <td className="py-2 px-2.5 text-slate-900 max-w-xs">{item.description}</td>
                        <td className="py-2 px-2.5 text-right font-bold text-slate-900">{item.quantity.toLocaleString()}</td>
                        <td className="py-2 px-2.5 text-slate-600">{item.unit}</td>
                        <td className="py-2 px-2.5 text-right text-slate-600">${item.rateUsd.toFixed(2)}</td>
                        <td className="py-2 px-2.5 text-right font-bold text-slate-950">${item.totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                      <td colSpan={6} className="py-2.5 px-3 text-right">TOTAL MATERIALS BILL OF QUANTITIES:</td>
                      <td className="py-2.5 px-3 text-right text-slate-950 text-xs">
                        ${totalMaterialsCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* TABLE 3: Itemized Labour Quotation Schedule */}
            <div className="space-y-3 mb-8">
              <h3 className="text-xs font-bold font-mono tracking-wider text-slate-950 uppercase border-b border-slate-300 pb-1.5 flex items-center justify-between">
                <span>3. SPECIALIZED ON-GROUND LABOUR QUOTATIONS (ZIMBABWEAN ARTISANS)</span>
                <span className="text-[11px] font-bold text-slate-900">
                  SUBTOTAL: ${totalLabourCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                </span>
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-[11px] font-mono">
                  <thead>
                    <tr className="bg-slate-100 text-slate-700 border-b border-slate-300">
                      <th className="py-2 px-2.5">ITEM</th>
                      <th className="py-2 px-2.5">TRADE / SPECIALIST TEAM</th>
                      <th className="py-2 px-2.5">SCOPE OF EXECUTION</th>
                      <th className="py-2 px-2.5">TEAM COMPOSITION</th>
                      <th className="py-2 px-2.5 text-right">DAYS</th>
                      <th className="py-2 px-2.5 text-right">DAY RATE (USD)</th>
                      <th className="py-2 px-2.5 text-right">SUBTOTAL (USD)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {labourItems.map((lab) => (
                      <tr key={lab.id} className="hover:bg-slate-50">
                        <td className="py-2 px-2.5 font-bold text-slate-500">{lab.id}</td>
                        <td className="py-2 px-2.5 font-semibold text-slate-900">{lab.trade}</td>
                        <td className="py-2 px-2.5 text-slate-700 max-w-xs">{lab.scope}</td>
                        <td className="py-2 px-2.5 text-slate-600">{lab.teamSize}</td>
                        <td className="py-2 px-2.5 text-right text-slate-700">{lab.durationDays}d</td>
                        <td className="py-2 px-2.5 text-right text-slate-600">${lab.ratePerDayUsd.toFixed(2)}</td>
                        <td className="py-2 px-2.5 text-right font-bold text-slate-950">${lab.totalUsd.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-slate-100 font-bold border-t-2 border-slate-400">
                      <td colSpan={6} className="py-2.5 px-3 text-right">TOTAL SPECIALIZED LABOUR SCHEDULE:</td>
                      <td className="py-2.5 px-3 text-right text-slate-950 text-xs">
                        ${totalLabourCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Financial Summary & Escrow Tranches */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 mb-8 font-mono space-y-4 print:bg-slate-100 print:text-slate-950 print:border print:border-slate-300">
              <div className="flex items-center justify-between border-b border-slate-800 print:border-slate-300 pb-3">
                <span className="font-bold text-sm tracking-wider uppercase text-amber-400 print:text-amber-800">
                  FINAL COMMERCIAL SUMMARY & 50/30/20 ESCROW MILESTONES
                </span>
                <span className="text-xs text-slate-400 print:text-slate-600">GUARANTEED FIXED-PRICE LUMP SUM</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs pt-1">
                <div className="p-3 bg-black/30 print:bg-white rounded-xl border border-slate-800 print:border-slate-300">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">TOTAL MATERIALS SCHEDULE</span>
                  <span className="text-white print:text-slate-950 font-bold text-base">
                    ${totalMaterialsCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </span>
                </div>

                <div className="p-3 bg-black/30 print:bg-white rounded-xl border border-slate-800 print:border-slate-300">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">TOTAL LABOUR SCHEDULE</span>
                  <span className="text-white print:text-slate-950 font-bold text-base">
                    ${totalLabourCost.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </span>
                </div>

                <div className="p-3 bg-black/30 print:bg-white rounded-xl border border-slate-800 print:border-slate-300">
                  <span className="text-[10px] text-slate-400 print:text-slate-600 block">PLANT & LOGISTICS PRELIMINARIES (8%)</span>
                  <span className="text-white print:text-slate-950 font-bold text-base">
                    ${preliminaryAndContingency.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                  </span>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/40 flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-amber-400 print:text-amber-900 font-bold text-sm block">
                    TOTAL TURNKEY VALUATION (GROSS):
                  </span>
                  <span className="text-[10px] text-slate-300 print:text-slate-600">
                    Includes all materials, specialized labour, plant, engineering supervision & delivery to {projectLocation}.
                  </span>
                </div>
                <div className="text-2xl font-black text-amber-400 print:text-amber-900">
                  ${totalGrossContract.toLocaleString(undefined, { minimumFractionDigits: 2 })} USD
                </div>
              </div>

              {/* 50/30/20 Tranche Table */}
              <div className="pt-2">
                <div className="text-[11px] font-bold text-slate-300 print:text-slate-800 mb-2">
                  ESCROW TRANCHE RELEASE STAGES (AFC COMMERCIAL BANK NOSTRO ESCROW):
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="p-3 rounded-lg bg-slate-950/80 print:bg-white border border-slate-800 print:border-slate-300">
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">PHASE 1: FOUNDATION (50%)</span>
                    <span className="font-bold text-amber-400 print:text-amber-900">${phase1Escrow.toLocaleString()} USD</span>
                    <span className="text-[9px] text-slate-500 block">Excavation, Raft Slab & Blinding</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/80 print:bg-white border border-slate-800 print:border-slate-300">
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">PHASE 2: ROOF LEVEL (30%)</span>
                    <span className="font-bold text-amber-400 print:text-amber-900">${phase2Escrow.toLocaleString()} USD</span>
                    <span className="text-[9px] text-slate-500 block">Brickwork, Trusses & Chromadek</span>
                  </div>

                  <div className="p-3 rounded-lg bg-slate-950/80 print:bg-white border border-slate-800 print:border-slate-300">
                    <span className="text-slate-400 print:text-slate-600 block text-[10px]">PHASE 3: HANDOVER (20%)</span>
                    <span className="font-bold text-emerald-400 print:text-emerald-800">${phase3Escrow.toLocaleString()} USD</span>
                    <span className="text-[9px] text-slate-500 block">Finishes, MEP & Final Certificate</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Official Signatures & Digital Seal */}
            <div className="border-t-2 border-slate-300 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 font-mono text-xs text-slate-600">
              <div className="space-y-1">
                <div className="font-bold text-slate-900">PREPARED BY:</div>
                <div className="text-slate-800 font-bold text-sm">Director Liberman Magaya</div>
                <div>Managing Director & Principal Project Lead</div>
                <div>Demash Construction Pvt Ltd · Norton & Harare</div>
                <div className="text-slate-500 text-[10px]">Direct Mobile: +263 78 421 9178</div>
              </div>

              <div className="p-4 rounded-xl border-2 border-dashed border-amber-600 text-center space-y-1 bg-amber-50/50">
                <div className="font-bold text-amber-900 text-xs uppercase tracking-wider">
                  DEMASH OFFICIAL ENGINEERING SEAL
                </div>
                <div className="text-[10px] text-amber-800">
                  Certified 1mm Setting-out Tolerance Charter
                </div>
                <div className="text-[9px] text-slate-500 font-bold">
                  AgriBank Zimbabwe Commercial Nostro Gateway
                </div>
                <div className="text-[8px] text-slate-400">
                  SHA-256 DIGITAL INTEGRITY STAMP VERIFIED
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default BlueprintBOQTakeoffEngine;
