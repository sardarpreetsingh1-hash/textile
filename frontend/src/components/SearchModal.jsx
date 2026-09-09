import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Package, FileText } from 'lucide-react';
import { fetchProducts } from '../services/api';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isOpen) {
      setQuery('');
      setResults([]);
      return;
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const data = await fetchProducts({ search: query });
        setResults(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }, 200);

    return () => clearTimeout(timer);
  }, [query]);

  if (!isOpen) return null;

  const handleTrackSubmit = (e) => {
    e.preventDefault();
    if (query.trim().toUpperCase().startsWith('TX-')) {
      navigate(`/tracking?order=${encodeURIComponent(query.trim().toUpperCase())}`);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-primary/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-surface border border-outline-variant w-full max-w-2xl shadow-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-secondary hover:text-primary transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        <form onSubmit={handleTrackSubmit} className="relative mb-6">
          <div className="flex items-center border-b-2 border-primary pb-2">
            <Search className="w-5 h-5 text-secondary mr-3" />
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search fabrics by SKU, fiber, spec (e.g. TX-902, Aramid, EN 45545)..."
              className="w-full bg-transparent text-lg font-body-md text-primary focus:outline-none placeholder:text-outline-variant"
            />
          </div>
          {query.trim().toUpperCase().startsWith('TX-') && (
            <p className="text-xs font-mono text-secondary mt-2 flex items-center gap-1">
              <span>Press ENTER to track Order / SKU:</span>
              <strong className="text-primary">{query.toUpperCase()}</strong>
            </p>
          )}
        </form>

        <div className="max-h-96 overflow-y-auto divide-y divide-surface-container">
          {loading && (
            <p className="text-sm font-mono text-secondary py-4 text-center">Searching registry...</p>
          )}

          {!loading && results.length === 0 && query.trim() && (
            <div className="text-center py-8">
              <p className="text-secondary text-sm">No textiles found matching "{query}"</p>
              <button
                onClick={() => {
                  navigate(`/tracking?order=${encodeURIComponent(query.trim().toUpperCase())}`);
                  onClose();
                }}
                className="mt-3 text-xs font-mono uppercase underline text-primary"
              >
                Search as Shipment Order #{query.toUpperCase()} &rarr;
              </button>
            </div>
          )}

          {results.map((product) => (
            <div
              key={product._id || product.sku}
              onClick={() => {
                navigate(`/catalogue/${product.sku}`);
                onClose();
              }}
              className="py-3 px-2 flex items-center justify-between hover:bg-surface-container cursor-pointer transition-colors group"
            >
              <div className="flex items-center gap-4">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-12 h-12 object-cover border border-outline-variant"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono uppercase bg-surface-container-highest px-1.5 py-0.5 text-primary">
                      {product.sku}
                    </span>
                    <span className="text-xs font-mono text-secondary">{product.category}</span>
                  </div>
                  <h4 className="font-semibold text-primary group-hover:underline text-sm mt-0.5">
                    {product.name}
                  </h4>
                </div>
              </div>
              <ArrowRight className="w-4 h-4 text-secondary group-hover:text-primary transition-transform group-hover:translate-x-1" />
            </div>
          ))}
        </div>

        <div className="mt-4 pt-4 border-t border-outline-variant flex justify-between items-center text-xs font-mono text-secondary">
          <span>Quick queries: <button onClick={() => setQuery('Carbon')} className="underline hover:text-primary">Carbon</button>, <button onClick={() => setQuery('Wool')} className="underline hover:text-primary">Wool</button>, <button onClick={() => setQuery('TX-902-84A')} className="underline hover:text-primary">TX-902-84A</button></span>
          <span>ESC to close</span>
        </div>
      </div>
    </div>
  );
}
