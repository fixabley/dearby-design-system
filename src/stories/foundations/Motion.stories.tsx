import type { Meta, StoryObj } from '@storybook/react-vite';

const meta: Meta = { title: 'Foundations/Motion', id: 'foundations-motion' };
export default meta;

/** 움직임 규칙. Radix의 data-state에 Tailwind 애니메이션을 붙인다 */
export const Motion: StoryObj = {
  render: () => (
    <table className="text-caption">
      <tbody>
        {[
          ['duration-150', '눌림·색 바뀜'],
          ['duration-200~300 ease-spring', '스위치·라디오·분할 전환 미끄러짐'],
          [
            '<ViewTransition enter exit>',
            '시트·대화상자 열고 닫기: 브라우저 View Transitions 기본 전환(교차 페이드)',
          ],
          [
            'animate-in fade-in / animate-out',
            '메뉴·팝오버 등 나머지 Radix 부품의 짧은 기본 모양',
          ],
          ['ds-pop / ds-eq', '찜 튀어 오름 · LIVE 막대'],
          ['animate-pulse', '스켈레톤 깜빡임(2초, 불투명도 1 ↔ 0.5)'],
          ['prefers-reduced-motion', '모두 끔'],
        ].map(([a, b]) => (
          <tr key={a} className="border-b border-border">
            <td className="py-2 pr-6">
              <code>{a}</code>
            </td>
            <td className="text-muted-foreground">{b}</td>
          </tr>
        ))}
      </tbody>
    </table>
  ),
};
