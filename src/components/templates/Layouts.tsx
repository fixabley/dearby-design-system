import type { ReactNode } from 'react';
import { Segmented } from '@/components/atoms/Segmented';
import { Pane, PaneFooter } from '@/components/atoms/Pane';

/** 목록·상세 두 칸(목록 5 : 상세 7, 칸 사이 48, 경계는 여백만) */
export function TwoPane({ list, detail, footer, detailKey }: { list: ReactNode; detail: ReactNode; footer?: ReactNode; detailKey?: string }) {
  return (
    <div className="grid min-h-0 flex-1 grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-12 px-6">
      <Pane>{list}</Pane>
      <div className="relative min-h-0">
        <Pane><div key={detailKey} className="animate-in fade-in-0 slide-in-from-bottom-1 duration-300">{detail}</div></Pane>
        {footer && <PaneFooter>{footer}</PaneFooter>}
      </div>
    </div>
  );
}

/** 같은 너비 두 칸(편집 | 미리보기, 서버 | 채널) */
export function EvenSplit({ left, right }: { left: ReactNode; right: ReactNode }) {
  return <div className="grid min-h-0 flex-1 grid-cols-2 gap-12 px-6"><Pane>{left}</Pane><Pane>{right}</Pane></div>;
}

/** 고른 것이 없을 때 목록을 두 열로(가로 흐름, 세로 스크롤) */
export function TwoColumnList({ header, children }: { header?: ReactNode; children: ReactNode }) {
  return <Pane className="flex-1 px-6">{header}{children}</Pane>;
}

/** 링크로 바로 들어온 상세: 본문 + 오른쪽 고정 카드 340 */
export function DetailWithAside({ main, aside }: { main: ReactNode; aside: ReactNode }) {
  return <Pane className="flex-1"><div className="mx-auto grid max-w-[1000px] grid-cols-[minmax(0,1fr)_340px] items-start gap-12 px-6">{main}<aside className="sticky top-0">{aside}</aside></div></Pane>;
}

/** 프로필: 왼쪽 머리 360 + 오른쪽 탭 내용 */
export function SidebarDetail({ side, children }: { side: ReactNode; children: ReactNode }) {
  return <Pane className="flex-1"><div className="grid max-w-[1000px] grid-cols-[360px_minmax(0,1fr)] gap-12 px-6">{side}<div>{children}</div></div></Pane>;
}

/** 세 칸 편집기(설정 | 격자 | 고른 항목) */
export function ThreeColumnEditor({ left, center, right }: { left: ReactNode; center: ReactNode; right: ReactNode }) {
  return <div className="grid min-h-0 flex-1 grid-cols-[280px_minmax(0,1fr)_300px] gap-8 px-6"><Pane>{left}</Pane><Pane>{center}</Pane><Pane>{right}</Pane></div>;
}

export const MANAGE_TABS = ['participants', 'assignments', 'teams', 'notices', 'timetable', 'discord'] as const;
export type ManageTab = (typeof MANAGE_TABS)[number];
export const MANAGE_TAB_LABEL: Record<ManageTab, string> = { participants: '참여자', assignments: '과제', teams: '팀', notices: '공지', timetable: '시간표', discord: '디스코드' };

/** 개설자 관리: 탭 + 내용(탭을 바꾸면 내용이 페이드) */
export function ManageLayout({ tab, onTab, children }: { tab: ManageTab; onTab?: (t: ManageTab) => void; children: ReactNode }) {
  return (
    <>
      <div className="max-w-[620px] px-6 pb-4"><Segmented items={MANAGE_TABS} labels={MANAGE_TAB_LABEL} value={tab} onChange={onTab} label="관리 탭" /></div>
      <div key={tab} className="flex min-h-0 flex-1 flex-col animate-in fade-in-0 duration-300">{children}</div>
    </>
  );
}
