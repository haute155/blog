import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export interface Series {
  /** URL 슬러그 (시리즈 yaml 파일명) */
  id: string;
  name: string;
  description?: string | undefined;
  /** 발행일 오름차순 — 1편부터 */
  posts: BlogPost[];
}

/** 글이 1편 이상 있는 시리즈만, 정의 순서대로 반환 */
export async function getAllSeries(): Promise<Series[]> {
  const seriesEntries = await getCollection("series");
  const posts = (
    await getCollection("blog", ({ data }) => !data.draft && data.series)
  ).sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf());

  return seriesEntries
    .map((entry) => ({
      id: entry.id,
      name: entry.data.name,
      description: entry.data.description,
      posts: posts.filter((post) => post.data.series?.id === entry.id),
    }))
    .filter((series) => series.posts.length > 0);
}

export async function getSeriesById(id: string): Promise<Series | undefined> {
  return (await getAllSeries()).find((series) => series.id === id);
}

/** 시리즈 id → 표시 이름 (목록 카드에서 시리즈명 라벨용) */
export async function getSeriesNameMap(): Promise<Map<string, string>> {
  const entries = await getCollection("series");
  return new Map(entries.map((entry) => [entry.id, entry.data.name]));
}
