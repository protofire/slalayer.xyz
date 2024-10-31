'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import indexersData from '@/static-data/indexers.json';
import { getOperators } from '@/contracts/indexers/api';
import DataTable from '@/components/ui/data-table';
import subgraphsData from '@/static-data/subgraphs.json';
import { columns as indexersColumns, Indexer } from './columns';
import { SortingState, VisibilityState } from '@tanstack/react-table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { columns as subgraphsColumns, Subgraph } from '../subgraph/columns';
import {
  fetchAllRegisteredSubgraphs,
  getSLAPlansBySubgraphIDs,
} from '@/contracts/subgraphs/api';
import CommitButton from '../subgraph/checkbox-filter';

export default function IndexerTable() {
  const [updatedIndexersData, setUpdatedIndexersData] =
    useState<Indexer[]>(indexersData);
  const [updatedSubgraphsData, setUpdatedSubgraphsData] =
    useState<Subgraph[]>(subgraphsData);
  const [loading, setLoading] = useState(true);

  const [selectedSubgraphIds, setSelectedSubgraphIds] = useState<string[]>([]);

  const initialRowSelection = useMemo(() => {
    const selection: Record<string, boolean> = {};
    selectedSubgraphIds.forEach((id) => {
      selection[id] = true;
    });
    return selection;
  }, [selectedSubgraphIds]);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const selectedSubgraphIds = localStorage.getItem('selectedSubgraphIds');

      const parsedSelectedSubgraphIds = JSON.parse(selectedSubgraphIds || '[]');

      setSelectedSubgraphIds(parsedSelectedSubgraphIds);

      const registeredOperators = await getOperators();

      const lowerCaseRegisteredOperators = registeredOperators.map(
        (operator: string) => operator.toLowerCase(),
      );

      const updatedData = indexersData.map((indexer) => ({
        ...indexer,
        registration_status: lowerCaseRegisteredOperators.includes(
          indexer.address.toLowerCase(),
        ),
      }));

      setUpdatedIndexersData(updatedData);
      const registeredSubgraphs = await fetchAllRegisteredSubgraphs();

      const subgraphWithPlans = await getSLAPlansBySubgraphIDs(
        registeredSubgraphs,
      );

      const updatedSubgraphsData = subgraphsData.map((subgraph) => ({
        ...subgraph,
        registration_status: registeredSubgraphs.includes(subgraph.subgraphId),
        plan: subgraphWithPlans.find(
          ({ subgraphID }: { subgraphID: string }) =>
            subgraphID === subgraph.subgraphId,
        )?.plan,
      }));

      setUpdatedSubgraphsData(updatedSubgraphsData);
    } catch (error) {
      console.error('Error fetching operators:', (error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const initialIndexersSorting = useMemo<SortingState>(
    () => [
      {
        id: 'registration_status',
        desc: true,
      },
    ],
    [],
  );

  const initialSubgraphsSorting = useMemo<SortingState>(
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
      plan: false,
    }),

    [],
  );

  return (
    <Tabs defaultValue="indexers">
      <TabsList className="bg-[#192646] mx-8">
        <div className="flex gap-3">
          <TabsTrigger value="indexers">
            Step 1 - Indexers Must Register
          </TabsTrigger>
          <TabsTrigger value="subgraphs">
            Step 2 - Indexers Must Commit to Provide High Performance Subgraph
            Hosting Services to 1 or more Subgraph Customers
          </TabsTrigger>
        </div>
      </TabsList>
      <TabsContent value="indexers">
        <DataTable
          data={updatedIndexersData}
          columns={indexersColumns}
          initialSorting={initialIndexersSorting}
          searchBy={['indexer', 'address']}
          loading={loading}
        />
      </TabsContent>
      <TabsContent value="subgraphs">
        <DataTable
          data={updatedSubgraphsData}
          columns={subgraphsColumns}
          initialSorting={initialSubgraphsSorting}
          initialColumnVisibility={initialColumnVisibility}
          searchBy={['projectName', 'subgraphId']}
          commitComponent={CommitButton}
          loading={loading}
          initialRowSelection={initialRowSelection}
        />
      </TabsContent>
    </Tabs>
  );
}
