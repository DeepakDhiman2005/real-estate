import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['img.staticmb.com'], // ✅ Add the allowed domain here
  },
  webpack: (config) => {
    config.cache = false;
    return config;
  }
};

export default nextConfig;
