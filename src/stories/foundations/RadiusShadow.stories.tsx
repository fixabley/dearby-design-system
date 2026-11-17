import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = {
  title: 'Foundations/Radius & Shadow',
  id: 'foundations-radius-shadow',
};
export default meta;

/** 모서리 넷과 면의 가장자리(그림자 없이 1px 테두리 선). 아래 줄은 면 둘: 바탕 위 카드(shadow-card), 카드 위 조작 면(shadow-control). 구분은 면 색과 테두리로 한다 */
export const RadiusShadow: StoryObj = {
  name: 'Radius & Shadow',
  render: () => (
    <div className="flex flex-col gap-6">
      <div className="flex gap-4">
        {[
          ['rounded-sm', '작은 마크 6'],
          ['rounded-md', '썸네일·버튼·메뉴 12'],
          ['rounded-lg', '섹션 카드 16'],
          ['rounded-xl', '커버·카드 20'],
        ].map(([c, n]) => (
          <div
            key={n}
            className={`grid h-24 w-40 place-items-center bg-control text-center text-[12px] text-muted-foreground shadow-control ${c}`}
          >
            {n}
            <br />
            <code>{c}</code>
          </div>
        ))}
      </div>
      <div className="flex w-fit items-center gap-4 rounded-lg bg-card p-5 text-[12px] text-muted-foreground shadow-card">
        <code>bg-card shadow-card</code>
        <div className="grid h-16 w-48 place-items-center rounded-md bg-control shadow-control">
          <code>bg-control shadow-control</code>
        </div>
      </div>
    </div>
  ),
};
