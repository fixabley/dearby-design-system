import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Atoms/Thumbnail',
  component: X.Thumbnail,
  args: { thumb: { cover: 'img/cover-13.jpg' }, size: 'md' },
  argTypes: { size: { control: "inline-radio", options: ["sm", "md", "lg", "xl"] } },
  
  
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};
export const Logo: Story = { args: { thumb: { color: '#04122B', logo: 'img/logo-depromeet.png' } } };
export const Letter: Story = { args: { thumb: { color: '#0E5E66', letter: '모' } } };
