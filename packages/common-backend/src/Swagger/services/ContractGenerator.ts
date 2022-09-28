import * as console from 'node:console';
import * as fs from 'node:fs';
import childProcess from 'node:child_process';
import * as path from 'node:path';
import * as process from 'node:process';
import { rollup } from 'rollup';
import typescript from 'rollup-plugin-typescript2';
import ttypescript from 'ttypescript';
import json from '@rollup/plugin-json';
import util from 'node:util';
import { Injectable } from '@nestjs/common';
import { OpenAPIObject } from '@nestjs/swagger';

const exec = util.promisify(childProcess.exec);

@Injectable()
export class ContractGenerator {
  private readonly targetPackageRootPath = process.cwd();

  private readonly contractDirCachePath = path.join(
    this.targetPackageRootPath,
    '/node_modules/.cache/generate-api-contract/lib',
  );

  private readonly swaggerSchemaCachePath = path.join(
    this.contractDirCachePath,
    '/swagger-schema.json',
  );

  private readonly clientTsCachePath = path.join(
    this.contractDirCachePath,
    '/client.ts',
  );

  private readonly libOutPath = path.join(
    this.targetPackageRootPath,
    '/dist/lib',
  );

  private readonly commonPackageRootPath = path.join(
    // eslint-disable-next-line unicorn/prefer-module
    require.resolve('@fuks-ru/common-backend'),
  );

  private readonly indexTsDistPath = path.join(
    this.commonPackageRootPath,
    '../openApi.ts.dist',
  );

  private readonly indexTsCachePath = path.join(
    this.contractDirCachePath,
    '/index.ts',
  );

  /**
   * Генерация файлов контракта.
   */
  public async generateContractLib(document: OpenAPIObject): Promise<void> {
    this.createCachePathIfNotExist();

    this.generateSchemaJson(document);

    await this.generateClientTs();

    fs.copyFileSync(this.indexTsDistPath, this.indexTsCachePath);

    await this.rollupBundle();

    console.log('Contracts build completed');
  }

  private createCachePathIfNotExist(): void {
    if (fs.existsSync(this.contractDirCachePath)) {
      return;
    }

    fs.mkdirSync(this.contractDirCachePath, { recursive: true });
  }

  private generateSchemaJson(document: OpenAPIObject): void {
    fs.writeFileSync(this.swaggerSchemaCachePath, JSON.stringify(document));
  }

  private async generateClientTs(): Promise<void> {
    await exec(
      `yarn typegen ${this.swaggerSchemaCachePath} > ${this.clientTsCachePath} && echo "const defaultBaseUrl = '/';\\nexport { defaultBaseUrl, Components, Paths };" >> ${this.clientTsCachePath}`,
    );
  }

  private async rollupBundle(): Promise<void> {
    const build = await rollup({
      input: this.indexTsCachePath,
      output: {
        format: 'cjs',
        dir: this.libOutPath,
        preserveModules: true,
      },
      plugins: [
        typescript({
          typescript: ttypescript,
          tsconfigOverride: {
            compilerOptions: {
              outDir: this.libOutPath,
              declaration: true,
              declarationDir: this.libOutPath,
              baseUrl: this.contractDirCachePath,
              resolveJsonModule: true,
              module: 'ESNext',
              allowSyntheticDefaultImports: true,
            },
            include: [this.indexTsCachePath],
          },
        }),
        json(),
      ],
      external: ['openapi-client-axios'],
    });

    await build.write({
      dir: this.libOutPath,
      format: 'cjs',
    });
  }
}
