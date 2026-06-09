"use client";

import React, { useState } from "react";

interface CustomNavbarProps {
  transparent?: boolean;
}

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Contact", href: "/contact" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/mark-thompson-a1005184/", external: true },
];

const CustomNavbar: React.FC<CustomNavbarProps> = ({ transparent = false }) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav
      className={`left-0 right-0 z-20 px-6 md:px-10 py-4 ${
        transparent ? 'absolute top-0' : 'relative'
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <a
          href="/"
          className="text-sm font-['Roboto_Slab'] text-brandLightBlue-600 no-underline tracking-wide uppercase opacity-60 hover:opacity-100 transition-opacity"
        >
          Home
        </a>

        {/* Mobile toggle */}
        <button
          className="md:hidden bg-transparent border-0 p-0 text-brandLightBlue-500 opacity-60"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5">
            {mobileOpen ? (
              <path d="M4 4l12 12M16 4L4 16" />
            ) : (
              <path d="M3 5h14M3 10h14M3 15h14" />
            )}
          </svg>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-brandLightBlue-600 no-underline tracking-wide opacity-60 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden mt-3 flex flex-col gap-2 pl-1">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="text-sm text-brandLightBlue-600 no-underline tracking-wide opacity-60 hover:opacity-100 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}

      {/* Subtle hint line */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-px bg-brandLightBlue-300 opacity-40" />
    </nav>
  );
};

export default CustomNavbar;
