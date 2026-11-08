import type { Person } from '@/types';
import { Icon } from '@/components/atoms/Icon';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

/** 프로필 머리: 사진 원 + 이름·핸들·직업, 소개 · 가입 · 소셜 */
export function ProfileHeader({ p }: { p: Person }) {
  return (
    <header>
      <div className="flex items-center gap-4">
        <Avatar size="lg" fallback={p.initial} />
        <div><h2 className="text-title leading-tight">{p.name}</h2><small className="text-caption text-muted-foreground">@{p.handle}</small><p className="text-body">{p.job}</p></div>
      </div>
      {p.bio && <p className="mt-3.5 text-body leading-relaxed">{p.bio}</p>}
      <p className="mt-2 flex items-center gap-1.5 text-caption text-muted-foreground [&_svg]:size-[15px]"><Icon name="joined" />{p.joined}에 가입</p>
      <div className="mt-3 flex gap-2">
        {(['chat', 'githubMark', 'link'] as const).map((n) => <Button key={n} variant="outline" size="icon" className="size-9 bg-muted shadow-none [&_svg]:size-[18px]" aria-label={n}><Icon name={n} /></Button>)}
      </div>
    </header>
  );
}
