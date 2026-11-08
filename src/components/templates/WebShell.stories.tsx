import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Templates/WebShell',
  component: X.WebShell,
  args: { height: 480, active: 'home', title: '홈' },
  argTypes: { active: { control: "inline-radio", options: ["home", "discover", "cards", "profile"] } },
  render: ({ height, active, title }: Record<string, any>) => <X.WebShell height={height} sidebar={<X.Sidebar active={active} hosted={['온디바이스 AI 앱 만들기']} />}><X.TopBar title={title} right={<X.GlassGroup unread={2} />} /></X.WebShell>,
  parameters: { layout: 'fullscreen' },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs; void fn; void controlled; void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: Story = {};

