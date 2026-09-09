import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Layers, Calendar, ShieldCheck, Download, Check, Sparkles, Activity, FileText } from 'lucide-react';
import { fetchProductByIdentifier } from '../services/api';

export default function ProductDetailPage({ onAddSample }) {
  const { identifier } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState(null);
  const [copied, setCopied] = useState(false);
  const [pdfDownloaded, setPdfDownloaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    fetchProductByIdentifier(identifier)
      .then((data) => {
        setProduct(data);
        if (data && data.swatchColors && data.swatchColors.length > 0) {
          setSelectedColor(data.swatchColors[0].name);
        }
      })
      .finally(() => setLoading(false));
  }, [identifier]);

  if (loading) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-[1440px] mx-auto text-center font-mono">
        <p className="text-secondary animate-pulse">Loading technical datasheet for {identifier}...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="pt-28 pb-20 px-4 max-w-[1440px] mx-auto text-center">
        <h2 className="text-2xl font-bold font-headline-md">Product Not Found</h2>
        <Link to="/catalogue" className="mt-4 inline-block font-mono text-xs uppercase underline">
          &larr; Back to Catalogue
        </Link>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    setPdfDownloaded(true);
    setTimeout(() => setPdfDownloaded(false), 4000);
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs font-mono text-secondary mb-6 border-b border-outline-variant pb-4">
        <Link to="/catalogue" className="hover:text-primary flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" />
          Catalogue
        </Link>
        <span>/</span>
        <Link to={`/catalogue?category=${encodeURIComponent(product.category)}`} className="hover:text-primary">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-primary font-bold">{product.sku}</span>
      </div>

      {/* Main Spec Sheet Header */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
        {/* Left: Imagery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-[4/3] bg-surface-container border border-outline-variant relative overflow-hidden">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-surface/95 border border-outline-variant font-mono text-xs font-bold px-3 py-1 uppercase">
              SKU: {product.sku}
            </span>
            {product.inStock && (
              <span className="absolute top-4 right-4 bg-tertiary-fixed text-on-tertiary-fixed font-mono text-xs font-bold px-3 py-1 uppercase">
                Stock: {product.stockMeters}m Ready
              </span>
            )}
          </div>

          {/* Colorways */}
          {product.swatchColors && product.swatchColors.length > 0 && (
            <div className="p-4 bg-surface-container-low border border-outline-variant">
              <span className="text-xs font-mono uppercase text-secondary block mb-3 font-semibold">
                Available Swatch Colorways ({product.swatchColors.length})
              </span>
              <div className="flex flex-wrap gap-3">
                {product.swatchColors.map((color) => {
                  const isSelected = selectedColor === color.name;
                  return (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`flex items-center gap-2 px-3 py-1.5 border text-xs font-mono transition-all ${
                        isSelected
                          ? 'border-primary bg-surface font-bold shadow-xs'
                          : 'border-outline-variant bg-surface-container hover:bg-surface'
                      }`}
                    >
                      <span className="w-3.5 h-3.5 rounded-full border border-outline" style={{ backgroundColor: color.hex }} />
                      <span>{color.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Right: Technical Spec Header & Actions */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-surface-container-highest px-2.5 py-1 text-xs font-mono uppercase text-primary mb-3">
              <span>{product.category}</span>
              <span>·</span>
              <span>Lead Time: {product.leadTimeWeeks} Weeks</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-headline-md font-bold uppercase tracking-tight text-primary leading-tight">
              {product.name}
            </h1>

            <p className="text-body-lg text-secondary mt-4 leading-relaxed">
              {product.description}
            </p>

            {/* Key Metric Blocks */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-8 p-4 bg-surface-container-low border border-outline-variant">
              <div>
                <span className="text-[10px] font-mono uppercase text-secondary block">Tensile Strength</span>
                <span className="text-xl font-headline-md font-bold text-primary">{product.tensileStrengthMpa}</span>
                <span className="text-[10px] font-mono text-secondary block">MPa (ISO 13934)</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-secondary block">Weight / Mass</span>
                <span className="text-xl font-headline-md font-bold text-primary">{product.weightGsm}</span>
                <span className="text-[10px] font-mono text-secondary block">g/m² (ISO 3801)</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-secondary block">Martindale Rubs</span>
                <span className="text-xl font-headline-md font-bold text-primary">{(product.abrasionMartindale / 1000).toFixed(0)}k</span>
                <span className="text-[10px] font-mono text-secondary block">Cycles (Severe)</span>
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase text-secondary block">Unit B2B Price</span>
                <span className="text-xl font-headline-md font-bold text-primary">${product.pricePerMeter}</span>
                <span className="text-[10px] font-mono text-secondary block">USD / meter</span>
              </div>
            </div>

            {/* Flame Compliance */}
            <div className="flex items-center gap-3 p-3 bg-surface border border-outline-variant">
              <ShieldCheck className="w-5 h-5 text-primary shrink-0" />
              <div>
                <span className="text-[10px] font-mono uppercase text-secondary block">Flame & Heat Certification</span>
                <span className="text-xs font-mono font-bold text-primary">{product.flameCertification}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="space-y-3 pt-6 border-t border-outline-variant">
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  if (onAddSample) {
                    onAddSample({
                      ...product,
                      selectedColor: selectedColor || 'Standard'
                    });
                  }
                }}
                className="flex-1 bg-primary text-on-primary py-4 px-6 font-mono text-xs uppercase tracking-widest hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Layers className="w-4 h-4" />
                Request Swatch Binder (Free)
              </button>
              <Link
                to={`/schedule?sku=${product.sku}&type=fabric`}
                className="border border-primary text-primary py-4 px-6 font-mono text-xs uppercase tracking-widest hover:bg-surface-container transition-colors flex items-center justify-center gap-2 text-center"
              >
                <Calendar className="w-4 h-4" />
                Schedule Consultation
              </Link>
            </div>

            <button
              onClick={handleDownloadPdf}
              className="w-full bg-surface-container hover:bg-surface-container-high border border-outline-variant py-2.5 px-4 font-mono text-xs uppercase text-primary flex items-center justify-center gap-2 transition-colors"
            >
              {pdfDownloaded ? (
                <>
                  <Check className="w-4 h-4 text-tertiary-container" />
                  Datasheet Download Initiated
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Full Technical Specification PDF (EN/ISO Certified)
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* In-Depth Technical Specification Table */}
      <div className="border border-outline-variant bg-surface mb-16">
        <div className="bg-surface-container-low p-4 border-b border-outline-variant flex justify-between items-center">
          <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-primary">
            Laboratory Analysis & Dimensional Tolerances
          </h3>
          <span className="text-xs font-mono text-secondary">Ref: LAB-SPEC-{product.sku}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-outline-variant text-xs font-mono">
          <div className="p-6 space-y-4">
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Fiber Composition</span>
              <span className="font-bold text-primary text-right max-w-xs">{product.composition}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Weave Architecture</span>
              <span className="font-bold text-primary">{product.technicalSpecs?.weavePattern || '2x2 Twill High Density'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Yarn Count Specification</span>
              <span className="font-bold text-primary">{product.technicalSpecs?.yarnCount || 'Nm 28/2 Worsted'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Usable Width</span>
              <span className="font-bold text-primary">{product.widthCm} cm (± 1.5cm)</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-secondary uppercase">Standard Roll Length</span>
              <span className="font-bold text-primary">{product.rollLengthM} meters</span>
            </div>
          </div>

          <div className="p-6 space-y-4">
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Air Permeability</span>
              <span className="font-bold text-primary">{product.technicalSpecs?.airPermeability || '32.5 L/m²/s'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Thermal Conductivity (k)</span>
              <span className="font-bold text-primary">{product.technicalSpecs?.thermalConductivity || '0.045 W/m·K'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Sound Absorption (NRC)</span>
              <span className="font-bold text-primary">{product.technicalSpecs?.acousticNrc || '0.85 (Class A)'}</span>
            </div>
            <div className="flex justify-between py-1 border-b border-surface-container">
              <span className="text-secondary uppercase">Minimum Order Quantity (MOQ)</span>
              <span className="font-bold text-primary">{product.moqMeters} meters</span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-secondary uppercase">Audited Standards</span>
              <span className="font-bold text-primary">{product.certifications?.join(', ') || 'ISO 9001, OEKO-TEX'}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
