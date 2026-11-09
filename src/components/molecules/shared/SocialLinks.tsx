import type { ReactNode } from 'react';
import type { IconName } from '@/icons';
import { Button } from '@/components/ui/button';
import { ButtonGroup } from '@/components/ui/button-group';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type SocialLink = { icon: IconName; href: string; label: string };

/** 원 버튼 링크 하나(shadcn Button icon-sm + Tooltip). 웹 주소는 새 탭으로 열고, 화면 읽기 이름에 그것을 알린다 */
function Link({
  icon,
  href,
  label,
  className,
}: SocialLink & { className?: string }) {
  const newTab = /^https?:/.test(href);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          asChild
          variant="plain"
          size="icon-sm"
          icon={icon}
          className={cn('bg-muted', className)}
        >
          <a
            href={href}
            aria-label={newTab ? `${label} (새 탭)` : label}
            target={newTab ? '_blank' : undefined}
            rel={newTab ? 'noopener noreferrer' : undefined}
          />
        </Button>
      </TooltipTrigger>
      <TooltipContent>{label}</TooltipContent>
    </Tooltip>
  );
}

function SocialLinksRoot({
  links = [],
  className,
  children,
}: {
  links?: SocialLink[];
  className?: string;
  children?: ReactNode;
}) {
  if (!children && !links.length) return null;
  return (
    <ButtonGroup aria-label="소셜 링크" className={cn('gap-2.5', className)}>
      {children ?? links.map((l) => <Link key={l.href} {...l} />)}
    </ButtonGroup>
  );
}

/**
 * 소셜 링크 원 버튼 줄(컴파운드, 시안 ㉘-b 받은 명함 · ㉙-u0 프로필 머리): Link(채움 원 + 아이콘, 넓은 화면에서는 이름 말풍선).
 * 기본 조립은 `<SocialLinks links={[{ icon: 'githubMark', href: 'https://github.com/seoyeon', label: 'GitHub' }]} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<SocialLinks><SocialLinks.Link icon="githubMark" href="…" label="GitHub" /><SocialLinks.Link icon="link" href="…" label="링크" /></SocialLinks>`
 */
export const SocialLinks = Object.assign(SocialLinksRoot, { Link });
