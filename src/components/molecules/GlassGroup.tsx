import type { IconName } from '@/icons';
import { Icon } from '@/components/atoms/Icon';
import { Separator } from '@/components/ui/separator';

export type GlassAction = { icon: IconName; label: string; onClick?: () => void };
const glass = 'border border-black/10 bg-white/75 shadow-[0_4px_16px_rgba(0,0,0,.08)] backdrop-blur-xl backdrop-saturate-150 dark:border-white/10 dark:bg-[rgba(32,36,39,.74)]';

function GlassButton({ a, badge }: { a: GlassAction; badge?: number }) {
  return (
    <button type="button" aria-label={a.label} onClick={a.onClick} className="relative grid size-10 place-items-center rounded-full outline-none transition-transform active:scale-90 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-[22px]">
      <Icon name={a.icon} />
      {!!badge && <b className="absolute right-0.5 top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-[#FF3B30] px-1 text-[10px] font-bold text-white">{badge}</b>}
    </button>
  );
}

/** 우상단 그룹: 화면 액션 | 설정·알림(설정·알림은 늘 보인다) */
export function GlassGroup({ actions = [], unread = 0 }: { actions?: GlassAction[]; unread?: number }) {
  return (
    <div className={`inline-flex h-11 items-center rounded-full px-1 ${glass}`}>
      {actions.map((a) => <GlassButton key={a.label} a={a} />)}
      {actions.length > 0 && <Separator orientation="vertical" className="mx-[3px] !h-[22px] bg-current opacity-20" />}
      <GlassButton a={{ icon: 'settings', label: '설정' }} />
      <GlassButton a={{ icon: 'bell', label: '알림' }} badge={unread} />
    </div>
  );
}
export { glass };
