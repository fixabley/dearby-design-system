import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { useArgs } from 'storybook/preview-api';
import * as X from '@/index';

const meta: Meta = {
  title: 'Molecules/shadcn/Field',
  id: 'ui-shadcn-field',
  tags: ['shadcn'],
  component: X.Field,
  args: {
    label: '제목',
    value: '목요일 모임은 21:00에 시작해요',
    description: '',
    error: '',
    orientation: 'vertical',
    multiline: false,
  },
  argTypes: {
    orientation: {
      control: 'inline-radio',
      options: ['vertical', 'horizontal'],
    },
  },
  render: ({ label, value, description, error, multiline, ...args }) => (
    <X.FieldGroup>
      <X.Field {...args} data-invalid={!!error || undefined}>
        <X.FieldLabel>{label}</X.FieldLabel>
        {multiline ? (
          <X.Textarea key="t" defaultValue={value} />
        ) : (
          <X.Input key={value} defaultValue={value} />
        )}
        {description && <X.FieldDescription>{description}</X.FieldDescription>}
        <X.FieldError>{error}</X.FieldError>
      </X.Field>
      <X.Field orientation="horizontal">
        <X.FieldLabel>참여자에게 알림 보내기</X.FieldLabel>
        <X.Switch defaultChecked />
      </X.Field>
    </X.FieldGroup>
  ),
  parameters: { width: 345 },
};
export default meta;
void fn;
void useArgs;

/** Controls 패널에서 모든 값을 바꿔 볼 수 있다 */
export const Playground: StoryObj<typeof meta> = {};
