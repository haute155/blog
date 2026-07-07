import js from "@eslint/js";
import tseslint from "typescript-eslint";
import astro from "eslint-plugin-astro";
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

  // Disable all ESLint rules that conflict with Prettier — must be last
  prettier,
];
