import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ComponentProps } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';

const CARDS: X.CardOption[] = [
  { id: 'sns', name: 'SNS', summary: '소셜 링크만' },
  { id: 'all', name: '전체', summary: '모든 항목' },
  { id: 'dev', name: '개발 행사용', summary: '항목 4개' },
];

const meta: Meta = {
  title: 'Molecules/Card/CardPickerSheet',
  id: 'molecules-cardpickersheet',
  component: X.CardPickerSheet,
  args: {
    cards: CARDS,
    defaultValue: 'sns',
    title: '건넬 명함',
    actionLabel: '건네기',
    onSubmit: fn(),
  },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent floating>
        <X.CardPickerSheet
          {...(args as ComponentProps<typeof X.CardPickerSheet>)}
        />
      </X.SheetContent>
    </X.Sheet>
  ),
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다. 줄 어디를 눌러도 고르고, 화살표 키로 옮긴다 */
export const Playground: Story = {};

/** 좁은 화면의 바텀시트(㉘-c 건네기): 닫기는 바깥 누르기 · Esc */
export const Bottom: Story = {
  parameters: { layout: 'fullscreen' },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent>
        <X.CardPickerSheet
          {...(args as ComponentProps<typeof X.CardPickerSheet>)}
        />
      </X.SheetContent>
    </X.Sheet>
  ),
};

/** 교환 요청(㉘-e2): 확인 버튼 글자만 다르다 */
export const Request: Story = { args: { actionLabel: '교환 요청' } };

/** 수락(㉘-f2): 머리가 `돌려줄 명함` */
export const Accept: Story = {
  args: { title: '돌려줄 명함', actionLabel: '수락' },
};

/** 컴파운드로 바꿔 조립: 목록만 */
export const Composed: Story = {
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent floating>
        <X.CardPickerSheet
          {...(args as ComponentProps<typeof X.CardPickerSheet>)}
        >
          <X.CardPickerSheet.Header />
          <X.CardPickerSheet.Options />
        </X.CardPickerSheet>
      </X.SheetContent>
    </X.Sheet>
  ),
};
