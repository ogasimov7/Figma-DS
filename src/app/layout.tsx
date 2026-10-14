/**
 * ROOT LAYOUT
 *
 * Wraps every page in the app. This file:
 *   - Loads global CSS (tokens + Tailwind + component styles)
 *   - Sets up fonts as CSS variables (--font-geist-sans, --font-geist-mono)
 *   - Loads Inter and binds it to the --font-family-sans primitive
 *   - Defines site-wide metadata (title, description)
 *
 * All design system pages live under /design-system (see app/design-system/).
 */
import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter } from "next/font/google";

import "./globals.css";

/* Load Google fonts and expose them as CSS variables for Tailwind + tokens */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* Figma's font/family/sans is Inter. next/font self-hosts it under a hashed
   family name, so it overrides the --font-family-sans primitive on <body>. */
const inter = Inter({
  variable: "--font-family-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Memorisely Design System",
  description: "A scaffolded design system for students to build upon.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* Font variables are applied to <body> so all children inherit them */}
      <body className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
