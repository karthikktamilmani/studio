import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // output: 'export',
  // basePath: '/studio',
  // assetPrefix: '/studio/',
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
