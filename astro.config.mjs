import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import pagefind from "astro-pagefind";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // 커스텀 도메인을 붙이면 이 값만 바꾸면 canonical/sitemap/RSS/robots가 전부 따라온다
  site: "https://blog.haute155.workers.dev",
  integrations: [mdx(), sitemap(), pagefind()],
  markdown: {
    shikiConfig: {
      // 라이트/다크 듀얼 테마 — 다크 전환은 global.css의 .astro-code 규칙이 처리
      themes: { light: "github-light", dark: "github-dark" },
      transformers: [
        {
          // ```ts title="src/foo.ts" 의 title을 data 속성으로 — CSS가 파일명 바로 그린다
          pre(node) {
            const meta = this.options.meta?.__raw ?? "";
            const title = meta.match(/title="([^"]+)"/)?.[1];
            if (title) node.properties["data-title"] = title;
          },
        },
      ],
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
