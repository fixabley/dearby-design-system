import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Shared/LockToggle',
  id: 'atoms-locktoggle',
  component: X.LockToggle,
  args: {
    checked: false,
    disabled: false,
    'aria-label': 'LinkedIn 공개',
    onCheckedChange: fn(),
  },

  render: controlled(X.LockToggle, 'checked', 'onCheckedChange'),
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

/**
 * Controls 패널에서 모든 값을 바꿔 볼 수 있다. 잠김(꺼짐) = 비공개, 열림(켜짐) = 공개.
 * OS의 동작 줄이기를 켜면 움직임 없이 정지 그림만 바뀐다
 */
export const Playground: Story = {};

/** 열림(공개) */
export const Unlocked: Story = { args: { checked: true } };

/** 비활성: 잠김 · 열림 */
export const Disabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex gap-2">
      <X.LockToggle disabled aria-label="LinkedIn 공개" />
      <X.LockToggle disabled defaultChecked aria-label="GitHub 공개" />
    </div>
  ),
};
