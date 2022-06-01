require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  extends: ['eslint-config-fuks'],
  parserOptions: {
    project: '{entries,packages}/*/tsconfig.json',
    sourceType: 'module',
  },
  settings: {
    react: {
      version: '18.0.0',
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
