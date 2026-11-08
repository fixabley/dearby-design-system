# Dearby Design System

Dearby 시안 아티팩트(홈·상세 리뉴얼, Loopers 참고 적용, 웹 시안)의 화면 요소를 **shadcn/ui** 위에 다시 만든 디자인 시스템입니다. 실제 서비스 코드와는 별개입니다.

**Storybook**: https://fixabley.github.io/dearby-design-system/

## 구조

```
src/
  globals.css              Tailwind v4 + Dearby 토큰을 shadcn 이름에 덮어씌움
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
| `molecules/shared/` | ListGroup(ListRow) · TextField · Timeline · MetaLine(MetaList) · TrackPicker · SearchBar · QueueCard · GlassGroup · Segmented |
| `molecules/activity/` | ActionTile(ActionTiles) · ProgressTrack · LiveToggle |
| `molecules/program/` | HostLine |
| `molecules/review/` | ReviewCard · ReviewSummary |
| `molecules/submission/` | SubmissionRow |
| `molecules/timetable/` | TimetableButton · WeekdayPicker |
| `molecules/notice/` | Notice |
| `molecules/discord/` | ChannelSelect |
| `molecules/team/` | TeamColumn |
| `organisms/shared/` | FilterSheet · Sidebar · TabBar · TopBar |
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
npm run build-storybook  # dist/
```

`main`에 올리면 GitHub Actions가 Storybook을 빌드해 Pages에 배포합니다.

## 원칙

- 배지는 모두 캡슐. 청록 채움·민트·흰 바탕 테두리만 쓰고 빨강은 오류 전용, 회색 채움 배지는 없습니다.
- 누를 수 있는 컨트롤에만 그림자. 글자 토큰은 8개(`text-title` … `text-micro`), 화면에서는 `Text` 역할 11가지로 씁니다.
- 날짜는 `M월 d일 (요일)`, 실제 시각만 `HH:mm`. `오늘` 같은 상대 표기는 쓰지 않습니다.
- 움직임은 Radix의 `data-state`에 Tailwind 애니메이션을 붙입니다. 동작 줄이기 설정이면 모두 꺼집니다.
- 코드 식별자는 영문, 화면 글자만 한국어.

글꼴은 [Pretendard](https://github.com/orioncactus/pretendard)(SIL OFL 1.1)입니다. 예시에 나오는 기관 이름·로고는 시안 확인용이며 각 기관에 권리가 있습니다.
