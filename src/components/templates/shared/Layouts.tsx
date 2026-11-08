import { createContext, useContext, type ReactNode } from 'react';
import { Pane, PaneFooter } from '@/components/atoms/shared/Pane';
import { RowList } from '@/components/atoms/shared/RowList';
import { Segmented } from '@/components/molecules/shared/Segmented';
import { cn } from '@/lib/utils';

type SlotProps = { className?: string; children: ReactNode };

/** 목록 칸(5fr, 따로 스크롤) */
function TwoPaneList({ className, children }: SlotProps) {
  return <Pane className={className}>{children}</Pane>;
}

/** 상세 칸(7fr, 따로 스크롤). detailKey가 바뀌면 내용이 아래에서 떠오른다 */
function TwoPaneDetail({ detailKey, className, children }: SlotProps & { detailKey?: string }) {
  return (
    <div className={cn('relative col-start-2 row-start-1 min-h-0', className)}>
      <Pane><div key={detailKey} className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300">{children}</div></Pane>
    </div>
  );
}

/** 상세 칸 아래 CTA(위로 바탕색 그러데이션). 상세 칸과 같은 자리 아래쪽에 겹쳐 놓인다(Detail 다음에 둔다) */
function TwoPaneFooter({ className, children }: SlotProps) {
  return <div className={cn('relative col-start-2 row-start-1 self-end', className)}><PaneFooter>{children}</PaneFooter></div>;
}

function TwoPaneRoot({ children }: { children: ReactNode }) {
  return <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 px-6">{children}</div>;
}

/**
 * 목록 · 상세 두 칸(목록 5 : 상세 7, 칸 사이 48, 경계는 여백만, 컴파운드): List · Detail · Footer(상세 칸 아래 CTA).
 * `<TwoPane><TwoPane.List>…</TwoPane.List><TwoPane.Detail detailKey={id}>…</TwoPane.Detail><TwoPane.Footer><Button size="lg" block>신청하러 가기</Button></TwoPane.Footer></TwoPane>`
 */
export const TwoPane = Object.assign(TwoPaneRoot, { List: TwoPaneList, Detail: TwoPaneDetail, Footer: TwoPaneFooter });

/** 왼쪽 칸 */
function EvenSplitLeft({ className, children }: SlotProps) {
  return <Pane className={className}>{children}</Pane>;
}

/** 오른쪽 칸 */
function EvenSplitRight({ className, children }: SlotProps) {
  return <Pane className={className}>{children}</Pane>;
}

function EvenSplitRoot({ children }: { children: ReactNode }) {
  return <div className="grid min-h-0 flex-1 grid-cols-2 gap-12 px-6">{children}</div>;
}

/**
 * 같은 너비 두 칸(편집 | 미리보기, 서버 | 채널, 컴파운드): Left · Right, 칸마다 따로 스크롤.
 * `<EvenSplit><EvenSplit.Left><NoticeForm … /></EvenSplit.Left><EvenSplit.Right><NoticePreview … /></EvenSplit.Right></EvenSplit>`
 */
export const EvenSplit = Object.assign(EvenSplitRoot, { Left: EvenSplitLeft, Right: EvenSplitRight });

/** 목록 위 머리 */
function TwoColumnListHeader({ className, children }: SlotProps) {
  return <div className={className}>{children}</div>;
}

/** 두 열 목록(가로 흐름, 줄마다 구분선) */
function TwoColumnListItems({ children }: { children: ReactNode }) {
  return <RowList columns={2}>{children}</RowList>;
}

function TwoColumnListRoot({ children }: { children: ReactNode }) {
  return <Pane className="flex-1 px-6">{children}</Pane>;
}

/**
 * 고른 것이 없을 때 목록을 두 열로(가로 흐름, 세로 스크롤, 컴파운드): Header · Items.
 * `<TwoColumnList><TwoColumnList.Header>…</TwoColumnList.Header><TwoColumnList.Items>{rows}</TwoColumnList.Items></TwoColumnList>`
 */
export const TwoColumnList = Object.assign(TwoColumnListRoot, { Header: TwoColumnListHeader, Items: TwoColumnListItems });

/** 본문 칸 */
function DetailWithAsideMain({ className, children }: SlotProps) {
  return <div className={className}>{children}</div>;
}

/** 오른쪽 고정 카드 칸(340, 스크롤해도 위에 붙는다) */
function DetailWithAsideAside({ className, children }: SlotProps) {
  return <aside className={cn('sticky top-0', className)}>{children}</aside>;
}

function DetailWithAsideRoot({ children }: { children: ReactNode }) {
  return <Pane className="flex-1"><div className="mx-auto grid max-w-[1000px] grid-cols-[minmax(0,1fr)_340px] items-start gap-12 px-6">{children}</div></Pane>;
}

/**
 * 링크로 바로 들어온 상세(컴파운드): Main(본문) + Aside(오른쪽 고정 카드 340).
 * `<DetailWithAside><DetailWithAside.Main><ActivityDetail d={d} inline={false} /></DetailWithAside.Main><DetailWithAside.Aside><ApplyCard d={d} /></DetailWithAside.Aside></DetailWithAside>`
 */
export const DetailWithAside = Object.assign(DetailWithAsideRoot, { Main: DetailWithAsideMain, Aside: DetailWithAsideAside });

/** 왼쪽 머리 칸(360) */
function SidebarDetailSide({ className, children }: SlotProps) {
  return <div className={className}>{children}</div>;
}

/** 오른쪽 탭 내용 칸 */
function SidebarDetailContent({ className, children }: SlotProps) {
  return <div className={className}>{children}</div>;
}

function SidebarDetailRoot({ children }: { children: ReactNode }) {
  return <Pane className="flex-1"><div className="grid max-w-[1000px] grid-cols-[360px_minmax(0,1fr)] gap-12 px-6">{children}</div></Pane>;
}

/**
 * 프로필(컴파운드): Side(왼쪽 머리 360) + Content(오른쪽 탭 내용).
 * `<SidebarDetail><SidebarDetail.Side><ProfileHeader p={p} /></SidebarDetail.Side><SidebarDetail.Content>…</SidebarDetail.Content></SidebarDetail>`
 */
export const SidebarDetail = Object.assign(SidebarDetailRoot, { Side: SidebarDetailSide, Content: SidebarDetailContent });

/** 왼쪽 설정 칸(280) */
function ThreeColumnEditorLeft({ className, children }: SlotProps) {
  return <Pane className={className}>{children}</Pane>;
}

/** 가운데 격자 칸 */
function ThreeColumnEditorCenter({ className, children }: SlotProps) {
  return <Pane className={className}>{children}</Pane>;
}

/** 오른쪽 고른 항목 칸(300) */
function ThreeColumnEditorRight({ className, children }: SlotProps) {
  return <Pane className={className}>{children}</Pane>;
}

function ThreeColumnEditorRoot({ children }: { children: ReactNode }) {
  return <div className="grid min-h-0 flex-1 grid-cols-[280px_minmax(0,1fr)_300px] gap-8 px-6">{children}</div>;
}

/**
 * 세 칸 편집기(설정 | 격자 | 고른 항목, 컴파운드): Left · Center · Right, 칸마다 따로 스크롤.
 * `<ThreeColumnEditor><ThreeColumnEditor.Left>…</ThreeColumnEditor.Left><ThreeColumnEditor.Center><WeeklyTimetable … /></ThreeColumnEditor.Center><ThreeColumnEditor.Right><BlockEditor … /></ThreeColumnEditor.Right></ThreeColumnEditor>`
 */
export const ThreeColumnEditor = Object.assign(ThreeColumnEditorRoot, { Left: ThreeColumnEditorLeft, Center: ThreeColumnEditorCenter, Right: ThreeColumnEditorRight });

type ManageLayoutContextValue = { tabs: readonly string[]; labels?: Partial<Record<string, string>>; tab: string; onTab?: (t: string) => void };
const ManageLayoutContext = createContext<ManageLayoutContextValue | null>(null);

function useManageLayout(part: string) {
  const ctx = useContext(ManageLayoutContext);
  if (!ctx) throw new Error(`ManageLayout.${part}는 <ManageLayout> 안에서 쓴다`);
  return ctx;
}

/** 관리 탭(분할 전환) */
function ManageLayoutTabs({ className }: { className?: string }) {
  const { tabs, labels, tab, onTab } = useManageLayout('Tabs');
  return <div className={cn('max-w-[620px] px-6 pb-4', className)}><Segmented items={tabs} labels={labels} value={tab} onChange={onTab} label="관리 탭" /></div>;
}

/** 탭 내용(탭을 바꾸면 페이드) */
function ManageLayoutContent({ className, children }: SlotProps) {
  const { tab } = useManageLayout('Content');
  return <div key={tab} className={cn('flex min-h-0 flex-1 flex-col animate-in fade-in-0 duration-300', className)}>{children}</div>;
}

function ManageLayoutRoot<T extends string>({ tabs, labels, tab, onTab, children }: {
  /** 탭 값(영문 키) 순서. 활동 관리는 MANAGE_TABS */
  tabs: readonly T[];
  /** 탭 화면 글자. 활동 관리는 MANAGE_TAB_LABEL */
  labels?: Partial<Record<T, string>>;
  tab: T; onTab?: (t: T) => void; children: ReactNode;
}) {
  return <ManageLayoutContext.Provider value={{ tabs, labels, tab, onTab: onTab as ((t: string) => void) | undefined }}>{children}</ManageLayoutContext.Provider>;
}

/**
 * 개설자 관리(컴파운드): Tabs(관리 탭) + Content(탭 내용, 탭을 바꾸면 페이드). 탭 목록·이름·값은 루트가 받는다.
 * `<ManageLayout tabs={MANAGE_TABS} labels={MANAGE_TAB_LABEL} tab={tab} onTab={setTab}><ManageLayout.Tabs /><ManageLayout.Content><TwoPane>…</TwoPane></ManageLayout.Content></ManageLayout>`
 */
export const ManageLayout = Object.assign(ManageLayoutRoot, { Tabs: ManageLayoutTabs, Content: ManageLayoutContent });
