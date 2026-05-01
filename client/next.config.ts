import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ["gorth-ui"],
  
  devIndicators: false,
  images: {
    // domains: ["qwxybvmklbhsvpmwthfn.supabase.co"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "qwxybvmklbhsvpmwthfn.supabase.co",
        // pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

export default nextConfig;
