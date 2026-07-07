import { defineCollection, reference } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

/** 연재 시리즈 정의 — 파일명(영문 슬러그)이 URL, name이 표시 이름 */
const series = defineCollection({
  loader: glob({
    pattern: "**/[^_]*.{yaml,yml}",
    base: "./src/content/series",
  }),
  schema: z.object({
    name: z.string(),
    description: z.string().optional(),
  }),
});

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    /** 연재 시리즈 참조 — 없는 시리즈를 쓰면 빌드 에러로 잡힌다 */
    series: reference("series").optional(),
    draft: z.boolean().default(false),
  }),
});

/** 자라는 문서(디지털 가든) — 발행일 대신 수정일 중심 */
const notes = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/notes" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    createdDate: z.coerce.date(),
    updatedDate: z.coerce.date(),
    tags: z.array(z.string()).default([]),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  blog,
  notes,
  series,
};
