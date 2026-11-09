import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/Activity/ProgressTrack',
  id: 'molecules-progresstrack',
  component: X.ProgressTrack,
  args: { steps: [{ name: '지원', state: 'past' }, { name: '면접', state: 'past' }, { name: 'OT', state: 'past' }, { name: '활동', state: 'cur' }], more: 1 },


  parameters: { width: 280 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 이름 없이 막대만 */
export const Composed: Story = { render: (args) => <X.ProgressTrack {...(args as ComponentProps<typeof X.ProgressTrack>)}><X.ProgressTrack.Bar /></X.ProgressTrack> };
