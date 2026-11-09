import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Organisms/Profile/ProfileHeader',
  id: 'organisms-profileheader',
  component: X.ProfileHeader,
  args: { p: D.SEOYEON },
  
  
  parameters: { width: 360 },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

/** 컴파운드로 바꿔 조립: 소개·가입 없이 사진 · 이름 · 소셜만 */
export const Composed: Story = { render: (args) => <X.ProfileHeader p={args.p}><div className="flex items-center gap-4"><X.ProfileHeader.Avatar /><X.ProfileHeader.Name /></div><X.ProfileHeader.Social /></X.ProfileHeader> };
