const withPlugins = require('next-compose-plugins');

module.exports = withPlugins([], {
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx'],
  env: {
    SERVER_FULL_HOST: `${process.env.SERVER_SCHEMA}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  },
});
