import { resolve } from 'node:path';
import { Configuration } from 'webpack';

const webpackConfig: Configuration = {
  entry: {
    index: './src/index.ts',
  },
  output: {
    filename: 'index.js',
    path: resolve(process.cwd(), 'dist'),
    library: {
      type: 'commonjs',
      name: 'FuksUi',
    },
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(js|tsx?)$/,
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader',
            options: {
              configFile: 'tsconfig.build.json',
            },
          },
        ],
        exclude: /node_modules/,
      },
    ],
  },
  externals: {
    react: 'commonjs react',
    'styled-components': 'commonjs styled-components',
  },
};

/**
 * Конфигурация webpack.
 */
export default webpackConfig;
