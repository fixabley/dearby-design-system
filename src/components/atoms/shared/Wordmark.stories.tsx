import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta<typeof X.Wordmark> = {
  title: 'Atoms/Shared/Wordmark',
  id: 'atoms-wordmark',
  component: X.Wordmark,
  args: { variant: 'small', height: 26 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['small', 'large'] },
    height: { control: { type: 'number', min: 12, max: 240 } },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** 높이마다 한 칸 */
const Row = ({ children }: { children: ReactNode }) => (
  <div className="flex flex-wrap items-end gap-8">{children}</div>
);
const Sized = ({ children, label }: { children: ReactNode; label: string }) => (
  <div>
    {children}
    <p className="mt-2 text-micro text-muted-foreground">{label}</p>
  </div>
);

/** dearby 로고 그림(글자 계층 밖의 브랜드 표시). 기본은 머리용 작은 판 26 */
export const Playground: Story = {};

/** 큰 판: 윙크하는 e와 입이 있다. 로그인처럼 로고가 주인공인 자리 */
export const Large: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {[120, 84, 56].map((h) => (
        <Sized key={h} label={`large ${h}`}>
          <X.Wordmark variant="large" height={h} />
        </Sized>
      ))}
    </Row>
  ),
};

/** 작은 판: 입이 없고 e의 가로획이 가늘다. 화면 머리 · 사이드바 */
export const Small: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Row>
      {[28, 26, 24, 22].map((h) => (
        <Sized key={h} label={`small ${h}`}>
          <X.Wordmark height={h} />
        </Sized>
      ))}
    </Row>
  ),
};

/** 라이트 · 다크: 색은 토큰(accent-foreground · wordmark-ear)을 따라 저절로 바뀐다 */
export const LightAndDark: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid max-w-[900px] grid-cols-2 gap-4">
      {['', 'dk'].map((mode) => (
        <div
          key={mode}
          className={`${mode} flex flex-col items-start gap-6 rounded-xl bg-background p-6 ring-1 ring-border`}
        >
          <X.Wordmark variant="large" height={84} />
          <X.Wordmark />
        </div>
      ))}
    </div>
  ),
};
