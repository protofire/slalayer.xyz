import { cn } from '@/lib/utils';
import { Column } from '@tanstack/react-table';
import { Button } from '../button';
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CaretSortIcon,
} from '@radix-ui/react-icons';

interface ColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>;
  title: string;
}

export default function ColumnHeader<TData, TValue>({
  column,
  title,
  className,
}: ColumnHeaderProps<TData, TValue>) {
  if (!column.getCanSort()) {
    return <div className={cn(className)}>{title}</div>;
  }

  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-3 h-8 data-[state=open]:bg-black hover:bg-black/50"
        onClick={() => column.toggleSorting()}
      >
        <span className="text-sm">{title}</span>
        {column.getIsSorted() === 'desc' ? (
          <ArrowDownIcon className="ml-1 h-4 w-4" />
        ) : column.getIsSorted() === 'asc' ? (
          <ArrowUpIcon className="ml-1 h-4 w-4" />
        ) : (
          <CaretSortIcon className="ml-1 h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
