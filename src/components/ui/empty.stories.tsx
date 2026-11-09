import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { content, event, iconArgType, look } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/shadcn/Empty',
  id: 'ui-shadcn-empty',
  tags: ['shadcn'],
  component: X.Empty,
  args: { title: '아직 알림이 없어요', description: '팔로우하거나 내 활동에 담으면 소식이 여기에 모여요', icon: 'bell', media: 'icon', action: '', onAction: fn() },
  argTypes: {
    title: content('EmptyTitle'),
    description: content('EmptyDescription(비우면 없음)'),
    icon: iconArgType(true, 'EmptyMedia 아이콘'),
    action: content('EmptyContent 버튼 글자(비우면 없음)'),
    media: { control: 'inline-radio', options: ['icon', 'default'], ...look('EmptyMedia variant. icon 민트 원 · default 겉모양 없음') },
    onAction: event('EmptyContent 버튼 누름'),
  },
  render: ({ title, description, icon, media, action, onAction }) => (
    <X.Empty>
      <X.EmptyHeader>
        {icon && <X.EmptyMedia variant={media}><X.Icon name={icon} /></X.EmptyMedia>}
        <X.EmptyTitle>{title}</X.EmptyTitle>
        {description && <X.EmptyDescription>{description}</X.EmptyDescription>}
      </X.EmptyHeader>
      {action && <X.EmptyContent><X.Button variant="mint" size="sm" onClick={onAction}>{action}</X.Button></X.EmptyContent>}
    </X.Empty>
  ),
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(㉗-g2 알림 목록이 비었을 때) */
export const Playground: Story = {};

/** ㉘-d 참여자 목록: 나 보이기를 켜기 전 */
export const Participants: Story = {
  args: { title: '나를 보이면 참여자가 보여요', description: '목록에 오른 사람끼리만 서로 볼 수 있어요', icon: 'group' },
};
