import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/TextField',
  component: X.TextField,
  args: { label: '이름', value: '실습', placeholder: '선택', multiline: false, onChange: fn() },
  
  render: (args: Record<string, any>) => <X.FieldGroup><X.TextField key={String(args.value) + args.multiline} {...(args as any)} /></X.FieldGroup>,
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

