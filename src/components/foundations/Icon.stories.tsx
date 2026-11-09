import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta = {
  title: 'Foundations/Icon',
  id: 'foundations-icon',
  component: X.Icon,
  args: { name: 'calendar', size: 24, label: '' },
  argTypes: {
    name: { control: 'select', options: Object.keys(X.ICONS) },
    size: { control: 'inline-radio', options: X.ICON_SIZES },
  },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 시안 아이콘 전부. 크기는 Controls의 size */
export const All: Story = {
  argTypes: {
    name: { table: { disable: true } },
    label: { table: { disable: true } },
  },
  render: ({ size }) => (
    <div className="grid grid-cols-[repeat(auto-fill,96px)] gap-2">
      {(Object.keys(X.ICONS) as X.IconName[]).map((n) => (
        <div
          key={n}
          className="flex h-[84px] flex-col items-center justify-center gap-2 rounded-xl ring-1 ring-inset ring-border"
        >
          <X.Icon name={n} size={size} />
          <span className="text-[12px] text-muted-foreground">{n}</span>
        </div>
      ))}
    </div>
  ),
};

/** 크기 단계 12 · 16 · 20 · 24 · 32 */
export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['home', 'calendar', 'timetable', 'filter'] as X.IconName[]).map(
        (n) => (
          <div key={n} className="flex items-end gap-6">
            {X.ICON_SIZES.map((s) => (
              <div
                key={s}
                className="flex flex-col items-center gap-2 text-[12px] text-muted-foreground"
              >
                <X.Icon name={n} size={s} />
                {s}
              </div>
            ))}
          </div>
        ),
      )}
    </div>
  ),
};
