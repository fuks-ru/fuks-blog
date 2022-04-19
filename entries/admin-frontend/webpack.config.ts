import HtmlWebpackPlugin from 'html-webpack-plugin';
import NodePolyfillPlugin from 'node-polyfill-webpack-plugin';
import * as path from 'node:path';
import * as process from 'node:process';
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin';
import {
  Configuration,
  EnvironmentPlugin,
  WebpackPluginInstance,
} from 'webpack';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';

import 'webpack-dev-server';

const isDevelopment = process.env.NODE_ENV !== 'production';

const plugins: WebpackPluginInstance[] = [
  new HtmlWebpackPlugin({
    template: './src/index.html',
  }),
  new NodePolyfillPlugin(),
  new EnvironmentPlugin({
    NODE_ENV: process.env.NODE_ENV,
  }),
];

if (isDevelopment) {
  plugins.push(new ReactRefreshWebpackPlugin());
}

if (!isDevelopment) {
  plugins.push(new ForkTsCheckerWebpackPlugin());
}

const config: Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  entry: './src/index.tsx',
  output: {
    path: path.resolve(process.cwd(), '../../public/admin'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    plugins: [new TsconfigPathsPlugin()],
  },
  plugins,
  module: {
    rules: [
      {
        test: /\.tsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  devServer: {
    port: 3_002,
    hot: true,
  },
};

/**
 * Webpack config для админки.
 */
export default config;
