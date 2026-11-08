import { createContext, useContext, type ReactNode } from 'react';
import { Icon } from '@/components/foundations/Icon';
import { Button } from '@/components/ui/button';
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group';
import { cn } from '@/lib/utils';

type SearchBarContextValue = { placeholder: string; onFilter?: () => void };
const SearchBarContext = createContext<SearchBarContextValue | null>(null);

function useSearchBar(part: string) {
  const ctx = useContext(SearchBarContext);
  if (!ctx) throw new Error(`SearchBar.${part}는 <SearchBar> 안에서 쓴다`);
  return ctx;
}

/** 검색 캡슐(shadcn InputGroup 글래스) */
function Input({ className }: { className?: string }) {
  const { placeholder } = useSearchBar('Input');
  return <InputGroup variant="glass" className={className}><InputGroupAddon><Icon name="search" /></InputGroupAddon><InputGroupInput placeholder={placeholder} aria-label="검색" /></InputGroup>;
}

/** 필터 원형 버튼 */
function Filter({ className }: { className?: string }) {
  const { onFilter } = useSearchBar('Filter');
  return <Button variant="glass" size="icon" aria-label="필터" onClick={onFilter} icon="filter" className={cn('text-accent-foreground', className)} />;
}

function SearchBarRoot({ placeholder = '프로그램·활동·태그 검색', onFilter, children }: { placeholder?: string; onFilter?: () => void; children?: ReactNode }) {
  return (
    <SearchBarContext.Provider value={{ placeholder, onFilter }}>
      <div className="flex items-center gap-2">{children ?? <><Input /><Filter /></>}</div>
    </SearchBarContext.Provider>
  );
}

/**
 * 검색 줄(컴파운드): Input(검색 캡슐) · Filter(필터 원형 버튼).
 * 기본 조립은 `<SearchBar onFilter={…} />`. 바꿔 조립하려면 부품을 직접 놓는다:
 * `<SearchBar placeholder="채널 검색"><SearchBar.Input /></SearchBar>`
 */
export const SearchBar = Object.assign(SearchBarRoot, { Input, Filter });
