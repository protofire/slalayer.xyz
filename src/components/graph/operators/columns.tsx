'use client';

import { MergedOperator } from '@/app/(graph)/graph/operators/types';
import ColumnHeader from '@/components/ui/data-table/column-header';
import { ColumnDef } from '@tanstack/react-table';
import { blo } from 'blo';
import { formatEtherShort } from '@/utils/format';
import Image from 'next/image';
import { cn } from '@/lib/utils';

export const columns: ColumnDef<MergedOperator>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <ColumnHeader className="w-80" column={column} title="Operator" />
    ),

    cell: ({ row }) => {
      const { name, address } = row.original;
      return (
        <div className="flex items-center gap-2 w-80">
          <Image
            src={blo(address as '0x')}
            alt={`${name} logo`}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <h3 className="text-base text-white capitalize">{name}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: 'total_eth_restaked',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Total Restaked (ETH)"
      />
    ),

    cell: ({ row }) => (
      <NumberCellEth value={row.getValue('total_eth_restaked')} />
    ),
  },
  {
    accessorKey: 'total_eigen_restaked',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Total EIGEN Restaked"
      />
    ),
    cell: ({ row }) => (
      <NumberCellEth value={row.getValue('total_eigen_restaked')} />
    ),
  },
  {
    accessorKey: 'numStakers',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Total Stakers"
      />
    ),
    cell: ({ row }) => <NumberCell value={row.getValue('numStakers')} />,
  },

  {
    accessorKey: 'numAvs',
    filterFn: (row) => {
      const { numAvs } = row.original;
      return numAvs > 0;
    },

    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="AVSs SECURED"
      />
    ),
    cell: ({ row }) => <NumberCell value={row.getValue('numAvs')} />,
  },
  {
    accessorKey: 'registration_status',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Registration status"
      />
    ),

    cell: ({ row }) => {
      const { registration_status } = row.original;

      return (
        <div
          className={cn(
            'text-sm w-[100px] text-white py-1 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto',
            registration_status && 'bg-green-600 hover:bg-green-700',
          )}
        >
          {registration_status ? 'Registered' : 'Not registered'}
        </div>
      );
    },
  },
  {
    accessorKey: 'active_sla_status',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="SLA status"
      />
    ),

    cell: ({ row }) => {
      const { active_sla_status } = row.original;
      return (
        <div
          className={cn(
            'text-sm w-[100px] text-white py-1 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto',
            active_sla_status && 'bg-green-600 hover:bg-green-700',
          )}
        >
          {active_sla_status ? 'Active' : 'Inactive'}
        </div>
      );
    },
  },
];

const NumberCell = ({ value }: { value: number }) => (
  <div className="text-base text-white capitalize text-right pr-3">{value}</div>
);

const NumberCellEth = ({ value }: { value: number }) => {
  const formattedValue = formatEtherShort(BigInt(value));

  return (
    <div className="text-base text-white capitalize text-right pr-3">
      {formattedValue}
    </div>
  );
};
