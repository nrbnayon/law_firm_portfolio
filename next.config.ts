import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
