import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default tseslint.config(
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    files: ["**/*.ts", "**/*.tsx"],
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
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-for-in-array": ["error"],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unsafe-argument": ["warn"],
      "@typescript-eslint/no-unused-expressions": "error",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/prefer-optional-chain": "warn",
      "@typescript-eslint/prefer-nullish-coalescing": "off",
      "class-methods-use-this": "off",
      "consistent-return": "off",
      "no-await-in-loop": "off",
      "no-continue": "off",
      "no-empty-function": "off",
      "no-extra-boolean-cast": "off",
      "no-param-reassign": ["error", { props: false }],
      "no-plusplus": "off",
      "no-restricted-syntax": ["warn"],
      "no-return-assign": ["error", "except-parens"],
      "no-underscore-dangle": "off",
      "no-unused-expressions": "off",
      "no-unused-vars": "warn",
      "no-useless-constructor": "off",
      "no-use-before-define": "off",
      "no-var": "error",
      "prettier/prettier": ["error", { endOfLine: "auto" }],
    },
  }
);
