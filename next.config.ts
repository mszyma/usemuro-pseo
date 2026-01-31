import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Static export for Cloudflare Pages deployment
  output: 'export',

  // Note: For static export, we'll use Cloudflare Pages redirects instead of middleware
  // Middleware is only for development/preview
  trailingSlash: false,

  // Optimize images
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
