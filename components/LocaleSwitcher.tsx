"use client";

import { usePathname, useRouter } from "next/navigation";
import LanguageIcon from "./icons/LanguageIcon";

export default function LocaleSwitcher({ lang }: { lang: string }) {
  const pathname = usePathname();
  const router = useRouter();

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
    { code: "it", label: "🇮🇹 Italiano" },
    { code: "en", label: "🇬🇧 English" },
    { code: "fr", label: "🇫🇷 Français" },
    { code: "de", label: "🇩🇪 Deutsch" },
    { code: "es", label: "🇪🇸 Español" },
    { code: "zh", label: "🇨🇳 中文" },
    { code: "ja", label: "🇯🇵 日本語" },
  ];

  return (
    <div className="relative group cursor-pointer p-2">
      <span className="group-hover:bg-white/20 p-2 rounded flex items-center gap-2 transition-colors duration-150 text-bianco">
        <LanguageIcon className="w-5 h-5" />
        <span className="uppercase text-sm font-semibold">{lang}</span>
        <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <div className="absolute right-0 mt-2 w-max bg-blu text-bianco hidden group-hover:block p-2 z-[60] shadow-lg rounded-lg border border-white/10 max-h-80 overflow-y-auto">
        {languages.map((l) => (
          <button
            key={l.code}
            onClick={() => handleLocaleChange(l.code)}
            className={`block hover:bg-white/20 p-2 rounded mb-1 last:mb-0 transition-colors duration-150 w-full text-left font-medium ${
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
