import { createContext, Fragment, useContext, useEffect, useLayoutEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { DateHeader } from '@/components/molecules/shared/DateHeader';
import { dayKey, fromDayKey } from '@/lib/date';
import { cn } from '@/lib/utils';

type DateSectionListContextValue = {
  today: Date; current?: string; jump: (d: Date) => void;
  items: unknown[]; getDate?: (item: unknown) => Date; renderItem?: (item: unknown) => ReactNode;
};
const DateSectionListContext = createContext<DateSectionListContextValue | null>(null);

function useDateSectionList(part: string) {
  const ctx = useContext(DateSectionListContext);
  if (!ctx) throw new Error(`DateSectionList.${part}는 <DateSectionList> 안에서 쓴다`);
  return ctx;
}

const sectionsOf = (box: HTMLElement) => [...box.querySelectorAll<HTMLElement>('[data-slot=date-section]')];
const headerOf = (box: HTMLElement) => box.querySelector<HTMLElement>(':scope > [data-slot=date-header]');
/** 상자 안 스크롤 위치로 본 el의 위쪽 */
const topOf = (box: HTMLElement, el: HTMLElement) => el.getBoundingClientRect().top - box.getBoundingClientRect().top + box.scrollTop;
/** 그 날짜의 묶음, 없으면 다음 묶음, 그것도 없으면 마지막(가장 늦은) 묶음 */
function sectionFor(box: HTMLElement, d: Date) {
  const key = dayKey(d);
  const all = sectionsOf(box);
  const later = all.filter((s) => s.dataset.date! >= key);
  const pick = (list: HTMLElement[], first: boolean) => list.reduce<HTMLElement | undefined>((a, s) => (!a || (first ? s.dataset.date! < a.dataset.date! : s.dataset.date! > a.dataset.date!) ? s : a), undefined);
  return later.length ? pick(later, true) : pick(all, false);
}

/** 고정 머리(⑧-0): 보이는 맨 위 묶음의 날짜(스크롤에 따라 바뀜). 누르면 말풍선 달력, 고르면 그 날짜 묶음으로 */
function Header({ className }: { className?: string }) {
  const { today, current, jump } = useDateSectionList('Header');
  return <DateHeader date={current ? fromDayKey(current) : today} today={today} sticky pickable onSelect={jump} className={className} />;
}

/** 날짜 묶음 하나: 날짜 소제목(DateHeader) + 행(children) */
function Section({ date, className, children }: { date: Date; className?: string; children?: ReactNode }) {
  const { today } = useDateSectionList('Section');
  return (
    <section data-slot="date-section" data-date={dayKey(date)} tabIndex={-1} className={cn('outline-none', className)}>
      <DateHeader date={date} today={today} />
      {children}
    </section>
  );
}

/** items를 날짜로 묶어 과거 → 미래 순서로 그린다. 묶음 안 행은 renderItem으로 */
function Sections() {
  const { items, getDate, renderItem } = useDateSectionList('Sections');
  const groups = useMemo(() => {
    const map = new Map<string, unknown[]>();
    if (getDate) for (const it of items) { const k = dayKey(getDate(it)); map.set(k, [...(map.get(k) ?? []), it]); }
    return [...map].sort(([a], [b]) => a.localeCompare(b));
  }, [items, getDate]);
  if (!renderItem) return null;
  return <>{groups.map(([k, list]) => <Section key={k} date={fromDayKey(k)}>{list.map((it, i) => <Fragment key={i}>{renderItem(it)}</Fragment>)}</Section>)}</>;
}

function DateSectionListRoot<T>({ items = [], getDate, renderItem, today = new Date(), pickable = false, className, children }: {
  items?: T[]; getDate?: (item: T) => Date; renderItem?: (item: T) => ReactNode; today?: Date; pickable?: boolean; className?: string; children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [current, setCurrent] = useState<string>();
  const todayKey = dayKey(today);

  /** 고정 머리 바로 아래에 걸린 묶음을 지금 날짜로 */
  const sync = () => {
    const box = ref.current;
    if (!box) return;
    const line = box.getBoundingClientRect().top + (headerOf(box)?.offsetHeight ?? 0) + 4;
    let cur: HTMLElement | undefined;
    for (const s of sectionsOf(box)) if (!cur || s.getBoundingClientRect().top <= line) cur = s;
    setCurrent(cur?.dataset.date);
  };
  /** 그 날짜(없으면 다음) 묶음을 고정 머리 바로 아래로. 처음 위치는 instant, 고르면 부드럽게(동작 줄이기면 바로) */
  const scrollTo = (d: Date, behavior?: ScrollBehavior) => {
    const box = ref.current;
    const el = box && sectionFor(box, d);
    if (!box || !el) return;
    box.scrollTo({ top: topOf(box, el) - (headerOf(box)?.offsetHeight ?? 0), behavior });
    sync();
    return el;
  };
  // 키보드로 고른 뒤 Tab이 그 묶음에서 이어지도록 초점도 옮긴다(DateHeader는 초점이 옮겨졌으면 머리로 되돌리지 않는다)
  const jump = (d: Date) => scrollTo(d)?.focus({ preventScroll: true });

  // 처음에는 오늘(없으면 다음) 묶음이 보이게. 글꼴이 늦게 와서 높이가 바뀌면 사용자가 스크롤하기 전까지 다시 맞춘다
  useLayoutEffect(() => {
    scrollTo(today, 'instant');
    const at = ref.current?.scrollTop;
    document.fonts?.ready.then(() => { if (ref.current?.scrollTop === at) scrollTo(today, 'instant'); });
  }, [todayKey]); // eslint-disable-line react-hooks/exhaustive-deps -- 기준일이 바뀔 때만
  useEffect(sync, [items]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <DateSectionListContext.Provider value={{ today, current, jump, items, getDate: getDate as ((item: unknown) => Date) | undefined, renderItem: renderItem as ((item: unknown) => ReactNode) | undefined }}>
      <div ref={ref} data-slot="date-section-list" onScroll={sync} className={cn('relative overflow-y-auto motion-safe:scroll-smooth', className)}>
        {children ?? <>{pickable && <Header />}<Sections /></>}
      </div>
    </DateSectionListContext.Provider>
  );
}

/**
 * 날짜별 묶음 목록(컴파운드, 시안 ⑧-0 내 활동): Header(고정 머리, 누르면 날짜 고르기) · Sections(items를 날짜로 묶음) · Section(날짜 소제목 + 행).
 * 과거가 위, 미래가 아래이고, 처음에는 오늘(없으면 다음, 그것도 없으면 마지막) 묶음이 고정 머리 바로 아래에 보인다. 높이는 쓰는 쪽이 정한다(이 상자가 스크롤한다).
 * 기본 조립은 `<DateSectionList items={list} getDate={(a) => a.date} renderItem={(a) => <ActivityRow a={a} />} pickable />`.
 * 바꿔 조립하려면 부품을 직접 놓는다(순서도 쓰는 쪽이 정한다):
 * `<DateSectionList><DateSectionList.Section date={d}>{rows}</DateSectionList.Section></DateSectionList>`
 */
export const DateSectionList = Object.assign(DateSectionListRoot, { Header, Sections, Section });
