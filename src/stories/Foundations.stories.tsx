import type { Meta, StoryObj } from '@storybook/react-vite';
import { ICONS, ICON_SIZES, Icon, Text, renderLite, type IconName } from '@/index';

export default { title: 'Foundations' } satisfies Meta;
type S = StoryObj;

const COLORS = [['primary', '청록 채움 · 두 모드 모두 #007F80'], ['accent', '민트 · 선택 면·민트 배지·태그'], ['accent-foreground', '청록 글자·아이콘'], ['foreground', '글자'], ['muted-foreground', '보조 글자'],
  ['muted', '채움 · 입력·분할 전환 바탕'], ['border', '구분선 0.5px'], ['background', '바탕'], ['destructive', '탈락·오류 전용'], ['amber', '상태 캡션(선발 중)만'],
  ['toast', '토스트 캡슐 · 두 모드 모두 검정 85%'], ['toast-action', '토스트 행동 · 밝은 청록']];
export const Colors: S = { render: () => <div className="grid grid-cols-5 gap-3">{COLORS.map(([v, d]) => <div key={v} className="overflow-hidden rounded-xl ring-1 ring-border"><i className="block h-16" style={{ background: `var(--${v === 'amber' ? 'amber' : v})` }} /><p className="p-2.5 text-[12px] text-muted-foreground"><b className="block text-caption font-semibold text-foreground">{v}</b>{d}</p></div>)}</div> };

/** 글자 계층은 Text 아톰으로만 쓴다(Atoms › Text › Scale에서 11가지를 모두 볼 수 있다) */
const TYPE = [['title', '화면 제목 26/700'], ['section', '섹션 제목 22/700'], ['subtitle', '소제목·행 제목 17/600'], ['bodyLarge', '입력·목록 행 17/400'], ['innerTitle', '행 안 제목 15/600'],
  ['body', '본문 15/400'], ['caption', '보조 13/400'], ['control', '컨트롤 13/600'], ['badge', '배지 12/700'], ['micro', '마이크로 11/400']] as const;
export const Typography: S = { render: () => <div className="divide-y divide-border">{TYPE.map(([v, n]) => <div key={v} className="flex items-baseline gap-5 py-2.5"><Text variant="caption" tone="muted" className="w-44 shrink-0">{n}<br /><code>{`<Text variant="${v}">`}</code></Text><Text variant={v}>활동 둘러보기 SSAFY 17기</Text></div>)}</div> };

export const RadiusAndShadow: S = { name: 'Radius & shadow', render: () => <div className="flex gap-4">{[['rounded-sm', '작은 마크 6'], ['rounded-md', '썸네일·버튼·메뉴 12'], ['rounded-lg', '섹션 카드 16'], ['rounded-xl', '커버·카드 20']].map(([c, n]) => <div key={n} className={`grid h-24 w-40 place-items-center bg-card text-center text-[12px] text-muted-foreground shadow-control ${c}`}>{n}<br /><code>{c}</code></div>)}</div> };

export const Icons: StoryObj<{ size: 12 | 16 | 20 | 24 | 32 }> = { args: { size: 24 }, argTypes: { size: { control: 'inline-radio', options: ICON_SIZES } },
  render: ({ size }) => <div className="grid grid-cols-[repeat(auto-fill,96px)] gap-2">{(Object.keys(ICONS) as IconName[]).map((n) => <div key={n} className="flex h-[84px] flex-col items-center justify-center gap-2 rounded-xl ring-1 ring-inset ring-border"><Icon name={n} size={size} /><span className="text-[12px] text-muted-foreground">{n}</span></div>)}</div> };

export const IconSizes: S = { name: 'Icon sizes', render: () => <div className="flex flex-col gap-4">{(['home', 'calendar', 'timetable', 'filter'] as IconName[]).map((n) => <div key={n} className="flex items-end gap-6">{ICON_SIZES.map((s) => <div key={s} className="flex flex-col items-center gap-2 text-[12px] text-muted-foreground"><Icon name={n} size={s} />{s}</div>)}</div>)}</div> };

export const Motion: S = { render: () => <table className="text-caption"><tbody>{[['duration-150', '눌림·색 바뀜'], ['duration-200~300 ease-spring', '스위치·라디오·분할 전환 미끄러짐'], ['animate-in fade-in slide-in-from-bottom', '칸 바뀜·모달·시트 떠오름'], ['data-[state=closed]:animate-out', '닫힐 때 짧게 가라앉음(Radix가 끝날 때까지 기다림)'], ['ds-pop / ds-eq', '찜 튀어 오름 · LIVE 막대'], ['prefers-reduced-motion', '모두 끔']].map(([a, b]) => <tr key={a} className="border-b border-border"><td className="py-2 pr-6"><code>{a}</code></td><td className="text-muted-foreground">{b}</td></tr>)}</tbody></table> };

/** 줄인 마크다운: 공지·상세 설명이 쓰는 글 규칙. 디스코드에도 같은 원본을 보낸다 */
export const LiteMarkdown: StoryObj<{ source: string }> = {
  name: 'Lite markdown',
  args: { source: '**굵게** · *기울임* · _기울임_ · ~~취소선~~ · `코드`\n[Google Meet](https://meet.google.com/abc-defg-hij) · https://forms.gle/dearby-study\n• 목록은 • 로 시작\n• user_name 같은 단어 속 밑줄은 그대로\n• javascript:alert(1) 같은 주소는 링크가 되지 않아요' },
  argTypes: { source: { control: 'text' } },
  render: ({ source }) => (
    <div className="grid max-w-[900px] grid-cols-2 gap-8">
      <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-caption">{source}</pre>
      <p className="whitespace-pre-line text-body leading-relaxed">{renderLite(source)}</p>
    </div>
  ),
};
