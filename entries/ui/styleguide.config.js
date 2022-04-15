module.exports = {
  webpackConfig: {
    resolve: { fallback: { assert: false } },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
  },
};
