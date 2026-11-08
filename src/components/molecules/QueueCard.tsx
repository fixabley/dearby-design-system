import { Icon } from '@/components/atoms/Icon';

/** 오늘의 맞춤 대기열 진입 카드(커버 셋 겹침 + 제목·진행 + 화살표) */
export function QueueCard({ covers, title = '오늘의 맞춤 대기열', sub, onClick }: { covers: string[]; title?: string; sub: string; onClick?: () => void }) {
  return (
    <button type="button" onClick={onClick} className="flex w-full items-center gap-3.5 rounded-xl bg-gradient-to-br from-[#E3F3F2] to-[#F4F8F8] px-4 py-[18px] text-left shadow-control outline-none transition-transform active:scale-[.99] focus-visible:ring-2 focus-visible:ring-ring dark:from-card dark:to-card">
      <span className="flex shrink-0 pl-3">{covers.map((c) => <i key={c} className="-ml-3 h-11 w-[34px] rounded-sm border-2 border-white bg-cover bg-center shadow-[0_1px_3px_rgba(0,0,0,.12)]" style={{ backgroundImage: `url(${c})` }} />)}</span>
      <span className="min-w-0"><b className="block truncate text-body font-semibold">{title}</b><small className="block truncate text-[12px] text-muted-foreground">{sub}</small></span>
      <span className="ml-auto shrink-0 text-[#b8b8bc] [&_svg]:size-4"><Icon name="chevronRight" /></span>
    </button>
  );
}
