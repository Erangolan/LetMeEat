/* eslint-disable no-undef */
module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    //'no-unused-vars': ["error", { "varsIgnorePattern": "[iI]gnored" }],
    // we only want single quotes
    'quotes': ['error', 'single'],
    // we use 2 spaces to indent our code
    'indent': ['error', 2],
    // we want to avoid useless spaces
    'no-multi-spaces': ['error'],
    'no-trailing-spaces': ['error', { 'skipBlankLines': false }],
    'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],
    'no-extra-semi': ['error'],
  },
};
