import type { NextConfig } from "next";

// Site static (folderul out/), fără server: se poate găzdui oriunde.
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
  poweredByHeader: false,
  turbopack: { root: __dirname },
};

export default nextConfig;
