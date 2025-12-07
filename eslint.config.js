import js from '@eslint/js';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
      },
    },
    rules: {
      'import/extensions': 'off',
      'linebreak-style': ['error', 'unix'],
      'no-param-reassign': ['error', { props: false }],
      'no-console': 'warn',
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.github/**',
      '*.min.js',
    ],
  },
];
