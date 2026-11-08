import { Icon } from '@/components/atoms/Icon';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';

/** 검색 캡슐(shadcn InputGroup 글래스) + 필터 원형 버튼 */
export function SearchBar({ placeholder = '프로그램·활동·태그 검색', onFilter }: { placeholder?: string; onFilter?: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <InputGroup variant="glass"><InputGroupAddon><Icon name="search" /></InputGroupAddon><InputGroupInput placeholder={placeholder} aria-label="검색" /></InputGroup>
      <Button variant="glass" size="icon" aria-label="필터" onClick={onFilter} icon="filter" className="text-accent-foreground" />
    </div>
  );
}
