import React from 'react';
import { Link } from 'react-router-dom';

export default function TexoraLogo({ className = '', subtitle = '', showText = true }) {
  return (
    <Link to="/" className={`flex items-center gap-3 group ${className}`}>
      {/* SVG Geometric Loom Symbol */}
      <svg
        className="h-8 w-8 transition-transform group-hover:scale-105"
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M50 10.4L10.4 50L50 89.6L89.6 50L50 10.4Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
        <path d="M50 25L25 50L50 75L75 50L50 25Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
        <path d="M50 39.6L39.6 50L50 60.4L60.4 50L50 39.6Z" stroke="currentColor" strokeWidth="8" strokeLinejoin="round" />
        <path d="M25 25L75 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
        <path d="M75 25L25 75" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
      </svg>
      {showText && (
        <div className="flex flex-col">
          <span className="text-xl md:text-2xl font-display font-extrabold tracking-tighter uppercase text-primary">
            TEXTILE COLLECTIVE
          </span>
          {subtitle && (
            <span className="text-[10px] font-mono tracking-widest text-secondary uppercase -mt-1">
              {subtitle}
            </span>
          )}
        </div>
      )}
    </Link>
  );
}
