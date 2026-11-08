import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Shared/Segmented',
  id: 'atoms-segmented',
  component: X.Segmented,
  args: { items: ['activity', 'follow', 'projects'], labels: { activity: '활동', follow: '팔로우', projects: '프로젝트' }, value: 'activity', label: '프로필 탭', onChange: fn() },
  
  render: controlled(X.Segmented, 'value', 'onChange'),
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

