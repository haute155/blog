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

  // .astro 프론트매터의 TypeScript 문법 파싱 — pnpm의 엄격한 node_modules에서는
  // 파서를 명시적으로 지정해야 한다 (npm 호이스팅에 의존하던 암묵 해석이 동작하지 않음)
  {
    files: ["**/*.astro"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },

  // Disable all ESLint rules that conflict with Prettier — must be last
  prettier,
];
