import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundations/Radius & Shadow',
  id: 'foundations-radius-shadow',
};
export default meta;

/** 모서리 넷과 컨트롤 그림자(누를 수 있는 것에만) */
export const RadiusShadow: StoryObj = {
  name: 'Radius & Shadow',
  render: () => (
    <div className="flex gap-4">
      {[
        ['rounded-sm', '작은 마크 6'],
        ['rounded-md', '썸네일·버튼·메뉴 12'],
        ['rounded-lg', '섹션 카드 16'],
        ['rounded-xl', '커버·카드 20'],
      ].map(([c, n]) => (
        <div
          key={n}
          className={`grid h-24 w-40 place-items-center bg-card text-center text-[12px] text-muted-foreground shadow-control ${c}`}
        >
          {n}
          <br />
          <code>{c}</code>
        </div>
      ))}
    </div>
  ),
};
