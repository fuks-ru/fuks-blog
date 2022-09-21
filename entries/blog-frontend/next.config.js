/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx'],
};

module.exports = nextConfig;
