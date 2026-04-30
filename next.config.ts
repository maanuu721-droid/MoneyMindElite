import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/articles/:path*.html',
        destination: '/articles/:path*.html',
      },
    ];
  },
};

export default nextConfig;
