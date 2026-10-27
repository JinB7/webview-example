---
name: brew-design-system
description: Brew(Claude Design) 디자인을 Tailwind로 구현·수정·리뷰할 때 사용. brew.tokens.json 토큰이 globals.css에서 어떤 유틸리티 클래스로 매핑되는지, 어디에 써야 하고 무엇을 쓰면 안 되는지 정리한 기준 문서.
---

# Brew 디자인 시스템 (Tailwind v4)

모바일 WebView 이벤트 페이지. 기준 폭 390px, 라이트 테마만.

- 토큰 원본: `brew.tokens.json` — 값과 용도(usage)의 기준
- 구현: `globals.css` — `:root` 변수 + `@theme`로 Tailwind 유틸리티 매핑
- 컴포넌트에서는 **아래 표의 유틸리티 클래스만** 쓴다. 토큰 이름을 클래스에 그대로 옮기지 않는다 (`text-text-primary` ✗ → `text-fg` ✓).

## 가장 흔한 실수: 토큰 숫자 ≠ Tailwind 숫자

토큰 `space-8`은 8px이지만 Tailwind `p-8`은 32px이다. 토큰 숫자를 클래스에 옮겨 적지 않는다.

| 토큰         | 값   | Tailwind 스텝                            |
| ------------ | ---- | ---------------------------------------- |
| space-4      | 4px  | `1` (`p-1`, `gap-1` …)                   |
| space-8      | 8px  | `2`                                      |
| space-12     | 12px | `3`                                      |
| space-16     | 16px | `4`                                      |
| space-24     | 24px | `6`                                      |
| space-gutter | 16px | `px-gutter` (화면 좌우 여백은 항상 이것) |

허용 스텝은 `0, 1, 2, 3, 4, 6`뿐이다. `0.5, 5, 7, 8, 10, 12, 16 …`은 쓰지 않는다.

## 색상

| 토큰                         | 클래스                                        | 용도                                                                    |
| ---------------------------- | --------------------------------------------- | ----------------------------------------------------------------------- |
| color-bg-canvas              | `bg-canvas`                                   | 페이지(앱 컬럼) 배경. 페이지 배경을 흰색으로 두지 않는다                |
| color-bg-surface             | `bg-surface`                                  | CouponCard, Modal, 폼 필드(TextField·TextArea) 면                       |
| color-bg-banner              | `bg-banner`                                   | Banner 면. 그 위에는 on-dark 텍스트만                                   |
| color-bg-overlay             | `bg-overlay`                                  | Modal 뒤 딤. safe area 포함 화면 전체                                   |
| color-action-primary         | `bg-action` / `border-action` / `text-action` | primary 버튼 면, outlined 버튼 테두리·라벨                              |
| color-action-on-primary      | `text-on-action`                              | primary 버튼 라벨                                                       |
| color-action-disabled        | `bg-action-muted`                             | disabled 버튼 면 (테두리 없음)                                          |
| color-action-on-disabled     | `text-on-action-muted`                        | disabled 버튼 라벨                                                      |
| color-text-accent            | `text-accent`                                 | **할인 숫자와 Modal 제목에만**                                          |
| color-text-primary           | `text-fg`                                     | 쿠폰명, 본문, 섹션 라벨, 필드 라벨, 입력한 텍스트                       |
| color-text-secondary         | `text-fg-secondary`                           | 캡션, 메타, 유효기간, 필드 helper·카운터·placeholder                    |
| color-text-error             | `text-error`                                  | 필드 에러 메시지와 경고 아이콘. 색만으로 알리지 않고 항상 텍스트+아이콘 |
| color-text-on-dark           | `text-on-dark`                                | Banner 제목                                                             |
| color-text-on-dark-secondary | `text-on-dark-secondary`                      | Banner 보조 문구                                                        |
| color-border-divider         | `border-divider`                              | Modal 섹션 사이 헤어라인 1개. 의미 구분을 이 선에만 맡기지 않는다       |
| color-border-field           | `border-field`                                | 기본 상태 TextField·TextArea의 1px 테두리                               |
| color-border-error           | `border-field-error`                          | 에러 상태 필드의 2px 테두리. 항상 에러 메시지와 함께 쓴다               |
| color-focus-ring             | (클래스 쓰지 않음)                            | `globals.css`의 `:focus-visible`이 전역 처리                            |

## 타이포그래피

5개 스타일만 쓴다. 각 클래스에 크기·행간·굵기·자간이 모두 들어 있으므로 `font-*`(굵기), `leading-*`, `tracking-*`를 덧붙이지 않는다.

| 클래스              | 스펙      | 용도                                                                       | 색                                                                                                         |
| ------------------- | --------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `text-banner-title` | 24/32 700 | Banner 제목 전용, 최대 2줄                                                 | `text-on-dark`                                                                                             |
| `text-discount`     | 28/32 700 | CouponCard 할인 숫자. 숫자와 %만, 문장 금지                                | `text-accent`                                                                                              |
| `text-card-title`   | 16/24 600 | 쿠폰명, Modal 제목, 버튼 라벨                                              | `text-fg` (Modal 제목은 `text-accent`)                                                                     |
| `text-body`         | 16/24 400 | Modal 조건, 본문, 필드에 입력한 텍스트                                     | `text-fg`                                                                                                  |
| `text-caption`      | 13/20 400 | 카드 메타, Modal 섹션 라벨, Banner 보조 문구, 필드 라벨·카운터·helper·에러 | `text-fg-secondary` (필드 라벨은 `text-fg`, 에러는 `text-error`, Banner 위에서는 `text-on-dark-secondary`) |

## 모양·그림자·크기·인터랙션

| 클래스                           | 용도                                                                                                    |
| -------------------------------- | ------------------------------------------------------------------------------------------------------- |
| `rounded-surface`                | CouponCard, Modal, TextField, TextArea                                                                  |
| `rounded-pill`                   | **모든** 버튼. 각진 버튼 없음                                                                           |
| `shadow-card`                    | 캔버스 위 CouponCard                                                                                    |
| `shadow-modal`                   | 오버레이 위 Modal                                                                                       |
| `min-h-touch`                    | 탭 가능한 모든 요소 (버튼, Modal 닫기) — 44px 이상                                                      |
| `min-h-field-sm`                 | TextField sm 44px — 나란히 놓는 필드, 인라인 필터, Modal 안 필드. 좌우 패딩 `px-3`                      |
| `min-h-field-md`                 | TextField md 48px (기본) — 쿠폰 등록 같은 일반 폼. 좌우 패딩 `px-4`                                     |
| `min-h-field-lg`                 | TextField lg 56px — 화면의 메인 입력 하나 (쿠폰 코드 입력). 좌우 패딩 `px-4`, 글자는 `text-body` 그대로 |
| (TextArea)                       | 좌우 패딩은 md와 같은 `px-4`, 위아래 `py-3`. 높이는 행당 24px씩 늘어난다                                |
| `pressable`                      | **모든** 버튼. scale 0.95 / 200ms, disabled는 눌리지 않음                                               |
| `max-w-app mx-auto`              | 앱 컬럼 (480px, 넓은 화면에서 가운데 정렬)                                                              |
| `pt-safe-top` / `pb-safe-bottom` | safe area 단독으로 쓸 때                                                                                |

`max-w-viewport`(390px)는 기준 폭 참고값이다. 레이아웃을 이 폭에 고정하지 않는다.

### safe area와 합산하는 값 (허용된 임의값은 이 두 개뿐)

- Banner 위 패딩 = space-24 + safe-area-top → `pt-[calc(var(--space-24)_+_var(--safe-area-top))]`
- 페이지 아래 패딩 = space-24 + safe-area-bottom → `pb-[calc(var(--space-24)_+_var(--safe-area-bottom))]`

Banner 면은 상태바 뒤까지 꽉 채우고, 내용만 `px-gutter`를 따른다.

## 버튼 변형

공통: `rounded-pill min-h-touch pressable text-card-title`

| 변형     | 클래스                                                   | 예                                                             |
| -------- | -------------------------------------------------------- | -------------------------------------------------------------- |
| primary  | `bg-action text-on-action`                               | '쿠폰 받기', '닫기'                                            |
| outlined | `border-action text-action`                              | 테두리 두께와 면 색은 토큰에 없음 → 디자인 HTML 확인           |
| disabled | `bg-action-muted text-on-action-muted` + `disabled` 속성 | '받기 완료' — 상태 표시이므로 `opacity-*`로 흐리게 하지 않는다 |

## 금지

- hex·rgb 임의값: `bg-[#00754a]`, `text-[rgba(...)]`, `style={{ color: ... }}`
- Tailwind 기본 팔레트: `bg-white`, `text-black`, `text-gray-*`, `bg-green-*` 등 (globals.css에서 꺼져 있지 않아 생성은 되지만 쓰지 않는다)
- 표에 없는 반경·그림자: `rounded-lg`, `rounded-full`, `shadow-md` 등
- 타이포 덧붙이기: `font-semibold`, `leading-6`, `tracking-tight` 등
- 포커스 제거·대체: `outline-none`, `focus:outline-none`, `focus:ring-*`
- 버튼 누름 효과 직접 작성: `active:scale-*`, `transition-*` (→ `pressable` 사용)

## 토큰에 없는 값을 만나면

값을 지어내지 않는다. 아래 순서로 확인한다.

1. `brew.tokens.json`의 usage 문구
2. Claude Design 핸드오프 번들의 HTML과 chats
3. 그래도 없으면 작업을 멈추고 사용자에게 묻는다 (예: outlined 테두리 두께, Modal 최대 높이 계산식, Banner 제목이 2줄을 넘을 때 처리)

## 작성 후 자가 점검

이번에 만들거나 수정한 파일에 대해 실행하고, 결과가 나오면 위 표 기준으로 고친다.
