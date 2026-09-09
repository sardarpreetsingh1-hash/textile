import React from 'react';
import { Link } from 'react-router-dom';
import TexoraLogo from './TexoraLogo';
import { ShieldCheck, Activity, Globe, Compass } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-surface-container-low border-t border-outline-variant mt-auto text-primary">
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-margin-desktop py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-outline-variant">
          {/* Brand Col */}
          <div className="md:col-span-4 flex flex-col gap-4">
            <TexoraLogo subtitle="B2B Technical Loom Mill Division" />
            <p className="text-body-md text-secondary max-w-sm mt-2">
              Swiss-engineered technical textiles, aerospace composites, ballistic aramid weaves, and architectural acoustic installations.
            </p>
            <div className="flex items-center gap-2 mt-4 text-xs font-mono text-tertiary-container bg-tertiary-fixed w-fit px-3 py-1">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>18 Loom Mills Online (Capacity: 94.6%)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase text-secondary tracking-widest font-semibold">
              Textile Index
            </span>
            <ul className="space-y-2 text-sm">
              <li><Link to="/catalogue?category=Aerospace%20Composites" className="hover:underline text-secondary hover:text-primary">Aerospace Composites</Link></li>
              <li><Link to="/catalogue?category=Architectural%20Acoustic" className="hover:underline text-secondary hover:text-primary">Architectural Acoustic</Link></li>
              <li><Link to="/catalogue?category=Protective%20%26%20Ballistic" className="hover:underline text-secondary hover:text-primary">Protective & Ballistic</Link></li>
              <li><Link to="/catalogue?category=Bio-Synthetic%20Performance" className="hover:underline text-secondary hover:text-primary">Bio-Synthetics</Link></li>
              <li><Link to="/catalogue" className="hover:underline font-semibold text-primary">View Full Catalogue &rarr;</Link></li>
            </ul>
          </div>

          {/* Infrastructure */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase text-secondary tracking-widest font-semibold">
              B2B Services
            </span>
            <ul className="space-y-2 text-sm">
              <li><Link to="/tracking" className="hover:underline text-secondary hover:text-primary">Live Shipment Tracking</Link></li>
              <li><Link to="/capabilities" className="hover:underline text-secondary hover:text-primary">Industrial Capabilities</Link></li>
              <li><Link to="/schedule" className="hover:underline text-secondary hover:text-primary">Schedule Consultation</Link></li>
              <li><Link to="/portal" className="hover:underline text-secondary hover:text-primary">Industrial Portal & Admin</Link></li>
            </ul>
          </div>

          {/* Standards & Certifications */}
          <div className="md:col-span-3 flex flex-col gap-3">
            <span className="text-xs font-mono uppercase text-secondary tracking-widest font-semibold">
              Compliance & Lab
            </span>
            <div className="space-y-2 text-xs font-mono text-secondary">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>ISO 9001:2015 & AS9100D Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>FAR 25.853 Aviation Flammability</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>EN 13501-1 Class B Acoustic Cert</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-primary" />
                <span>OEKO-TEX Eco Passport 100% Traceable</span>
              </div>
            </div>
          </div>
        </div>

        {/* Subfooter */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-secondary">
          <p>© {new Date().getFullYear()} Texora Textile Collective B2B. All Technical Rights Reserved.</p>
          <div className="flex gap-6">
            <span>Server: Node.js Express API</span>
            <span>Database: MongoDB Atlas</span>
            <span>Client: React + Vite</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
