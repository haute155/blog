import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { SITE_TITLE } from "../../consts";

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: { slug: post.id },
    props: { title: post.data.title, tag: post.data.tags[0] ?? "Tech" },
  }));
}

const require = createRequire(import.meta.url);
const fontDir = path.join(
  path.dirname(require.resolve("pretendard/package.json")),
  "dist/public/static",
);

async function loadFonts() {
  const [bold, extraBold] = await Promise.all([
    readFile(path.join(fontDir, "Pretendard-Bold.otf")),
    readFile(path.join(fontDir, "Pretendard-ExtraBold.otf")),
  ]);
  return [
    {
      name: "Pretendard",
      data: bold,
      weight: 700 as const,
      style: "normal" as const,
    },
    {
      name: "Pretendard",
      data: extraBold,
      weight: 800 as const,
      style: "normal" as const,
    },
  ];
}

/** satori는 JSX 대신 순수 객체 트리도 받는다.
 * 주의: 자식이 없을 때 빈 배열을 넘기면 satori가 다중 자식으로 오판하므로 undefined로. */
function element(
  type: string,
  props: Record<string, unknown>,
  ...children: unknown[]
) {
  return {
    type,
    props: { ...props, children: children.length ? children : undefined },
  };
}

export async function GET({ props }: APIContext) {
  const { title, tag } = props as { title: string; tag: string };

  const tree = element(
    "div",
    {
      style: {
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(135deg, #f8fbff 0%, #eaf4ff 100%)",
        fontFamily: "Pretendard",
      },
    },
    element(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "20px" } },
      element(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "72px",
            height: "72px",
            borderRadius: "20px",
            background: "linear-gradient(135deg, #007FFF, #59AFFF)",
          },
        },
        element(
          "svg",
          {
            width: 40,
            height: 40,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#ffffff",
            strokeWidth: 2,
            strokeLinecap: "round",
            strokeLinejoin: "round",
          },
          element("path", { d: "M10 2v2" }),
          element("path", { d: "M14 2v2" }),
          element("path", {
            d: "M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1",
          }),
          element("path", { d: "M6 2v2" }),
        ),
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            color: "#111827",
            fontSize: "34px",
            fontWeight: 800,
          },
        },
        SITE_TITLE,
      ),
    ),
    element(
      "div",
      {
        style: {
          display: "flex",
          color: "#111827",
          fontSize: title.length > 40 ? "58px" : "68px",
          fontWeight: 800,
          lineHeight: 1.25,
          letterSpacing: "-2px",
          wordBreak: "keep-all",
        },
      },
      title,
    ),
    element(
      "div",
      { style: { display: "flex", alignItems: "center", gap: "16px" } },
      element(
        "div",
        {
          style: {
            display: "flex",
            padding: "10px 22px",
            borderRadius: "999px",
            background: "#007FFF",
            color: "#ffffff",
            fontSize: "26px",
            fontWeight: 700,
          },
        },
        tag,
      ),
      element("div", {
        style: {
          width: "160px",
          height: "6px",
          borderRadius: "3px",
          background: "#007FFF",
        },
      }),
    ),
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });

  const png = new Resvg(svg).render().asPng();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
