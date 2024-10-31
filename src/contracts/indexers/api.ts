import { ethers } from 'ethers';
import SlaRegisterABI from '@/contracts/indexers/abis/sla_registry.json';
import { getEthersSigner } from '@/configs/ethers';
import { config } from '@/configs/wagmi';

const SlaRegistryContract = '0xD321dc13822f09e6c70f85384ddb781dB729979B';
const RPC_URL = 'https://holesky.gateway.tenderly.co';

export const getOperators = async () => {
  try {
    const provider = new ethers.JsonRpcProvider(RPC_URL);

    const contract = new ethers.Contract(
      SlaRegistryContract,
      SlaRegisterABI,
      provider,
    );

    const operators = await contract.getOperators();

    return operators;
  } catch (error) {
    console.error('Error fetching operators:', error);
    throw error;
  }
};

export const registerIndexer = async (indexerAddress: string) => {
  const signer = await getEthersSigner(config);

  const contract = new ethers.Contract(
    SlaRegistryContract,
    SlaRegisterABI,
    signer,
  );
  try {
    const tx = await contract.applyFor(indexerAddress, 1);

    const receipt = await tx.wait();

    return { success: true, hash: receipt.transactionHash };
  } catch (error) {
    console.error('Error registering indexer:', error);
    throw error;
  }
};
