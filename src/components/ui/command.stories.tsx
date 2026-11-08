import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, look, state } from '@/stories/argTypes';

// ㉙-l 자격 추가: 공용 키, 행 오른쪽은 값 종류
const KEYS = [
  { name: '나이', kind: '범위' }, { name: '출생연도', kind: '범위' }, { name: '학년', kind: '범위' },
  { name: '학력', kind: '하나 이상 고르기' }, { name: '재학상태', kind: '하나 이상 고르기' }, { name: '취업상태', kind: '하나 이상 고르기' },
  { name: '경력연수', kind: '범위' }, { name: '성별', kind: '하나 고르기' }, { name: '오픈소스 기여 경험', kind: '예/아니오 · 사용자 제안' },
];
// ㉙-r 연관 프로그램: 'SSAFY'로 찾은 발견 프로그램
const PROGRAMS = [
  { name: 'SSAFY', org: '삼성', logo: 'img/logo-13.png' },
  { name: '삼성전자 대학생 프로그래밍 챌린지(SCPC)', org: '삼성전자', logo: 'img/logo-samsung.png' },
  { name: '삼성 AI 포럼', org: '삼성전자', logo: 'img/logo-samsung.png' },
];

const meta: Meta = {
  title: 'Molecules/Command',
  id: 'ui-shadcn-command',
  tags: ['shadcn'],
  component: X.Command,
  args: { value: '', placeholder: '자격 검색', heading: '', keys: KEYS, suggest: '새 자격 제안', variant: 'filled', loop: false, onValueChange: fn(), onSelect: fn() },
  argTypes: {
    value: content('검색어(CommandInput value)'),
    placeholder: content('검색 칸 자리 글자'),
    heading: content('CommandGroup heading(비우면 없음)'),
    keys: content('행(이름 · 오른쪽 값 종류)'),
    suggest: content('검색과 상관없이 늘 보이는 아래 행(forceMount, 비우면 없음)'),
    variant: { control: 'inline-radio', options: ['filled', 'glass'], ...look('CommandInput. filled 시트 안 채움 칸 · glass SearchBar 캡슐') },
    loop: state('끝 행에서 화살표를 누르면 처음으로'),
    onValueChange: event('검색어 바뀜'),
    onSelect: event('행 고름'),
  },
  render: function Render({ value, placeholder, heading, keys, suggest, variant, loop, onValueChange, onSelect }: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <X.Command label="자격 검색" loop={loop}>
        <X.CommandInput variant={variant} placeholder={placeholder} value={value} onValueChange={(v) => { onValueChange?.(v); update({ value: v }); }} />
        <X.CommandList>
          <X.CommandGroup heading={heading || undefined}>
            {(keys as typeof KEYS).map((k) => (
              <X.CommandItem key={k.name} value={k.name} onSelect={() => onSelect?.(k.name)}>
                {k.name}<X.CommandShortcut>{k.kind}<X.Icon name="chevronRight" /></X.CommandShortcut>
              </X.CommandItem>
            ))}
          </X.CommandGroup>
          {suggest && (
            <X.CommandGroup forceMount>
              <X.CommandItem value={suggest} onSelect={() => onSelect?.(suggest)} className="text-accent-foreground"><X.Icon name="addCircle" />{suggest}</X.CommandItem>
            </X.CommandGroup>
          )}
        </X.CommandList>
      </X.Command>
    );
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(㉙-l 자격 키 검색, 없으면 새 자격 제안) */
export const Playground: Story = {};

/** ㉙-r 연관 프로그램 고르기: 서버 검색 결과처럼 shouldFilter={false}, 고른 행에 체크 */
export const Programs: Story = {
  args: { value: 'SSAFY', placeholder: '', chosen: 'SSAFY' },
  argTypes: { chosen: state('고른 프로그램'), heading: { table: { disable: true } }, keys: { table: { disable: true } }, suggest: { table: { disable: true } } },
  render: function Render({ value, placeholder, variant, loop, chosen, onValueChange, onSelect }: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <X.Command label="연관 프로그램" shouldFilter={false} loop={loop}>
        <X.CommandInput variant={variant} placeholder={placeholder} value={value} onValueChange={(v) => { onValueChange?.(v); update({ value: v }); }} />
        <X.CommandList>
          <X.CommandGroup>
            {PROGRAMS.map((p) => (
              <X.CommandItem key={p.name} value={p.name} onSelect={() => { onSelect?.(p.name); update({ chosen: p.name }); }}>
                <img src={p.logo} alt="" className="size-[34px] shrink-0 rounded-[9px] bg-card object-contain shadow-control" />
                <div className="flex min-w-0 flex-1 flex-col"><span className="truncate font-semibold">{p.name}</span><span className="text-caption text-muted-foreground">{p.org}</span></div>
                {chosen === p.name && <X.Icon name="check" label="고름" />}
              </X.CommandItem>
            ))}
          </X.CommandGroup>
        </X.CommandList>
      </X.Command>
    );
  },
};
