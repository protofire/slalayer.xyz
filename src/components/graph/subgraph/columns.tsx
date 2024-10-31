'use client';

import CopyButton from '@/components/ui/copy-button';
import ColumnHeader from '@/components/ui/data-table/column-header';
import Tooltip from '@/components/ui/tooltip';
import { formatEtherShort } from '@/utils/format';
import { ColumnDef } from '@tanstack/react-table';
import Image from 'next/image';

import RegisterSubgraph from '@/components/graph/subgraph/register-subgraph';
import ActivateSubgraph from '@/components/graph/subgraph/activate-subgraph';
import CheckboxCommitments from './checkbox-commitments';

export interface Subgraph {
  projectName: string;
  image: string;
  subgraphId: string;
  categories: string[];
  signal: string;
  query_url: string;
  registration_status: boolean;
  active_sla_status: boolean;
  plan?: 'bronze' | 'silver' | 'gold';
  selectedOption?: 'gold' | 'silver' | 'bronze';
}

export const columns: ColumnDef<Subgraph>[] = [
  {
    accessorKey: 'projectName',
    header: ({ column }) => (
      <ColumnHeader className="w-80" column={column} title="Subgraph" />
    ),

    cell: ({ row }) => {
      const { projectName, image } = row.original;
      return (
        <div className="flex items-center gap-2 w-80">
          <Image
            src={image}
            alt={`${projectName}`}
            width={24}
            height={24}
            className="rounded-full object-cover"
          />
          <h3 className="text-base text-white capitalize">{projectName}</h3>
        </div>
      );
    },
  },
  {
    accessorKey: 'subgraphId',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Subgraph Id"
      />
    ),

    cell: ({ row }) => {
      const { subgraphId } = row.original;

      return (
        <Tooltip content={<p>{subgraphId}</p>}>
          <div className="flex items-center justify-end gap-2 w-full">
            <span className={'text-white text-base font-normal text-center'}>
              {subgraphId &&
                subgraphId?.slice(0, 9) + '...' + subgraphId?.slice(-4)}
            </span>

            <CopyButton
              title={'Copy'}
              value={subgraphId}
              text={'Subgraph id copied to clipboard'}
              className="size-5"
            />
          </div>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'categories',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Categories"
      />
    ),

    cell: ({ row }) => {
      const { categories } = row.original;
      return (
        <div className="flex flex-wrap gap-1 justify-end">
          {categories.map((category, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-[#D0D3EA] bg-[#293145] rounded-md"
            >
              {category}
            </span>
          ))}
        </div>
      );
    },
  },

  {
    accessorKey: 'signal',
    header: ({ column }) => (
      <ColumnHeader className="justify-end" column={column} title="Signal" />
    ),

    cell: ({ row }) => {
      const { signal } = row.original;

      return <NumberCell value={signal} />;
    },
  },
  {
    accessorKey: 'query_url',
    header: ({ column }) => (
      <ColumnHeader className="justify-end" column={column} title="Query URL" />
    ),

    cell: ({ row }) => {
      const { query_url } = row.original;
      return (
        <Tooltip content={<p>{query_url}</p>}>
          <div className="flex items-center justify-end gap-2 w-full">
            <span className={'text-white text-base font-normal text-center'}>
              {query_url &&
                query_url?.slice(0, 9) + '...' + query_url?.slice(-4)}
            </span>

            <CopyButton
              title={'Copy'}
              value={query_url}
              text={'URL copied to clipboard'}
              className="size-5"
            />
          </div>
        </Tooltip>
      );
    },
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

      return <RegisterSubgraph registration_status={registration_status} />;
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
      const { subgraphId, active_sla_status } = row.original;

      return (
        <ActivateSubgraph
          active_sla_status={active_sla_status}
          subgraph_id={subgraphId}
        />
      );
    },
  },

  {
    id: 'commitToSLA',
    accessorKey: 'commitToSLA',
    header: () => (
      <div className="flex items-center justify-center gap-2 font-medium rounded-md text-sm ">
        Commitments
      </div>
    ),

    cell: ({ row }) => <CheckboxCommitments row={row} />,
  },
  {
    accessorKey: 'plan',
    header: 'Plan',

    sortingFn: (rowA, rowB, columnId) => {
      const planOrder = { gold: 1, silver: 2, bronze: 3 };
      const planA = rowA.getValue<string | undefined>(columnId);
      const planB = rowB.getValue<string | undefined>(columnId);
      return (
        (planOrder[planA as keyof typeof planOrder] || 4) -
        (planOrder[planB as keyof typeof planOrder] || 4)
      );
    },
  },
];

const NumberCell = ({ value }: { value: string }) => {
  const formattedValue = formatEtherShort(BigInt(value));
  return <div className="text-white text-right pr-3">{formattedValue} GRT</div>;
};
