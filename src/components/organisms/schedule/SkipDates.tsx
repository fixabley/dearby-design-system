import { createContext, useContext, type ReactNode } from 'react';
import { DatePicker } from '@/components/molecules/shared/DatePicker';
import { ListGroup, ListRow } from '@/components/molecules/shared/ListGroup';
import { Button } from '@/components/ui/button';
import { dayKey, formatDate } from '@/lib/date';
import { PageHeader } from './PageHeader';

type SkipDatesContextValue = {
  value: Date[];
  min?: Date;
  max?: Date;
  today?: Date;
  onChange?: (dates: Date[]) => void;
  onBack?: () => void;
  onDone?: () => void;
  backLabel: string;
};
const SkipDatesContext = createContext<SkipDatesContextValue | null>(null);

function useSkipDates(part: string) {
  const ctx = useContext(SkipDatesContext);
  if (!ctx) throw new Error(`SkipDates.${part}는 <SkipDates> 안에서 쓴다`);
  return ctx;
}

/** 머리: 뒤로(이전 화면 이름) · 제목 `건너뛸 날` · 완료 */
function Header({ className }: { className?: string }) {
  const { onBack, onDone, backLabel } = useSkipDates('Header');
  return (
    <PageHeader
      title="건너뛸 날"
      backLabel={backLabel}
      onBack={onBack}
      onDone={onDone}
      className={className}
    />
  );
}

/** 고른 날 목록(날짜순)과 끝의 `날짜 추가` 행. 이미 고른 날은 달력에서 고를 수 없다 */
function Dates({ className }: { className?: string }) {
  const { value, min, max, today, onChange } = useSkipDates('Dates');
  const sorted = [...value].sort((a, b) => a.getTime() - b.getTime());
  return (
    <ListGroup className={className}>
      {sorted.map((d) => (
        <ListRow
          key={dayKey(d)}
          title={formatDate(d, today)}
          trailing={
            <Button
              type="button"
              variant="plain"
              size="icon-sm"
              icon="close"
              className="-my-2 -mr-[9px]"
              aria-label={`${formatDate(d, today)} 지우기`}
              onClick={() =>
                onChange?.(value.filter((x) => dayKey(x) !== dayKey(d)))
              }
            />
          }
        />
      ))}
      <ListRow
        add
        icon="add"
        title="날짜 추가"
        className="py-1.5"
        trailing={
          <DatePicker
            label="건너뛸 날 추가"
            min={min}
            max={max}
            today={today}
            disabledDates={value}
            onChange={(d) => onChange?.([...value, d])}
          />
        }
      />
    </ListGroup>
  );
}

function SkipDatesRoot({
  value,
  min,
  max,
  today,
  onChange,
  onBack,
  onDone,
  backLabel = '반복',
  className,
  children,
}: {
  /** 건너뛸 날들(날짜 단위) */
  value: Date[];
  /** 고를 수 있는 첫 날(보통 일정의 시작 날짜) */
  min?: Date;
  /** 고를 수 있는 마지막 날(반복 종료가 날짜까지일 때 그 날) */
  max?: Date;
  today?: Date;
  onChange?: (dates: Date[]) => void;
  onBack?: () => void;
  onDone?: () => void;
  backLabel?: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <SkipDatesContext.Provider
      value={{ value, min, max, today, onChange, onBack, onDone, backLabel }}
    >
      <div className={className}>
        {children ?? (
          <>
            <Header />
            <Dates className="mt-3.5" />
          </>
        )}
      </div>
    </SkipDatesContext.Provider>
  );
}

/**
 * 건너뛸 날 고르기 화면(컴파운드, 시안 ㉙-c6 `건너뛸 날` 행에서 들어간다. 이 화면의 틀은 시안에 없어 `RepeatCustom`과 같은 머리로 지은 추천안이다): Header · Dates(고른 날 목록 + 날짜 추가).
 * 날짜 하나씩 `DatePicker`(기존 달력 말풍선)로 더하고 줄 끝 X로 지운다. 반복하는 날이 아닌 날짜를 막는 일은 하지 않는다.
 * 기본 조립은 `<SkipDates value={dates} onChange={setDates} min={start} onBack={…} onDone={…} />`
 */
export const SkipDates = Object.assign(SkipDatesRoot, { Header, Dates });
