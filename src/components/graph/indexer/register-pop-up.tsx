'use client';

import { useState } from 'react';
import { useAccount, useConnect } from 'wagmi';
import CopyButton from '../../ui/copy-button';
import Modal from '../../ui/modal';
import { registerIndexer } from '@/contracts/indexers/api';
import { toast } from 'react-toastify';
import { Loader } from '@/components/ui/loader';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RegisterPopUpProps {
  isOpen: boolean;
  onClose: () => void;
  indexerAddress: string;
}

export default function RegisterPopUp({
  isOpen,
  onClose,
  indexerAddress,
}: RegisterPopUpProps) {
  const { isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const [isLoading, setIsLoading] = useState(false);

  const timestamp = Date.now();

  const GnosisSafeTransactionData = {
    version: '1.0',
    chainId: '1',
    createdAt: timestamp,
    meta: {
      name: 'Transactions Batch',
      description: '',
      txBuilderVersion: '1.17.1',
      createdFromSafeAddress: indexerAddress || '',
      createdFromOwnerAddress: '',
      checksum:
        '0x4624d15a5b039962480adcd1f641d1a21a1f7787363aecaf36738be48cabe238',
    },
    transactions: [
      {
        to: '0x684e78C5Fd525fddA2F751ad4d54cbe813510412',
        value: '0',
        data: null,
        contractMethod: {
          inputs: [],
          name: 'register',
          payable: false,
        },
        contractInputsValues: null,
      },
    ],
  };

  const registerWithMetamask = async () => {
    setIsLoading(true);
    try {
      await registerIndexer(indexerAddress);
      toast.success('Registration successful!');
    } catch (error) {
      console.error('Registration failed:', error);
      toast.error('Failed to send transaction');
    } finally {
      setIsLoading(false);
    }
  };

  const connectWallet = () => {
    try {
      connect({ connector: connectors[0], chainId: 17000 });
    } catch (error) {
      console.error('Connection failed:', error);
      alert('Failed to connect wallet');
    }
  };

  return (
    <Modal
      className="flex flex-col p-5 text-white"
      isOpen={isOpen}
      onClickOutside={onClose}
    >
      <h2 className="text-lg font-bold mb-6">Register Indexer</h2>
      <Tabs defaultValue="metamask">
        <TabsList>
          <TabsTrigger value="metamask">Register via Metamask</TabsTrigger>
          <TabsTrigger value="gnosis-safe">
            Register via Gnosis Safe
          </TabsTrigger>
        </TabsList>
        <TabsContent value="metamask" className="flex flex-col items-center ">
          <button
            onClick={isConnected ? registerWithMetamask : connectWallet}
            className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-all text-center"
            disabled={isLoading}
          >
            {isConnected && !isLoading && 'Register with Metamask'}
            {!isConnected && !isLoading && 'Connect Wallet'}
            {isLoading && (
              <div className="flex items-center gap-1">
                <p>Registering</p>
                <Loader />
              </div>
            )}
          </button>
        </TabsContent>
        <TabsContent value="gnosis-safe">
          <p className="text-lg font-bold mb-2">
            Paste this TX and execute in your Gnosis Safe
          </p>
          {indexerAddress && (
            <div className="relative">
              <pre className="text-gray-400 bg-gray-800 p-3 rounded overflow-hidden text-sm">
                {JSON.stringify(GnosisSafeTransactionData, null, 2)}
              </pre>
              <CopyButton
                title={'Copy'}
                value={JSON.stringify(GnosisSafeTransactionData, null, 2)}
                text={'Transaction data copied to clipboard'}
                className="size-6 absolute top-2 right-2"
              />
            </div>
          )}
        </TabsContent>
      </Tabs>
      <button
        className="bg-[#002a4c] text-white py-2 px-4 rounded-lg hover:bg-[#004570] transition-all mt-auto"
        onClick={onClose}
      >
        Close
      </button>
    </Modal>
  );
}
