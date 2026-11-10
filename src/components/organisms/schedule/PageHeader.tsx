import { Text } from '@/components/atoms/shared/Text';
import { Button } from '@/components/ui/button';
import { SheetTitle } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

/**
 * 시트 안 하위 화면의 머리(시안 ㉙-c7 `.hsh`): 뒤로(이전 화면 이름) · 가운데 제목 · 완료. 뒤로와 완료는 모두 이전 화면으로 돌아가는 일이다.
 * 시트 머리(`SheetHeader`)와 달리 닫기가 아니라 화면 이동이라 시트마다 하나인 제목 요소(`SheetTitle`)를 이 머리가 맡는다
 */
export function PageHeader({
  title,
  backLabel,
  onBack,
  onDone,
  className,
}: {
  title: string;
  backLabel: string;
  onBack?: () => void;
  onDone?: () => void;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex min-h-10 shrink-0 items-center justify-between gap-2 py-2',
        className,
      )}
    >
      <Button variant="link" icon="back" onClick={onBack}>
        {backLabel}
      </Button>
      <SheetTitle asChild>
        <Text as="h2" variant="rowTitle">
          {title}
        </Text>
      </SheetTitle>
      <Button variant="link" onClick={onDone}>
        완료
      </Button>
    </div>
  );
}
