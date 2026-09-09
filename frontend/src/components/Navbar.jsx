import React, { useState } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { Search, Layers, Menu, X, Calendar, Activity } from 'lucide-react';
import TexoraLogo from './TexoraLogo';

export default function Navbar({ onOpenSearch, onOpenSamples, sampleCount = 0 }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Catalogue', path: '/catalogue' },
    { name: 'Capabilities', path: '/capabilities' },
    { name: 'Tracking', path: '/tracking' },
    { name: 'Portal', path: '/portal' },
  ];

  return (
    <header className="bg-surface/90 backdrop-blur-md fixed top-0 w-full z-40 border-b border-outline-variant transition-all duration-300">
      <div className="flex justify-between items-center px-4 md:px-margin-desktop h-20 w-full max-w-[1440px] mx-auto">
        {/* Brand Logo */}
        <TexoraLogo />

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8 text-label-sm font-label-sm uppercase tracking-wider">
          {navLinks.map((link) => {
            const isActive = location.pathname.startsWith(link.path);
            return (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `transition-all py-2 px-1 relative ${
                    isActive
                      ? 'text-primary font-bold border-b-2 border-primary'
                      : 'text-secondary hover:text-primary hover:bg-secondary-container/10'
                  }`
                }
              >
                {link.name}
              </NavLink>
            );
          })}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-3 md:gap-4">
          {/* Search Trigger */}
          <button
            onClick={onOpenSearch}
            aria-label="Search Catalog"
            className="p-2 text-primary hover:bg-surface-container rounded-sm transition-colors"
            title="Search textiles or track orders"
          >
            <Search className="w-5 h-5" />
          </button>

          {/* Sample Swatch Cart Trigger */}
          <button
            onClick={onOpenSamples}
            aria-label="Sample Swatches"
            className="p-2 text-primary hover:bg-surface-container rounded-sm transition-colors relative"
            title="View Sample Swatch Drawer"
          >
            <Layers className="w-5 h-5" />
            {sampleCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-on-primary text-[10px] font-mono font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {sampleCount}
              </span>
            )}
          </button>

          {/* Primary Action Button */}
          <Link
            to="/schedule"
            className="hidden md:inline-flex items-center gap-2 bg-primary text-on-primary font-mono text-xs uppercase tracking-widest px-5 py-3 hover:bg-primary-container transition-colors shadow-xs active:scale-95"
          >
            <Calendar className="w-4 h-4" />
            Schedule Meeting
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-primary hover:bg-surface-container"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-surface border-b border-outline-variant px-6 py-6 animate-fadeIn">
          <nav className="flex flex-col gap-4 text-sm font-mono uppercase tracking-wider">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `py-2 border-b border-surface-container ${
                    isActive ? 'text-primary font-bold pl-2 border-l-4 border-l-primary' : 'text-secondary'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <Link
              to="/schedule"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-4 bg-primary text-on-primary text-center py-3 text-xs uppercase font-mono tracking-widest"
            >
              Schedule Consultation
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
