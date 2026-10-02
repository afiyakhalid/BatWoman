import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "batwoman-store-media.s3.ap-south-1.amazonaws.com",
      },
    ],
  },

  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination:
            "http://batwoman-alb-832704642.ap-south-1.elb.amazonaws.com/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;