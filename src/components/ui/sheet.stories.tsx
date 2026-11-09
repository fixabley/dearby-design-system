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
    children: { table: { disable: true } },
  },

  render: function Render({ title, floating, dialog, children, ...args }) {
    const [, update] = useArgs();
    const body = (
      <>
        <X.SheetHeader title={title} />
        {children ?? (
          <p className="py-4 text-body text-muted-foreground">내용</p>
        )}
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

// 고치기 시트 내용: 주소 입력 옆에 자물쇠 토글(공개 · 비공개), 아래 줄 왼쪽 끝에 지우기(CTA와 높이가 같은 정사각 휴지통).
// 바꾼 것이 있으면(changed) 그 옆에 변경 되돌리기 · 적용하기가 붙는다
const editForm = (changed: boolean) => (
  <div className="flex flex-col gap-4 pt-2">
    <div className="flex items-center gap-1">
      <X.FieldGroup className="flex-1">
        <X.TextField label="주소" value="https://linkedin.com/in/seoyeon" />
      </X.FieldGroup>
      <X.LockToggle defaultChecked aria-label="LinkedIn 공개" />
    </div>
    <div className="flex gap-2">
      <X.Button
        type="button"
        variant="outline"
        size="icon-lg"
        icon="trash"
        className="text-destructive"
        aria-label="LinkedIn 지우기"
      />
      {changed && (
        <>
          <X.Button type="button" variant="plain" size="lg">
            변경 되돌리기
          </X.Button>
          <X.Button size="lg" className="flex-1">
            적용하기
          </X.Button>
        </>
      )}
    </div>
  </div>
);

/** 고치기 시트(바꾼 것이 있을 때): 아래 줄에 지우기 · 변경 되돌리기 · 적용하기 */
export const EditForm: Story = {
  args: { title: 'LinkedIn', children: editForm(true) },
};

/** 고치기 시트(바꾼 것이 없을 때): 아래 줄 왼쪽 끝에 지우기만 */
export const EditFormDeleteOnly: Story = {
  args: { title: 'LinkedIn', children: editForm(false) },
};
