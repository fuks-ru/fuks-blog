const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = (webpackConfig) => ({
  ...webpackConfig,
  resolve: {
    ...webpackConfig.resolve,
    plugins: [
      ...(webpackConfig.resolve?.plugins || []),
      new TsconfigPathsPlugin(),
    ],
  },
});
