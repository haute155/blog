import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

/** 시리즈 이름 → 발행일 오름차순(1편부터) 글 목록 */
export async function getAllSeries(): Promise<Map<string, BlogPost[]>> {
  const posts = (
    await getCollection("blog", ({ data }) => !data.draft && data.series)
  ).sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());

  const series = new Map<string, BlogPost[]>();
  for (const post of posts) {
    const name = post.data.series!;
    series.set(name, [...(series.get(name) ?? []), post]);
  }
  return series;
}
