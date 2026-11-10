import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState, type ComponentProps } from 'react';
import * as X from '@/index';

/**
 * 자리 표시용 격자 그림(25 x 25). QR이 아니라 크기와 여백을 보는 용도다.
 * 세 모서리의 찾기 무늬와 나머지는 고정된 규칙으로 채운다(실제 QR은 쓰는 쪽이 만든 svg · img)
 */
function PlaceholderQr() {
  const n = 25;
  const finder = (x: number, y: number) =>
    [
      [0, 0],
      [n - 7, 0],
      [0, n - 7],
    ].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const finderOn = (x: number, y: number) => {
    const [fx, fy] = [
      [0, 0],
      [n - 7, 0],
      [0, n - 7],
    ].find(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7)!;
    const dx = x - fx;
    const dy = y - fy;
    const edge = dx === 0 || dx === 6 || dy === 0 || dy === 6;
    const core = dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4;
    return edge || core;
  };
  const cells: [number, number][] = [];
  for (let y = 0; y < n; y++)
    for (let x = 0; x < n; x++) {
      const on = finder(x, y)
        ? finderOn(x, y)
        : Math.imul(x * 31 + y * 17 + 5, 2654435761) >>> 29 < 3;
      if (on) cells.push([x, y]);
    }
  return (
    <svg
      viewBox={`0 0 ${n} ${n}`}
      shapeRendering="crispEdges"
      fill="#000"
      aria-hidden
    >
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" />
      ))}
    </svg>
  );
}

const CARDS = [
  { id: 'sns', name: 'SNS' },
  { id: 'all', name: '전체' },
  { id: 'dev', name: '개발 행사용' },
];
const ACTIVITIES = [
  { id: 'pytorch', title: '파이토치 데이 코리아 2026' },
  { id: 'depro', title: '디프만 19기 정기 세션' },
];

const meta: Meta = {
  title: 'Molecules/Card/CardQr',
  id: 'molecules-cardqr',
  component: X.CardQr,
  args: {
    cards: CARDS,
    cardId: 'sns',
    name: '김도윤',
    handle: 'doyun',
    activities: ACTIVITIES,
    activityId: 'pytorch',
  },
  parameters: { width: 313 },
  render: function Render(args) {
    const [cardId, setCardId] = useState<string>(args.cardId);
    const [activityId, setActivityId] = useState<string>(args.activityId);
    return (
      <X.CardQr
        {...(args as ComponentProps<typeof X.CardQr>)}
        cardId={cardId}
        onCardIdChange={setCardId}
        activityId={activityId}
        onActivityIdChange={setActivityId}
        qr={<PlaceholderQr />}
      />
    );
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 값을 바꿔 볼 수 있다. 명함 알약과 활동 칩을 눌러 메뉴에서 바꾼다 */
export const Playground: Story = {};

/** 오늘 진행 중인 활동이 없으면 활동 칩이 없다 */
export const NoActivity: Story = { args: { activities: [] } };

/** 이름 · 칩이 긴 경우: 칩은 말줄임 */
export const Long: Story = {
  args: {
    name: '이서연 (파이토치 한국 사용자 모임)',
    activities: [
      {
        id: 'pytorch',
        title: '파이토치 데이 코리아 2026 오프라인 네트워킹 데이',
      },
    ],
  },
};

/** 컴파운드로 바꿔 조립: QR과 이름만 */
export const Composed: Story = {
  render: (args) => (
    <X.CardQr
      {...(args as ComponentProps<typeof X.CardQr>)}
      qr={<PlaceholderQr />}
    >
      <X.CardQr.Code />
      <X.CardQr.Name />
    </X.CardQr>
  ),
};
