const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx'],
});
