# Azure Notes

007FFF 컬러를 기반으로 브랜딩한 Astro 기술 블로그입니다.

## 실행

[mise](https://mise.jdx.dev)가 `mise.toml`에 고정된 Node 22 / pnpm 10을 자동으로 맞춰줍니다.

```bash
mise install     # 최초 1회 — Node/pnpm 설치
pnpm install
pnpm dev         # 개발 서버
pnpm build       # 프로덕션 빌드 (검색 인덱스 생성 포함)
pnpm preview     # 빌드 결과 미리보기
pnpm check       # astro check 타입 검사
pnpm lint        # ESLint
pnpm format      # Prettier
```

## 기술 스택

- **Astro 7** — Content Layer API 기반 정적 사이트, 클라이언트 JS 최소화
- **Tailwind CSS 4** — `@theme` 디자인 토큰 (라이트/다크 시맨틱 컬러)
- **MDX** — 글 안에서 `Callout`, `Image` 컴포넌트 사용
- **Pretendard** — 가변 폰트 self-host (dynamic subset)
- **Pagefind** — 빌드 타임 정적 검색 인덱스

## 콘텐츠 구조

| 컬렉션               | 성격                                            |
| -------------------- | ----------------------------------------------- |
| `src/content/blog/`  | 완성된 포스트 (발행일 중심, 태그/드래프트 지원) |
| `src/content/notes/` | 자라는 문서(디지털 가든) — 수정일 중심          |

frontmatter에 `draft: true`를 넣으면 목록/빌드에서 제외됩니다.

## 주요 기능

- 다크 모드 (시스템 설정 감지 + 수동 토글, FOUC 방지)
- 태그 필터(Blog 목록 상단 칩), 페이지네이션, 전문 검색(`/search`)
- 글 상세: 목차, 이전/다음 글, 읽기 시간
- SEO: canonical/OG/Twitter 메타, JSON-LD, sitemap, RSS(`/rss.xml`), robots.txt
- View Transitions 페이지 전환

## 배포 전 할 일

- [ ] `astro.config.mjs`의 `site`를 실제 도메인으로 교체
