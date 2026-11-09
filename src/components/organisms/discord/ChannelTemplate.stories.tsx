import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Discord/ChannelTemplate',
  id: 'organisms-channeltemplate',
  tags: ['manage'],
  component: X.ChannelTemplate,
  args: { channels: D.CHANNELS },
  
  
  parameters: { width: 420 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 글을 올릴 수 있는 채널만, 추가 줄 없이 */
export const Composed: Story = { render: (args) => <X.ChannelTemplate channels={args.channels}>{(args.channels as X.Channel[]).filter((c) => c.type !== 'voice').map((c) => <X.ChannelTemplate.Channel key={c.name} channel={c} />)}</X.ChannelTemplate> };
