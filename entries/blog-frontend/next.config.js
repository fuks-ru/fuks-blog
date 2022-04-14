const withPlugins = require('next-compose-plugins');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = withPlugins([], {
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
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.plugins.push(new ForkTsCheckerWebpackPlugin());
    }

    return config;
  },
});
