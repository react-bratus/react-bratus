module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  plugins: ['react', 'react-hooks', 'prettier', 'simple-import-sort'],
  rules: {
    'prettier/prettier': [
      'error',
      { endOfLine: 'auto' },
      { usePrettierrc: true },
    ],
    'react/display-name': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'react/prop-types': ['error', { ignore: ['children'] }],
  },
};
