import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';
import { content, event, look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/Discord/ChannelSelect',
  id: 'molecules-channelselect',
  component: X.ChannelSelect,
  args: {
    channels: D.CHANNELS,
    value: '자유 대화',
    variant: 'inline',
    onValueChange: fn(),
  },
  argTypes: {
    value: {
      control: 'select',
      options: D.CHANNELS.filter((c) => c.type !== 'voice').map((c) => c.name),
      ...content('고른 채널'),
    },
    channels: content('스터디 공간의 채널(음성 채널은 목록에서 빠진다)'),
    variant: {
      control: 'inline-radio',
      options: ['inline', 'default'],
      ...look('inline 묶음 목록 행 오른쪽 · default 단독 입력 칸'),
    },
    onValueChange: event(),
  },
  render: controlled(X.ChannelSelect, 'value', 'onValueChange'),
  parameters: { width: 345 },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
