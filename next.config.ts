/**
 * NEXT.JS CONFIG
 *
 * Dev uses Turbopack (npm run dev) for faster, more stable hot reload.
 * Production uses Webpack (npm run build).
 *
 * Important: do NOT run `npm run build` while `npm run dev` is active —
 * it corrupts the .next cache and breaks CSS. Use `npm run clean` to recover.
 */
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
