'use client';

import DataTable from '@/components/ui/data-table';

import { columns } from './columns';
import { MergedOperator } from '@/app/(graph)/graph/operators/types';
import CheckboxFilter from './checkbox-filter';
import { useMemo } from 'react';
import { SortingState } from '@tanstack/react-table';

interface OperatorTableProps {
  data: MergedOperator[];
}

export default function OperatorTable({ data }: OperatorTableProps) {
  const initialSorting = useMemo<SortingState>(
    () => [
      {
        id: 'registration_status',
        desc: true,
      },
    ],
    [],
  );

  return (
    <DataTable
      data={data}
      columns={columns}
      searchBy={['name']}
      checkboxComponent={CheckboxFilter}
      initialSorting={initialSorting}
    />
  );
}
