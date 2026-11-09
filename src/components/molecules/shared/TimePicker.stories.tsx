import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';
import { content, event, state } from '@/stories/argTypes';

const meta: Meta = {
  title: 'Molecules/Shared/TimePicker',
  id: 'molecules-timepicker',
  component: X.TimePicker,
  args: {
    value: '20:00',
    placeholder: '선택',
    label: '시간',
    open: false,
    onChange: fn(),
    onOpenChange: fn(),
  },
  argTypes: {
    value: content('시각(HH:mm, 24시간)'),
    placeholder: content('값이 없을 때 자리 글자'),
    label: content('화면 읽기용 칸 이름(보이지 않음)'),
    open: state('30분 단위 목록 말풍선 열림'),
    onChange: event('시각 확정(Enter · 목록 고름 · 칸 밖으로 나감)'),
    onOpenChange: event(),
    className: { table: { disable: true } },
  },
  render: function Render({ onChange, onOpenChange, ...args }) {
    const [, update] = useArgs();
    return (
      <X.TimePicker
        {...args}
        onOpenChange={(o) => {
          onOpenChange?.(o);
          update({ open: o });
        }}
        onChange={(t) => {
          onChange?.(t);
          update({ value: t });
        }}
      />
    );
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다(㉙-c3 일정 시작 20:00) */
export const Playground: Story = {};

/** 값이 없으면 자리 글자 */
export const Empty: Story = { args: { value: '' } };

/** 목록을 열면 지금 값(20:00) 근처가 가운데 보이고 그 칸에 체크 */
export const Open: Story = {
  args: { open: true },
  parameters: { layout: 'padded' },
};
