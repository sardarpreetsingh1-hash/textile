import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Layers, ArrowRight, Check, SlidersHorizontal, Download } from 'lucide-react';
import { fetchProducts } from '../services/api';

export default function CataloguePage({ onAddSample }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'All');
  const [selectedFlameCert, setSelectedFlameCert] = useState('All');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortBy, setSortBy] = useState('featured');
  const [selectedColors, setSelectedColors] = useState({});

  const categories = [
    'All',
    'Aerospace Composites',
    'Architectural Acoustic',
    'Protective & Ballistic',
    'Bio-Synthetic Performance',
    'Industrial Technical',
  ];

  const flameCerts = [
    'All',
    'FAR 25.853 (Aviation)',
    'EN 13501-1 Class B (Acoustic)',
    'NFPA 1971 (Ballistic & Heat)',
    'BS 5852 Crib 5 (Contract)',
    'UL 94 V-0 (Industrial)',
  ];

  useEffect(() => {
    const cat = searchParams.get('category');
    if (cat) setSelectedCategory(cat);
  }, [searchParams]);

  useEffect(() => {
    loadProducts();
  }, [selectedCategory, searchQuery, selectedFlameCert, inStockOnly]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const data = await fetchProducts({
        category: selectedCategory !== 'All' ? selectedCategory : undefined,
        search: searchQuery || undefined,
        flameCert: selectedFlameCert !== 'All' ? selectedFlameCert.split(' ')[0] : undefined,
        inStock: inStockOnly ? 'true' : undefined,
      });
      setProducts(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === 'tensile-desc') return b.tensileStrengthMpa - a.tensileStrengthMpa;
    if (sortBy === 'weight-asc') return a.weightGsm - b.weightGsm;
    if (sortBy === 'price-asc') return a.pricePerMeter - b.pricePerMeter;
    if (sortBy === 'martindale-desc') return b.abrasionMartindale - a.abrasionMartindale;
    return b.isFeatured ? 1 : -1;
  });

  const handleColorSelect = (sku, colorName) => {
    setSelectedColors((prev) => ({ ...prev, [sku]: colorName }));
  };

  return (
    <div className="pt-24 pb-20 px-4 md:px-margin-desktop max-w-[1440px] mx-auto w-full min-h-screen">
      {/* Page Header */}
      <div className="border-b border-outline-variant pb-8 mb-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono uppercase bg-tertiary-fixed text-on-tertiary-fixed px-2 py-0.5">
                Technical Registry
              </span>
              <span className="text-xs font-mono text-secondary">· Verified Lab Specifications</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-headline-md font-bold text-primary uppercase tracking-tight">
              B2B Textile Catalogue
            </h1>
            <p className="text-body-md text-secondary max-w-2xl mt-2">
              High-tensile composite weaves, acoustic felt panels, and ballistic fibers for commercial architectural and industrial applications.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-secondary">
              Showing <strong className="text-primary">{sortedProducts.length}</strong> specifications
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid: Filters Sidebar + Products */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Sidebar Filters */}
        <aside className="lg:col-span-3 space-y-8 bg-surface-container-low border border-outline-variant p-6 h-fit">
          <div className="flex items-center justify-between pb-3 border-b border-outline-variant">
            <h3 className="font-mono text-xs uppercase tracking-wider font-bold text-primary flex items-center gap-2">
              <SlidersHorizontal className="w-4 h-4" />
              Filter Parameters
            </h3>
            {(selectedCategory !== 'All' || selectedFlameCert !== 'All' || searchQuery || inStockOnly) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedFlameCert('All');
                  setSearchQuery('');
                  setInStockOnly(false);
                }}
                className="text-[11px] font-mono text-error hover:underline"
              >
                Reset
              </button>
            )}
          </div>

          {/* Search Box */}
          <div>
            <label className="block text-xs font-mono uppercase text-secondary mb-2">
              Search SKU / Fiber
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="e.g. Carbon, Kevlar, Wool..."
                className="w-full bg-surface border border-outline-variant p-2 text-xs font-body-md focus:outline-none focus:border-primary pr-8"
              />
              <Search className="w-4 h-4 text-secondary absolute right-2.5 top-2.5" />
            </div>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-xs font-mono uppercase text-secondary mb-2">
              Application Sector
            </label>
            <div className="space-y-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs font-mono transition-colors flex items-center justify-between ${
                    selectedCategory === cat
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-secondary hover:bg-surface-container hover:text-primary'
                  }`}
                >
                  <span>{cat}</span>
                  {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                </button>
              ))}
            </div>
          </div>

          {/* Flame Certifications */}
          <div>
            <label className="block text-xs font-mono uppercase text-secondary mb-2">
              Flame Standard / Test
            </label>
            <div className="space-y-1">
              {flameCerts.map((cert) => (
                <button
                  key={cert}
                  onClick={() => setSelectedFlameCert(cert)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs font-mono transition-colors flex items-center justify-between ${
                    selectedFlameCert === cert
                      ? 'bg-primary text-on-primary font-bold'
                      : 'text-secondary hover:bg-surface-container hover:text-primary'
                  }`}
                >
                  <span className="truncate">{cert}</span>
                  {selectedFlameCert === cert && <Check className="w-3.5 h-3.5 shrink-0" />}
                </button>
              ))}
            </div>
          </div>

          {/* In Stock Toggle */}
          <div className="pt-4 border-t border-outline-variant">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-mono text-primary">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="rounded-none border-outline-variant text-primary focus:ring-0"
              />
              <span>In-Stock Ready for Dispatch</span>
            </label>
          </div>
        </aside>

        {/* Product Cards Listing */}
        <main className="lg:col-span-9">
          {/* Sort bar */}
          <div className="bg-surface-container-low border border-outline-variant p-4 mb-6 flex flex-col sm:flex-row justify-between items-center gap-4">
            <span className="text-xs font-mono text-secondary">
              Ordered by: <strong className="text-primary uppercase">{sortBy}</strong>
            </span>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-secondary uppercase">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-surface border border-outline-variant text-xs font-mono p-1.5 focus:outline-none focus:border-primary"
              >
                <option value="featured">Featured Curations</option>
                <option value="tensile-desc">Tensile Strength (Highest)</option>
                <option value="martindale-desc">Abrasion Martindale (Highest)</option>
                <option value="weight-asc">Weight GSM (Lightest first)</option>
                <option value="price-asc">Price (Lowest first)</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((n) => (
                <div key={n} className="bg-surface border border-outline-variant p-4 h-96 animate-pulse">
                  <div className="bg-surface-container h-48 w-full mb-4"></div>
                  <div className="bg-surface-container h-4 w-1/3 mb-2"></div>
                  <div className="bg-surface-container h-6 w-3/4 mb-4"></div>
                  <div className="bg-surface-container h-12 w-full"></div>
                </div>
              ))}
            </div>
          ) : sortedProducts.length === 0 ? (
            <div className="bg-surface-container border border-outline-variant p-12 text-center">
              <p className="text-primary font-headline-md text-xl font-bold">No textile specifications match criteria.</p>
              <p className="text-secondary text-sm mt-1">Try resetting the category filter or searching a different term.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedProducts.map((product) => (
                <div
                  key={product._id || product.sku}
                  className="bg-surface border border-outline-variant flex flex-col justify-between hover:shadow-xl transition-all group"
                >
                  <div>
                    {/* Visual */}
                    <div className="relative aspect-[4/3] overflow-hidden bg-surface-container border-b border-outline-variant">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <span className="absolute top-3 left-3 bg-surface/90 backdrop-blur-xs font-mono text-[11px] px-2 py-0.5 uppercase border border-outline-variant font-bold text-primary">
                        {product.sku}
                      </span>
                      {product.inStock && (
                        <span className="absolute top-3 right-3 bg-tertiary-fixed text-on-tertiary-fixed font-mono text-[10px] px-2 py-0.5 uppercase font-bold">
                          In Stock ({product.stockMeters}m)
                        </span>
                      )}
                    </div>

                    <div className="p-5">
                      <span className="text-[11px] font-mono text-secondary uppercase block mb-1">
                        {product.category}
                      </span>
                      <h3 className="font-bold text-base font-headline-md text-primary leading-snug group-hover:underline">
                        <Link to={`/catalogue/${product.sku}`}>{product.name}</Link>
                      </h3>
                      <p className="text-xs text-secondary mt-2 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Swatch Color Pills */}
                      {product.swatchColors && product.swatchColors.length > 0 && (
                        <div className="mt-3 flex items-center gap-1.5">
                          <span className="text-[10px] font-mono text-secondary mr-1">Shades:</span>
                          {product.swatchColors.map((color) => {
                            const isSelected = selectedColors[product.sku] === color.name;
                            return (
                              <button
                                key={color.name}
                                onClick={() => handleColorSelect(product.sku, color.name)}
                                title={color.name}
                                className={`w-4 h-4 rounded-full border ${
                                  isSelected ? 'ring-2 ring-primary ring-offset-1' : 'border-outline-variant'
                                }`}
                                style={{ backgroundColor: color.hex }}
                              />
                            );
                          })}
                        </div>
                      )}

                      {/* Technical Spec Matrix */}
                      <div className="mt-4 pt-3 border-t border-outline-variant grid grid-cols-2 gap-2 text-xs font-mono">
                        <div>
                          <span className="text-secondary text-[10px] block">TENSILE RATING</span>
                          <span className="font-bold text-primary">{product.tensileStrengthMpa} MPa</span>
                        </div>
                        <div>
                          <span className="text-secondary text-[10px] block">WEIGHT GSM</span>
                          <span className="font-bold text-primary">{product.weightGsm} g/m²</span>
                        </div>
                        <div>
                          <span className="text-secondary text-[10px] block">FLAME STANDARD</span>
                          <span className="font-bold text-primary truncate block text-[11px]">
                            {product.flameCertification.split(' ')[0]}
                          </span>
                        </div>
                        <div>
                          <span className="text-secondary text-[10px] block">PRICE / METER</span>
                          <span className="font-bold text-primary">${product.pricePerMeter.toFixed(2)} USD</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Card Actions */}
                  <div className="p-5 pt-0 flex gap-2">
                    <button
                      onClick={() =>
                        onAddSample &&
                        onAddSample({
                          ...product,
                          selectedColor: selectedColors[product.sku] || (product.swatchColors?.[0]?.name || 'Standard'),
                        })
                      }
                      className="flex-1 bg-surface-container hover:bg-surface-container-high text-primary font-mono text-xs uppercase py-2.5 px-3 border border-outline-variant transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Add Swatch
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
          )}
        </main>
      </div>
    </div>
  );
}
