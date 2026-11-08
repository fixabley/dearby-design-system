import type { ReactNode } from 'react';

/** 화면 머리: 왼쪽 제목(26/700) · 가운데 전환 · 오른쪽 글래스 그룹 */
export function TopBar({ title, center, right }: { title?: ReactNode; center?: ReactNode; right?: ReactNode }) {
  return (
    <div className="relative flex h-[76px] items-center px-6">
      <h1 className="flex-1 text-title">{title}</h1>
      {center && <div className="absolute left-1/2 -translate-x-1/2">{center}</div>}
      {right}
    </div>
  );
}
