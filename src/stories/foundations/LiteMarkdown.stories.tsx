import type { Meta, StoryObj } from '@storybook/react-vite';
import { renderLite } from '@/index';

const meta: Meta = {
  title: 'Foundations/Lite Markdown',
  id: 'foundations-lite-markdown',
};
export default meta;

/** 줄인 마크다운: 공지·상세 설명이 쓰는 글 규칙. 디스코드에도 같은 원본을 보낸다 */
export const LiteMarkdown: StoryObj<{ source: string }> = {
  args: {
    source:
      '**굵게** · *기울임* · _기울임_ · ~~취소선~~ · `코드`\n[Google Meet](https://meet.google.com/abc-defg-hij) · https://forms.gle/dearby-study\n• 목록은 • 로 시작\n• user_name 같은 단어 속 밑줄은 그대로\n• javascript:alert(1) 같은 주소는 링크가 되지 않아요',
  },
  argTypes: { source: { control: 'text' } },
  render: ({ source }) => (
    <div className="grid max-w-[900px] grid-cols-2 gap-8">
      <pre className="whitespace-pre-wrap rounded-md bg-muted p-4 text-caption">
        {source}
      </pre>
      <p className="whitespace-pre-line text-body leading-relaxed">
        {renderLite(source)}
      </p>
    </div>
  ),
};
