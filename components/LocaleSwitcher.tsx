"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import LanguageIcon from "./icons/LanguageIcon";

interface LocaleSwitcherProps {
  lang: string;
  isMobile?: boolean;
}

export default function LocaleSwitcher({ lang, isMobile = false }: LocaleSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLocaleChange = (newLocale: string) => {
    if (newLocale === lang) return;
    // Set cookie to remember user's language preference
    document.cookie = `NEXT_LOCALE=${newLocale}; path=/; max-age=31536000; SameSite=Lax`;
    const segments = pathname.split("/");
    segments[1] = newLocale;
    const newPathname = segments.join("/");
    router.push(newPathname);
  };

  const languages = [
    { code: "it", label: "🇮🇹 IT" },
    { code: "en", label: "🇬🇧 EN" },
    { code: "fr", label: "🇫🇷 FR" },
    { code: "de", label: "🇩🇪 DE" },
    { code: "es", label: "🇪🇸 ES" },
    { code: "zh", label: "🇨🇳 ZH" },
    { code: "ja", label: "🇯🇵 JA" },
  ];

  if (isMobile) {
    return (
      <div className="w-full">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="font-heading p-4 text-2xl border-b border-white/10 font-semibold flex items-center justify-between w-full text-left text-bianco cursor-pointer"
        >
          <span className="flex items-center gap-3">
            <LanguageIcon className="w-6 h-6" />
            <span className="uppercase">{lang}</span>
          </span>
          <svg
            width="14"
            height="10"
            viewBox="0 0 12 8"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={`transform transition-transform duration-200 ${mobileOpen ? "rotate-180" : ""}`}
          >
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
        {mobileOpen && (
          <div className="flex flex-col bg-blu/60 border-b border-white/10 pl-4">
            {languages.map((l) => (
              <button
                key={l.code}
                onClick={() => handleLocaleChange(l.code)}
                className={`font-heading py-4 px-4 text-xl text-left border-b border-white/5 last:border-b-0 transition-colors duration-150 flex items-center justify-between cursor-pointer ${
                  lang === l.code ? "text-oro-chiaro font-bold bg-white/10" : "text-bianco hover:bg-white/10"
                }`}
              >
                <span>{l.label}</span>
                {lang === l.code && (
                  <svg className="w-5 h-5 text-oro-chiaro" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="relative group cursor-pointer p-2">
      <span className="group-hover:bg-white/20 p-2 rounded flex items-center gap-2 transition-colors duration-150 text-bianco">
        <LanguageIcon className="w-5 h-5" />
        <span className="uppercase text-sm font-semibold">{lang}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="absolute right-0 mt-2 w-max bg-blu text-bianco hidden group-hover:block p-2 z-[60] shadow-lg rounded-lg border border-white/10">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => handleLocaleChange(l.code)}
            className={`block hover:bg-white/20 p-2 rounded mb-1 last:mb-0 transition-colors duration-150 w-full text-left font-medium cursor-pointer ${
              lang === l.code ? "bg-white/20 text-oro-chiaro" : ""
            }`}
          >
            {l.label}
          </button>
        ))}
      </div>
    </div>
  );
}
