import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, Shield, Zap, RefreshCw, Compass, Search, ChevronRight, Layers, FileCheck, Truck, Check } from 'lucide-react';
import { fetchProducts, fetchDashboardStats } from '../services/api';

export default function HomePage({ onAddSample }) {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [stats, setStats] = useState(null);
  const [trackingInput, setTrackingInput] = useState('');
  const [lookbookEmail, setLookbookEmail] = useState('');
  const [lookbookSuccess, setLookbookSuccess] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts().then((data) => {
      setFeaturedProducts(data.slice(0, 4));
    });
    fetchDashboardStats().then((data) => {
      setStats(data);
    });
  }, []);

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (trackingInput.trim()) {
      navigate(`/tracking?order=${encodeURIComponent(trackingInput.trim().toUpperCase())}`);
    }
  };

  const handleLookbookSubmit = (e) => {
    e.preventDefault();
    if (lookbookEmail) {
      setLookbookSuccess(true);
      setTimeout(() => setLookbookSuccess(false), 5000);
      setLookbookEmail('');
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="min-h-[85vh] flex flex-col md:flex-row items-stretch border-b border-outline-variant bg-surface">
        {/* Left Hero Content */}
        <div className="w-full md:w-5/12 p-6 md:p-margin-desktop flex flex-col justify-center border-r border-outline-variant">
          <div className="mb-6 inline-flex items-center gap-2 bg-surface-container border border-outline-variant px-3 py-1 w-fit">
            <span className="w-2 h-2 rounded-full bg-tertiary-fixed-dim animate-ping"></span>
            <span className="text-xs font-mono uppercase tracking-wider text-secondary">
              Swiss Precision Weaving · ISO 9001
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-extrabold text-primary tracking-tight leading-[1.05] mb-6">
            Textiles<br />
            Made for<br />
            Modern<br />
            Living
          </h1>

          <p className="text-body-lg text-secondary mb-8 max-w-md">
            Architectural acoustic felts, aerospace carbon composites, and bio-fermented silks manufactured for demanding global contract specifications.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/catalogue"
              className="bg-primary text-on-primary font-mono text-xs uppercase tracking-widest px-8 py-4 text-center hover:bg-primary-container transition-all flex items-center justify-center gap-2 group"
            >
              Explore Catalogue
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/schedule"
              className="border border-primary text-primary font-mono text-xs uppercase tracking-widest px-8 py-4 text-center hover:bg-surface-container transition-colors"
            >
              Consult an Engineer
            </Link>
          </div>

          {/* Quick Order Lookup in Hero */}
          <form onSubmit={handleTrackSubmit} className="mt-10 pt-6 border-t border-outline-variant">
            <span className="text-xs font-mono uppercase text-secondary block mb-2">
              Track Active Loom Batch or Shipment
            </span>
            <div className="flex items-center">
              <input
                type="text"
                value={trackingInput}
                onChange={(e) => setTrackingInput(e.target.value)}
                placeholder="Enter Order # (e.g. TX-902-84A)"
                className="bg-surface-container-low border border-outline-variant px-3 py-2 text-xs font-mono w-full focus:outline-none focus:border-primary uppercase"
              />
              <button
                type="submit"
                className="bg-primary text-on-primary px-4 py-2 font-mono text-xs uppercase hover:bg-primary-container shrink-0"
              >
                Track
              </button>
            </div>
          </form>
        </div>

        {/* Right Hero Visual with Featured High-Tensile Textile */}
        <div className="w-full md:w-7/12 relative bg-surface-container-low min-h-[400px] overflow-hidden flex flex-col justify-end p-8 md:p-12">
          <img
            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1600&auto=format&fit=crop"
            alt="High tensile architectural fabric"
            className="absolute inset-0 w-full h-full object-cover grayscale contrast-125 opacity-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>

          {/* Floating Spec Card */}
          <div className="relative z-10 bg-surface/95 backdrop-blur-md border border-outline-variant p-6 max-w-md shadow-2xl">
            <div className="flex justify-between items-start mb-2">
              <div>
                <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5">
                  Featured Specimen
                </span>
                <h3 className="text-lg font-bold font-headline-md text-primary mt-1">
                  AeroCarbon 3D Interlock
                </h3>
              </div>
              <span className="font-mono text-xs text-secondary font-bold">SKU: TX-902-AER</span>
            </div>
            <p className="text-xs text-secondary mb-4 line-clamp-2">
              Toray T800 Carbon Matrix triaxial weave for aerospace skins and lightweight industrial structures.
            </p>
            <div className="grid grid-cols-3 gap-2 border-t border-outline-variant pt-3 text-xs font-mono">
              <div>
                <span className="text-secondary text-[10px] block uppercase">Tensile</span>
                <span className="font-bold text-primary">3,450 MPa</span>
              </div>
              <div>
                <span className="text-secondary text-[10px] block uppercase">Weight</span>
                <span className="font-bold text-primary">420 g/m²</span>
              </div>
              <div>
                <span className="text-secondary text-[10px] block uppercase">Flame</span>
                <span className="font-bold text-primary">FAR 25.853</span>
              </div>
            </div>
            <Link
              to="/catalogue/TX-902-AER"
              className="mt-4 inline-flex items-center text-xs font-mono uppercase tracking-wider text-primary font-bold hover:underline gap-1"
            >
              View Full Technical Datasheet &rarr;
            </Link>
          </div>
        </div>
      </section>

      {/* Industrial Key Metrics Bar */}
      <section className="border-b border-outline-variant bg-surface-container-low py-8 px-4 md:px-margin-desktop">
        <div className="max-w-[1440px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
          <div className="border-r-0 md:border-r border-outline-variant pr-4">
            <span className="text-xs font-mono uppercase text-secondary">Tensile Strength Range</span>
            <p className="text-3xl md:text-4xl font-headline-md font-bold text-primary mt-1">820 - 3,450</p>
            <span className="text-xs font-mono text-secondary">Megapascals (MPa)</span>
          </div>
          <div className="border-r-0 md:border-r border-outline-variant pr-4">
            <span className="text-xs font-mono uppercase text-secondary">Active Loom Capacity</span>
            <p className="text-3xl md:text-4xl font-headline-md font-bold text-primary mt-1">94.6%</p>
            <span className="text-xs font-mono text-secondary">18 Dornier & Jacquard Looms</span>
          </div>
          <div className="border-r-0 md:border-r border-outline-variant pr-4">
            <span className="text-xs font-mono uppercase text-secondary">Global Compliance</span>
            <p className="text-3xl md:text-4xl font-headline-md font-bold text-primary mt-1">ISO / ASTM</p>
            <span className="text-xs font-mono text-secondary">Aero, Rail & Medical Tier 1</span>
          </div>
          <div>
            <span className="text-xs font-mono uppercase text-secondary">Sample Dispatch</span>
            <p className="text-3xl md:text-4xl font-headline-md font-bold text-primary mt-1">&lt; 48 Hrs</p>
            <span className="text-xs font-mono text-secondary">Worldwide Courier Binders</span>
          </div>
        </div>
      </section>

      {/* Featured Catalogue Showcase */}
      <section className="py-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-outline-variant pb-6 gap-4">
          <div>
            <span className="text-xs font-mono uppercase bg-surface-container-highest text-primary px-2.5 py-1">
              Curated Specifications
            </span>
            <h2 className="text-3xl md:text-5xl font-headline-md font-bold uppercase tracking-tight text-primary mt-2">
              High-Performance Weaves
            </h2>
          </div>
          <Link
            to="/catalogue"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary hover:underline"
          >
            Explore Complete Registry (6 Specifications)
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <div
              key={product._id || product.sku}
              className="bg-surface border border-outline-variant flex flex-col justify-between hover:shadow-lg transition-all group"
            >
              <div>
                <div className="relative aspect-[4/3] overflow-hidden bg-surface-container border-b border-outline-variant">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-xs font-mono text-[11px] px-2 py-0.5 uppercase border border-outline-variant">
                    {product.sku}
                  </span>
                </div>

                <div className="p-5">
                  <span className="text-[11px] font-mono text-secondary uppercase block mb-1">
                    {product.category}
                  </span>
                  <h3 className="font-bold text-lg font-headline-md text-primary leading-snug group-hover:underline">
                    <Link to={`/catalogue/${product.sku}`}>{product.name}</Link>
                  </h3>
                  <p className="text-xs text-secondary mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="mt-4 pt-3 border-t border-outline-variant grid grid-cols-2 gap-2 text-xs font-mono">
                    <div>
                      <span className="text-secondary text-[10px] block">WEIGHT</span>
                      <span className="font-bold text-primary">{product.weightGsm} g/m²</span>
                    </div>
                    <div>
                      <span className="text-secondary text-[10px] block">MARTINDALE</span>
                      <span className="font-bold text-primary">{product.abrasionMartindale.toLocaleString()} rubs</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 flex gap-2">
                <button
                  onClick={() => onAddSample && onAddSample(product)}
                  className="flex-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase py-2.5 px-3 border border-outline-variant transition-colors flex items-center justify-center gap-1.5"
                >
                  <Layers className="w-3.5 h-3.5" />
                  Request Sample
                </button>
                <Link
                  to={`/catalogue/${product.sku}`}
                  className="bg-primary hover:bg-primary-container text-on-primary font-mono text-xs uppercase p-2.5 flex items-center justify-center transition-colors"
                  title="View Datasheet"
                >
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Industrial Capabilities Banner */}
      <section className="bg-primary text-on-primary py-20 px-4 md:px-margin-desktop">
        <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 space-y-6">
            <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2.5 py-1">
              Industrial Engineering
            </span>
            <h2 className="text-3xl md:text-5xl font-headline-md font-bold uppercase tracking-tight">
              Swiss Craftsmanship Meets Scaled Production
            </h2>
            <p className="text-body-md text-surface-container-high leading-relaxed">
              Operating high-speed Dornier air-jet looms, precision jacquard multi-ply matrix systems, and specialized acoustic testing impedance tubes capable of custom weave formulation.
            </p>
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-on-primary-fixed-variant">
              <div>
                <h4 className="text-xl font-bold font-mono">1.2M Meters / Yr</h4>
                <p className="text-xs font-mono text-surface-container-high mt-1">Composite & Technical Output</p>
              </div>
              <div>
                <h4 className="text-xl font-bold font-mono">0.02% Tolerance</h4>
                <p className="text-xs font-mono text-surface-container-high mt-1">Laser Pick Count Control</p>
              </div>
            </div>
            <div className="pt-4">
              <Link
                to="/capabilities"
                className="inline-flex items-center gap-2 bg-surface text-primary px-6 py-3 font-mono text-xs uppercase tracking-widest hover:bg-surface-container transition-colors"
              >
                Inspect Mill Machinery & Lab Setup
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div className="md:col-span-6 grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?q=80&w=800&auto=format&fit=crop"
              alt="Industrial Loom"
              className="w-full h-48 md:h-64 object-cover border border-on-primary-fixed-variant"
            />
            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop"
              alt="Acoustic felt chamber"
              className="w-full h-48 md:h-64 object-cover border border-on-primary-fixed-variant mt-6"
            />
          </div>
        </div>
      </section>

      {/* Lookbook & Technical Spec Download Section */}
      <section className="py-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full border-b border-outline-variant">
        <div className="bg-surface-container border border-outline-variant p-8 md:p-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-7">
            <span className="text-xs font-mono uppercase bg-primary text-on-primary px-2 py-0.5">
              Technical Lookbook 2025/2026
            </span>
            <h3 className="text-2xl md:text-4xl font-headline-md font-bold uppercase tracking-tight text-primary mt-3">
              Download Full Material Specification Compendium
            </h3>
            <p className="text-body-md text-secondary mt-2 max-w-xl">
              Includes comprehensive Martindale rub ratings, EN/ASTM flame certificates, air permeability graphs, and loom batch lead time indices.
            </p>
          </div>

          <div className="md:col-span-5">
            {lookbookSuccess ? (
              <div className="bg-surface p-4 border border-outline-variant text-center flex items-center justify-center gap-2 text-primary font-mono text-xs">
                <Check className="w-4 h-4 text-tertiary-container" />
                <span>Compendium PDF dispatched to your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleLookbookSubmit} className="flex flex-col gap-2">
                <div className="flex">
                  <input
                    type="email"
                    required
                    value={lookbookEmail}
                    onChange={(e) => setLookbookEmail(e.target.value)}
                    placeholder="Enter architectural/work email..."
                    className="w-full bg-surface border border-outline-variant p-3 text-xs font-mono focus:border-primary focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-primary text-on-primary px-6 font-mono text-xs uppercase tracking-wider hover:bg-primary-container shrink-0"
                  >
                    Request PDF
                  </button>
                </div>
                <span className="text-[11px] font-mono text-secondary">
                  Free instant download for architects, specifiers, and procurement teams.
                </span>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
