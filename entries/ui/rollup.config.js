import { babel } from '@rollup/plugin-babel';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import ttypescript from 'ttypescript';

const config = () => {
  const plugins = [
    typescript({
      tsconfig: 'tsconfig.build.json',
      typescript: ttypescript,
    }),
    babel({
      exclude: /node_modules/,
      extensions: ['.js', '.ts', '.tsx'],
    }),
  ];

  if (process.env.NODE_ENV) {
    plugins.push(terser());
  }

  return {
    input: 'src/index.ts',
    output: {
      format: 'esm',
      dir: 'dist',
      preserveModules: true,
    },
    plugins,
    external: ['react/jsx-runtime'],
  };
};

/**
 * Конфиг для rollup.
 */
export default config;
