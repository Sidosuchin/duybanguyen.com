import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Note: cacheComponents + partialPrefetching (scaffold defaults) break
  // `next start` in Next 16.4 (ENOENT preview-props.json), so both are off.
  // The site is fully static and prerendered anyway.
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
