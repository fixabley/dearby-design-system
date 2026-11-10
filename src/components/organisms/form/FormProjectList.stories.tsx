import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';
import * as X from '@/index';
import { FORM_PROJECTS } from '@/stories/forms';

const meta: Meta<typeof X.FormProjectList> = {
  title: 'Organisms/Form/FormProjectList',
  id: 'organisms-formprojectlist',
  component: X.FormProjectList,
  args: {
    projects: FORM_PROJECTS,
    value: 'moa',
    onChange: fn(),
    onCreate: fn(),
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

function Demo(args: React.ComponentProps<typeof X.FormProjectList>) {
  const [value, setValue] = useState(args.value);
  return <X.FormProjectList {...args} value={value} onChange={setValue} />;
}

/** ㉙-j5: 내 프로젝트(글자 원 · 이름 · `확인됨` · 플랫폼 · `출시`)를 라디오로 고르고, 끝에 `새 프로젝트` */
export const Playground: Story = { render: (args) => <Demo {...args} /> };

/** 프로젝트가 없으면 `새 프로젝트`만 */
export const Empty: Story = {
  args: { projects: [], value: null },
  render: (args) => <Demo {...args} />,
};

/** 바텀 시트 안(㉙-j5) */
export const InSheet: Story = {
  parameters: { layout: 'fullscreen', width: undefined },
  render: (args) => (
    <X.Sheet open modal={false}>
      <X.SheetContent>
        <X.SheetHeader title="프로젝트" />
        <div className="mt-3.5">
          <Demo {...args} />
        </div>
        <X.Button size="lg" className="mt-4">
          고르기
        </X.Button>
      </X.SheetContent>
    </X.Sheet>
  ),
};
