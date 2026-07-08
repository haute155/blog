import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

const blog = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{md,mdx}",
    base: "./src/content/posts",
    // 폴더는 정리용일 뿐 URL에 반영하지 않는다 — 파일명만이 슬러그.
    // (연도/주제별로 폴더를 옮겨도 글 주소가 바뀌지 않음. 단, 파일명은 전역 유일해야 함)
    generateId: ({ entry }) =>
      entry
        .split("/")
        .pop()!
        .replace(/\.(md|mdx)$/, ""),
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      tags: z.array(z.string()).default([]),
      /** 목록 카드/OG에 쓸 대표 이미지 — astro:assets 최적화 파이프라인을 탄다 */
      heroImage: image().optional(),
      draft: z.boolean().default(false),
    }),
});

/** 문제 해결 과정 기록 — 겪은 순서대로 쌓이는 짧은 글 */
const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  notes,
};
