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
| `ui/` · Atoms › shadcn     | Avatar · Badge · Button · Checkbox · Input · Label · ScrollArea · Separator · Skeleton · Switch · Toggle                                                                                           |
| `ui/` · Molecules › shadcn | Alert · ButtonGroup · Calendar · Card · Command · ContextMenu · Dialog · DropdownMenu · Empty · Field · InputGroup · Item · Popover · RadioGroup · Select · Sheet · Sonner · ToggleGroup · Tooltip |
| `atoms/shared/`            | Text · Wordmark · LogoSymbol · DDay · Thumbnail · RowList · Pane(PaneFooter · FloatingBar) · LockToggle · NewDot                                                                                            |
| `atoms/card/`              | CardGlyph                                                                                                                                                                                          |
| `atoms/activity/`          | KindLabel · StatusGlyph                                                                                                                                                                            |
| `molecules/shared/`        | ListGroup(ListRow) · TextField · Timeline · MetaLine(MetaList) · TrackPicker · SearchBar · QueueCard · GlassGroup · Segmented · SocialLinks · DateHeader · DatePicker · TimePicker · AccordionSection                 |
| `molecules/activity/`      | ActionTile(ActionTiles) · ProgressTrack · LiveToggle                                                                                                                                               |
| `molecules/follow/`        | FollowCard(FollowCards · BrowseCard)                                                                                                                                                               |
| `molecules/card/`          | CardPickerSheet · CardQr                                                                                                                                                                           |
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
| `organisms/card/`          | CardRow · CardFields                                                                                                                                                                               |
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

- npm은 git 의존성을 설치할 때 이 레포를 받아 devDependencies를 깔고 `prepare`(`npm run build`)로 `dist`를 만든 뒤, `files`에 적은 것(dist · src/styles.css · static/fonts · static/logo)만 담습니다. dist는 커밋하지 않습니다.
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
- 불러오는 동안의 자리는 `Skeleton`으로 그립니다. 크기 · 모양은 className으로 정합니다(글자 줄 `h-4 w-48`, 원 `size-12 rounded-full`, 둥근 사각형은 기본 `rounded-md`). 깜빡임은 동작 줄이기 설정이면 꺼집니다.
- 데이터 한 건을 그리는 항목 부품에는 같은 크기 · 간격의 `XxxSkeleton`을 옆에 둡니다: ProfileHeader(컴파운드) · FollowCard · SocialLinks · ActivityRow · ProgramRow · SubmissionRow · ReviewCard · QueueCard · Timeline · ScheduleCard · Notice, 행이 함께 쓰는 HostLine · MetaLine · KindLabel. 글자 줄은 `TextSkeleton`이 같은 역할의 줄 높이로 그리고, 있을 때만인 요소(상태 · 배지 · 소개 · 안내)는 뺍니다. 스토리마다 `Skeleton`에서 불러온 뒤와 나란히 비교합니다.
- 스켈레톤은 화면 읽기에서 숨습니다. 화면 읽기 사용자에게는 불러오는 영역(목록 · 화면)마다 하나씩 알립니다: 그 영역에 불러오는 동안 `aria-busy="true"`를 달고, 바로 옆(aria-busy 영역 밖)의 화면에 안 보이는 `role="status"` 글자를 "불러오는 중"으로 채웁니다. 다 불러오면 aria-busy를 떼고 글자를 비웁니다. status 요소는 처음부터 두고 글자만 바꿉니다: 알림 영역은 바뀌기 전에 DOM에 있어야 읽힌다(MDN "ARIA live regions")라서, 글자가 든 채로 새로 붙이면 읽기 프로그램에 따라 읽히지 않습니다. 항목 스켈레톤마다 두면 여러 번 읽히니 영역에 하나만 둡니다. status를 busy 영역 안에 두면 읽기 프로그램이 바뀌는 중인 영역의 알림을 미룰 수 있어 밖에 둡니다. 따로 부품은 두지 않습니다(Tailwind `sr-only` 글자 하나).

```tsx
<span role="status" className="sr-only">
  {loading ? '불러오는 중' : ''}
</span>
<div aria-busy={loading || undefined}>
  {loading ? (
    <RowList>
      <ActivityRowSkeleton />
      <ActivityRowSkeleton />
    </RowList>
  ) : (
    <RowList>{/* 불러온 행 */}</RowList>
  )}
</div>
```

- 묶음 목록에서 다른 곳으로 가는 줄은 `ListRow`에 `asChild`를 주고 링크 요소 하나(`<a>` · Next `Link`)를 children으로 넣습니다. shadcn `Button asChild`와 같은 방식입니다. 줄(listitem) 안에 줄 전체를 덮는 링크가 되어, 누르는 줄(`onClick`)과 높이 44 · 여백 · 초점 면 · 고른 면이 같습니다.
  - `href` · `target` · `rel`은 링크 요소에 줍니다. 링크 요소 안은 비워 둡니다. 안에 부품을 놓으면 기본 조립과 함께 두 번 그려집니다.
  - 꺾쇠(`chevronRight`) · ↗(`link`) 같은 표시와 새 탭 알림(`sr-only` 글자)은 `trailing`에 넣습니다.

```tsx
import Link from 'next/link';
import { Icon, ListGroup, ListRow } from '@dearby/design-system';

<ListGroup title="환경설정">
  <ListRow
    asChild
    icon="bell"
    title="알림"
    trailing={<Icon name="chevronRight" className="size-4" />}
  >
    <Link href="/settings/notifications" />
  </ListRow>
</ListGroup>
```

- 줄 전체가 한 가지 일을 하고 오른쪽에 따로 누르는 것이 하나 더 있으면 `action`에 넣습니다. 예: 연락처 줄은 줄 전체가 값 복사, 오른쪽 ↗이 메일 쓰기 · 전화 걸기 · Instagram · 디스코드 프로필 새 탭입니다.
  - `onClick` · `asChild` 줄에서만 그립니다. 줄을 덮는 버튼 · 링크 밖의 형제라 버튼 안에 버튼이 들어가지 않고, 접근성 트리는 `listitem` 아래 줄 버튼(또는 링크)과 액션이 나란합니다. 누르지 않는 줄의 스위치 · 버튼은 `trailing`에 넣습니다.
  - 액션은 아이콘 버튼 `Button variant="plain" size="icon-sm"`으로 두고 이름은 `aria-label`로 줍니다(새 탭이면 "(새 탭)"까지).
  - 제목이 길면 액션 칸은 그대로 두고 제목이 말줄임됩니다.
- 누르는 줄(`onClick` · `asChild`)은 다른 누를 수 있는 것과 같은 값([원칙](#원칙)의 누름)을 칠합니다. 줄의 hover는 액션 칸까지 줄 전체에 칠해지고, 액션 버튼 위에서는 버튼 자기 hover가 그 위에 겹칩니다. 누름은 누른 요소(줄 또는 액션)만 칠합니다.
- 아이콘이 종류 글자를 대신하면 종류 이름은 `sr-only` 글자로 남깁니다. 줄을 누르면 하는 일(복사)도 함께 적어 버튼 이름이 "이메일 seoyeon@example.com 복사"가 되게 합니다. 복사는 `navigator.clipboard.writeText`가 끝난 뒤 `toast`로 알립니다.

```tsx
import { Button, Icon, ListGroup, ListRow, toast } from '@dearby/design-system';

const copy = (value: string) => () =>
  navigator.clipboard.writeText(value).then(
    () => toast('복사했어요'),
    () => toast('복사하지 못했어요'),
  );

<ListGroup title="연락처">
  <ListRow
    icon="mail"
    title={
      <>
        <span className="sr-only">이메일 </span>seoyeon@example.com
        <span className="sr-only"> 복사</span>
      </>
    }
    onClick={copy('seoyeon@example.com')}
    action={
      <Button asChild variant="plain" size="icon-sm" icon="link">
        <a href="mailto:seoyeon@example.com" aria-label="메일 보내기" />
      </Button>
    }
  />
  {/* 전화는 icon="phone", 액션 <a href="tel:01012345678" aria-label="전화 걸기" /> */}
  <ListRow
    icon="instagram"
    title={
      <>
        <span className="sr-only">Instagram </span>@seoyeon
        <span className="sr-only"> 복사</span>
      </>
    }
    onClick={copy('@seoyeon')}
    action={
      <Button asChild variant="plain" size="icon-sm" icon="link">
        <a
          href="https://www.instagram.com/seoyeon"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram 열기 (새 탭)"
        />
      </Button>
    }
  />
  {/* 디스코드는 숫자 id로 프로필을 열고, 로고는 블러플로 칠한다 */}
  <ListRow
    icon="discord"
    title={
      <>
        <span className="sr-only">디스코드 </span>seoyeon
        <span className="sr-only"> 복사</span>
      </>
    }
    onClick={copy('seoyeon')}
    className="[--logo-color:#5865F2]"
    action={
      <Button asChild variant="plain" size="icon-sm" icon="link">
        <a
          href="https://discord.com/users/123456789012345678"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="디스코드 프로필 열기 (새 탭)"
        />
      </Button>
    }
  />
</ListGroup>
```

- 연락처 줄의 아이콘은 색을 채웁니다: 메일 · 전화는 `icon` 기본 청록, 서비스 로고는 `--logo-color`로 그 회사 지침이 허락하는 브랜드색([서비스 로고](#서비스-로고)). Instagram 로고(`instagram`)는 브랜드색 지침을 받지 못해 기본 흑백으로 둡니다.
- 디스코드 연락처는 사용자가 공개로 켠 경우에만 다른 사람에게 보입니다. 디스코드 개발자 약관 5(b)가 디스코드에서 받은 사용자 이름 · id 같은 API Data를 사용자가 명시적으로 공유하라고 할 때만("when a user of your Application expressly directs you to share") 제3자에게 보이게 하기 때문입니다.
- 시트 머리(`SheetHeader`)는 왼쪽 제목과 닫기입니다. 닫기는 머리가 놓인 곳에 따라 다르게 그립니다(2026-11-10 사용자 결정 "닫기 버튼 필요없고 바텀시트 기본동작처럼 다른 곳 누르면 닫기", "넓은화면에는 x 아이콘 표시해줘"). 시안의 시트 머리는 어디서나 오른쪽이 `닫기` 글자(핸들 바꾸기 · 건넬 명함 시트의 `.hsh`, 시간표 시트의 `.tsheet .close`)라 이 점이 시안과 다릅니다.
  - 좁은 화면의 바텀시트(`SheetContent`): 보이는 닫기가 없고 바깥을 누르거나 Esc로 닫습니다.
  - 넓은 화면의 떠 있는 카드(`SheetContent floating`)와 대화상자(`DialogContent showClose={false}` 안): 머리 오른쪽에 X 버튼이 보입니다(`close` 아이콘, 아이콘 버튼 `Button variant="plain" size="icon-sm"`과 같은 모양). 화면 폭이 아니라 머리가 무엇 안에 놓였는지로 정하므로 쓰는 쪽이 따로 넘길 것은 없습니다. 대화상자에는 `showClose={false}`를 줘야 유리 닫기와 겹치지 않습니다.
  - 두 닫기 가운데 하나만 그립니다(다른 하나는 `display: none`). 그래서 화면 읽기와 Tab 순서에는 닫기가 하나만 잡힙니다. 머리 높이(40)와 제목 자리는 어느 쪽이든 같고, X 아이콘의 오른쪽 끝이 내용 끝에 맞습니다.
  - 바텀시트의 닫기 버튼은 지우지 않고 숨겼습니다. 화면 읽기에는 늘 `닫기` 버튼으로 있고, 초점이 있으면서 브라우저가 초점 표시를 켤 때(`:focus-visible`)만 머리 오른쪽에 시안의 닫기 모양으로 나타납니다. 열릴 때 첫 초점은 닫기에 갑니다(Radix는 첫 번째 누를 수 있는 요소에 초점을 줍니다. WAI-ARIA 대화상자 패턴: "Generally, focus is initially set on the first focusable element"). 버튼을 마우스 · 터치로 눌러 열면 초점이 닫기에 있어도 보이지 않고, 키보드로 열거나 Tab으로 닫기에 가면 보입니다.
  - `:focus-visible`은 브라우저가 정하는 어림 규칙이라 키보드로 열지 않아도 닫기가 보이는 때가 있습니다: 누르지 않아도 화면이 뜨면서 스스로 열리는 시트(주소로 바로 들어온 로그인 시트 등), 마우스로 연 뒤 아무 키(Shift 포함)나 누른 때(둘 다 Chrome에서 확인). 브라우저마다 다를 수 있고 Safari · Firefox는 확인하지 못했습니다.
  - 바텀시트를 마우스 · 터치로 연 직후에는 초점이 보이지 않는 닫기에 있습니다. 이때 Enter · Space를 누르면 시트가 닫힙니다(보이는 닫기가 있던 때와 같은 동작). 첫 초점을 시트 자체에 두면 이 상태가 없어지지만(`onOpenAutoFocus`) 모든 시트의 화면 읽기 낭독이 바뀌어 실기기 확인 뒤에 정할 일로 남깁니다.
  - 근거: Radix Dialog는 Esc로 닫고("Esc closes the component automatically") 바깥 누르기로도 닫습니다(Content의 `onPointerDownOutside`를 막지 않는 한). WAI-ARIA 대화상자 패턴도 Esc로 닫는다고 하고("Escape: Closes the dialog"), 바깥을 건드리면 닫는 구현을 언급합니다("in some implementations, attempts to interact with the inert content cause the dialog to close"). 다만 모달일 때 Radix가 바깥 내용을 접근성 트리에서 가리므로(`aria-hidden`) 터치로 화면 읽기를 쓰는 사람에게는 바깥도 Esc 키도 없어, 대화상자 안의 닫기 버튼이 확실한 길입니다. VoiceOver · TalkBack의 닫기 제스처가 이 시트를 닫는지는 실기기로 확인하지 못했습니다. Android의 뒤로 가기는 키 이벤트 없이 close watcher만 부르는데(HTML 표준: "no event is involved") Radix Dialog에는 close watcher가 없어 닫히지 않을 가능성이 높습니다.
  - 절충한 점: 같은 패턴은 탭 순서에 보이는 닫기 버튼을 강하게 권합니다("It is strongly recommended that the tab sequence of all dialogs include a visible element with role button that closes the dialog"). 바텀시트의 닫기 버튼은 탭 순서에 있지만 브라우저가 초점 표시를 켤 때만 보이고 마우스 · 터치로 연 직후에는 초점이 있어도 보이지 않으므로, 이 권고를 따른 것이 아닙니다.
  - 바텀시트의 최대 높이는 `85dvh`입니다. 보이는 닫기가 없으니 터치에서는 바깥 누르기가 유일한 길인데, `vh`는 휴대폰에서 주소창이 접힌 큰 화면 기준이라(MDN: "`vh` is equivalent to `lvh`") 키 큰 시트 위에 남는 바깥이 거의 없어질 수 있습니다. `dvh`는 지금 보이는 화면 기준이라("fit exactly within the viewport, irrespective of the presence of dynamic browser interfaces") 위 15%가 늘 남습니다. 실기기로는 확인하지 못했습니다.
- `Button`은 `type` 기본값을 두지 않습니다(기본값을 `button`으로 바꾸면 `type` 없이 제출에 쓰던 버튼이 깨집니다). `<form>` 안에서 제출이 아닌 버튼(지우기 등)에는 `type="button"`을 줍니다.
- 아이콘만 있는 버튼(`size="icon"` 44 · `icon-sm` 40 · `icon-lg` 52)은 보이는 글자가 없으니 `aria-label`을 꼭 줍니다. `icon-lg`는 고정 CTA(`lg`, 52)와 높이 · 모서리가 같은 정사각 버튼이라 CTA 줄에 나란히 놓습니다(2026-11-10 사용자 결정 "하단에 정사각형 버튼에 쓰레기통 아이콘이면 충분"). 휴지통은 흰 면에 아이콘만 빨갛게 둡니다: `<Button type="button" variant="outline" size="icon-lg" icon="trash" className="text-destructive" aria-label="LinkedIn 지우기" />`. 빨강 채움(`destructive-fill`)은 되돌릴 수 없는 동작의 확인 버튼에만 씁니다.
- 자물쇠 토글(`LockToggle`)은 잠김(비공개) · 열림(공개)을 오가는 아이콘 버튼입니다(2026-11-10 사용자 결정 "Lottie 애니메이션 자물쇠"). `Switch`와 같은 props(`checked` · `defaultChecked` · `onCheckedChange` · `disabled`)라 바꿔 끼울 수 있습니다. **켜짐(checked) = 공개 = 열린 자물쇠**입니다. 모양은 아이콘 버튼(`Button variant="plain" size="icon-sm"`)과 같습니다: 면 40, 아이콘 22, 누름 덧칠, 초점 링, 비활성.
  - 역할은 `switch`(`aria-checked`)이고 Space · Enter로 바뀝니다. 근거: WAI-ARIA 1.2는 switch를 켬 · 끔 값을 나타내는 것으로 정의하고("A type of checkbox that represents on/off values, as opposed to checked/unchecked values"), 공개 여부는 켜고 끄는 설정입니다. WAI-ARIA 스위치 패턴은 스위치 · 체크박스 · 토글 버튼(`aria-pressed`)을 서로 바꿔 쓸 수 있다고 하면서 모양과 의미에 가장 맞는 역할을 고르라고 합니다("they are often functionally interchangeable. Choose the role that best matches both the visual design and semantics of the user interface"). 의미는 켜고 끄는 설정이라 switch에 맞고, 바꿔 끼우는 대상인 `Switch`와 읽히는 말 · props가 이어집니다. 모양은 미는 스위치가 아니라 아이콘 버튼이라 토글 버튼 쪽에 가깝습니다. WAI-ARIA 1.2의 주석(규범 아님)도 switch의 이점을 화면 모양과 맞게 전달하는 데 둡니다("in a fashion consistent with its on-screen appearance").
  - 이름은 쓰는 쪽이 `aria-label`로 주고 상태에 따라 바꾸지 않습니다(예: "LinkedIn 공개"). 근거: "it is critical the label on a switch does not change when its state changes". 화면 읽기는 이름과 켬 · 끔 상태를 읽습니다. 역할을 부르는 말과 순서는 보조기술과 판마다 다르고, 실기기로는 확인하지 못했습니다.
  - 움직임: 상태가 바뀌면 고리가 왼발을 축으로 25° 젖혀지며 열리고, 거꾸로 닫힙니다(0.3초, `ease-spring` 토큰). 직접 만든 Lottie입니다(`LockToggle.tsx`의 `lockAnimation`, 남의 자산 없음). `lock` 아이콘과 같은 고리 · 몸통이고 첫 프레임은 `lock`, 끝 프레임은 `unlock` 아이콘과 같은 그림입니다. 색은 글자색을 따릅니다(Lottie가 쓴 `stroke` 속성을 CSS `stroke: currentColor`가 덮음).
  - 재생기는 [lottie-web](https://github.com/airbnb/lottie-web) 5.13.0(MIT, Copyright (c) 2015 Bodymovin)의 SVG 전용 light 빌드(`lottie-web/build/player/lottie_light`)입니다. 묶지 않고 의존성으로 둡니다. 크기는 줄인 것 기준 gzip 46KB입니다(패키지의 `lottie_light.min.js` 46,480바이트. 우리가 부르는 줄이지 않은 파일은 gzip 73KB이고 받아 쓰는 쪽 번들러가 줄입니다. Next 16 빌드에서 잰 청크는 46,209바이트). 견준 것: 전체 빌드 76KB, [jlottie](https://github.com/LottieFiles/jlottie) 1.2.1은 12KB지만 거꾸로 재생(`setDirection`)과 타입 선언이 없음, dotlottie-web 0.82.1은 wasm만 491KB.
  - 재생기는 부품이 화면에 놓인 뒤 `import()`로 따로 불러옵니다. 패키지(dist)에는 lottie 코드가 없고, 받아 쓰는 쪽 번들러가 별도 청크로 나눠 화면의 첫 로딩 스크립트에 넣지 않습니다(Next 16 · Turbopack 빌드로 확인).
  - 불러오기 전 · 불러오기 실패 · 동작 줄이기(`prefers-reduced-motion: reduce`)에서는 같은 자리 · 크기에 `lock` · `unlock` 정지 아이콘을 그립니다. 동작 줄이기면 재생기를 아예 불러오지 않습니다. `styles.css`의 동작 줄이기 규칙은 CSS 움직임만 끄고 스크립트로 그리는 Lottie에는 닿지 않아 부품이 직접 봅니다.

```tsx
import { LockToggle } from '@dearby/design-system';

<LockToggle
  checked={isPublic}
  onCheckedChange={setPublic}
  aria-label="LinkedIn 공개"
/>;
```

### 팔로우 카드 · 둘러보기 카드 · 접히는 섹션

2026-11-10 이슈 #69(시안 ⑧-0c · ⑧-0e · ⑧-0g · ⑧-0g2 · ⑧-0h). 앱 로직(팔로우 목록 정렬, 해제 뒤 사라짐과 되돌리기 알림, 펼침 기억)은 쓰는 쪽 몫입니다: `onUnfollow`는 알리기만 하고 카드를 지우지 않으며, 새 모집이 열린 것을 먼저 놓는 정렬도 하지 않습니다.

```tsx
<FollowCards aria-label="팔로우 중">
  <FollowCard kind="org" name="카카오" logo="/logos/kakao.png" fresh asChild>
    <a href="/orgs/kakao" />
  </FollowCard>
  <FollowCard kind="region" name="서울" fresh onClick={…} />
  <BrowseCard kind="org" sub="조직 42곳" onClick={…} />
</FollowCards>

<AccordionSection icon="group" title="조직" count={3} fresh defaultOpen>
  <FollowCards layout="grid">
    <FollowCard kind="org" name="카카오" level="all" onLevelChange={…} onUnfollow={…} />
  </FollowCards>
</AccordionSection>
```

- `FollowCards`(ul): `strip`은 가로로 넘기는 한 줄(카드 폭 107, `-mx-6 px-6`으로 화면 옆 여백 24까지 번짐), `grid`는 3열(사이 12). 여백이 24가 아닌 화면은 className으로 `-mx-N px-N`을 덮어씁니다. 카드는 `li`라 이 안에 놓습니다.
- `FollowCard`(컴파운드): 로고 44(조직 · 프로그램, 없으면 이름 첫 글자) 또는 종류 아이콘 원(지역 · 분야), 이름 두 줄, 종류 글자. `level`을 주면 종류 글자 대신 알림 종(전체 꽉 찬 종 · 신청일만 선 종 · 없음 사선 종)을 그리고, `onLevelChange` · `onUnfollow`를 주면 오른쪽 위 ⋯ 메뉴(알림 수준 고르기 · 팔로우 해제)가 생기며 새 모집 점은 오른쪽 아래로 옮깁니다. 누르는 요소가 카드 전체를 덮고(`onClick` 또는 `asChild` 링크), ⋯는 그 밖의 형제 버튼이라 링크 안에 버튼이 들어가지 않습니다. 이름 · 종류 또는 알림 수준 · 새 모집이 한 이름으로 읽힙니다(예: "카카오 알림 전체 새 모집 있음"). `onClick`도 `asChild`도 없으면 누르는 요소 없이 그리기만 합니다. 새 모집 점은 알림 수준 줄이 있는 카드는 오른쪽 아래, 없으면 오른쪽 위입니다.
- `BrowseCard`(민트 면, 라이트는 그림자 없음 · 다크는 .5px 테두리): + 원 · 제목(기본 `<종류> 둘러보기`) · 보조(`조직 42곳`).
- `AccordionSection`(컴파운드): 머리 행 56 전체가 버튼(`aria-expanded` · `aria-controls`, 제목 안의 button)이고 내용은 `region`입니다. 닫히면 `inert`라 초점도 읽기도 받지 않고, 높이는 0.25초에 열리고 닫힙니다(꺾쇠 회전도 0.25초). `open` · `onOpenChange`로 제어하거나 `defaultOpen`으로 시작만 정합니다. Radix Accordion 의존성은 더하지 않고 이 패턴을 직접 구현했습니다. 섹션 사이 .5px 구분선은 각 섹션의 아래 선(마지막 제외)입니다.
- `NewDot` 아톰: 청록 점(카드 8 · 섹션 머리 7)에 `sr-only` "새 모집 있음"을 함께 둡니다.
- 시안과 다른 점
  - 둘러보기 카드의 제목 · 보조 글자는 청록 불투명(`mint-foreground`)입니다. 시안의 청록 75%는 민트 면 위 대비가 2.8:1(보조 11px)이라 4.5:1에 못 미칩니다.
  - 카드 이름은 13/600 줄 높이 1.2(`Text` `control`)이고 시안은 1.3입니다. 카드 최소 높이가 같아 높이는 그대로입니다.
  - 카드 · 아코디언 머리의 누름 덧칠(`pressable`)은 시안에 없고 README 원칙을 따랐습니다. 시안의 길게 누르기 확대(`.lp`)와 contextMenu 미리보기는 iOS 표현이라 웹에 넣지 않았고 ⋯ 메뉴만 있습니다.
  - 아코디언 머리의 누름 덧칠 모서리는 `rounded-xl`(20)이고 시안에는 없습니다. strip 아래의 14 여백(`.fstrip` margin)은 목록이 갖지 않으니 쓰는 쪽이 다음 요소와의 간격으로 둡니다.
  - 아코디언의 조직 아이콘은 기존 `group`을 씁니다(시안과 원 위치가 1px 다름).
  - 해제 항목 빨강은 `destructive` 토큰입니다(시안 #FF3B30).
  - 펼치는 내용 칸은 옆으로 16 넓혀 카드 그림자가 잘리지 않게 했습니다(맨 위 그림자는 2px 여백 안에서 약간 잘림).
- 스켈레톤은 `FollowCardSkeleton`만 있습니다.

### 명함 부품

2026-11-10 이슈 #70(시안 ㉗-j2 · ㉗-j · ㉗-j3 · ㉗-j4 · ㉘-a · ㉘-c · ㉘-e2 · ㉘-f2). 명함 만들기 · 고치기 · 교환 로직(새 명함은 늘 보이는 네 항목 외 모두 꺼짐, 기본 선택 SNS와 SNS를 지웠을 때의 대체, 명함이 한 장이면 시트 없이 바로, QR 5분 코드)은 쓰는 쪽 몫입니다.

```tsx
<ListGroup>
  <CardRow name="SNS" summary="소셜 링크만" onClick={…} />
</ListGroup>

<CardFields fixed={{ name, handle, job, bio }} groups={groups} onCheckedChange={(key, on) => …} />

<Sheet open={open} onOpenChange={setOpen}>
  <SheetContent>
    <CardPickerSheet cards={cards} defaultValue="sns" title="건넬 명함" actionLabel="건네기" onSubmit={(id) => …} />
  </SheetContent>
</Sheet>

<CardQr cards={cards} cardId={cardId} onCardIdChange={…} qr={<img src={qrUrl} alt="" />} name="김도윤" handle="doyun" activities={today} activityId={a} onActivityIdChange={…} />
```

- `CardGlyph`(아톰): 명함 모양 34 x 22. 목록 행과 고르기 시트가 같이 씁니다.
- `CardRow`(유기체, `ListRow` 위): 글리프 · 이름 · 오른쪽 요약(`모든 항목` 등) · 꺾쇠. `ListGroup` 안에 놓고 `onClick` 또는 `asChild`로 고치러 갑니다. 새 명함 줄은 기존 `ListRow add`입니다. `CardRowSkeleton`이 있습니다.
- `CardFields`(유기체, 컴파운드): `Fixed`는 `항상 보임` 묶음(이름 · 핸들 · 직업 · 소개, 라벨은 부품이 고정으로 갖고 값은 `fixed`로 받음, 잠금 아이콘은 끌 수 없다는 장식이라 누르지 못함), `Group`은 묶음마다 항목 줄과 `LockToggle`입니다. 켜짐(`checked`) = 이 명함에 보임이고 이름은 `<항목> 공개`입니다. 값은 쓰는 쪽이 갖는 제어형입니다.
- `CardPickerSheet`(분자, 컴파운드): 시트 안에 넣는 내용입니다(`FilterSheet`과 같은 방식). `Header`(`SheetHeader`) · `Options`(한 장을 고르는 `RadioGroup`, 줄 전체가 라벨) · `Footer`(`Button size="lg"`). 머리 제목과 버튼 글자는 `건넬 명함` · `건네기`, `건넬 명함` · `교환 요청`, `돌려줄 명함` · `수락`처럼 쓰는 쪽이 정합니다. `value` · `defaultValue`로 제어 · 비제어 모두 됩니다.
- `CardQr`(분자, 컴파운드): `CardPicker`(위 명함 알약, 누르면 메뉴) · `Code`(QR 자리 250, 흰 바탕은 다크에서도 흰색) · `Name`(이름 · @핸들) · `Activity`(활동 칩, 누르면 활동 바꾸기 메뉴, 활동이 없으면 없음). QR 그림은 만들지 않고 `qr`에 svg · img를 넘깁니다(스토리의 격자는 자리 표시용). 닫기 · QR 새로 만들기 버튼은 화면 몫입니다.
- 시안과 다른 점
  - 명함 글리프는 시안의 마지막 정의(흰 면 · 회색 줄 둘, 다크는 청록 줄 하나)를 따랐습니다. 시안 CSS에 `.pcard`가 두 번 정의되어 앞의 민트 면은 덮어써집니다.
  - 토글은 시안의 iOS 스위치가 아니라 자물쇠 토글(`LockToggle`, 이슈 지시)입니다. 목록 행 높이 · 글자 크기는 `ListRow` 값(44 · 17)이고 시안은 48 · 16입니다.
  - 고르기 시트의 바텀 닫기 · CTA 모양은 `SheetHeader` · `Button lg`를 따라 시안의 `닫기` 글자와 알약 CTA와 다릅니다.
  - 고르기 시트 행 이름은 17/600(`rowTitle`)이고 시안은 16/600입니다. 활동 칩 꺾쇠는 14(시안 15)입니다.
  - 알약 · 칩 글자는 글자 토큰에 맞춰 15/600 · 15/600이고 시안 활동 칩은 14/600입니다. 명함 · 활동 고르기 메뉴는 시안에 모양이 없어 기존 `DropdownMenu` 라디오를 썼습니다.

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

## 로고

2026-11-10 사용자가 고른 로고(이슈 #59)입니다. d · b가 엄지를 든 손, ear가 얼굴처럼 보이는 그림이고 path는 시안 SVG 그대로입니다.

- `Wordmark`: 글자 로고 그림. `variant`는 머리용 작은 판 `small`(기본, e의 가로획과 입이 가늚)과 큰 판 `large`(윙크하는 e와 입), 크기는 `height`(그림 상자 높이, 기본 26)로 정하고 폭은 비율대로입니다. 화면 머리 · 사이드바는 `<Wordmark />`, 로그인처럼 로고가 주인공인 자리는 `<Wordmark variant="large" height={84} />`.
  - 색은 토큰을 따라 라이트 · 다크가 저절로 맞습니다. d · b · y는 `accent-foreground`, ear와 입은 `wordmark-ear`(청록 50% + 글자색 50%, 라이트 `#09484a` · 다크 `#91d4d5`).
  - 블록 요소로 그립니다(글줄 안에 놓아도 줄 높이의 영향을 받지 않음). 가운데에 두려면 부모를 flex로 맞춥니다.
- `LogoSymbol`: 심벌(엄지를 든 d와 얼굴, 배 16 · 엄지 21). 크기는 `size`(정사각 한 변, 기본 32). `variant`는 바탕 없는 `bare`(기본, `accent-foreground`)와 `appIcon`(둥근 사각 `primary` 바탕에 흰 그림, 여백 사방 20% · 모서리 22.5%, 두 모드에서 같은 색).
- 두 부품 모두 화면 읽기 이름은 `dearby`(`role="img"`)입니다.
- 파비콘 · 앱 아이콘 파일을 만드는 쪽을 위해 색이 박힌 SVG 원본을 `static/logo/`에 시안 그대로 둡니다(패키지 `files`에 포함): `symbol-app-icon.svg`(모서리 없는 정사각, OS가 모서리를 깎는 앱 아이콘용) · `symbol-icon-rounded.svg`(둥근 사각, 파비콘용). `LogoSymbol`의 `appIcon`과 같은 그림입니다.

## 아이콘

`icons.ts`의 아이콘은 시안의 SVG 원문입니다. 시안에 없는 것만 같은 규격(24 격자, 선 1.8, 둥근 끝 · 이음, `aria-hidden`)으로 새로 그립니다. 다른 아이콘 모음을 보고 베끼지 않고 사각형 · 선 · 호로 짭니다.

- `mail`(둥근 사각형 봉투 + V 한 획) · `phone`(수화기 한 획, 두 받침이 대각선에 맞서는 대칭): 2026-11-09 프로필 연락처 줄을 위해 그렸습니다(사용자 결정 "봉투·수화기").
- 시안에는 이 모양들이 없습니다. 시안의 연락처 행은 이메일에 말풍선(`chat`, ㉗-b), 전화에 사람과 음파(㉗-j 명함 화면)를 썼고, 사용자가 봉투 · 수화기로 정했습니다.
- `trash`(뚜껑 선 + 둥근 ㄷ자 손잡이 + 아래로 좁아지는 통 한 획 + 세로 줄 둘): 2026-11-10 고치기 시트의 지우기 버튼을 위해 그렸습니다(사용자 결정 "하단에 정사각형 버튼에 쓰레기통 아이콘이면 충분"). 시안에는 휴지통이 없고 지우기는 빨간 글자(`계정 삭제` · `일정 삭제`)로만 나옵니다. 좌표는 세로 중심선(x 12)에 대칭으로 직접 잡았습니다: 뚜껑 4.5 ~ 19.5, 통 위 6.5 ~ 17.5 · 아래 모서리 반지름 2, 손잡이 9.5 ~ 14.5 · 모서리 반지름 1.5.
- `unlock`(열린 자물쇠): 2026-11-10 자물쇠 토글을 위해 그렸습니다(사용자 결정 "lottie 자물쇠 락 언락 아이콘을 버튼으로"). 시안에는 열린 자물쇠가 없습니다. `lock`의 몸통은 그대로 두고 고리만 왼발(8, 11)을 축으로 25° 젖혔습니다(`transform="rotate(-25 8 11)"`). 몸통이 같은 자리라 `lock`과 바꿔 그려도 튀지 않고, 자물쇠 토글 Lottie의 끝 프레임과 같은 그림입니다.
- `bellFill` · `bellOff` · `more` · `layers` · `sparkle`은 시안(⑧-0g2 팔로우 카드와 ⑧-0g 섹션 머리)의 SVG 원문 그대로입니다(꽉 찬 종 · 사선 종 · ⋯ · 프로그램 · 분야). 팔로우 대상 종류와 알림 수준의 이름 · 아이콘 표는 `icons.ts`의 `FOLLOW_KINDS` · `FOLLOW_LEVELS`입니다.
- `info`(ⓘ)는 새로 그리지 않았습니다. 시안의 원문 그대로입니다(추천 카드의 `자세히` 버튼, 원 반지름 9.5에 안쪽 획만 선 2.4).

## 서비스 로고

아이콘은 시안에서 가져오지만, 서비스 로고는 시안에 있더라도 그 회사가 직접 공개한 자료를 우선합니다(2026-11-09 · 11-10에 받음). 공식 자료를 받을 수 없거나 허락 없이 쓸 수 없는 Instagram · Threads · Facebook · TikTok · Notion · Behance 여섯은 사용자 결정(2026-11-10 "무료 SVG 쓰자" · "노션도" · "Behance도")으로 출처가 분명한 무료 모음 simple-icons에서 판을 고정해 경로를 그대로 가져옵니다([공식 자료 대신 무료 SVG를 쓴 로고](#공식-자료-대신-무료-svg를-쓴-로고)). 상표권은 각 회사에 있고 모음의 라이선스는 그림에만 해당하므로, 회사가 요청하면 그 로고를 내립니다. 출처가 불분명한 아이콘 모음에서 베끼지 않고, 우리가 다시 그리지 않습니다. LINE · WhatsApp 둘은 이 공식 자료 우선 규칙과 달리 사용자 지시(2026-11-10)로 처음부터 Bootstrap Icons의 그림을 씁니다([Bootstrap Icons에서 가져온 로고](#bootstrap-icons에서-가져온-로고)).

- 공식 경로와 viewBox는 한 글자도 바꾸지 않고, 24 격자 안에 안쪽 `<svg>`(x · y · 크기)로 놓아 다른 아이콘과 크기만 맞춥니다.
- 색은 글자색을 따르지 않습니다. 기본은 라이트 검정(`#000`) · 다크 흰색(`#fff`)이고(공식 자료를 받은 다섯 회사 모두 단색은 검정 · 흰색만 허용), 쓰는 쪽이 CSS 변수 `--logo-color`로 그 회사 지침이 허락하는 다른 색을 고릅니다(안쪽 `<svg>`의 `fill-[var(--logo-color,#000)] dark:fill-[var(--logo-color,#fff)]`). 변수는 `Icon`이나 그 위 요소 어디에 줘도 이어집니다.
  - SNS 버튼(`SocialLinks`)과 저장소 표시 · 관리 화면 줄은 기본 흑백 그대로 둡니다(사용자 결정).
  - 프로필 연락처 줄은 지침이 허락하는 브랜드색으로 채웁니다(2026-11-09 사용자 결정 "나머지도 브랜드색 채워줘"). 디스코드는 블러플 `[--logo-color:#5865F2]`.
  - 브랜드색 바탕 버튼 위는 흰색 `[--logo-color:#fff]`(예: 디스코드로 로그인 버튼의 블러플 바탕 위 흰 로고), 글자색을 따르게 하려면 `[--logo-color:currentColor]`.
  - 글자색(currentColor)을 기본으로 하지 않은 까닭: 로고가 놓이는 자리의 글자색은 청록(ListRow 아이콘) · 회색(보조 글자)처럼 지침이 허락하지 않는 색인 경우가 많아, 기본이 흑백이어야 쓰는 쪽이 색을 잊어도 지침을 어기지 않습니다.
- 로고는 그 서비스의 사용자 프로필이나 프로젝트 주소로 잇는 곳(`SocialLinks`, 프로필 연락처 줄, 저장소 배지 등)에 씁니다. GitHub · 디스코드 마크는 그 서비스로 잇지 않는 곳에서도 씁니다(2026-11-09 결정, 아래 각 절). GitHub는 저장소를 가리키는 표시로(웹 프로젝트 행의 저장소 수 옆, `SubmissionRow`의 평가 전 배지, `EvaluationForm`의 저장소 줄), 디스코드는 디스코드 서버 연동을 가리키는 표시로(`ServerPicker`, `NoticeComposer`) 씁니다. 이때 마크가 무엇을 가리키는지 옆 글자로 쓰거나 마크에 화면 읽기 이름을 줍니다(`<Icon name="github" label="GitHub 저장소" />`).
- 어느 로고든 글 속 서비스 이름 자리에 넣거나 낱말 · 다른 기호와 합쳐 한 덩어리로 만들지 않고, 그 회사와 제휴 · 보증 관계처럼 보이게 쓰지 않습니다. 이름 글자 없이 로고만 두는 표시(소셜 링크 버튼, 연락처 줄의 종류 아이콘)는 화면 읽기 이름에 서비스 이름을 줍니다. 근거: 이름 조항은 Instagram의 "Keep the word Instagram consistent" 절(글 속 낱말을 로고로 바꾸지 않기)과 LinkedIn의 "Incorporate the [in] Logo into a word or slogan" 금지뿐이고, GitHub("Use the Invertocat logo as a social button") · LinkedIn("In a series of social media icons")은 로고만 있는 소셜 버튼을 허락합니다.

### GitHub(`github`)

- 원천: [GitHub 브랜드 툴킷의 로고 안내](https://brand.github.com/foundations/logo)(github.com/logos가 이리로 이어짐)에서 받는 [로고 묶음](https://brand.github.com/GitHub_Logos.zip)의 `SVG/GitHub_Invertocat_Black.svg`(viewBox `0 0 98 96`). viewBox 전체를 덮는 사각형이라 그림에 영향이 없는 clip-path만 빼고 경로를 그대로 씁니다. 24 격자 안 19 크기(x · y 2.5, 세로는 비율대로 약 18.6)에 놓습니다. 시안의 GitHub 아이콘은 다시 그린 모양이라 이것으로 바꿨습니다.
- 조건: 지침의 할 것 목록은 다섯 가지입니다. GitHub로 잇는 링크, 자기 GitHub 프로필이나 프로젝트로 잇는 소셜 버튼(Invertocat), 프로젝트가 GitHub와 연동된다는 표시("Show integration"), GitHub에 관한 글, 우리 서비스 이름 · 로고보다 덜 드러나게 두기입니다. 색은 흰색 · 검정(드물게 회색 · 초록)만 쓰고, 색 · 비율을 바꾸거나 늘이거나 다른 글자 · 도안과 합치지 않습니다. 그림자 · 그라데이션 같은 효과를 넣지 않고, 복잡한 배경이나 대비가 모자란 배경에 두지 않습니다. 우리 서비스 · 계정의 로고나 아이콘으로 쓰지 않습니다.
- GitHub로 잇지 않는 곳: 저장소 수 옆 같은 앱 화면 속 표시는 지침에 직접 나오지 않습니다. 우리는 이것을 GitHub 저장소를 가리키는 쓰임으로 보고, 할 것 목록 가운데 연동 표시에 가깝다고 판단해 씁니다. GitHub가 확인해 준 것은 아닙니다. 지침의 하지 말 것 목록에는 GitHub의 사전 서면 허가 없이 상표 · 로고를 쓰지 말라는 항목("Use without permission")도 있으니, 쓰임이 넓어지면 [GitHub 문의](https://github.com/contact)로 확인합니다.

### 디스코드(`discord`)

- 원천: [Discord 브랜드 페이지](https://discord.com/branding)의 Symbol 절 다운로드 버튼이 주는 묶음의 `Discord_Symbol_Black/Discord-Symbol-Black.svg`(viewBox `0 0 126.644 96`). 로그인 · 동의 없이 받습니다. 경로를 그대로 쓰고 24 격자 안 19 크기(x · y 2.5, 세로는 비율대로 약 14.4)에 놓습니다. 시안의 디스코드 아이콘은 다시 그린 선 모양이라 이것으로 바꿨고, 그래서 `ServerPicker` · `NoticeComposer`의 디스코드 표시도 블러플 선 아이콘에서 흑백 공식 마크로 바뀌었습니다.
- 조건: 지침의 할 것 목록은 디스코드 표장으로 자기가 디스코드 사용자이거나 디스코드 서버가 있다는 것을 알리기("inform people that you are a Discord user and/or that you have a Discord server"), Discord를 서버 · 사용자 이름을 꾸미는 말로 쓰기, 디지털로만 쓰기입니다. 디스코드인 것처럼, 디스코드가 후원 · 대행하는 것처럼 보이게 하지 않습니다. 색은 블러플 · 검정 · 흰색이고 고치거나 다시 칠하거나 비틀지 않습니다. 굿즈에 쓰지 않습니다. 글자 없는 심볼은 디스코드 브랜드가 잘 보이거나 다른 곳에서 이미 충분히 드러난 곳에서만 씁니다("Use these only when the Discord brand is clearly visible or has been well established elsewhere"). 지침 밖의 쓰임은 디스코드의 허락이 필요합니다.
- 개발자 약관(Developer Terms, 2024-06-06 갱신 · 2024-07-08 시행, 2026-11-09 사용자 브라우저로 확인): 8(b)는 디스코드 브랜드 표장을 앱을 알리면서 필요한 표시이거나 부수적으로 보일 때만, 약관과 브랜드 지침을 따라 쓰는 제한된 사용권을 줍니다("solely to display Discord's Brand Features for required attribution(s) or in an incidental manner … only in accordance with the Terms and Discord's Brand Guidelines"). 8(a)는 그 쓰임이 디스코드에 귀속된다고, 8(c)는 제휴 · 보증처럼 말하지 말라고 합니다. 개발자 정책(Developer Policy)에는 이름 · 로고 조항이 없습니다. 그래서 공식 파일을 고치지 않고 브랜드 지침 안에서 씁니다.
- 쓰임별(2026-11-09 확인, 모두 우리 해석이며 디스코드가 확인해 준 것은 아닙니다):
  - 프로필 연락처 줄(블러플, 오른쪽 ↗이 `https://discord.com/users/{숫자 id}` 프로필을 새 탭으로 엶, 줄을 누르면 아이디 복사): 사용자가 자기 디스코드 계정을 알리고 디스코드로 잇는 쓰임이라 할 것 목록의 첫 항목에 맞습니다. 화면에는 "Discord" 글자 없이 화면 읽기 이름만 두는데(사용자 결정), 심볼 조건("clearly visible")은 마크 자체와 디스코드 프로필로 잇는 링크로 채운다고 판단했습니다. 공개로 켠 연락처만 보입니다(위 쓰는 법, 개발자 약관 5(b)).
  - 디스코드로 로그인 버튼: 개발자 문서의 [Social SDK 브랜딩 지침](https://docs.discord.com/developers/discord-social-sdk/design-guidelines/branding-guidelines)이 버튼 글자 + Discord 로고로 된 버튼 세트(Blurple · Light · Dark · Flexible)를 두고, 로그인 연결 지점은 Blurple 버튼을 쓰라고 합니다("Please use the Blurple Button button styling for the sign-in connection point"). 게임 연동용 문서라 웹 OAuth2 로그인에 그대로 해당하는지는 해석이고, 웹 OAuth2 문서에는 버튼 · 로고 규정이 없습니다. 버튼 글자가 브랜드를 보여 심볼 조건은 채웁니다. 웹은 블러플 바탕 버튼에 흰 로고(`[--logo-color:#fff]`)를 씁니다.
  - 디스코드 계정 연결 줄: 지침에 말이 없습니다. 웹 계정 연결 안내는 "Connect Discord" 버튼으로 시작한다고만 합니다. "디스코드 계정 연결" 글자가 보이면 심볼 조건은 채웁니다.

### LinkedIn(`linkedin`)

- 원천: [[in] 로고 안내](https://brand.linkedin.com/in-logo) 페이지에 들어 있는 심볼 `inbug-blue-28`(viewBox `0 0 28 28`, 원래 색 `#0a66c2`). [내려받기](https://brand.linkedin.com/downloads)의 `in-logo.zip`은 PNG뿐이라, 벡터는 브랜드 페이지가 직접 그리는 이 심볼을 씁니다. 24 격자 안 18 크기(x · y 3)에 놓습니다.
- 조건: 자기 LinkedIn 프로필로 잇는 링크와 소셜 아이콘 줄에 쓸 수 있습니다. 모양과 색을 바꾸지 않고, 색은 파랑 · 검정 · 흰색 세 가지만 씁니다(소셜 아이콘 줄에서는 배경색은 상관없음). [in] 로고를 쓰는 일은 LinkedIn Brand and User Agreements를 따릅니다. 허용 조항은 회원이 자기 프로필을 거는 경우라, 사용자가 자기 프로필에 LinkedIn을 거는 용도로 씁니다.

### Pinterest(`pinterest`)

- 원천: [Pinterest 브랜드 지침](https://business.pinterest.com/brand-guidelines) 페이지가 소셜 아이콘으로 직접 그리는 배지 [`pinterest.svg`](https://images.ctfassets.net/h67z7i6sbjau/7KaDJtrZJku9o86Vn5GgXW/6e47dfdd8fd9cea58e63756951645cea/pinterest.svg)(viewBox `0 0 24 24`, 원래 색 `#111111`). 지침이 안내하는 로고 자산 모음(pinterest-assets.com)은 로그인해야 받을 수 있어 이것을 씁니다. 24 격자 안 19 크기(x · y 2.5)에 놓습니다.
- 조건: 워드마크는 쓰지 않고 배지만 씁니다. 기본은 빨간 원에 흰 P이고, 색을 쓰기 어려우면 검정이나 흰색으로 씁니다. 테두리 · 필터 · 효과를 더하거나 원에서 P를 빼거나 색을 바꾸지 않습니다. 배지에는 늘 행동 유도(예: Pinterest에서 팔로우)를 함께 두고 자기 Pinterest 계정으로 잇습니다.
- 행동 유도는 쓰는 쪽이 링크 이름(`SocialLinks`의 `label`, 말풍선과 화면 읽기에 쓰임)으로 넣습니다. 웹은 "Pinterest에서 보기"로 씁니다.

### X(`x`)

- 원천: [X 브랜드 툴킷](https://about.x.com/en/who-we-are/brand-toolkit)의 "X logo" 다운로드(`x-logo.zip`, cdn.sanity.io)에 든 `logo.svg`(viewBox `0 0 1200 1227`). 로그인 · 동의 단계 없이 바로 받는 링크입니다(2026-11-10). 경로는 그대로 두고 흰색으로 박혀 있던 path의 `fill`만 빼 `--logo-color`를 따르게 했습니다. 24 격자 안 14 크기(x · y 5)에 놓습니다. 아래 여백 규칙 때문에 다른 로고보다 작습니다.
- 조건: 툴킷의 [Brand Quick Guide For External Partners](https://about.x.com/content/dam/about-twitter/x/brand-toolkit/x-brand-guidelines.pdf)(2023-08 v1.0)를 따릅니다. 로고는 검정 · 흰색만 씁니다("The X logo is black or white", 흰 바탕에 검정 · 검정 바탕에 흰색, `#000` · `#fff`). 로고 둘레에 로고 폭만큼 빈 공간을 둡니다("The empty space around the logo should be at minimum equal width left, right, top, bottom"). `SocialLinks` 원(40)에 22로 그리면 로고는 약 12.8이고 둘레 여백이 13.6이라 이를 채웁니다. 이름은 Twitter가 아니라 X로 씁니다(지침의 용어표). 화면 읽기 이름은 "X"입니다.
- 쓰임: 지침은 파트너가 로고를 "청중이 찾아올 곳을 안내하는 데"("to help signpost where your audience can find you") 쓴다고 하고, 계정이 X에 있음을 보이는 사용자 이름 짝(lockup)을 둡니다. 자기 X 계정으로 잇는 소셜 링크 버튼은 이 쓰임에 맞는다고 보고 씁니다. 우리 해석이며 X가 확인해 준 것은 아닙니다. 지침은 X가 명시적으로 허락한 목적으로만 쓸 수 있고("You may use the X brands solely for the purposes expressly authorized by X"), 툴킷 페이지는 자료를 쓰면 상표 지침 · 이용 약관을 따르기로 한 것으로 본다고 합니다. 쓰임이 넓어지면 trademarks@x.com에 묻습니다.

### 공식 자료 대신 무료 SVG를 쓴 로고

`instagram` · `threads` · `facebook` · `tiktok` · `notion` · `behance`(2026-11-10, 사용자 결정 "무료 SVG 쓰자", 이어서 "노션도 그렇게 바꿔줄 수 있을까?" · "Behance도 svg넣어줘"). 공식 자료를 받을 수 없거나 회사 지침이 허락 없이는 로고를 쓰지 못하게 하는 서비스들입니다. 사용자가 위험(상표권은 회사에 있고 무료 SVG 라이선스는 그림에만 해당, 회사가 요청하면 내려야 함)을 듣고 정했습니다.

- 원천: [simple-icons](https://github.com/simple-icons/simple-icons) 16.37.0 npm 묶음(`https://registry.npmjs.org/simple-icons/-/simple-icons-16.37.0.tgz`, 로그인 · 동의 없이 받는 공개 저장소)의 `icons/<이름>.svg`(viewBox `0 0 24 24`). 패키지를 의존성으로 들이지 않고 경로만 옮겼습니다. 경로와 viewBox는 그대로이고 `role` · `title`만 뺐습니다. 판을 올리면 이 절의 판과 경로를 함께 바꿉니다.
- 라이선스: simple-icons는 CC0-1.0입니다. 다만 그 면책 문서는 프로젝트가 CC0여도 모든 아이콘이 CC0인 것은 아니라고 하고(개별 라이선스는 데이터에 있을 때만), 이 여섯에는 개별 라이선스 항목이 없습니다. 또 브랜드가 문제 삼는 일에 책임지지 않으니 쓰는 쪽이 권한을 구하라고 합니다("We ask that our users seek the correct permissions"). 상표권은 각 회사에 있습니다.
- 크기: 24 격자 안에서 다른 로고와 눈으로 맞춥니다. Instagram · Notion은 둥근 사각형 · 사각형이라 LinkedIn과 같은 18(x · y 3), Threads · Facebook · TikTok은 GitHub · Pinterest와 같은 높이 19(x · y 2.5), 가로로 긴 Behance는 디스코드와 같은 폭 19(x · y 2.5).
- 쓰임 · 색: SNS 버튼(`SocialLinks`)에서 기본 흑백으로 씁니다. 화면 읽기 이름(`label`)은 Instagram · Threads · Facebook · TikTok · Notion · Behance입니다. 연락처 줄의 브랜드색은 지침을 받지 못해 정하지 않았습니다(기본 흑백).
- 공식 자료를 쓰지 못한 이유와 회사 지침에 어긋날 수 있는 점(위험 설명):
  - Instagram · Threads · Facebook: Meta 브랜드 리소스가 로고 묶음을 "적용되는 가이드라인 및 기타 사용 약관을 읽었으며 이에 동의합니다" 문구 아래 다운로드로만 줍니다. Instagram 글리프 세부 페이지는 열리지 않았고 Threads는 "More detailed guidelines are coming soon"이라 색 · 소셜 링크 조건을 확인하지 못했습니다. Facebook 로고 지침은 파랑에 흰 "f"(기본)나 흰색(보조)만 쓰고 색을 바꾸지 말라고 해("DON'T change the color of the logo") 검정 로고와 맞지 않습니다. Instagram 이름 조항("use any of our logos to replace it")은 글 속 낱말을 로고로 바꾸지 말라는 뜻입니다.
  - TikTok: [Brand Hub 법적 고지](https://www.tiktokbrandhub.com/legal)와 [개발자 디자인 지침](https://developers.tiktok.com/docs/en/getting-started-design-guidelines)이 로고 · 아이콘을 사전 서면 허가 없이 쓰지 말라고 합니다("You may not use the TikTok logos, icons, symbols, or designs without prior written permission"). 낱말 TikTok은 허락 없이 플랫폼을 가리키는 데 쓸 수 있습니다.
  - Notion: [상표 사용 지침](https://notion.notion.site/Notion-Trademark-Usage-Guidelines-9826313c686a4f6e9d8a48347162714b)은 브랜드 지침이나 서면 합의로 승인된 표장만 쓰게 하고, [브랜드 사용 지침](https://notion.notion.site/Notion-s-brand-usage-guidelines-How-to-use-Notion-s-brand-in-your-marketing-689045e1761348f887a3c5c80295e00f)은 단독 Notion 로고를 쓰지 말라고 합니다. 쓸 때 붙이는 표기도 허락을 받았다는 문구("used here with permission")입니다. 허락은 team@makenotion.com에 묻습니다.
  - Behance: Behance는 Adobe 제품이고, [Adobe 상표 지침](https://www.adobe.com/legal/permissions/trademarks.html)은 라이선스 없이는 Adobe 제품 로고를 쓸 수 없고 소프트웨어 제품 · 서비스 안에 넣으려면 서면 허가가 필요하다고 합니다. Behance가 따로 공개한 로고 자료도 찾지 못했습니다. 허락은 같은 페이지의 요청 양식으로 묻습니다.
- 내리기: 회사가 요청하면 그 로고를 `icons.ts`에서 지우고 웹은 일반 링크 아이콘(`link`)으로 돌립니다. 공식 자료를 받을 수 있게 되면(사용자가 Meta 묶음을 받아 오는 등) 그 자료로 바꿉니다.

### Bootstrap Icons에서 가져온 로고

`line` · `whatsapp`(2026-11-10, 사용자 지시 "Bootstrap Icons의 브랜드 묶음을 참고"). 위 로고들과 달리 공식 자료를 먼저 찾지 않고 Bootstrap Icons의 그림을 원본으로 씁니다. 아이콘 그림은 Bootstrap Icons(MIT)이고, 상표 사용 조건은 확인하지 않았습니다.

- 원천: [Bootstrap Icons](https://github.com/twbs/icons) v1.13.2(커밋 `afbfcbc`)의 `icons/line.svg` · `icons/whatsapp.svg`(viewBox `0 0 16 16`, [브랜드 묶음](https://icons.getbootstrap.com/icons/category/brand/)에 속함). 저장소의 공개 원문 파일 둘과 `LICENSE`만 받았고(2026-11-10, 로그인 · 동의 없음) 패키지를 의존성으로 들이지 않았습니다. 경로와 viewBox는 그대로이고 바깥 `<svg>`의 `xmlns` · `width` · `height` · `class` · `fill`만 뺐습니다. 판을 올리면 이 절의 판과 경로를 함께 바꿉니다.
- 크기: 둘 다 16 격자를 꽉 채우는 둥근 말풍선이라 GitHub · Pinterest와 같은 19(x · y 2.5)에 놓습니다.
- 쓰임 · 색: 기본 흑백으로 둡니다. 화면 읽기 이름(`label`)은 LINE · WhatsApp입니다. 연락처 줄의 브랜드색은 확인한 지침이 없어 정하지 않았습니다(Instagram처럼 기본 흑백).
- 상표: 그림의 저작권은 MIT로 풀려 있지만 상표권은 각 회사에 있고, 두 회사의 로고 지침(허락되는 색 · 최소 크기 · 여백 · 금지 사항 · 승인)은 확인하지 않았습니다. 회사가 요청하면 `icons.ts`에서 지우고 일반 링크 아이콘(`link`)으로 돌립니다. 참고로 출처를 바꾸기 전에 [LINE 로고 안내](https://www.line.me/en/logo)를 요약으로 한 번 읽었을 때는 색 바꾸기를 금지하고 PC 최소 크기를 20px로 둔다고 나와, 검정 · 흰색 단색과 16 크기가 그 지침과 맞지 않을 수 있습니다(원문 대조는 하지 않음). WhatsApp(Meta 브랜드 리소스)은 읽지 못했습니다.
- 라이선스(MIT가 요구하는 저작권 · 허락 고지, 받은 `LICENSE` 그대로):

  ```text
  The MIT License (MIT)

  Copyright (c) 2019-2024 The Bootstrap Authors

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in
  all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
  THE SOFTWARE.
  ```

GitHub와 Invertocat 로고는 GitHub, Inc.의, X와 X 로고는 X Corp.의, Instagram · Threads · Facebook과 그 로고는 Meta의, TikTok과 그 로고는 TikTok의, Notion과 그 로고는 Notion의, Behance와 그 로고는 Adobe의, Discord와 Clyde 로고는 Discord Inc.의, LinkedIn과 [in] 로고는 LinkedIn Corporation의, Pinterest와 그 배지는 Pinterest, Inc.의, LINE과 그 로고는 LY Corporation의, WhatsApp과 그 로고는 WhatsApp LLC의 상표입니다.

## 원칙

- 배지는 모두 캡슐. 청록 채움·민트·흰 바탕 테두리만 쓰고 빨강은 오류 전용, 회색 채움 배지는 없습니다.
- 누를 수 있는 컨트롤에만 그림자. 글자 토큰은 8개(`text-title` … `text-micro`), 화면에서는 `Text` 역할 11가지로 씁니다.
- 누를 수 있는 것은 hover에 살짝, 누르면 한 단계 진하게 칠합니다(2026-11-09 사용자 결정). 바탕색은 그대로 두고 그 위에 글자색을 덧칠해(hover 5%, 누름 10%) 라이트는 어둡게 · 다크는 밝게 보이고, 채움 버튼도 같은 방향입니다. iOS 탭 하이라이트는 끕니다. `styles.css`의 `pressable` 클래스가 이것이고, Button · Toggle · 분할 전환 · 달력 · 닫기 버튼 · 눌리는 줄 · 활동 · 프로그램 목록 줄이 씁니다. 받아 쓰는 쪽이 누르는 요소를 직접 만들 때도 `pressable`을 줍니다.
  - 덧칠은 켜지고 꺼지는 것이 바로입니다(그라데이션은 전환되지 않음). ListRow는 액션 칸까지 줄 전체를 칠하려고 바탕색으로 같은 값을 칠합니다.
  - 넣지 않은 곳: 폼 컨트롤(Checkbox · Radio · Switch는 손잡이가 늘어남 · Select 트리거 · 입력), 메뉴 · 목록 항목의 `data-[highlighted]` 회색(DropdownMenu · ContextMenu · Select · Command · TimePicker, 키보드 강조와 겸함), 시간표 블록(그림자 + 축소), QueueCard(축소, 바탕이 그라데이션), Alert 행동(흐려짐), TeamColumn(끌기).
  - 활동 · 프로그램 목록 줄(ActivityRow · ProgramRow)은 덧칠 면을 글 자리 밖 좌우 12까지 넓힙니다(`-mx-3 px-3`, 고른 면도 같음). 스크롤 칸 안에 둘 때는 칸 안쪽에 12 이상 여백이 있어야 잘리지 않습니다(TwoPane 목록 칸 · TwoColumnList는 맞춰 둠).
- 날짜는 `M월 d일 (요일)`(올해가 아니면 앞에 `yyyy년`), 실제 시각만 `HH:mm`. `오늘` 같은 상대 표기는 쓰지 않습니다. 표기 도우미는 `lib/date`에 있습니다.
- 움직임은 Radix의 `data-state`에 Tailwind 애니메이션을 붙입니다. 동작 줄이기 설정이면 모두 꺼집니다.
- 코드 식별자는 영문, 화면 글자만 한국어.

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard)(SIL OFL 1.1, [글꼴](#글꼴))입니다. 예시에 나오는 기관 이름·로고는 시안 확인용이며 각 기관에 권리가 있습니다.
