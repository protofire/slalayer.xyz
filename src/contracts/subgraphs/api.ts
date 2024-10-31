import { ethers } from 'ethers';
import SlaCoverageABI from '@/contracts/subgraphs/abis/sla_coverage.json';
import SlaFeeSplitterABI from '@/contracts/subgraphs/abis/sla_fee_splitter.json';
import USDCABI from '@/contracts/subgraphs/abis/usdc.json';
import { getEthersSigner } from '@/configs/ethers';
import { config } from '@/configs/wagmi';
import { subgraphsConfig } from './config';

export const fetchAllRegisteredSubgraphs = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(subgraphsConfig.RPC_URL);
    const contract = new ethers.Contract(
      subgraphsConfig.SlaCoverageContract,
      SlaCoverageABI,
      provider,
    );

    const totalSubgraphsA = await contract.getTotalSubgraphsInsured(1);

    const totalSubgraphsB = await contract.getTotalSubgraphsInsured(2);

    const totalSubgraphsC = await contract.getTotalSubgraphsInsured(3);

    const subgraphsA =
      totalSubgraphsA > 0
        ? await contract.showRegisteredAndPrepaidAVSs(1, 0, totalSubgraphsA)
        : [];

    const subgraphsB =
      totalSubgraphsB > 0
        ? await contract.showRegisteredAndPrepaidAVSs(2, 0, totalSubgraphsB)
        : [];

    const subgraphsC =
      totalSubgraphsC > 0
        ? await contract.showRegisteredAndPrepaidAVSs(3, 0, totalSubgraphsC)
        : [];

    const allSubgraphs = [...subgraphsA, ...subgraphsB, ...subgraphsC];
    return allSubgraphs;
  } catch (error) {
    console.error('Error fetching all registered subgraphs:', error);
    throw error;
  }
};

export const getSLAPlansBySubgraphIDs = async (subgraphIDs: string[]) => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaCoverageContract,
    SlaCoverageABI,
    signer,
  );

  try {
    const plans = await contract.getSLAPlansBySubgraphIDs(subgraphIDs);

    return plans.map((plan: { subgraphID: string; plan: string }) => ({
      subgraphID: plan.subgraphID,
      plan: plan.plan,
    }));
  } catch (error) {
    console.error('Error fetching SLA plans:', error);
    throw error;
  }
};

export const subscribeToBronzePlan = async (subgraphID: string) => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaCoverageContract,
    SlaCoverageABI,
    signer,
  );

  try {
    const tx = await contract.SLAPlanA(subgraphID);
    const receipt = await tx.wait();
    return { success: true, hash: receipt.transactionHash };
  } catch (error) {
    console.error('Error subscribing to Bronze Plan:', error);
    throw error;
  }
};

export const subscribeToSilverPlan = async (subgraphID: string) => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaCoverageContract,
    SlaCoverageABI,
    signer,
  );

  try {
    const tx = await contract.SLAPlanB(subgraphID);
    const receipt = await tx.wait();
    return { success: true, hash: receipt.transactionHash };
  } catch (error) {
    console.error('Error subscribing to Silver Plan:', error);
    throw error;
  }
};

export const subscribeToGoldPlan = async (subgraphID: string) => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaCoverageContract,
    SlaCoverageABI,
    signer,
  );

  try {
    const tx = await contract.SLAPlanC(subgraphID);
    const receipt = await tx.wait();
    return { success: true, hash: receipt.transactionHash };
  } catch (error) {
    console.error('Error subscribing to Gold Plan:', error);
    throw error;
  }
};

export async function approveToken(amount: string) {
  const signer = await getEthersSigner(config);

  const usdcContract = new ethers.Contract(
    subgraphsConfig.USDCContract,
    USDCABI,
    signer,
  );

  try {
    const tx = await usdcContract.approve(
      subgraphsConfig.SlaFeeSplitterContract,
      ethers.parseUnits(amount, 18),
    );
    await tx.wait();
  } catch (error) {
    console.error('Approval failed:', error);
  }
}

export const makePayment = async (indexer: string, operator: string) => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaFeeSplitterContract,
    SlaFeeSplitterABI,
    signer,
  );

  try {
    const tx = await contract.makePAyment(indexer, operator);
    const receipt = await tx.wait();
    return { success: true, hash: receipt.transactionHash };
  } catch (error) {
    console.error('Error making payment:', error);
    throw error;
  }
};

export const registerIndexerInterest = async (
  indexer: string,
  subgraphIDs: string[],
  SLAPlanTypes: number[],
) => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaCoverageContract,
    SlaCoverageABI,
    signer,
  );

  if (subgraphIDs.length !== SLAPlanTypes.length) {
    throw new Error(
      'subgraphIDs and SLAPlanTypes arrays must be of the same length.',
    );
  }

  try {
    const tx = await contract.registerIndexerInterest(
      indexer,
      subgraphIDs,
      SLAPlanTypes,
    );
    const receipt = await tx.wait();

    return { success: true, hash: receipt.transactionHash };
  } catch (error) {
    console.error('Error registering indexer interest:', error);
    throw error;
  }
};

export const readDeals = async () => {
  const signer = await getEthersSigner(config);
  const contract = new ethers.Contract(
    subgraphsConfig.SlaCoverageContract,
    SlaCoverageABI,
    signer,
  );

  try {
    const [indexers, subgraphPlans] = await contract.readDeals();
    const deals = indexers.map((indexer: string, i: number) => ({
      indexer,
      subgraphPlan: subgraphPlans[i],
    }));
    return deals;
  } catch (error) {
    console.error('Error reading deals:', error);
    throw error;
  }
};
