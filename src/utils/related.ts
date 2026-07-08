import type { CollectionEntry } from "astro:content";

type BlogPost = CollectionEntry<"blog">;

/**
 * 태그 겹침 기반 관련 글.
 * 점수가 같으면 최신 글 우선, 관련 글이 부족하면 최신 글로 채운다.
 */
export function getRelatedPosts(
  current: BlogPost,
  all: BlogPost[],
  limit = 3,
): BlogPost[] {
  const candidates = all.filter((post) => post.id !== current.id);

  const scored = candidates
    .map((post) => {
      const sharedTags = post.data.tags.filter((tag) =>
        current.data.tags.includes(tag),
      ).length;
      return { post, score: sharedTags * 2 };
    })
    .filter(({ score }) => score > 0)
    .sort(
      (a, b) =>
        b.score - a.score ||
        b.post.data.pubDate.valueOf() - a.post.data.pubDate.valueOf(),
    )
    .map(({ post }) => post);

  const fallback = candidates
    .filter((post) => !scored.includes(post))
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());

  return [...scored, ...fallback].slice(0, limit);
}
