/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx'],
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
