import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { content, event, look, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/shadcn/Sonner',
  id: 'ui-shadcn-sonner',
  tags: ['shadcn'],
  component: X.Toaster,
  args: { message: '기록했어요. 끝난 활동으로 옮겼어요', description: '', action: '되돌리기', position: 'bottom-center', duration: 4000, onAction: fn() },
  argTypes: {
    message: content('토스트 글자(toast의 첫 인자)'),
    description: content('보조 줄(비우면 없음)'),
    action: content('행동 글자(비우면 없음)'),
    position: { control: 'select', options: ['bottom-center', 'bottom-left', 'bottom-right', 'top-center', 'top-left', 'top-right'], ...look('Toaster 위치') },
    duration: { control: { type: 'number', step: 500 }, ...state('보이는 시간(ms)') },
    onAction: event('행동 누름'),
  },
  // 이 파일의 스토리는 toast()를 부를 수 있도록 Toaster를 함께 띄운다
  decorators: [(Story, { args }) => <><Story /><X.Toaster position={args.position} duration={args.duration} /></>],
  // ㉖-d2 선발 결과 질문에서 탈락을 누른 뒤: 끝난 활동으로 옮기고 되돌리기 토스트
  render: ({ message, description, action, onAction }) => (
    <X.Button variant="outline" size="sm" onClick={() => X.toast(message, { description: description || undefined, action: action ? { label: action, onClick: onAction } : undefined })}>탈락</X.Button>
  ),
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다. 버튼을 누르면 토스트가 뜬다 */
export const Playground: StoryObj<typeof meta> = {};
