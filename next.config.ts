import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "tecknikrubberroller.com",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  transpilePackages: ["three"],
};

export default nextConfig;
