'use client';

import ColumnHeader from '@/components/ui/data-table/column-header';
import { ColumnDef } from '@tanstack/react-table';
import { blo } from 'blo';
import Image from 'next/image';
import Tooltip from '@/components/ui/tooltip';
import CopyButton from '@/components/ui/copy-button';
import { formatEtherShort } from '@/utils/format';
import RegisterIndexer from './register-indexer';
import SlaStatus from './sla-status';

export interface Indexer {
  address: string;
  image: string | null;
  indexer: string | null;
  active_sla_status: boolean;
  registration_status: boolean;
  stake_owned: string;
  stake_delegated: string;
  stake_allocated: string;
  total_restaked_capital: string;
  total_restakers: number;
}

export const columns: ColumnDef<Indexer>[] = [
  {
    accessorKey: 'indexer',
    header: ({ column }) => (
      <ColumnHeader className="w-[220px]" column={column} title="Indexer" />
    ),

    cell: ({ row }) => {
      const { address, indexer, image } = row.original;
      return (
        <div className="flex items-center gap-2 w-[220px]">
          {image ? (
            <Image
              src={image}
              alt={`${address} image`}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          ) : (
            <Image
              alt={address}
              src={blo(address as '0x')}
              width={24}
              height={24}
              className="rounded-full object-cover"
            />
          )}
          {indexer ? (
            <h3 className="text-base  text-white capitalize">{indexer}</h3>
          ) : (
            <span className={'text-white text-base font-normal text-center'}>
              {address && address?.slice(0, 6) + '-' + address?.slice(-6)}
            </span>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: 'address',
    header: ({ column }) => (
      <ColumnHeader className="justify-end" column={column} title="Address" />
    ),

    cell: ({ row }) => {
      const { address } = row.original;

      return (
        <Tooltip content={<p>{address}</p>}>
          <div className="flex items-center justify-end gap-2 w-full">
            <span className={'text-white text-base font-normal text-center'}>
              {address && address?.slice(0, 4) + '...' + address?.slice(-4)}
            </span>

            <CopyButton
              title={'Copy'}
              value={address}
              text={'Address copied to clipboard'}
              className="size-5"
            />
          </div>
        </Tooltip>
      );
    },
  },
  {
    accessorKey: 'stake_owned',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Stake owned"
      />
    ),

    cell: ({ row }) => <BigNumberCell value={row.getValue('stake_owned')} />,
  },
  {
    accessorKey: 'stake_delegated',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Stake delegated"
      />
    ),

    cell: ({ row }) => (
      <BigNumberCell value={row.getValue('stake_delegated')} />
    ),
  },
  {
    accessorKey: 'stake_allocated',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Stake allocated"
      />
    ),

    cell: ({ row }) => (
      <BigNumberCell value={row.getValue('stake_allocated')} />
    ),
  },
  {
    accessorKey: 'total_restaked_capital',
    header: ({ column }) => (
      <ColumnHeader
        className="justify-end"
        column={column}
        title="Restaked capital"
      />
    ),

    cell: ({ row }) => (
      <NumberCell value={row.getValue('total_restaked_capital')} currency="$" />
    ),
  },
  {
    accessorKey: 'total_restakers',
    header: ({ column }) => (
      <ColumnHeader className="justify-end" column={column} title="Restakers" />
    ),

    cell: ({ row }) => <NumberCell value={row.getValue('total_restakers')} />,
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
      const { address, registration_status } = row.original;

      return (
        <RegisterIndexer
          registration_status={registration_status}
          address={address}
        />
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
      const { address, active_sla_status } = row.original;

      return (
        <SlaStatus active_sla_status={active_sla_status} address={address} />
      );
    },
  },
];

const BigNumberCell = ({ value }: { value: string }) => {
  const formattedValue = formatEtherShort(BigInt(value));
  return (
    <div className="text-base text-white capitalize text-right pr-3">
      {formattedValue} GRT
    </div>
  );
};

const NumberCell = ({
  value,
  currency,
}: {
  value: string | number;
  currency?: string;
}) => {
  return (
    <div className="text-base text-white capitalize text-right pr-3">
      {value} {currency}
    </div>
  );
};
