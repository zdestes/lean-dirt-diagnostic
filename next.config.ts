import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // The diagnostic tool was retired — send old links home.
      { source: "/diagnostic", destination: "/", permanent: true },
      { source: "/diagnostic/:path*", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
