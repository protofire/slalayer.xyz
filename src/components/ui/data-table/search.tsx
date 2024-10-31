import { Table } from '@tanstack/react-table';
import { Input } from '../input';

interface SearchProps<TData> {
  table: Table<TData>;
  searchBy: string[];
}

export default function Search<TData>({ table, searchBy }: SearchProps<TData>) {
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    table.setGlobalFilter(event.target.value);
  };

  return (
    <Input
      placeholder={`Search by ${searchBy.join(', ')}`}
      value={(table.getState().globalFilter as string) ?? ''}
      onChange={handleSearch}
      className="max-w-sm"
    />
  );
}
