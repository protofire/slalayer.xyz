'use client';

import { toast } from 'react-toastify';
import { useAccount, useConnect, useDisconnect } from 'wagmi';

import { useIsClient } from '@/hooks/useIsClient';
import Address from '@/components/ui/address';

export default function ConnectButton() {
  const { connectors, connect, status } = useConnect();
  const { disconnect } = useDisconnect();

  const { address, isConnected } = useAccount();

  const isClient = useIsClient();

  if (!isClient) {
    return null;
  }

  const logOut = () => {
    disconnect();
  };

  const injectedConnectors = connectors.filter(
    (connector) => connector.name === 'MetaMask',
  );

  return (
    <>
      {isConnected && address ? (
        <div className="group rounded-full w-[200px] border border-[#003055]">
          <button
            className={`text-white text-base font-normal uppercase py-2 px-4  hidden group-hover:block w-full h-full`}
            onClick={logOut}
          >
            Disconnect
          </button>

          <Address className="group-hover:hidden" />
        </div>
      ) : (
        <>
          {injectedConnectors.length === 0 ? (
            <button
              onClick={() => showMetaMaskToast()}
              type="button"
              className="w-[200px] h-10 border border-gray-500 rounded-full hover:bg-black text-white uppercase"
            >
              {'Connect Wallet'}
            </button>
          ) : (
            injectedConnectors.map((connector) => {
              if (connector.name === 'MetaMask') {
                return (
                  <button
                    key={connector.uid}
                    onClick={() => connect({ connector, chainId: 17000 })}
                    type="button"
                    className="w-[200px] h-10 border border-gray-500 rounded-full hover:bg-black text-white uppercase"
                  >
                    {status === 'pending' ? 'Connecting...' : 'Connect Wallet'}
                  </button>
                );
              }
            })
          )}
        </>
      )}
    </>
  );
}

function showMetaMaskToast() {
  return toast.info(
    <div className="flex flex-col gap-2 items-center text-sm">
      MetaMask isn&apos;t installed. Please install it to connect your wallet.
      Then reload this page.
      <a
        href="https://metamask.io/download/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className="text-white w-full text-base pt-2 pb-1 px-10 font-normal uppercase rounded-full">
          Install MetaMask
        </button>
      </a>
    </div>,
    {
      position: 'bottom-right',
      toastId: 'metamask-not-installed',
      autoClose: false,
    },
  );
}
