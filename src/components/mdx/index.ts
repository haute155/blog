// MDX 글에서 전역으로 사용할 수 있는 컴포넌트 모음.
// [slug].astro의 <Content components={mdxComponents} /> 로 주입됩니다.
// 개별 .mdx 파일에서 직접 import해서 쓸 수도 있습니다.

export { default as Image } from "./Image.astro";
export { default as Callout } from "./Callout.astro";
