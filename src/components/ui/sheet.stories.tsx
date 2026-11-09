import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import * as D from '@/data';
import { controlled } from '@/stories/controlled';

const meta: Meta = {
  title: 'Molecules/shadcn/Sheet',
  id: 'ui-shadcn-sheet', // 예전 'UI (shadcn)' 링크가 그대로 열리도록 고정
  tags: ['shadcn'],
  component: X.Sheet,
  args: {
    open: false,
    title: '후기 남기기',
    floating: false,
    onOpenChange: fn(),
  },
  argTypes: {
    dialog: { table: { disable: true } },
  },

  render: function Render({ title, floating, dialog, ...args }) {
    const [, update] = useArgs();
    const body = (
      <>
        <X.SheetHeader title={title} />
        <p className="py-4 text-body text-muted-foreground">내용</p>
      </>
    );
    return (
      <X.Sheet
        open={args.open}
        onOpenChange={(o) => {
          args.onOpenChange?.(o);
          update({ open: o });
        }}
      >
        <X.SheetTrigger asChild>
          <X.Button variant="mint">시트 열기</X.Button>
        </X.SheetTrigger>
        {dialog ? (
          <X.DialogContent
            showClose={false}
            aria-describedby={undefined}
            className="w-[400px] max-w-[calc(100vw-32px)] rounded-[24px] px-6 pb-6 pt-3"
          >
            {body}
          </X.DialogContent>
        ) : (
          <X.SheetContent floating={floating}>{body}</X.SheetContent>
        )}
      </X.Sheet>
    );
  },
};
export default meta;
type Story = StoryObj<typeof meta>;
// useArgs·fn는 일부 스토리에서만 쓴다
void useArgs;
void fn;
void controlled;
void D;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다. 바텀시트는 보이는 닫기 없이 바깥을 누르거나 Esc로 닫는다 */
export const Playground: Story = {};

/** 넓은 화면의 떠 있는 카드: 머리 오른쪽에 X 닫기가 보인다 */
export const Floating: Story = { args: { floating: true } };

/** 넓은 화면의 대화상자(DialogContent showClose={false}) 안에 같은 머리: X 닫기가 보인다 */
export const InDialog: Story = { args: { dialog: true } };
