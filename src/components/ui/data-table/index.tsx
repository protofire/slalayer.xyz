'use client';

import { useEffect, useMemo, useState } from 'react';
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Pagination from './pagination';
import Search from './search';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchBy?: string[];
  initialSorting?: SortingState;
  initialFilters?: ColumnFiltersState;
  checkboxComponent?: React.ElementType;
  commitComponent?: React.ElementType;
  loading?: boolean;
  initialColumnVisibility?: VisibilityState;
  initialRowSelection?: Record<string, boolean>;
}

function hasPlan(obj: any): obj is { plan?: 'bronze' | 'silver' | 'gold' } {
  return obj && typeof obj.plan === 'string';
}

export default function DataTable<TData, TValue>({
  columns,
  data,
  searchBy,
  initialSorting = [],
  initialFilters = [],
  checkboxComponent: CheckboxComponent,
  commitComponent: CommitComponent,
  loading,
  initialColumnVisibility,
  initialRowSelection = {},
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>(initialSorting);
  const [columnFilters, setColumnFilters] =
    useState<ColumnFiltersState>(initialFilters);
  const [globalFilter, setGlobalFilter] = useState('');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const [rowSelection, setRowSelection] = useState(initialRowSelection);

  useEffect(() => {
    if (initialColumnVisibility) {
      setColumnVisibility(initialColumnVisibility);
    }
  }, [initialColumnVisibility]);

  const globalFilterFn: FilterFn<TData> = (row, _, filterValue) => {
    if (!filterValue || !searchBy || searchBy.length === 0) {
      return true;
    }

    const search = filterValue.toLowerCase();

    return searchBy.some((key) => {
      const cellValue = String(row.getValue(key) ?? '').toLowerCase();
      return cellValue.includes(search);
    });
  };
  const memoizedColumns = useMemo(() => columns, [columns]);
  const memoizedData = useMemo(() => data, [data]);
  const table = useReactTable({
    data: memoizedData,
    columns: memoizedColumns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
      columnVisibility,
      rowSelection,
    },
    getRowId: (originalRow) =>
      (originalRow as { subgraphId: string }).subgraphId,
    onColumnVisibilityChange: setColumnVisibility,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onRowSelectionChange: setRowSelection,
    globalFilterFn,
  });

  return (
    <div className="w-full px-8">
      <div className=" flex justify-between mb-3">
        {searchBy && <Search table={table} searchBy={searchBy} />}

        {CheckboxComponent && <CheckboxComponent table={table} />}
        {CommitComponent && Object.entries(rowSelection).length !== 0 && (
          <CommitComponent table={table} />
        )}
      </div>

      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder // if header in column is string return string else return the header(component)
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        {/* Table Body */}
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className={cn(
                  row.getIsSelected() && 'bg-gray-600/20',
                  hasPlan(row.original) &&
                    row.original.plan === 'bronze' &&
                    'shadow-bronze',
                  hasPlan(row.original) &&
                    row.original.plan === 'silver' &&
                    'shadow-silver',
                  hasPlan(row.original) &&
                    row.original.plan === 'gold' &&
                    'shadow-gold',
                )}
                key={row.id}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === 'registration_status' && loading ? (
                      <div className="w-[100px] h-[30px] bg-gray-500 rounded-lg animate-pulse mx-auto" />
                    ) : (
                      flexRender(cell.column.columnDef.cell, cell.getContext())
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <Pagination table={table} />
    </div>
  );
}
