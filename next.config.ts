import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
      {
        protocol: "https",
        hostname: "d1a9qnv764bsoo.cloudfront.net",
      }
    ],
  },
};

export default nextConfig;