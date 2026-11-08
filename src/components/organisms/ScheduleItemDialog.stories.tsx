import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Organisms/ScheduleItemDialog',
  component: X.ScheduleItemDialog,
  args: {
    open: false, badgeText: '특강', title: '특강', when: '매주 수요일 15:00 ~ 17:00', tags: [],
    people: [{ initial: '한', name: '한유진', role: '멘토 · @yujin' }],
    description: '현업 iOS 개발자에게 앱을 출시하며 겪은 일을 들어요. 질문은 미리 모아 둘게요.\n• **18:00**까지 질문 남기기', onOpenChange: fn(),
  },
  render: function Render({ badgeText, ...args }: Record<string, any>) {
    const [, update] = useArgs();
    return (
      <>
        <X.Button variant="mint" onClick={() => update({ open: true })}>상세 열기</X.Button>
        <X.ScheduleItemDialog {...(args as any)} badge={badgeText ? <X.Badge>{badgeText}</X.Badge> : undefined} onOpenChange={(o: boolean) => { args.onOpenChange?.(o); update({ open: o }); }} />
      </>
    );
  },
};
export default meta;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
