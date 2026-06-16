import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  output: "standalone",
  serverExternalPackages: ['@react-pdf/renderer'],
  images: {
    // Curated to match actual usage (product cards, carousel, thumbnail strip)
    // instead of Next's much larger defaults, so the optimizer generates far
    // fewer distinct resize variants and the cache warms up faster.
    deviceSizes: [400, 640, 768, 1024, 1280, 1920],
    imageSizes: [56, 96, 128, 256],
    // Uploaded images are immutable once created (ids never get reused for
    // different content), so cache them for as long as the browser will allow.
    minimumCacheTTL: 31536000,
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
};

export default nextConfig;
