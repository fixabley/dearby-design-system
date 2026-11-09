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
            'animate-in fade-in slide-in-from-bottom',
            '칸 바뀜·모달·시트 떠오름',
          ],
          [
            'data-[state=closed]:animate-out',
            '닫힐 때 짧게 가라앉음(Radix가 끝날 때까지 기다림)',
          ],
          ['ds-pop / ds-eq', '찜 튀어 오름 · LIVE 막대'],
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
