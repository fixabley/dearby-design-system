import type { Meta, StoryObj } from '@storybook/react-vite';
import * as X from '@/index';

const meta: Meta = { title: 'Foundations/Typography', id: 'foundations-typography' };
export default meta;

/** globals.css @theme의 글자 토큰 8개: 클래스 · 크기 · 줄 높이 · 기본 굵기(없으면 400) */
const TOKENS = [
  ['text-title', 26, 1.22, 700], ['text-section', 22, 1.25, 700], ['text-headline', 17, 1.28, 600], ['text-body-lg', 17, 1.4, 400],
  ['text-body', 15, 1.6, 400], ['text-caption', 13, 1.4, 400], ['text-badge', 12, 1, 700], ['text-micro', 11, 1.2, 400],
] as const;

/** 글자 토큰. 화면에서는 토큰을 바로 쓰지 않고 Text 아톰의 역할 11가지로 쓴다(Atoms › Shared › Text › Scale) */
export const Typography: StoryObj = {
  render: () => (
    <div className="divide-y divide-border">
      {TOKENS.map(([token, px, lh, w]) => (
        <div key={token} className="flex items-baseline gap-5 py-2.5">
          <X.Text variant="caption" tone="muted" className="w-44 shrink-0"><code className="text-foreground">{token}</code><br />{px}px · 줄 높이 {lh} · 굵기 {w}</X.Text>
          <span className={token}>활동 둘러보기 SSAFY 17기</span>
        </div>
      ))}
    </div>
  ),
};
