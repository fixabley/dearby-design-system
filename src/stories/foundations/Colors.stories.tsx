import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Foundations/Colors', id: 'foundations-colors' };
export default meta;

const COLORS = [
  ['primary', '청록 채움 · 두 모드 모두 #007F80'],
  ['accent', '민트 · 선택 면·민트 배지·태그'],
  ['accent-foreground', '청록 글자·아이콘'],
  ['wordmark-ear', '워드마크의 ear와 입 · 청록 50% + 글자색 50%'],
  ['mint', '민트 채움 컨트롤 면 · 다크는 불투명 #142b2c'],
  ['mint-foreground', '민트 채움 컨트롤 글자 · 라이트 #007172(4.5:1)'],
  ['foreground', '글자'],
  ['muted-foreground', '보조 글자'],
  ['muted', '채움 · 입력·분할 전환 바탕'],
  ['border', '구분선 0.5px'],
  ['background', '바탕'],
  ['destructive', '탈락·오류, 지우기 같은 동작의 빨간 글자'],
  [
    'destructive-fill',
    '되돌릴 수 없는 동작의 확인 버튼 면 · 두 모드 모두 #D93025',
  ],
  ['amber', '상태 캡션(선발 중)만'],
  ['toast', '토스트 캡슐 · 라이트 검정 85%, 다크 회색 #39393d'],
  ['toast-action', '토스트 행동 · 밝은 청록'],
  ['switch-off', '꺼진 스위치 바탕 · 다크는 행 배경과 구분되는 밝은 회색'],
  ['segment-thumb', '분할 전환의 고른 면 · 다크는 바탕과 구분되는 밝은 회색'],
];

/** 색 토큰(globals.css): shadcn 이름에 Dearby 값을 덮어씌웠다 */
export const Colors: StoryObj = {
  render: () => (
    <div className="grid grid-cols-5 gap-3">
      {COLORS.map(([v, d]) => (
        <div key={v} className="overflow-hidden rounded-xl ring-1 ring-border">
          <i className="block h-16" style={{ background: `var(--${v})` }} />
          <p className="p-2.5 text-[12px] text-muted-foreground">
            <b className="block text-caption font-semibold text-foreground">
              {v}
            </b>
            {d}
          </p>
        </div>
      ))}
    </div>
  ),
};
