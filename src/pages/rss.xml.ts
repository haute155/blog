import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { loadRenderers } from "astro:container";
import { getContainerRenderer as getMDXRenderer } from "@astrojs/mdx";
import * as mdxComponents from "../components/mdx/index";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context: APIContext) {
  const posts = (await getCollection("blog", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf(),
  );

  // RSS 리더 사용자를 위해 본문 전체를 피드에 포함한다.
  // MDX는 컴포넌트 렌더링이 필요하므로 Container API로 HTML 문자열을 만든다.
  const renderers = await loadRenderers([getMDXRenderer()]);
  const container = await AstroContainer.create({ renderers });

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const content = await container.renderToString(Content, {
        props: { components: mdxComponents },
      });

      return {
        title: post.data.title,
        description: post.data.description,
        pubDate: post.data.pubDate,
        categories: post.data.tags,
        link: `/blog/${post.id}/`,
        content,
      };
    }),
  );

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site!,
    items,
    customData: "<language>ko</language>",
  });
}
