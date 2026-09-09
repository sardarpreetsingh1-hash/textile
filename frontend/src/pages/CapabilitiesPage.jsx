import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Cpu, Gauge, Zap, Wind, Sliders, ArrowRight, CheckCircle, Calculator } from 'lucide-react';

export default function CapabilitiesPage() {
  const [calcMeters, setCalcMeters] = useState(1000);
  const [calcFiber, setCalcFiber] = useState('carbon');

  const getEstimatedWeeks = () => {
    let base = calcFiber === 'carbon' ? 3 : calcFiber === 'aramid' ? 4 : 2;
    if (calcMeters > 5000) base += 2;
    if (calcMeters > 15000) base += 3;
    return base;
  };

  const getEstCarbonOffset = () => {
    return (calcMeters * 0.42).toFixed(1);
  };

  const machinery = [
    {
      title: 'Dornier Air-Jet High-Tension Looms (PTS 4/S)',
      specs: 'Max reed width 360cm, weft insertion up to 1,200 m/min, precision pneumatic tension sensors.',
      application: 'High-density ballistic Kevlar, monofilament filtration webs, and aerospace 3D interlocks.',
      count: '8 Units Active',
    },
    {
      title: 'Stäubli Electronic Jacquard Systems (SX/LX Series)',
      specs: 'Up to 24,576 hooks with synchronized harness cords for complex double-cloth architectural acoustics.',
      application: 'Custom woven acoustic felt wall systems, contract jacquards, and bio-polymer satins.',
      count: '6 Units Active',
    },
    {
      title: 'Continuous Thermofixation & Impregnation Line',
      specs: '12-zone convective hot-air stenter frame with infrared pyrometer thermal calibration (±0.5°C).',
      application: 'Hydrophobic fluorocarbon coatings, anti-microbial treatments, and flame-retardant fixation.',
      count: '2 Continuous Lines',
    },
    {
      title: 'Robotic Pick-and-Pack Ultrasonic Slitting Bay',
      specs: 'Cold/ultrasonic sealed edges without fraying, laser length verification with automated tag printing.',
      application: 'Precision roll conversion for aerospace sub-contractors and luxury automotive kits.',
      count: '4 Automated Bays',
    },
  ];

  const labTesting = [
    {
      name: "Kundt's Tube Impedance Chamber (ISO 10534-2)",
      desc: 'Normal sound absorption coefficient measurement across 100 Hz to 6,400 Hz frequency bands.',
      metric: 'NRC 0.85 - 0.95',
    },
    {
      name: 'Instron 5985 High-Capacity Tensile Testing (100 kN)',
      desc: 'Elongation at break, biaxial tensile modulus, and tear resistance under cryogenic and elevated temps.',
      metric: 'Up to 5,000 MPa',
    },
    {
      name: 'Q-SUN Xenon Arc Accelerated Weathering (ISO 105-B02)',
      desc: 'Simulates outdoor full-spectrum solar radiation, moisture spray, and extreme thermal cycling.',
      metric: 'Grade 8 (No Fading)',
    },
    {
      name: 'Martindale Abrasion & Pilling Tester (ISO 12947)',
      desc: 'Multi-directional rub testing under 12 kPa load for heavy-duty commercial contract validation.',
      metric: '300,000+ Cycles',
    },
  ];

  return (
    <div className="pt-24 pb-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen">
      {/* Header */}
      <div className="border-b border-outline-variant pb-8 mb-12">
        <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1 mb-3 inline-block font-semibold">
          Industrial Capabilities & Lab Infrastructure
        </span>
        <h1 className="text-3xl md:text-5xl lg:text-6xl font-headline-md font-bold uppercase tracking-tight text-primary">
          Engineered at Molecular Tolerance
        </h1>
        <p className="text-body-lg text-secondary max-w-3xl mt-3">
          Our Swiss-engineered mills in Lyon and Stuttgart integrate state-of-the-art weaving automation with accredited acoustic, flammability, and tensile laboratories.
        </p>
      </div>

      {/* Machinery Specs Grid */}
      <section className="mb-20">
        <div className="flex items-center justify-between border-b border-outline-variant pb-4 mb-8">
          <div>
            <span className="text-xs font-mono uppercase text-secondary">Manufacturing Equipment</span>
            <h2 className="text-2xl font-bold font-headline-md text-primary uppercase">
              Advanced Loom Mill Infrastructure
            </h2>
          </div>
          <span className="text-xs font-mono text-secondary hidden sm:inline-block">
            ISO 9001:2015 Audited Facility
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {machinery.map((m, idx) => (
            <div key={idx} className="bg-surface border border-outline-variant p-8 flex flex-col justify-between hover:shadow-md transition-shadow">
              <div>
                <div className="flex justify-between items-start mb-3">
                  <span className="text-xs font-mono bg-surface-container-highest px-2 py-0.5 uppercase font-bold text-primary">
                    Station #{idx + 1}
                  </span>
                  <span className="text-xs font-mono text-tertiary-container bg-tertiary-fixed px-2 py-0.5 font-bold">
                    {m.count}
                  </span>
                </div>
                <h3 className="text-xl font-bold font-headline-md text-primary mb-2">
                  {m.title}
                </h3>
                <p className="text-xs font-mono text-secondary mb-4">
                  {m.specs}
                </p>
                <div className="bg-surface-container-low p-3 border border-outline-variant text-xs">
                  <strong className="text-primary font-mono block mb-1">Target Application:</strong>
                  <span className="text-secondary">{m.application}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quality & Lab Chambers */}
      <section className="mb-20 bg-surface-container-low border border-outline-variant p-8 md:p-12">
        <div className="max-w-2xl mb-8">
          <span className="text-xs font-mono uppercase bg-primary text-on-primary px-2.5 py-1">
            Testing Protocol
          </span>
          <h2 className="text-2xl md:text-4xl font-headline-md font-bold uppercase tracking-tight text-primary mt-3">
            In-House Accredited Testing Laboratories
          </h2>
          <p className="text-sm text-secondary mt-2">
            Every batch undergoes automated optical spectrometry, flame chamber test burning, and high-frequency acoustic calibration prior to quality dispatch clearance.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {labTesting.map((lab, i) => (
            <div key={i} className="bg-surface border border-outline-variant p-6 flex flex-col justify-between">
              <div>
                <span className="text-xs font-mono text-secondary block mb-1">LAB MODULE 0{i + 1}</span>
                <h4 className="font-bold text-base font-headline-md text-primary mb-2">{lab.name}</h4>
                <p className="text-xs text-secondary leading-relaxed mb-4">{lab.desc}</p>
              </div>
              <div className="pt-3 border-t border-outline-variant">
                <span className="text-[10px] font-mono uppercase text-secondary block">Accredited Rating</span>
                <span className="text-sm font-mono font-bold text-primary">{lab.metric}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Batch Capacity & Lead Time Calculator */}
      <section className="border border-outline-variant bg-surface p-8 md:p-12 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Calculator className="w-5 h-5 text-primary" />
                <span className="text-xs font-mono uppercase font-bold text-primary">Interactive Estimator</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-headline-md font-bold uppercase text-primary">
                B2B Loom Batch & Timeline Calculator
              </h3>
              <p className="text-xs text-secondary mt-2">
                Calculate estimated loom setup duration, delivery lead time, and environmental offset based on required volume.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-mono uppercase text-secondary mb-2">
                  Fiber Class & Construction
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'carbon', label: 'Carbon 3D' },
                    { id: 'wool', label: 'Acoustic Wool' },
                    { id: 'aramid', label: 'Aramid Kevlar' },
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setCalcFiber(f.id)}
                      className={`py-2 px-3 text-xs font-mono uppercase border transition-all ${
                        calcFiber === f.id
                          ? 'bg-primary text-on-primary border-primary font-bold'
                          : 'bg-surface-container border-outline-variant text-secondary hover:bg-surface'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center text-xs font-mono mb-2">
                  <span className="text-secondary uppercase">Production Volume</span>
                  <span className="font-bold text-primary">{calcMeters.toLocaleString()} Meters</span>
                </div>
                <input
                  type="range"
                  min="200"
                  max="25000"
                  step="200"
                  value={calcMeters}
                  onChange={(e) => setCalcMeters(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-[10px] font-mono text-secondary mt-1">
                  <span>200m (Pilot Batch)</span>
                  <span>10,000m (Contract)</span>
                  <span>25,000m (OEM Scale)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6 bg-surface-container-low border border-outline-variant p-6 md:p-8">
            <h4 className="text-xs font-mono uppercase text-secondary font-bold mb-4 pb-2 border-b border-outline-variant">
              Estimated Industrial Telemetry
            </h4>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-surface p-4 border border-outline-variant">
                <span className="text-[10px] font-mono uppercase text-secondary block">Loom Lead Time</span>
                <span className="text-2xl font-headline-md font-bold text-primary">{getEstimatedWeeks()} Weeks</span>
                <span className="text-[10px] font-mono text-secondary block">Incl. Lab Certification</span>
              </div>
              <div className="bg-surface p-4 border border-outline-variant">
                <span className="text-[10px] font-mono uppercase text-secondary block">CO₂ Offset Potential</span>
                <span className="text-2xl font-headline-md font-bold text-primary">{getEstCarbonOffset()} kg</span>
                <span className="text-[10px] font-mono text-secondary block">Solar Mill Energy Standard</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                to={`/schedule?type=bulk&requirements=Estimated+${calcMeters}m+of+${calcFiber}`}
                className="flex-1 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest py-3 px-4 text-center hover:bg-primary-container transition-colors"
              >
                Book Custom Loom Batch Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
