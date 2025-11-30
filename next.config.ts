import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ...your existing config (e.g., other options like images, env, etc.)

  experimental: {
    // Remove browsersListForSwc entirely—it's not supported in v16
    // If you have other experimental flags, keep them here
  },
};

export default nextConfig;