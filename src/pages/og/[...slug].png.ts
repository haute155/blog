import type { APIContext } from "astro";
import { getCollection } from "astro:content";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";
import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import path from "node:path";
import { SITE_TITLE } from "../../consts";
import { formatDate } from "../../utils/date";

interface OgProps {
  title: string;
  description: string;
  tag: string;
  date: string;
}

export async function getStaticPaths() {
  const posts = await getCollection("blog", ({ data }) => !data.draft);
  const notes = await getCollection("notes", ({ data }) => !data.draft);

  return [
    ...posts.map((post) => ({
      params: { slug: `posts/${post.id}` },
      props: {
        title: post.data.title,
        description: post.data.description,
        tag: post.data.tags[0] ?? "Tech",
        date: formatDate(post.data.pubDate),
      } satisfies OgProps,
    })),
    ...notes.map((note) => ({
      params: { slug: `notes/${note.id}` },
      props: {
        title: note.data.title,
        description: note.data.description,
        tag: `🌱 ${note.data.tags[0] ?? "Note"}`,
        date: `업데이트 ${formatDate(note.data.updatedDate)}`,
      } satisfies OgProps,
    })),
  ];
}

const require = createRequire(import.meta.url);
const fontDir = path.join(
  path.dirname(require.resolve("pretendard/package.json")),
  "dist/public/static",
);

async function loadFonts() {
  const [medium, bold, extraBold] = await Promise.all([
    readFile(path.join(fontDir, "Pretendard-Medium.otf")),
    readFile(path.join(fontDir, "Pretendard-Bold.otf")),
    readFile(path.join(fontDir, "Pretendard-ExtraBold.otf")),
  ]);
  return [
    {
      name: "Pretendard",
      data: medium,
      weight: 500 as const,
      style: "normal" as const,
    },
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

const coffeeCup = element(
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
);

/** 배경 장식 원 — 기본 OG 이미지(og-default)와 같은 무드 */
function circle(size: number, top: number, left: number, opacity: number) {
  return element("div", {
    style: {
      position: "absolute",
      width: `${size}px`,
      height: `${size}px`,
      top: `${top}px`,
      left: `${left}px`,
      borderRadius: "50%",
      background: "#007FFF",
      opacity,
    },
  });
}

/** satori의 lineClamp(display:block)가 다어절 한글에서 파싱 오류를 내므로 글자 수로 자른다 */
function truncate(text: string, max: number) {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text;
}

export async function GET({ props }: APIContext) {
  const { title, description, tag, date } = props as OgProps;

  const tree = element(
    "div",
    {
      style: {
        position: "relative",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 80px",
        background: "linear-gradient(135deg, #f8fbff 0%, #eaf4ff 100%)",
        fontFamily: "Pretendard",
        overflow: "hidden",
      },
    },
    circle(520, -180, 880, 0.08),
    circle(400, 430, -120, 0.06),

    // 상단: 브랜드
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
            width: "68px",
            height: "68px",
            borderRadius: "18px",
            background: "linear-gradient(135deg, #007FFF, #59AFFF)",
          },
        },
        coffeeCup,
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            color: "#111827",
            fontSize: "32px",
            fontWeight: 800,
          },
        },
        SITE_TITLE,
      ),
    ),

    // 중앙: 제목 + 설명 (계층 텍스트)
    element(
      "div",
      {
        style: {
          display: "flex",
          flexDirection: "column",
          gap: "24px",
          maxWidth: "1000px",
        },
      },
      element(
        "div",
        {
          style: {
            display: "flex",
            color: "#111827",
            fontSize: title.length > 40 ? "56px" : "64px",
            fontWeight: 800,
            lineHeight: 1.25,
            letterSpacing: "-2px",
            wordBreak: "keep-all",
          },
        },
        truncate(title, 60),
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            color: "#6b7280",
            fontSize: "28px",
            fontWeight: 500,
            lineHeight: 1.5,
            wordBreak: "keep-all",
          },
        },
        truncate(description, 80),
      ),
    ),

    // 하단: 태그 + 날짜 + 액센트 바
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
            fontSize: "24px",
            fontWeight: 700,
          },
        },
        tag,
      ),
      element(
        "div",
        {
          style: {
            display: "flex",
            color: "#6b7280",
            fontSize: "24px",
            fontWeight: 500,
          },
        },
        date,
      ),
      element("div", {
        style: {
          width: "140px",
          height: "6px",
          borderRadius: "3px",
          background: "#007FFF",
          marginLeft: "8px",
        },
      }),
    ),
  );

  const svg = await satori(tree as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: await loadFonts(),
  });

  const rendered = new Resvg(svg).render().asPng();

  // 팔레트 기반 변환 + 최대 압축으로 파일 크기 최소화 (SNS 로딩 속도)
  const png = await sharp(rendered)
    .png({
      compressionLevel: 9,
      adaptiveFiltering: true,
      palette: true,
      quality: 90,
    })
    .toBuffer();

  return new Response(new Uint8Array(png), {
    headers: { "Content-Type": "image/png" },
  });
}
