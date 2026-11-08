import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/TopBar',
  component: X.TopBar,
  args: { title: '홈', center: false, unread: 2, share: false },
  
  render: ({ title, center, unread, share }: Record<string, any>) => <X.TopBar title={center ? undefined : title} center={center ? <div className="w-[220px]"><X.Segmented items={['program', 'event'] as const} labels={{ program: '프로그램', event: '이벤트' }} value="program" /></div> : undefined} right={<X.GlassGroup unread={unread} actions={share ? [{ icon: 'share', label: '공유' }] : []} />} />,
  parameters: { width: 1060 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

