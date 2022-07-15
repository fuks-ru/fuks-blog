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
  overrides: [
    {
      files: ['*.json'],
      parserOptions: {
        project: false,
      },
    },
    {
      // TODO временно, пока не перевел на i18n
      files: ['entries/{blog-frontend,admin-frontend}/**/*.tsx'],
      rules: {
        'i18next/no-literal-string': ['off'],
      },
    },
  ],
};
