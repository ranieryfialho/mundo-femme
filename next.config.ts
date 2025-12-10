import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Permite tudo (útil em dev)
      },
      {
        protocol: "https",
        hostname: "d1a9qnv764bsoo.cloudfront.net", // Domínio específico da sua imagem
      }
    ],
  },
};

export default nextConfig;