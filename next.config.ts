import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 90, 100],
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.unsplash.com", // Allows any subdomain
      },
      {
        protocol: "https",
        hostname: "example.com",
      },
      // Add more hostnames as needed
    ],
  },
};

export default nextConfig;
