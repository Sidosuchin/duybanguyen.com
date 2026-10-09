import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import CatToggle from "@/components/CatToggle";
import WelcomeGate from "@/components/WelcomeGate";
import SkipLink from "@/components/SkipLink";
import { site } from "@/data/site";
import { pick } from "@/lib/i18n";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-display",
  subsets: ["vietnamese", "latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-body",
  subsets: ["vietnamese", "latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const defaultTitle = "Duy Ba Nguyen — Sống · Làm · Khám phá";
// Metadata is rendered on the server, where Vietnamese (the default
// language) applies. The in-page UI switches language client-side.
const defaultDescription = pick(site.description, "vi");

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: defaultTitle,
    template: "%s · Duy Ba Nguyen",
  },
  description: defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "vi_VN",
    url: site.domain,
    siteName: site.name,
    title: defaultTitle,
    description: defaultDescription,
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: site.name,
  url: site.domain,
  knowsLanguage: ["vi", "en"],
};

/**
 * Runs synchronously while the HTML is parsed — before first paint — so
 * a returning visitor with dark mode saved never sees a light flash.
 * Mirrors the "dbn-theme" key ThemeProvider reads after hydration.
 */
const themeInitScript = `(function(){try{if(window.localStorage.getItem("dbn-theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`;

/**
 * Same pre-paint pattern for the welcome gate: if this session has not
 * unlocked the site yet, flag <html> so the gate overlay (rendered by
 * WelcomeGate) is visible from the first paint — no flash of the page
 * behind it. sessionStorage only: a new browser session sees the gate
 * again. Any storage error fails open — the gate simply never appears.
 */
const welcomeInitScript = `(function(){try{if(window.sessionStorage.getItem("dbn-welcome-unlocked")!=="1"){document.documentElement.setAttribute("data-welcome","locked")}}catch(e){}})();`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="vi"
      className={`${jakarta.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: welcomeInitScript }} />
      </head>
      <body className="flex min-h-screen flex-col bg-paper font-body text-charcoal antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>
          <LanguageProvider>
            <SkipLink />
            <Navbar />
            <main id="main" className="flex-1">
              {children}
            </main>
            <Footer />
            <CatToggle />
            <WelcomeGate />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
