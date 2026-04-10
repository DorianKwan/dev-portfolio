import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'eslint/config';
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(
  {
    ignores: ['**/*.config.*', '.next/**', 'node_modules/**', 'public/**'],
  },

  // Next.js rules — loaded natively, no FlatCompat
  {
    plugins: {
      '@next/next': nextPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      'react/no-array-index-key': 'warn',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // TypeScript rules
  {
    files: ['**/*.ts', '**/*.tsx'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: __dirname,
      },
    },
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      '@typescript-eslint/no-for-in-array': 'error',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unused-expressions': 'error',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-shadow': 'off',
      '@typescript-eslint/require-await': 'off',
      '@typescript-eslint/prefer-optional-chain': 'warn',
      '@typescript-eslint/prefer-nullish-coalescing': 'off',
      'class-methods-use-this': 'off',
      'consistent-return': 'off',
      'no-await-in-loop': 'off',
      'no-continue': 'off',
      'no-empty-function': 'off',
      'no-extra-boolean-cast': 'off',
      'no-param-reassign': ['error', { props: false }],
      'no-plusplus': 'off',
      'no-restricted-syntax': 'warn',
      'no-return-assign': ['error', 'except-parens'],
      'no-underscore-dangle': 'off',
      'no-unused-expressions': 'off',
      'no-unused-vars': 'off', // the TS rule covers this
      'no-useless-constructor': 'off',
      'no-use-before-define': 'off',
      'no-var': 'error',
    },
  },

  // Prettier — must be last so it overrides conflicting formatting rules
  prettierConfig,
  {
    plugins: { prettier: prettierPlugin },
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
    },
  },
);
