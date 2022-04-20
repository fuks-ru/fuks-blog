#!/usr/bin/env node
import * as console from 'node:console';
import * as fs from 'node:fs';
import childProcess from 'node:child_process';
import * as path from 'node:path';
import * as process from 'node:process';
import nodemon from 'nodemon';
import { rollup } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import json from '@rollup/plugin-json';
import util from 'node:util';
import commandLineArgs from 'command-line-args';

const exec = util.promisify(childProcess.exec);

const options = commandLineArgs([
  { name: 'watch', alias: 'w', type: Boolean },
  { name: 'builder', alias: 'b', type: String },
  { name: 'out', alias: 'o', type: String },
  { name: 'schema', alias: 's', type: String },
]);

const targetRootPath = process.cwd();
const jsonSchemaBuilderPath = options.builder
  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    path.join(targetRootPath, options.builder)
  : path.join(targetRootPath, './src/Swagger/utils/buildShema.ts');

const jsonSchemaOutPath = options.schema
  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    path.join(targetRootPath, options.schema)
  : path.join(targetRootPath, './lib/swagger-schema.json');

const tempOutPath = path.join(jsonSchemaOutPath, '..');
const tsSchemaOutPath = path.join(tempOutPath, './client.ts');
const libOutPath = options.out
  ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    path.join(targetRootPath, options.out)
  : path.join(targetRootPath, './dist/lib');

// eslint-disable-next-line unicorn/prefer-module
const currentPackagePath = path.join(require.resolve('@difuks/common'));
const distIndexPath = path.join(
  currentPackagePath,
  '../bin/generateApiContract/helpers/index.ts.dist',
);
const outIndexPath = path.join(tempOutPath, './index.ts');

console.log({ libOutPath });

const buildLib = async (): Promise<void> => {
  fs.copyFileSync(distIndexPath, outIndexPath);

  const build = await rollup({
    input: outIndexPath,
    output: {
      format: 'cjs',
      dir: libOutPath,
      preserveModules: true,
    },
    plugins: [
      typescript({
        typescript: ttypescript,
        tsconfigOverride: {
          compilerOptions: {
            outDir: libOutPath,
            declaration: true,
            declarationDir: libOutPath,
            baseUrl: tempOutPath,
            resolveJsonModule: true,
            module: 'ESNext',
            allowSyntheticDefaultImports: true,
          },
          include: [`${tempOutPath}/index.ts`],
        },
      }),
      json(),
    ],
    external: ['openapi-client-axios'],
  });

  await build.write({
    dir: libOutPath,
  });

  fs.unlinkSync(outIndexPath);
  fs.unlinkSync(tsSchemaOutPath);
};

(async () => {
  if (!fs.existsSync(tempOutPath)) {
    fs.mkdirSync(tempOutPath);
  }

  if (options.watch) {
    nodemon({
      script: `typegen ${jsonSchemaOutPath} > ./lib/client.ts && echo "const defaultBaseUrl = '/';\\nexport { defaultBaseUrl };" >> ${tsSchemaOutPath}`,
      stdout: false,
      // eslint-disable-next-line func-names
    }).on('readable', function () {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
      this.stdout.pipe(fs.createWriteStream(jsonSchemaOutPath));

      void buildLib();
    });

    return;
  }

  await exec(
    `yarn ts-node -r tsconfig-paths/register ${jsonSchemaBuilderPath}`,
  );
  await exec(
    `typegen ${jsonSchemaOutPath} > ./lib/client.ts && echo "const defaultBaseUrl = '/';\\nexport { defaultBaseUrl };" >> ${tsSchemaOutPath}`,
  );
  await buildLib();
})();
