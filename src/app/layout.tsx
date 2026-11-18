import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { COMPANY } from "@/data/tecknikData";
import { QuoteModalProvider } from "@/context/QuoteModalContext";
import { RollerThemeProvider } from "@/context/RollerThemeContext";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { QuoteModal } from "@/components/QuoteModal";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${COMPANY.name} — ${COMPANY.metaTagline}`,
  description: COMPANY.scopeSummary,
  icons: {
    icon: "/images/tecknik/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="min-h-screen bg-obsidian font-sans text-steel-100 antialiased">
        <RollerThemeProvider>
          <QuoteModalProvider>
            <SmoothScrollProvider>
              <Navbar />
              <main className="min-h-screen">{children}</main>
              <Footer />
              <QuoteModal />
            </SmoothScrollProvider>
          </QuoteModalProvider>
        </RollerThemeProvider>
      </body>
    </html>
  );
}
