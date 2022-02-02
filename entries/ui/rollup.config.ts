import { babel } from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import { RollupOptions, Plugin } from 'rollup';
import { terser } from 'rollup-plugin-terser';

const config = (cliArgs: { prod?: boolean }): RollupOptions => {
  const plugins: Plugin[] = [
    typescript({
      tsconfig: 'tsconfig.build.json',
    }),
    babel({
      exclude: /node_modules/,
      extensions: ['.js', '.ts', '.tsx'],
    }),
  ];

  if (cliArgs.prod) {
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
  };
};

/**
 * Конфиг для rollup.
 */
export default config;
