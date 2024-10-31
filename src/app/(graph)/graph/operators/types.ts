export type OperatorInfo = {
  address: string;
  name: string;
  website: string;
  description: string;
  logo: string;
  twitter: string;
};

export type OperatorStats = {
  address: string;
  numStakers: number;
  numAvs: number;
  shares: Record<string, string>;
};

export interface MergedOperator extends OperatorInfo, OperatorStats {
  total_eigen_restaked: number;
  total_eth_restaked: number;
  active_sla_status: boolean;
  registration_status: boolean;
}
