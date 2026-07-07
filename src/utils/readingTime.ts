/** 한글 ~500자/분, 영문 ~200단어/분 기준 예상 읽기 시간(분) */
export function getReadingTime(body: string | undefined): number {
  if (!body) return 1;

  const text = body
    .replace(/```[\s\S]*?```/g, "") // 코드 블록 제외
    .replace(/<[^>]+>/g, "")
    .replace(/[#>*_[\]()!`~-]/g, "");

  const cjkChars = (text.match(/[ㄱ-힝一-鿿]/g) ?? []).length;
  const words = text
    .replace(/[ㄱ-힝一-鿿]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(cjkChars / 500 + words / 200));
}
