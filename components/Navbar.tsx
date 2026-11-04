"use client";

import { useState } from "react";
import Image from "next/image";
import LocaleSwitcher from "./LocaleSwitcher";

interface NavbarProps {
  lang?: string;
  dict?: {
    home: string;
    suites: string;
    suitePalatino: string;
    suiteAventino: string;
    map: string;
    contact: string;
  };
}

export default function Navbar({ lang = "it", dict }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const t = dict || {
    home: "Home",
    suites: "Le Suite",
    suitePalatino: "Suite Palatino",
    suiteAventino: "Suite Aventino",
    map: "Mappa",
    contact: "Contatti",
  };

  return (
    <nav className="relative z-50 bg-blu text-bianco px-padding-global">
      <div className="max-w-container-large mx-auto flex items-center py-4">
        <a href={`/${lang}`} className="relative w-[120px] md:w-[144px] h-auto block cursor-pointer">
          <img src="/logo.svg" alt="Logo Bell Suites" className="w-[120px] md:w-[144px] h-auto object-contain" />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center justify-start gap-8 font-semibold text-[18px] ml-16">
          <a href={`/${lang}`} className="hover:bg-white/20 p-2 rounded-md transition-colors duration-150">{t.home}</a>

          <div className="relative group cursor-pointer p-2">
            <span className="group-hover:bg-white/20 p-2 rounded-md flex items-center gap-2 transition-colors duration-150">
              {t.suites}
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div className="absolute left-0 mt-2 w-48 bg-blu text-bianco hidden group-hover:block p-2 z-[60] shadow-lg rounded-md">
              <a href={`/${lang}/suites/suite-1`} className="block hover:bg-white/20 p-2 rounded-md mb-1 transition-colors duration-150">{t.suitePalatino}</a>
              <a href={`/${lang}/suites/suite-2`} className="block hover:bg-white/20 p-2 rounded-md transition-colors duration-150">{t.suiteAventino}</a>
            </div>
          </div>

          <a href={`/${lang}/mappa`} className="hover:bg-white/20 p-2 rounded-md transition-colors duration-150">{t.map}</a>
          <a href={`/${lang}/contatti`} className="hover:bg-white/20 p-2 rounded-md transition-colors duration-150">{t.contact}</a>
        </div>

        <div className="ml-auto flex items-center gap-4">
          {/* Language Switcher */}
          <div className="hidden lg:block">
            <LocaleSwitcher lang={lang} />
          </div>

          {/* Burger Button */}
          <button className="lg:hidden p-4 relative z-[60] flex items-center justify-center flex-shrink-0 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute top-full left-0 w-full bg-blu p-padding-global lg:hidden flex flex-col gap-6 z-[50] pb-8 shadow-2xl">
            <a href={`/${lang}`} className="font-heading p-4 text-2xl border-b border-white/10 font-semibold" onClick={() => setIsOpen(false)}>{t.home}</a>
            <a href={`/${lang}/suites/suite-1`} className="font-heading p-4 text-2xl border-b border-white/10 font-semibold" onClick={() => setIsOpen(false)}>{t.suitePalatino}</a>
            <a href={`/${lang}/suites/suite-2`} className="font-heading p-4 text-2xl border-b border-white/10 font-semibold" onClick={() => setIsOpen(false)}>{t.suiteAventino}</a>
            <a href={`/${lang}/mappa`} className="font-heading p-4 text-2xl border-b border-white/10 font-semibold" onClick={() => setIsOpen(false)}>{t.map}</a>
            <a href={`/${lang}/contatti`} className="font-heading p-4 text-2xl border-b border-white/10 font-semibold" onClick={() => setIsOpen(false)}>{t.contact}</a>
            <div className="p-4">
              <LocaleSwitcher lang={lang} />
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
