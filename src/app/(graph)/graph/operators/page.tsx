import OperatorTable from '@/components/graph/operators';
import { fetchOperatorsData, mergeOperators } from './helpers';

export const revalidate = 60;

export default async function OperatorsPage() {
  const { operatorMetadata, operatorTvlStakerData } =
    await fetchOperatorsData();
  const mergedOperators = mergeOperators(
    operatorMetadata,
    operatorTvlStakerData,
  );

  return (
    <section className="w-full">
      <OperatorTable data={mergedOperators} />
    </section>
  );
}
