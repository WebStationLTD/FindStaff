import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
// Avoid next-intl/plugin here: it loads @swc/core native bindings which
// Windows Application Control can block on this machine.
const i18nRequestPath = path
  .resolve(__dirname, "./i18n/request.js")
  .replace(/\\/g, "/");

/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "findstaff.admin-panels.com",
      },
      {
        protocol: "https",
        hostname: "tailwindui.com",
      },
      {
        protocol: "https",
        hostname: "secure.gravatar.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24, // 24 часа кеширане
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  poweredByHeader: false, // Премахваме X-Powered-By хедъра
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production", // Премахваме console.log в production
  },
  experimental: {
    turbo: {
      resolveAlias: {
        "next-intl/config": i18nRequestPath,
      },
    },
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "next-intl/config": i18nRequestPath,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: "/_next/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
      {
        source: "/static/(.*)",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
