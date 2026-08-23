import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wows-gloss-icons.wgcdn.co',
        pathname: '/icons/vehicle/**',
      },
      {
        protocol: 'https',
        hostname: 'wows-media-wowswiki-prod.wgcdn.co',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
