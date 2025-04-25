// Copyright © Aptos
// SPDX-License-Identifier: Apache-2.0
import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Footer, Layout, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import AppProviders from "@/context/AppProviders";

export const metadata: Metadata = {
  metadataBase: new URL("https://jspro.aptos.dev"),
  title: {
    default: "Aptos JS-Pro",
    template: "%s | Aptos JS-Pro",
  },
  description: "A collection of opinionated utilities for building on Aptos.",
  keywords: ["aptos", "blockchain", "web3", "crypto", "wallet"],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://jspro.aptos.dev",
    siteName: "Aptos JS-Pro",
    title: "Aptos JS-Pro",
    description: "A collection of opinionated utilities for building on Aptos.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Aptos JS-Pro",
    description: "A collection of opinionated utilities for building on Aptos.",
    creator: "@AptosLabs",
  },
  appleWebApp: { title: "Aptos JS-Pro" },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      // Suggested by `next-themes` package https://github.com/pacocoursey/next-themes#with-app
      suppressHydrationWarning
    >
      <Head />
      <AppProviders>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <Layout
            navbar={
              <Navbar
                projectLink="https://github.com/aptos-labs/aptos-js-pro"
                logo={
                  <div className="gap-2 flex items-center">
                    <img
                      src="./navicon.svg"
                      alt="Aptos Logo"
                      style={{
                        borderRadius: "4px",
                        height: "24px",
                        width: "24px",
                      }}
                    />
                    <span className="text-xl leading-tighter font-landing">
                      JS-Pro
                    </span>
                  </div>
                }
              />
            }
            pageMap={await getPageMap()}
            docsRepositoryBase="https://github.com/aptos-labs/aptos-js-pro"
            footer={
              <Footer>
                © {new Date().getFullYear()} Aptos Labs. All rights reserved.
              </Footer>
            }
          >
            <Banner storageKey="0.1-release">
              <p>
                🚧 These packages are still in development and may change
                rapidly as they continue to be developed.
              </p>
            </Banner>
            {children}
          </Layout>
        </body>
      </AppProviders>
    </html>
  );
}
