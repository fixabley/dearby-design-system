import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { content, event, iconArgType, look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/shadcn/Alert',
  id: 'ui-shadcn-alert',
  tags: ['shadcn'],
  component: X.Alert,
  args: { title: '알림이 꺼져 있어요', description: '휴대전화 설정에서 Dearby 알림을 켜야 받을 수 있어요', action: '설정 열기', icon: 'bell', variant: 'destructive', onAction: fn() },
  argTypes: {
    title: content('AlertTitle'),
    description: content('AlertDescription(비우면 없음)'),
    action: content('AlertAction 글자(비우면 없음)'),
    icon: iconArgType(true, '왼쪽 아이콘'),
    variant: { control: 'inline-radio', options: ['destructive', 'default'], ...look('destructive 빨강 틴트(㉗-d3 시스템 알림 꺼짐) · default 카드 면') },
    onAction: event('AlertAction 누름'),
  },
  render: ({ title, description, action, icon, onAction, ...args }: Record<string, any>) => (
    <X.Alert {...args}>
      {icon && <X.Icon name={icon} />}
      <X.AlertTitle>{title}</X.AlertTitle>
      {description && <X.AlertDescription>{description}</X.AlertDescription>}
      {action && <X.AlertAction onClick={onAction}>{action}</X.AlertAction>}
    </X.Alert>
  ),
  parameters: { width: 345 },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
