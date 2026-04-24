import globals from "globals";
import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["dist", "node_modules"],
  },

  js.configs.recommended,
  ...tseslint.configs.recommended,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: globals.browser,
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      prettier,
    },

    rules: {
      // React
      "react/react-in-jsx-scope": "off",

      // Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // Vite HMR
      "react-refresh/only-export-components": "warn",

      // Prettier
      "prettier/prettier": "warn",
    },
  },
];
