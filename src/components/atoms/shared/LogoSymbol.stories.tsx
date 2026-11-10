import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta<typeof X.LogoSymbol> = {
  title: 'Atoms/Shared/LogoSymbol',
  id: 'atoms-logosymbol',
  component: X.LogoSymbol,
  args: { variant: 'bare', size: 64 },
  argTypes: {
    variant: { control: 'inline-radio', options: ['bare', 'appIcon'] },
    size: { control: { type: 'number', min: 12, max: 512 } },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

const SIZES = [64, 32, 16];
const Sizes = ({ variant }: { variant: 'bare' | 'appIcon' }) => (
  <div className="flex items-end gap-6">
    {SIZES.map((s) => (
      <div key={s}>
        <X.LogoSymbol variant={variant} size={s} />
        <p className="mt-2 text-micro text-muted-foreground">{s}</p>
      </div>
    ))}
  </div>
);

/** dearby 심벌: 엄지를 든 d와 얼굴 */
export const Playground: Story = {};

/** 바탕 없는 판: 청록(accent-foreground) 그림 */
export const Bare: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Sizes variant="bare" />,
};

/** 앱 아이콘 판: 둥근 사각 청록 바탕에 흰 그림. 두 모드에서 같은 색 */
export const AppIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => <Sizes variant="appIcon" />,
};

/** 라이트 · 다크 */
export const LightAndDark: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid max-w-[640px] grid-cols-2 gap-4">
      {['', 'dk'].map((mode) => (
        <div
          key={mode}
          className={`${mode} flex flex-col gap-6 rounded-xl bg-background p-6 ring-1 ring-border`}
        >
          <Sizes variant="bare" />
          <Sizes variant="appIcon" />
        </div>
      ))}
    </div>
  ),
};
