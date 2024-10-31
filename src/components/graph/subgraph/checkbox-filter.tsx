import { Button } from '@/components/ui/button';
import { Table as ReactTable } from '@tanstack/react-table';
import { useState } from 'react';
import { Subgraph } from './columns';
import { toast } from 'react-toastify';
// import { useAccount } from 'wagmi';
import { Loader } from '@/components/ui/loader';
import { registerIndexerInterest } from '@/contracts/subgraphs/api';
import { defaultIndexer } from './pricing/pricing-card';

interface CheckboxFilterProps<TData extends Subgraph> {
  table: ReactTable<TData>;
}

export default function CommitButton<TData extends Subgraph>({
  table,
}: CheckboxFilterProps<TData>) {
  // const { address } = useAccount();
  const [isLoading, setIsLoading] = useState(false);

  const selectedRows = table.getSelectedRowModel().rows;

  const planConverter = {
    bronze: 1,
    silver: 2,
    gold: 3,
  };

  const subgraphIDs = selectedRows.map((row) => row.original.subgraphId);
  const SLAPlanTypes = selectedRows.map(
    (row) => planConverter[row.original.selectedOption!],
  );

  const handleRegisterIndexerInterest = async () => {
    setIsLoading(true);
    try {
      const tx = await registerIndexerInterest(
        defaultIndexer,
        subgraphIDs,
        SLAPlanTypes,
      );

      if (tx && tx.success) {
        localStorage.setItem(
          'selectedSubgraphIds',
          JSON.stringify(subgraphIDs),
        );

        //   await makeDeal(address, selections);
        //   toast.success('Registration successful!');
      }
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to send transaction');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-sm text-white capitalize text-right pr-3">
      <Button
        onClick={handleRegisterIndexerInterest}
        variant="secondary"
        className="text-white text-base font-medium"
        disabled={isLoading}
      >
        {isLoading ? (
          <div className="flex items-center gap-1">
            <p>Committing</p>
            <Loader />
          </div>
        ) : (
          'Commit To SLA'
        )}
      </Button>
    </div>
  );
}
