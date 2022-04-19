import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import json from '@rollup/plugin-json';

const config = () => {
  const plugins = [
    typescript({
      tsconfig: 'tsconfig.lib.json',
      typescript: ttypescript,
    }),
    json(),
  ];

  return {
    input: 'lib/index.ts',
    output: {
      format: 'esm',
      dir: 'dist/lib',
      preserveModules: true,
    },
    plugins,
    external: ['openapi-client-axios'],
  };
};

/**
 * Конфиг для rollup.
 */
export default config;
