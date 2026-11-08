import type { Meta, StoryObj } from '@storybook/react-vite';
import { ICONS, ICON_SIZES, Icon, type IconName } from '@/index';

export default { title: 'Foundations' } satisfies Meta;
type S = StoryObj;

const COLORS = [['primary', '청록 채움 · 두 모드 모두 #007F80'], ['accent', '민트 · 선택 면·민트 배지·태그'], ['accent-foreground', '청록 글자·아이콘'], ['foreground', '글자'], ['muted-foreground', '보조 글자'],
  ['muted', '채움 · 입력·분할 전환 바탕'], ['border', '구분선 0.5px'], ['background', '바탕'], ['destructive', '탈락·오류 전용'], ['amber', '상태 캡션(선발 중)만']];
export const Colors: S = { render: () => <div className="grid grid-cols-5 gap-3">{COLORS.map(([v, d]) => <div key={v} className="overflow-hidden rounded-xl ring-1 ring-border"><i className="block h-16" style={{ background: `var(--${v === 'amber' ? 'amber' : v})` }} /><p className="p-2.5 text-[12px] text-muted-foreground"><b className="block text-caption font-semibold text-foreground">{v}</b>{d}</p></div>)}</div> };

const TYPE: [string, string][] = [['text-title', '화면 제목 26/700'], ['text-section', '섹션 제목 22/700'], ['text-headline', '소제목·행 제목 17/600'], ['text-body font-semibold', '행 안 제목 15/600'], ['text-body', '본문 15'], ['text-caption', '보조 13'], ['text-caption font-semibold', '컨트롤 13/600'], ['text-badge', '배지 12/700'], ['text-micro', '마이크로 11']];
export const Typography: S = { render: () => <div className="divide-y divide-border">{TYPE.map(([c, n]) => <div key={n} className="flex items-baseline gap-5 py-2.5"><small className="w-44 shrink-0 text-[12px] text-muted-foreground">{n}<br /><code>{c}</code></small><span className={c}>활동 둘러보기 SSAFY 17기</span></div>)}</div> };

export const RadiusAndShadow: S = { name: 'Radius & shadow', render: () => <div className="flex gap-4">{[['rounded-sm', '작은 마크 6'], ['rounded-md', '썸네일·버튼·메뉴 12'], ['rounded-lg', '섹션 카드 16'], ['rounded-xl', '커버·카드 20']].map(([c, n]) => <div key={n} className={`grid h-24 w-40 place-items-center bg-card text-center text-[12px] text-muted-foreground shadow-control ${c}`}>{n}<br /><code>{c}</code></div>)}</div> };

export const Icons: StoryObj<{ size: 12 | 16 | 20 | 24 | 32 }> = { args: { size: 24 }, argTypes: { size: { control: 'inline-radio', options: ICON_SIZES } },
  render: ({ size }) => <div className="grid grid-cols-[repeat(auto-fill,96px)] gap-2">{(Object.keys(ICONS) as IconName[]).map((n) => <div key={n} className="flex h-[84px] flex-col items-center justify-center gap-2 rounded-xl ring-1 ring-inset ring-border"><Icon name={n} size={size} /><span className="text-[12px] text-muted-foreground">{n}</span></div>)}</div> };

export const IconSizes: S = { name: 'Icon sizes', render: () => <div className="flex flex-col gap-4">{(['home', 'calendar', 'timetable', 'filter'] as IconName[]).map((n) => <div key={n} className="flex items-end gap-6">{ICON_SIZES.map((s) => <div key={s} className="flex flex-col items-center gap-2 text-[12px] text-muted-foreground"><Icon name={n} size={s} />{s}</div>)}</div>)}</div> };

export const Motion: S = { render: () => <table className="text-caption"><tbody>{[['duration-150', '눌림·색 바뀜'], ['duration-200~300 ease-spring', '스위치·라디오·분할 전환 미끄러짐'], ['animate-in fade-in slide-in-from-bottom', '칸 바뀜·모달·시트 떠오름'], ['data-[state=closed]:animate-out', '닫힐 때 짧게 가라앉음(Radix가 끝날 때까지 기다림)'], ['ds-pop / ds-eq', '찜 튀어 오름 · LIVE 막대'], ['prefers-reduced-motion', '모두 끔']].map(([a, b]) => <tr key={a} className="border-b border-border"><td className="py-2 pr-6"><code>{a}</code></td><td className="text-muted-foreground">{b}</td></tr>)}</tbody></table> };
