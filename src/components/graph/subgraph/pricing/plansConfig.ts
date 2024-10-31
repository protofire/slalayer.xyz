// 99.9%, 99.99%, 99.999%
const Uptime = 'Uptime';
// 100 mbit/s, 1gbit/s, 10gbit/s
const Bandwidth = 'Bandwidth';
const SubgraphRadio = 'Subgraph radio';
const Georedundancy = 'Georedundancy';
const CertificationGuarantees = 'Certification guarantees';
const Compensation = 'Compensation';

export const features = [
  {
    name: Uptime,
    description: 'Least guaranteed uptime before slashing occurs',
  },
  {
    name: Bandwidth,
    description:
      'provider guarantees to run your subgraph on a hardware with at least the specified bandwidth',
  },
  {
    name: SubgraphRadio,
    description:
      'Indexer guarantees to listen to your subgraph upgrade event and start indexing new version as soon as you release it',
  },
  {
    name: CertificationGuarantees,
    description:
      'Top-level providers possessing ISO-27001, SOC-2 certifications running at least Tier-3 datacenters',
  },
  {
    name: Compensation,
    description: 'specific payouts for downtime incidents',
  },
  {
    name: Georedundancy,
    description:
      'Indexer guarantees to host your subgraph in multiple geographically distributed locations for better uptime and lower latency',
  },
];

export const tiers = [
  {
    name: 'bronze',
    price: '500',
    features: [
      {
        feature: Uptime,
        value: '99.9% Slashing starts per each day of downtime',
      },
      { feature: Bandwidth, value: '100 mbit/s' },
      { feature: SubgraphRadio },
    ],
  },
  {
    name: 'silver',
    price: '2000',
    features: [
      {
        feature: Uptime,
        value: '99.99% Slashing starts per each hour of downtime',
      },
      { feature: Bandwidth, value: '1gbit/s' },
      { feature: SubgraphRadio },
      { feature: CertificationGuarantees },
    ],
  },
  {
    name: 'gold',
    price: '5000',
    features: [
      {
        feature: Uptime,
        value: '99.999% Slashing starts per each minute of downtime',
      },
      { feature: Bandwidth, value: '10gbit/s' },
      { feature: SubgraphRadio },
      { feature: CertificationGuarantees },
      {
        feature: Compensation,
        value:
          '10 ETH for each hour of downtime after a continuous 4 hours of downtime, up to 100 ETH',
      },
      { feature: Georedundancy },
    ],
  },
];
