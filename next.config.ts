import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel manages its own build output — do not use "standalone" there.
  // The local "build" script handles standalone copying for self-hosting.
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
