# Dearby Design System

Dearby 시안 아티팩트(홈·상세 리뉴얼, Loopers 참고 적용, 웹 시안)의 화면 요소를 **shadcn/ui** 위에 다시 만든 디자인 시스템입니다. 웹(dearby-web)은 이 레포를 패키지로 받아 씁니다([패키지로 받아 쓰기](#패키지로-받아-쓰기)).

**Storybook**: https://fixabley.github.io/dearby-design-system/

## 구조

```
src/
  globals.css              Storybook 진입점: Tailwind v4 다음에 styles.css
  styles.css               Dearby 토큰을 shadcn 이름에 덮어씌움 · Pretendard · 다크(.dk) · 기본 스타일(패키지로 내보냄)
  components/
    foundations/           Icon(시안 아이콘)
    ui/                    shadcn 원본(Radix + cva) + Dearby 디자인
    atoms/<도메인>/
    molecules/<도메인>/
    organisms/<도메인>/
    templates/shared/
  stories/foundations/     Colors · Typography · Radius & Shadow · Motion · Lite Markdown 스토리
  icons.ts                 시안의 아이콘(SVG 원문, 영문 키)
  types.ts · data.ts       예시 데이터 타입과 값
```

- 컴포넌트는 `components/<층>/<도메인>/<이름>.tsx` 하나에 하나씩 두고, 스토리는 옆(`<이름>.stories.tsx`)에 둡니다. 도메인이 없는 것은 `shared`에 둡니다.
- shadcn 원본은 `components/ui`에 그대로 두고, Storybook에서는 층마다 맨 앞 `shadcn` 묶음(`Atoms › shadcn`, `Molecules › shadcn`)에 보입니다.
- import는 `@/components/<층>/<도메인>/<이름>`으로 씁니다. 층마다 `index.ts`가 모두 내보내고 `src/index.ts`가 다시 내보냅니다.
- 스토리 제목은 `<층>/<도메인>/<이름>`(도메인은 영문 첫 글자 대문자: Shared · Activity · Program …)이고, id는 `<층>-<이름 소문자>`로 적어 둡니다. 도메인을 옮겨도 주소가 그대로입니다. shadcn 원본의 id는 예전 주소대로 `ui-shadcn-<이름>`입니다.

| 경로 | 컴포넌트 |
| --- | --- |
| `ui/` · Atoms › shadcn | Avatar · Badge · Button · Checkbox · Input · Label · ScrollArea · Separator · Switch · Toggle |
| `ui/` · Molecules › shadcn | Alert · ButtonGroup · Calendar · Card · Command · ContextMenu · Dialog · DropdownMenu · Empty · Field · InputGroup · Item · Popover · RadioGroup · Select · Sheet · Sonner · ToggleGroup · Tooltip |
| `atoms/shared/` | Text · Wordmark · DDay · Thumbnail · RowList · Pane(PaneFooter · FloatingBar) |
| `atoms/activity/` | KindLabel · StatusGlyph |
| `molecules/shared/` | ListGroup(ListRow) · TextField · Timeline · MetaLine(MetaList) · TrackPicker · SearchBar · QueueCard · GlassGroup · Segmented · SocialLinks · DateHeader · DatePicker · TimePicker |
| `molecules/activity/` | ActionTile(ActionTiles) · ProgressTrack · LiveToggle |
| `molecules/program/` | HostLine |
| `molecules/review/` | ReviewCard · ReviewSummary |
| `molecules/submission/` | SubmissionRow |
| `molecules/timetable/` | TimetableButton · WeekdayPicker |
| `molecules/notice/` | Notice |
| `molecules/discord/` | ChannelSelect |
| `molecules/team/` | TeamColumn |
| `organisms/shared/` | FilterSheet · Sidebar · TabBar · TopBar · DateTimeField · DateSectionList |
| `organisms/activity/` | ActivityRow · ActivityDetail · DetailHeader · ApplyCard · ScheduleCard, 관리 탭 상수(`constants.ts`) |
| `organisms/program/` | ProgramDetail · ProgramRow |
| `organisms/review/` | ReviewSection |
| `organisms/submission/` | SubmissionList · EvaluationForm |
| `organisms/timetable/` | ConferenceTimetable · WeeklyTimetable · ScheduleItemDialog · BlockEditor |
| `organisms/notice/` | NoticeComposer(NoticeForm · NoticePreview) |
| `organisms/discord/` | ChannelTemplate · ServerPicker |
| `organisms/team/` | TeamBoard |
| `organisms/profile/` | ProfileHeader |
| `templates/shared/` | WebShell · Layouts(TwoPane · EvenSplit · TwoColumnList · DetailWithAside · SidebarDetail · ThreeColumnEditor · ManageLayout) · Modal · PhoneFrame |

## 층 규칙

| 층 | 순위 | 참조할 수 있는 것 |
| --- | --- | --- |
| Foundations | 0 | 토큰(색 · 글자 · 모서리 · 그림자 · 움직임), `Icon` |
| Atoms | 1 | Foundations, Atoms 층 shadcn 원본 |
| Molecules | 2 | 그 아래 전부, Molecules 층 shadcn 원본 |
| Organisms | 3 | 그 아래 전부, 다른 Organism(순환 금지) |
| Templates | 4 | 그 아래 전부 |

- 위 층은 참조하지 않습니다. 같은 층에서는 shadcn 원본만 감싸 쓸 수 있고, 유기체끼리만 서로 품을 수 있습니다(순환 금지).
- shadcn 원본의 층은 옆 스토리 제목(`Atoms/shadcn/…` 또는 `Molecules/shadcn/…`)으로 정합니다.
- Foundations는 부품이 아니라 재료라서 조합으로 세지 않습니다. 부품을 조합할 때만 한 층 올라갑니다.
  재료만 쓰거나 shadcn 원본 하나를 감싸면 그 층에 머물고(Thumbnail은 Avatar를 감싼 아톰, Segmented는 ToggleGroup을 감싼 분자), 부품을 조합하면 한 층 위입니다(HostLine은 Avatar와 Text를 조합한 분자).
- **글자는 `Text` 아톰으로.** 분자 이상은 글자 크기 · 굵기 · 줄 높이 · 자간 클래스를 쓰지 않고 `Text`로 그립니다. shadcn 원본은 예외입니다.
  글자 토큰 8개(Foundations › Typography)는 `Text`의 역할 11가지(Atoms › Shared › Text › Scale)로 씁니다. `leading="tight"`는 아바타 옆 한 줄 메타(HostLine)만 씁니다.
- 분자 이상은 컴파운드 컴포넌트(루트 + 부품, children이 없으면 기본 조립)로 만듭니다.

```sh
npm run check   # 위 층 참조, 같은 층 참조(shadcn 원본 빼고), 유기체 순환, 분자 이상의 글자 스타일 클래스
```

## manage 태그

개설자가 활동을 운영하는 화면에만 쓰는 컴포넌트에는 Storybook 태그 `manage`를 붙입니다: BlockEditor · ChannelTemplate · EvaluationForm · NoticeComposer · ServerPicker · SubmissionList · TeamBoard · ManageLayout. 사이드바의 태그 거르기로 모아 보거나 뺄 수 있습니다.
manage라는 도메인은 따로 두지 않습니다. 관리 탭 목록과 이름(`MANAGE_TABS`, `MANAGE_TAB_LABEL`)은 활동 도메인(`organisms/activity/constants.ts`)이 갖고, `ManageLayout`은 `tabs` · `labels`로 받기만 합니다.

## 실행

```sh
npm ci
npm run storybook        # http://localhost:6008
npm run build-storybook  # storybook-static/
npm run build            # dist/ 라이브러리(ESM과 .d.ts). npm ci 때 prepare로도 돈다
```

`main`에 올리면 GitHub Actions가 Storybook을 빌드해 Pages에 배포합니다. PR에서는 lint · 타입 검사 · 층 검사 · Storybook 빌드만 돌립니다.

## 린트

```sh
npm run lint    # ESLint
npm run hooks   # 처음 한 번: 커밋할 때 lint가 돌게 훅 경로를 잡는다
```

- 설정은 `eslint.config.js`입니다: JS·TS 권장 규칙, Storybook, React hooks(웹과 같은 recommended), 따옴표. 모양 규칙은 따옴표뿐이고(문자열은 작은따옴표, 이스케이프를 피할 때만 큰따옴표, JSX 속성은 큰따옴표로 웹과 같음) 나머지 모양은 `.editorconfig`를 따릅니다. `npm run lint -- --fix`로 고칠 수 있습니다.
- 저장할 때: 편집기의 ESLint 연동을 켭니다. IntelliJ는 Settings › Languages & Frameworks › JavaScript › Code Quality Tools › ESLint에서 자동 구성과 `Run eslint --fix on save`를 켭니다.
- 커밋할 때: `npm run hooks`가 `git config core.hooksPath .githooks`를 잡으면 커밋마다 `.githooks/pre-commit`이 `npm run lint`를 돌리고, 실패하면 커밋이 막힙니다. git 의존성으로 받아 쓰는 쪽(웹)의 설치에서 돌지 않게 `prepare` · `postinstall`에는 넣지 않았습니다. 이 설정은 저장소의 모든 worktree에 함께 적용됩니다.

## 패키지로 받아 쓰기

받아 쓰는 쪽에는 React 19와 Tailwind 4가 있어야 합니다(peer 의존성). git 의존성으로 커밋을 박아 받습니다.

```json
{
  "dependencies": { "@dearby/design-system": "github:fixabley/dearby-design-system#<커밋>" },
  "allowScripts": { "github:fixabley/dearby-design-system": true }
}
```

- npm은 git 의존성을 설치할 때 이 레포를 받아 devDependencies를 깔고 `prepare`(`npm run build`)로 `dist`를 만든 뒤, `files`에 적은 것(dist · src/styles.css · static/fonts)만 담습니다. dist는 커밋하지 않습니다.
- npm 11.19부터는 git 의존성의 `prepare`도 허용 목록(`allowScripts`)으로 확인합니다. 지금은 경고만 내지만 막히지 않게 위처럼 적어 둡니다. 커밋 없이 적었으니 버전을 올려도 고칠 필요가 없습니다.
- 버전을 올릴 때는 커밋 해시를 바꾸고 `npm install`로 package-lock.json을 함께 갱신합니다.

| 가져오는 경로 | 내용 |
| --- | --- |
| `@dearby/design-system` | 컴포넌트 · 타입 · 아이콘 · `cn` · `renderLite` |
| `@dearby/design-system/data` | 시안 예시 데이터(`ACTIVITIES` 등) |
| `@dearby/design-system/styles.css` | 토큰(@theme) · Pretendard · 다크(.dk) · 기본 스타일 |
| `@dearby/design-system/fonts/*` | Pretendard 파일 |

### 스타일

```css
/* 받아 쓰는 쪽의 전역 CSS(예: src/app/globals.css) */
@import "tailwindcss";
@import "@dearby/design-system/styles.css";
@source "../../node_modules/@dearby/design-system/dist";
```

- `styles.css`는 Tailwind를 부르지 않으니 받아 쓰는 쪽이 `@import "tailwindcss"`를 먼저 합니다.
- Tailwind는 node_modules를 스스로 읽지 않습니다. `@source`로 dist를 알려 줘야 컴포넌트가 쓰는 클래스가 만들어집니다. 경로는 그 CSS 파일 기준입니다.
- 글꼴은 `styles.css` 기준 상대 경로로 적혀 있어 Tailwind 4(@tailwindcss/postcss · @tailwindcss/vite)가 경로를 다시 잡고, 번들러가 파일을 내보냅니다. 따로 손댈 것은 없습니다.
- 다크는 문서 루트(`<html>`)에 `.dk`를 붙입니다. 모달 · 메뉴 같은 포털까지 이어집니다.

### 컴포넌트

```tsx
import { ActivityRow, RowList } from "@dearby/design-system";
import { ACTIVITIES } from "@dearby/design-system/data";
```

- 컴포넌트 파일에는 `"use client"`가 붙어 있어 Next 서버 컴포넌트에서도 그릴 수 있습니다. 다만 `WebShell.Sidebar`처럼 점으로 꺼내는 부품은 서버 컴포넌트에서 꺼낼 수 없으니 `"use client"` 파일에서 조립합니다. `cn` · 아이콘 · 예시 데이터는 서버에서도 씁니다.
- 파일 구조를 그대로 내보내므로 쓰지 않는 컴포넌트는 받아 쓰는 쪽 번들에서 빠집니다.
- 예시 데이터의 이미지 경로(`img/…`)는 Storybook 정적 폴더 기준이라 패키지에 들어 있지 않습니다.

## 원칙

- 배지는 모두 캡슐. 청록 채움·민트·흰 바탕 테두리만 쓰고 빨강은 오류 전용, 회색 채움 배지는 없습니다.
- 누를 수 있는 컨트롤에만 그림자. 글자 토큰은 8개(`text-title` … `text-micro`), 화면에서는 `Text` 역할 11가지로 씁니다.
- 날짜는 `M월 d일 (요일)`(올해가 아니면 앞에 `yyyy년`), 실제 시각만 `HH:mm`. `오늘` 같은 상대 표기는 쓰지 않습니다. 표기 도우미는 `lib/date`에 있습니다.
- 움직임은 Radix의 `data-state`에 Tailwind 애니메이션을 붙입니다. 동작 줄이기 설정이면 모두 꺼집니다.
- 코드 식별자는 영문, 화면 글자만 한국어.

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard)(SIL OFL 1.1)입니다. 예시에 나오는 기관 이름·로고는 시안 확인용이며 각 기관에 권리가 있습니다.
