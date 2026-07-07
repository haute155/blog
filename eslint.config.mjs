import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";

export default [
  // Ignore generated / build output
  { ignores: ["dist/", ".astro/", "node_modules/"] },

  // JS base rules
  js.configs.recommended,

  // TypeScript rules
  ...tseslint.configs.recommended,

  // Astro rules (includes astro-eslint-parser for .astro files)
  ...astro.configs.recommended,

  // React + React Hooks rules (applied only to .ts/.tsx files)
  {
    files: ["**/*.{ts,tsx}"],
    plugins: {
      react,
      "react-hooks": reactHooks,
    },
    settings: {
      react: { version: "detect" },
    },
    rules: {
      ...react.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,

      // Not needed with React 17+ automatic JSX transform
      "react/react-in-jsx-scope": "off",
      // TypeScript handles prop types
      "react/prop-types": "off",
    },
  },

  // Disable all ESLint rules that conflict with Prettier — must be last
  prettier,
];
