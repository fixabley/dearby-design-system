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
  icons.ts                 시안의 아이콘과 서비스 로고(SVG 원문, 영문 키, 로고는 서비스 로고 절)
  types.ts · data.ts       예시 데이터 타입과 값
```

- 컴포넌트는 `components/<층>/<도메인>/<이름>.tsx` 하나에 하나씩 두고, 스토리는 옆(`<이름>.stories.tsx`)에 둡니다. 도메인이 없는 것은 `shared`에 둡니다.
- shadcn 원본은 `components/ui`에 그대로 두고, Storybook에서는 층마다 맨 앞 `shadcn` 묶음(`Atoms › shadcn`, `Molecules › shadcn`)에 보입니다.
- import는 `@/components/<층>/<도메인>/<이름>`으로 씁니다. 층마다 `index.ts`가 모두 내보내고 `src/index.ts`가 다시 내보냅니다.
- 스토리 제목은 `<층>/<도메인>/<이름>`(도메인은 영문 첫 글자 대문자: Shared · Activity · Program …)이고, id는 `<층>-<이름 소문자>`로 적어 둡니다. 도메인을 옮겨도 주소가 그대로입니다. shadcn 원본의 id는 예전 주소대로 `ui-shadcn-<이름>`입니다.

| 경로                       | 컴포넌트                                                                                                                                                                                           |
| -------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ui/` · Atoms › shadcn     | Avatar · Badge · Button · Checkbox · Input · Label · ScrollArea · Separator · Switch · Toggle                                                                                                      |
| `ui/` · Molecules › shadcn | Alert · ButtonGroup · Calendar · Card · Command · ContextMenu · Dialog · DropdownMenu · Empty · Field · InputGroup · Item · Popover · RadioGroup · Select · Sheet · Sonner · ToggleGroup · Tooltip |
| `atoms/shared/`            | Text · Wordmark · DDay · Thumbnail · RowList · Pane(PaneFooter · FloatingBar)                                                                                                                      |
| `atoms/activity/`          | KindLabel · StatusGlyph                                                                                                                                                                            |
| `molecules/shared/`        | ListGroup(ListRow) · TextField · Timeline · MetaLine(MetaList) · TrackPicker · SearchBar · QueueCard · GlassGroup · Segmented · SocialLinks · DateHeader · DatePicker · TimePicker                 |
| `molecules/activity/`      | ActionTile(ActionTiles) · ProgressTrack · LiveToggle                                                                                                                                               |
| `molecules/program/`       | HostLine                                                                                                                                                                                           |
| `molecules/review/`        | ReviewCard · ReviewSummary                                                                                                                                                                         |
| `molecules/submission/`    | SubmissionRow                                                                                                                                                                                      |
| `molecules/timetable/`     | TimetableButton · WeekdayPicker                                                                                                                                                                    |
| `molecules/notice/`        | Notice                                                                                                                                                                                             |
| `molecules/discord/`       | ChannelSelect                                                                                                                                                                                      |
| `molecules/team/`          | TeamColumn                                                                                                                                                                                         |
| `organisms/shared/`        | FilterSheet · Sidebar · TabBar · TopBar · DateTimeField · DateSectionList                                                                                                                          |
| `organisms/activity/`      | ActivityRow · ActivityDetail · DetailHeader · ApplyCard · ScheduleCard, 관리 탭 상수(`constants.ts`)                                                                                               |
| `organisms/program/`       | ProgramDetail · ProgramRow                                                                                                                                                                         |
| `organisms/review/`        | ReviewSection                                                                                                                                                                                      |
| `organisms/submission/`    | SubmissionList · EvaluationForm                                                                                                                                                                    |
| `organisms/timetable/`     | ConferenceTimetable · WeeklyTimetable · ScheduleItemDialog · BlockEditor                                                                                                                           |
| `organisms/notice/`        | NoticeComposer(NoticeForm · NoticePreview)                                                                                                                                                         |
| `organisms/discord/`       | ChannelTemplate · ServerPicker                                                                                                                                                                     |
| `organisms/team/`          | TeamBoard                                                                                                                                                                                          |
| `organisms/profile/`       | ProfileHeader                                                                                                                                                                                      |
| `templates/shared/`        | WebShell · Layouts(TwoPane · EvenSplit · TwoColumnList · DetailWithAside · SidebarDetail · ThreeColumnEditor · ManageLayout) · Modal · PhoneFrame                                                  |

## 층 규칙

| 층          | 순위 | 참조할 수 있는 것                                  |
| ----------- | ---- | -------------------------------------------------- |
| Foundations | 0    | 토큰(색 · 글자 · 모서리 · 그림자 · 움직임), `Icon` |
| Atoms       | 1    | Foundations, Atoms 층 shadcn 원본                  |
| Molecules   | 2    | 그 아래 전부, Molecules 층 shadcn 원본             |
| Organisms   | 3    | 그 아래 전부, 다른 Organism(순환 금지)             |
| Templates   | 4    | 그 아래 전부                                       |

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

`main`에 올리면 GitHub Actions가 Storybook을 빌드해 Pages에 배포합니다. PR에서는 포맷 확인 · lint · 타입 검사 · 층 검사 · Storybook 빌드만 돌립니다.

## 린트 · 포맷

```sh
npm run format        # Prettier로 모양을 고쳐 쓴다
npm run format:check  # 모양만 확인한다(CI · 커밋 훅)
npm run lint          # ESLint
npm run hooks         # 처음 한 번: 커밋할 때 포맷 확인과 lint가 돌게 훅 경로를 잡는다
```

- 모양은 Prettier가 맡습니다(`.prettierrc`): 한 줄 80자, 들여쓰기 2칸, 세미콜론, 작은따옴표(JSX 속성은 큰따옴표), 끝 쉼표 모두. 웹과 같은 설정입니다. 코드 파일(js · jsx · mjs · cjs · ts · tsx · css)에만 쓰고, 문서(md · mdx) · 설정 파일(json · yaml) · html · 빌드 결과물 · 받아 온 파일(`static/`)은 건드리지 않습니다(`.prettierignore`). 판마다 모양이 달라질 수 있어 Prettier 버전은 고정합니다.
- ESLint는 코드 문제만 봅니다(`eslint.config.js`): JS·TS 권장 규칙, Storybook, React hooks(웹과 같은 recommended). Prettier와 겹치는 규칙은 `eslint-config-prettier`로 끕니다. `npm run lint -- --fix`로 고칠 수 있는 것은 고칩니다.
- 저장할 때: 편집기의 Prettier와 ESLint 연동을 켭니다. IntelliJ는 Settings › Languages & Frameworks › JavaScript › Prettier에서 `Automatic Prettier configuration`, `Run on 'Reformat Code' action`, `Run on save`를 켜고, Code Quality Tools › ESLint에서 자동 구성과 `Run eslint --fix on save`를 켭니다.
- 커밋할 때: `npm run hooks`가 `git config core.hooksPath .githooks`를 잡으면 커밋마다 `.githooks/pre-commit`이 `npm run format:check`와 `npm run lint`를 돌리고, 실패하면 커밋이 막힙니다. git 의존성으로 받아 쓰는 쪽(웹)의 설치에서 돌지 않게 `prepare` · `postinstall`에는 넣지 않았습니다. 이 설정은 저장소의 모든 worktree에 함께 적용됩니다.
- 모양만 바꾼 커밋은 `.git-blame-ignore-revs`에 적습니다. GitHub의 blame은 이 파일을 스스로 읽고, 로컬에서는 `git config blame.ignoreRevsFile .git-blame-ignore-revs`를 한 번 잡습니다.

## 패키지로 받아 쓰기

받아 쓰는 쪽에는 React 19와 Tailwind 4가 있어야 합니다(peer 의존성). git 의존성으로 커밋을 박아 받습니다.

```json
{
  "dependencies": {
    "@dearby/design-system": "github:fixabley/dearby-design-system#<커밋>"
  },
  "allowScripts": { "github:fixabley/dearby-design-system": true }
}
```

- npm은 git 의존성을 설치할 때 이 레포를 받아 devDependencies를 깔고 `prepare`(`npm run build`)로 `dist`를 만든 뒤, `files`에 적은 것(dist · src/styles.css · static/fonts)만 담습니다. dist는 커밋하지 않습니다.
- npm 11.19부터는 git 의존성의 `prepare`도 허용 목록(`allowScripts`)으로 확인합니다. 지금은 경고만 내지만 막히지 않게 위처럼 적어 둡니다. 커밋 없이 적었으니 버전을 올려도 고칠 필요가 없습니다.
- 버전을 올릴 때는 커밋 해시를 바꾸고 `npm install`로 package-lock.json을 함께 갱신합니다.

| 가져오는 경로                      | 내용                                                |
| ---------------------------------- | --------------------------------------------------- |
| `@dearby/design-system`            | 컴포넌트 · 타입 · 아이콘 · `cn` · `renderLite`      |
| `@dearby/design-system/data`       | 시안 예시 데이터(`ACTIVITIES` 등)                   |
| `@dearby/design-system/styles.css` | 토큰(@theme) · Pretendard · 다크(.dk) · 기본 스타일 |

### 스타일

```css
/* 받아 쓰는 쪽의 전역 CSS(예: src/app/globals.css) */
@import 'tailwindcss';
@import '@dearby/design-system/styles.css';
@source "../../node_modules/@dearby/design-system/dist";
```

- `styles.css`는 Tailwind를 부르지 않으니 받아 쓰는 쪽이 `@import "tailwindcss"`를 먼저 합니다.
- Tailwind는 node_modules를 스스로 읽지 않습니다. `@source`로 dist를 알려 줘야 컴포넌트가 쓰는 클래스가 만들어집니다. 경로는 그 CSS 파일 기준입니다.
- 글꼴은 `styles.css`가 상대 경로로 부르는 Pretendard 가변 다이나믹 서브셋([글꼴](#글꼴))입니다. Tailwind 4(@tailwindcss/postcss · @tailwindcss/vite)가 그 CSS를 펼치며 글꼴 주소를 다시 잡고, 번들러가 woff2 92개를 내보냅니다. 브라우저는 화면에 있는 글자가 든 조각만 받습니다. 따로 손댈 것은 없습니다.
- 다크는 문서 루트(`<html>`)에 `.dk`를 붙입니다. 모달 · 메뉴 같은 포털까지 이어집니다. `.dk`는 `color-scheme: dark`도 켜서 브라우저 기본 컨트롤과 스크롤바도 어두워집니다(기본은 `light`).

### 컴포넌트

```tsx
import { ActivityRow, RowList } from '@dearby/design-system';
import { ACTIVITIES } from '@dearby/design-system/data';
```

- 컴포넌트 파일에는 `"use client"`가 붙어 있어 Next 서버 컴포넌트에서도 그릴 수 있습니다. 다만 `WebShell.Sidebar`처럼 점으로 꺼내는 부품은 서버 컴포넌트에서 꺼낼 수 없으니 `"use client"` 파일에서 조립합니다. `cn` · 아이콘 · 예시 데이터는 서버에서도 씁니다.
- 파일 구조를 그대로 내보내므로 쓰지 않는 컴포넌트는 받아 쓰는 쪽 번들에서 빠집니다.
- 예시 데이터의 이미지 경로(`img/…`)는 Storybook 정적 폴더 기준이라 패키지에 들어 있지 않습니다.

## 글꼴

`static/fonts/pretendard/`에는 Pretendard 글꼴과 라이선스가 받은 그대로 있습니다. 한 바이트도 바꾸지 않습니다.

- `pretendardvariable-dynamic-subset.css` · `woff2-dynamic-subset/`(woff2 92개): [Pretendard](https://github.com/orioncactus/pretendard) npm 패키지 1.3.9의 `dist/web/variable/`에서 같은 구조로 복사했습니다. 저작권자가 만든 파일 그대로라 글꼴 이름 `Pretendard Variable`을 그대로 씁니다. 레포 의존성에는 넣지 않습니다(패키지 전체가 압축 약 72MB).
- `LICENSE.txt`(SIL OFL 1.1 전문, 예약 글꼴 이름과 원 글꼴 저작권 줄 포함): 원본 저장소 main의 `LICENSE`(커밋 0189074 "Add missing copyright notices")를 그대로 가져왔습니다. 1.3.9 패키지의 라이선스에 빠져 있던 Adobe · Inter · M+ 저작권 줄을 저작권자가 나중에 더한 판이라 지금 쓰는 글꼴에도 해당합니다.
- 패키지(`files`의 `static/fonts`)에는 글꼴과 함께 들어가고, Storybook 결과물에는 `licenses/Pretendard-LICENSE.txt`로 나갑니다. 글꼴을 다시 내보내는 받아 쓰는 쪽도 이 파일(`node_modules/@dearby/design-system/static/fonts/pretendard/LICENSE.txt`)을 함께 둡니다.

버전을 올릴 때는 작업 공간 밖 임시 폴더에서 패키지를 받아 덮어쓰고 라이선스도 원본 저장소에서 다시 받은 뒤, `npm run build-storybook`으로 글꼴이 나오는지 확인합니다.

```sh
cd "$(mktemp -d)" && npm pack pretendard@<버전> && tar -xzf pretendard-<버전>.tgz
rm -r <레포>/static/fonts/pretendard/woff2-dynamic-subset
cp -R package/dist/web/variable/pretendardvariable-dynamic-subset.css package/dist/web/variable/woff2-dynamic-subset <레포>/static/fonts/pretendard/
gh api repos/orioncactus/pretendard/contents/LICENSE --jq .content | base64 -d > <레포>/static/fonts/pretendard/LICENSE.txt
```

## 서비스 로고

아이콘은 시안에서 가져오지만, 서비스 로고는 시안에 있더라도 그 회사가 직접 공개한 자료에서 가져옵니다. 출처가 불분명한 아이콘 모음에서 베끼지 않습니다. 아래는 모두 2026-11-09에 받았습니다.

- 공식 경로와 viewBox는 한 글자도 바꾸지 않고, 24 격자 안에 안쪽 `<svg>`(x · y · 크기)로 놓아 다른 아이콘과 크기만 맞춥니다.
- 색은 글자색을 따르지 않고 라이트에서 검정(`#000`), 다크에서 흰색(`#fff`)으로 고정합니다(안쪽 `<svg>`의 `fill-black dark:fill-white`). 세 회사 모두 단색은 검정 · 흰색만 허용합니다.
- 로고는 그 서비스의 사용자 프로필이나 프로젝트 주소로 잇는 곳(`SocialLinks`, 저장소 배지 등)에만 씁니다. 서비스 이름 대신 쓰거나, 다른 기호 · 글자와 합치거나, 그 회사와 제휴 · 보증 관계처럼 보이게 쓰지 않습니다.

### GitHub(`github`)

- 원천: [GitHub 브랜드 툴킷의 로고 안내](https://brand.github.com/foundations/logo)(github.com/logos가 이리로 이어짐)에서 받는 [로고 묶음](https://brand.github.com/GitHub_Logos.zip)의 `SVG/GitHub_Invertocat_Black.svg`(viewBox `0 0 98 96`). viewBox 전체를 덮는 사각형이라 그림에 영향이 없는 clip-path만 빼고 경로를 그대로 씁니다. 24 격자 안 19 크기(x · y 2.5, 세로는 비율대로 약 18.6)에 놓습니다. 시안의 GitHub 아이콘은 다시 그린 모양이라 이것으로 바꿨습니다.
- 조건: Invertocat는 자기 GitHub 프로필이나 프로젝트로 잇는 소셜 버튼, GitHub로 잇는 링크에 쓸 수 있습니다. 색은 흰색 · 검정(드물게 회색 · 초록)만 쓰고, 색 · 비율을 바꾸거나 늘이거나 다른 글자 · 도안과 합치지 않습니다. 그림자 · 그라데이션 같은 효과를 넣지 않고, 복잡한 배경이나 대비가 모자란 배경에 두지 않습니다. 우리 서비스 · 계정의 로고나 아이콘으로 쓰지 않습니다.

### LinkedIn(`linkedin`)

- 원천: [[in] 로고 안내](https://brand.linkedin.com/in-logo) 페이지에 들어 있는 심볼 `inbug-blue-28`(viewBox `0 0 28 28`, 원래 색 `#0a66c2`). [내려받기](https://brand.linkedin.com/downloads)의 `in-logo.zip`은 PNG뿐이라, 벡터는 브랜드 페이지가 직접 그리는 이 심볼을 씁니다. 24 격자 안 18 크기(x · y 3)에 놓습니다.
- 조건: 자기 LinkedIn 프로필로 잇는 링크와 소셜 아이콘 줄에 쓸 수 있습니다. 모양과 색을 바꾸지 않고, 색은 파랑 · 검정 · 흰색 세 가지만 씁니다(소셜 아이콘 줄에서는 배경색은 상관없음). [in] 로고를 쓰는 일은 LinkedIn Brand and User Agreements를 따릅니다. 허용 조항은 회원이 자기 프로필을 거는 경우라, 사용자가 자기 프로필에 LinkedIn을 거는 용도로 씁니다.

### Pinterest(`pinterest`)

- 원천: [Pinterest 브랜드 지침](https://business.pinterest.com/brand-guidelines) 페이지가 소셜 아이콘으로 직접 그리는 배지 [`pinterest.svg`](https://images.ctfassets.net/h67z7i6sbjau/7KaDJtrZJku9o86Vn5GgXW/6e47dfdd8fd9cea58e63756951645cea/pinterest.svg)(viewBox `0 0 24 24`, 원래 색 `#111111`). 지침이 안내하는 로고 자산 모음(pinterest-assets.com)은 로그인해야 받을 수 있어 이것을 씁니다. 24 격자 안 19 크기(x · y 2.5)에 놓습니다.
- 조건: 워드마크는 쓰지 않고 배지만 씁니다. 기본은 빨간 원에 흰 P이고, 색을 쓰기 어려우면 검정이나 흰색으로 씁니다. 테두리 · 필터 · 효과를 더하거나 원에서 P를 빼거나 색을 바꾸지 않습니다. 배지에는 늘 행동 유도(예: Pinterest에서 팔로우)를 함께 두고 자기 Pinterest 계정으로 잇습니다.
- 행동 유도는 쓰는 쪽이 링크 이름(`SocialLinks`의 `label`, 말풍선과 화면 읽기에 쓰임)으로 넣습니다. 웹은 "Pinterest에서 보기"로 씁니다.

### 넣지 않은 로고

허락 없이는 조건을 맞출 수 없어 넣지 않았습니다. 이 서비스들은 일반 링크 아이콘(`link`)으로 씁니다. 다른 곳에서 구한 로고로 대신하지 않습니다.

- Notion: [상표 사용 지침](https://notion.notion.site/Notion-Trademark-Usage-Guidelines-9826313c686a4f6e9d8a48347162714b)은 브랜드 지침이나 서면 합의로 승인된 표장만 쓰게 하고, [브랜드 사용 지침](https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-689045e1761348f887a3c5c80295e00f)은 단독 Notion 로고를 쓰지 말라고 합니다. 쓸 때 붙이는 표기도 허락을 받았다는 문구("used here with permission")입니다. 허락은 team@makenotion.com에 묻습니다.
- Behance: Behance는 Adobe 제품이고, [Adobe 상표 지침](https://www.adobe.com/legal/permissions/trademarks.html)은 라이선스 없이는 Adobe 제품 로고를 쓸 수 없고 소프트웨어 제품 · 서비스 안에 넣으려면 서면 허가가 필요하다고 합니다. Behance가 따로 공개한 로고 자료도 찾지 못했습니다. 허락은 같은 페이지의 요청 양식으로 묻습니다.

GitHub와 Invertocat 로고는 GitHub, Inc.의, LinkedIn과 [in] 로고는 LinkedIn Corporation의, Pinterest와 그 배지는 Pinterest, Inc.의 상표입니다.

## 원칙

- 배지는 모두 캡슐. 청록 채움·민트·흰 바탕 테두리만 쓰고 빨강은 오류 전용, 회색 채움 배지는 없습니다.
- 누를 수 있는 컨트롤에만 그림자. 글자 토큰은 8개(`text-title` … `text-micro`), 화면에서는 `Text` 역할 11가지로 씁니다.
- 날짜는 `M월 d일 (요일)`(올해가 아니면 앞에 `yyyy년`), 실제 시각만 `HH:mm`. `오늘` 같은 상대 표기는 쓰지 않습니다. 표기 도우미는 `lib/date`에 있습니다.
- 움직임은 Radix의 `data-state`에 Tailwind 애니메이션을 붙입니다. 동작 줄이기 설정이면 모두 꺼집니다.
- 코드 식별자는 영문, 화면 글자만 한국어.

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard)(SIL OFL 1.1, [글꼴](#글꼴))입니다. 예시에 나오는 기관 이름·로고는 시안 확인용이며 각 기관에 권리가 있습니다.
