import type { Metadata } from "next";
import { Fraunces, Public_Sans } from "next/font/google";
import "@/app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDictionary, type Locale } from "@/app/dictionaries";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
});

const publicSans = Public_Sans({
  variable: "--font-public-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Suite di Design a San Giovanni, Roma | Bell Suites",
  description:
    "Due suite di design a San Giovanni, a 4 minuti dalla Metro A. Cucina completa, Wi-Fi in fibra, lavatrice e aria condizionata. Prenota direttamente.",
  verification: {
    google: "SVf6iKTee4OjVhO-w7hBSrHHPnJGK0Swkcw7d4bYGUg",
  },
  icons: {
    icon: [
      { url: "/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon/android-chrome-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/favicon/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon/favicon.ico"],
    other: [
      {
        rel: "manifest",
        url: "/favicon/site.webmanifest",
      },
    ],
  },
};

export async function generateStaticParams() {
  return [
    { lang: 'it' },
    { lang: 'en' },
    { lang: 'fr' },
    { lang: 'de' },
    { lang: 'es' },
    { lang: 'zh' },
    { lang: 'ja' },
  ];
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as Locale);
  return (
    <html
      lang={lang}
      className={`${fraunces.variable} ${publicSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar lang={lang} dict={dict.navbar} />
        {children}
        <Footer lang={lang} />
      </body>
    </html>
  );
}
