const resolver = require('eslint-config-fuks/resolver');

require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-fuks'],
  parserOptions: {
    project: ['{entries,packages}/*/tsconfig.json', 'tsconfig.eslint.json'],
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.0.0',
    },
    'import/resolver': {
      [resolver]: {
        project: '{entries,packages}/*/tsconfig.json',
      },
    },
  },
  rules: {
    'jsdoc/require-throws': 'off',
    '@typescript-eslint/no-unused-vars': [
      'error',
      { argsIgnorePattern: '^_', ignoreRestSiblings: true },
    ],
    'jsdoc/require-jsdoc': [
      'error',
      {
        checkConstructors: false,
        contexts: [
          'TSInterfaceDeclaration',
          'TSTypeAliasDeclaration',
          'TSPropertySignature',
          'TSEnumDeclaration',
          'TSMethodSignature',
          'ExportDefaultDeclaration',
          'ExportNamedDeclaration[declaration][declaration.declarations.0.id.name!="getServerSideProps"][declaration.type!="ClassDeclaration"]',
          'PropertyDefinition:not([accessibility="private"])',
          'MethodDefinition:not([accessibility="private"])',
          'ClassProperty:not([accessibility="private"])',
        ],
        publicOnly: true,
      },
    ],
  },
  overrides: [
    {
      files: ['*.json'],
      parserOptions: {
        project: false,
      },
    },
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-misused-promises': [
          'error',
          {
            checksVoidReturn: {
              attributes: false,
            },
          },
        ],
      },
    },
    {
      files: ['*.fixture.tsx'],
      rules: {
        'react/function-component-definition': ['off'],
        '@typescript-eslint/explicit-module-boundary-types': ['off'],
        '@typescript-eslint/explicit-function-return-type': ['off'],
        'jsdoc/require-jsdoc': ['off'],
      },
    },
  ],
};
