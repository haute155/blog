# 오뜨와 아아

아아 한 잔과 읽는 웹 개발 이야기 — Astro 기반 기술 블로그입니다.

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

| 컬렉션               | 성격                                |
| -------------------- | ----------------------------------- |
| `src/content/posts/` | 정제된 글 (태그/드래프트 지원)      |
| `src/content/notes/` | 문제 해결 과정의 기록 — 경험과 생각 |

frontmatter에 `draft: true`를 넣으면 목록/빌드에서 제외됩니다.

## 주요 기능

- 다크 모드 (시스템 설정 감지 + 수동 토글, FOUC 방지)
- 태그 필터(Blog 목록 상단 칩), 페이지네이션, 검색 팝업(⌘K) + 전체 결과 페이지
- 글 상세: 목차(플로팅 스크롤 스파이), 이전/다음 글, 관련 글 추천(태그 겹침 기반),
  공유 버튼(링크 복사·X), giscus 댓글, 수정일 표시
- 코드 블록: hover 복사 버튼, ` ```lang title="파일명" ` 라벨
- SEO: canonical/OG/Twitter 메타, JSON-LD, sitemap, robots.txt,
  글별 OG 이미지 자동 생성(satori), RSS 전문 피드(`/rss.xml`)
- `/archive` 연도별 전체 글 목록

## 배포 전 할 일

- [ ] `astro.config.mjs`의 `site`를 실제 도메인으로 교체
