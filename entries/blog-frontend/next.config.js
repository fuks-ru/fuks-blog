const withPlugins = require('next-compose-plugins');
const withTM = require('next-transpile-modules');

module.exports = withPlugins([withTM(['@fuks/ui'])], {
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  pageExtensions: ['page.tsx'],
  env: {
    SERVER_FULL_HOST: `${process.env.SERVER_SCHEMA}://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}`,
  },
});
