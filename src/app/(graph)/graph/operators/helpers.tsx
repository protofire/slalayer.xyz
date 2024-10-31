import { eigenAddress, ethAddresses } from './config';
import { MergedOperator, OperatorInfo, OperatorStats } from './types';
import defaultOperatorMetadata from '@/static-data/operators/operatorMetadata.json';
import defaultOperatorTvlStakerData from '@/static-data/operators/operatorTvlStakerData.json';
import { operatorsUrl } from './config';

export function hasAdditionalInfo(
  operator: OperatorInfo,
): operator is Required<OperatorInfo> {
  return (
    operator.name !== undefined ||
    operator.website !== undefined ||
    operator.description !== undefined ||
    operator.logo !== undefined ||
    operator.twitter !== undefined
  );
}

export function mergeOperators(
  operatorsInfo: OperatorInfo[],
  operatorsStats: OperatorStats[],
): MergedOperator[] {
  const filteredOperatorsInfo = operatorsInfo.filter(hasAdditionalInfo);

  const statsMap = new Map<string, OperatorStats>();

  for (const stat of operatorsStats) {
    statsMap.set(stat.address.toLowerCase(), stat);
  }

  const mergedOperators: MergedOperator[] = filteredOperatorsInfo.map(
    (info) => {
      const addressKey = info.address.toLowerCase();

      const stat = statsMap.get(addressKey);

      if (stat) {
        let total_eigen_restaked = 0;
        let total_eth_restaked = 0;

        if (stat.shares[eigenAddress]) {
          total_eigen_restaked = parseInt(stat.shares[eigenAddress], 10);
        }

        for (const [shareAddress, shareValue] of Object.entries(stat.shares)) {
          if (
            shareAddress.toLowerCase() !== eigenAddress &&
            ethAddresses.includes(shareAddress.toLowerCase())
          ) {
            total_eth_restaked += parseInt(shareValue, 10);
          }
        }
        if (info.name === 'Kiln') {
          return {
            ...info,
            ...stat,
            total_eigen_restaked,
            total_eth_restaked,
            active_sla_status: true,
            registration_status: true,
          };
        }
        return {
          ...info,
          ...stat,
          total_eigen_restaked,
          total_eth_restaked,
          active_sla_status: false,
          registration_status: false,
        };
      } else {
        return {
          ...info,
          numStakers: 0,
          numAvs: 0,
          shares: {},
          total_eigen_restaked: 0,
          total_eth_restaked: 0,
          active_sla_status: false,
          registration_status: false,
        };
      }
    },
  );

  return mergedOperators;
  // .filter((operator) => operator.numAvs > 0);
}

export async function fetchOperatorsData() {
  try {
    const response = await fetch(operatorsUrl);

    if (!response.ok) {
      console.error(
        `Error loading data: ${response.status} ${response.statusText}`,
      );

      return {
        operatorMetadata: defaultOperatorMetadata,
        operatorTvlStakerData: defaultOperatorTvlStakerData,
      };
    }

    const data = await response.json();

    const operatorMetadata =
      data[1]?.result?.data?.json?.operatorMetadata || defaultOperatorMetadata;
    const operatorTvlStakerData =
      data[2]?.result?.data?.json?.operatorTvlStakerData ||
      defaultOperatorTvlStakerData;

    return { operatorMetadata, operatorTvlStakerData };
  } catch (error) {
    console.error('An error occurred while loading operator data:', error);

    return {
      operatorMetadata: defaultOperatorMetadata,
      operatorTvlStakerData: defaultOperatorTvlStakerData,
    };
  }
}
