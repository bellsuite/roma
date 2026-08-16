"use client";

import { useState } from "react";
import Image from "next/image";
import LanguageIcon from "./icons/LanguageIcon";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="relative z-50 bg-blu text-bianco px-padding-global">
      <div className="max-w-container-large mx-auto flex items-center py-4">
        <a href="/" className="relative w-[120px] md:w-[144px] h-auto block cursor-pointer">
          <img src="/logo.svg" alt="Logo Bell Suites" className="w-[120px] md:w-[144px] h-auto object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-start gap-8 font-semibold text-[18px] ml-16">
          <a href="/" className="hover:bg-white/20 p-2 rounded-md transition-colors duration-150">Home</a>

          <div className="relative group cursor-pointer p-2">
            <span className="group-hover:bg-white/20 p-2 rounded-md flex items-center gap-2 transition-colors duration-150">
              Le Suite
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="absolute left-0 mt-2 w-48 bg-blu text-bianco hidden group-hover:block p-2 z-[60] shadow-lg rounded-md">
              <a href="/suites/suite-1" className="block hover:bg-white/20 p-2 rounded-md mb-1 transition-colors duration-150">Suite Uno</a>
              <a href="/suites/suite-2" className="hover:bg-white/20 p-2 rounded-md block transition-colors duration-150">Suite Due</a>
            </div>
          </div>

          {/* <a href="#" className="hover:bg-white/20 p-2 rounded transition-colors duration-150">San Giovanni</a> */}
        </div>

        <div className="ml-auto flex items-center gap-4">
          {/* Language Dropdown */}
          <div className="hidden lg:block relative group cursor-pointer p-2">
            <span className="group-hover:bg-white/20 p-2 rounded flex items-center gap-2 transition-colors duration-150">
              <LanguageIcon className="w-5 h-5" />
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="absolute right-0 mt-2 w-max bg-blu text-bianco hidden group-hover:block p-2 z-[60] shadow-lg rounded-lg">
              <button className="block hover:bg-white/20 p-2 rounded mb-1 transition-colors duration-150 w-full text-left" aria-label="English">🇬🇧</button>
              <button className="block hover:bg-white/20 p-2 rounded mb-1 transition-colors duration-150 w-full text-left" aria-label="Italiano">🇮🇹</button>
              <button className="block hover:bg-white/20 p-2 rounded mb-1 transition-colors duration-150 w-full text-left" aria-label="Deutsch">🇩🇪</button>
              <button className="block hover:bg-white/20 p-2 rounded transition-colors duration-150 w-full text-left" aria-label="Español">🇪🇸</button>
            </div>
          </div>

          {/* Burger Button */}
          <button className="lg:hidden p-4 relative z-[60] flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => { console.log('Burger clicked'); setIsOpen(!isOpen); }}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-blu p-padding-global lg:hidden flex flex-col gap-4 z-[50]">
            <a href="/" className="p-2 border-b border-white/10">Home</a>
            <a href="/suites/suite-1" className="p-2 border-b border-white/10">Suite Uno</a>
            <a href="/suites/suite-2" className="p-2 border-b border-white/10">Suite Due</a>
            {/* <a href="#" className="p-2 border-b border-white/10">San Giovanni</a> */}
            <div className="flex gap-4 p-2">
              <span>🇬🇧</span>
              <span>🇮🇹</span>
              <span>🇩🇪</span>
              <span>🇪🇸</span>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}