import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SearchModal from './components/SearchModal';
import SampleDrawer from './components/SampleDrawer';

// Pages
import HomePage from './pages/HomePage';
import CataloguePage from './pages/CataloguePage';
import ProductDetailPage from './pages/ProductDetailPage';
import CapabilitiesPage from './pages/CapabilitiesPage';
import TrackingPage from './pages/TrackingPage';
import SchedulePage from './pages/SchedulePage';
import PortalPage from './pages/PortalPage';

export default function App() {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSampleDrawerOpen, setIsSampleDrawerOpen] = useState(false);
  const [sampleCart, setSampleCart] = useState([]);

  const handleAddSample = (product) => {
    setSampleCart((prev) => {
      const exists = prev.some((item) => item.sku === product.sku);
      if (exists) return prev;
      return [...prev, product];
    });
    setIsSampleDrawerOpen(true);
  };

  const handleRemoveSample = (sku) => {
    setSampleCart((prev) => prev.filter((item) => item.sku !== sku));
  };

  const handleClearCart = () => {
    setSampleCart([]);
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-background text-on-background selection:bg-tertiary-fixed selection:text-on-tertiary-fixed">
        {/* Navigation Bar */}
        <Navbar
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenSamples={() => setIsSampleDrawerOpen(true)}
          sampleCount={sampleCart.length}
        />

        {/* Global Modals & Drawers */}
        <SearchModal
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
        />

        <SampleDrawer
          isOpen={isSampleDrawerOpen}
          onClose={() => setIsSampleDrawerOpen(false)}
          sampleCart={sampleCart}
          onRemoveSample={handleRemoveSample}
          onClearCart={handleClearCart}
        />

        {/* Route Canvas */}
        <div className="flex-1 flex flex-col">
          <Routes>
            <Route path="/" element={<HomePage onAddSample={handleAddSample} />} />
            <Route path="/catalogue" element={<CataloguePage onAddSample={handleAddSample} />} />
            <Route path="/catalogue/:identifier" element={<ProductDetailPage onAddSample={handleAddSample} />} />
            <Route path="/capabilities" element={<CapabilitiesPage />} />
            <Route path="/tracking" element={<TrackingPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/portal" element={<PortalPage />} />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
