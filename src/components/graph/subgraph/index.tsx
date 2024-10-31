'use client';

import DataTable from '@/components/ui/data-table';

import CommitButton from './checkbox-filter';
import subgraphsData from '@/static-data/subgraphs.json';
import { columns, Subgraph } from './columns';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { SortingState, VisibilityState } from '@tanstack/react-table';
import {
  fetchAllRegisteredSubgraphs,
  getSLAPlansBySubgraphIDs,
} from '@/contracts/subgraphs/api';

export default function SubgraphTable() {
  const [updatedSubgraphsData, setUpdatedSubgraphsData] =
    useState<Subgraph[]>(subgraphsData);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const registeredSubgraphs = await fetchAllRegisteredSubgraphs();

      const subgraphWithPlans = await getSLAPlansBySubgraphIDs(
        registeredSubgraphs,
      );
      const updatedData = subgraphsData.map((subgraph) => ({
        ...subgraph,
        registration_status: registeredSubgraphs.includes(subgraph.subgraphId),
        plan: subgraphWithPlans.find(
          ({ subgraphID }: { subgraphID: string }) =>
            subgraphID === subgraph.subgraphId,
        )?.plan,
      }));

      setUpdatedSubgraphsData(updatedData);
    } catch (error) {
      console.error('Error fetching operators:', (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const initialSorting = useMemo<SortingState>(
    () => [
      {
        id: 'registration_status',
        desc: true,
      },
      { id: 'plan', desc: false },
    ],
    [],
  );

  const initialColumnVisibility = useMemo<VisibilityState>(
    () => ({
      commitToSLA: false,
      plan: false,
    }),

    [],
  );

  return (
    <DataTable
      data={updatedSubgraphsData}
      columns={columns}
      initialSorting={initialSorting}
      initialColumnVisibility={initialColumnVisibility}
      searchBy={['projectName', 'subgraphId']}
      commitComponent={CommitButton}
      loading={loading}
    />
  );
}
