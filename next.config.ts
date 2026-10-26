import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain static files in out/ for hosting on S3 + CloudFront
  output: "export",
  // Emit about/index.html rather than about.html, which S3/CloudFront serve more naturally
  trailingSlash: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
