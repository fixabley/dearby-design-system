import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta<typeof X.HostedLine> = {
  title: 'Molecules/Program/HostedLine',
  id: 'molecules-hostedline',
  component: X.HostedLine,
  args: {
    initial: '김',
    text: '@doyun · SSAFY 17기 교육생',
    hosted: true,
  },
  parameters: { width: 345 },
};
export default meta;
type Story = StoryObj<typeof meta>;

/** ㉙-a · ㉙-d: 개설자 줄. 이니셜 원 + `@핸들 · 소속` + 직접 개설 캡슐 */
export const Playground: Story = {};

/** 소속이 길면 글자만 말줄임, 캡슐은 그대로 */
export const LongText: Story = {
  args: {
    text: '@doyun · SSAFY 17기 교육생이고 면접 스터디를 여는 사람',
  },
};

/**
 * 새 부품 없이 기존 부품으로 되는 조립 셋.
 * 캡슐은 Badge(muted, sm), 개설자 행은 ListRow(Avatar + 이름 + 핸들 + 화살표)
 */
export const Assembly: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      <section className="flex flex-col gap-2">
        <X.Text variant="caption" tone="muted">
          ㉙-d 종류 줄: 종류 옆 캡슐
        </X.Text>
        <X.Text
          as="div"
          variant="caption"
          tone="muted"
          className="flex items-center gap-1.5"
        >
          <X.Icon name="group" size={16} />
          스터디
          <X.Badge variant="muted" size="sm">
            직접 개설
          </X.Badge>
        </X.Text>
      </section>
      <section className="flex flex-col gap-2">
        <X.Text variant="caption" tone="muted">
          ㉙-d 위 줄: 개설자 · 프로그램(눌러서 프로그램 화면으로)
        </X.Text>
        <a href="#hosted" className="block rounded-sm focus-visible:ring-2">
          <X.HostedLine
            initial="김"
            text="@doyun · SSAFY 17기 면접 스터디"
            hosted={false}
          />
        </a>
      </section>
      <section className="flex flex-col gap-2">
        <X.Text variant="caption" tone="muted">
          ㉙-d 개설자 행
        </X.Text>
        <X.ListGroup>
          <X.ListRow
            asChild
            media={<X.Avatar size="row" fallback="김" />}
            title="김도윤"
            subtitle="@doyun · iOS 개발자"
            trailing={<X.Icon name="chevronRight" size={16} />}
          >
            <a href="#profile" />
          </X.ListRow>
        </X.ListGroup>
      </section>
    </div>
  ),
};
