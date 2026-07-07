import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // TODO: 실제 배포 도메인으로 교체 (sitemap/RSS/canonical URL이 이 값을 사용)
  site: "https://example.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // 라이트/다크 듀얼 테마 — 다크 전환은 global.css의 .astro-code 규칙이 처리
      themes: { light: "github-light", dark: "github-dark" },
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
