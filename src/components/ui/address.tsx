'use client';

import Image from 'next/image';
import { useAccount, useEnsName } from 'wagmi';
import { blo } from 'blo';

import { cn } from '@/lib/utils';

import Tooltip from './tooltip';
import { useIsClient } from '@/hooks/useIsClient';
import CopyButton from './copy-button';

interface AddressProps {
  className?: string;
  showStatus?: boolean;
  showCopyButton?: boolean;
  showTooltip?: boolean;
}

export default function Address({
  className,
  showStatus = true,
  showCopyButton = false,
}: AddressProps) {
  const { address } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const isClient = useIsClient();

  if (address === undefined || !isClient) return null;

  return (
    <Tooltip content={<p>{address}</p>}>
      <div
        className={cn(
          'flex flex-row w-full relative h-10 basis-[210px] grow-0 items-center justify-between px-4 rounded-full',
          className,
        )}
      >
        <Image
          alt={address}
          src={blo(address)}
          width="26"
          height="26"
          className="rounded-full"
        />
        <span className={`mx-2 text-white text-base font-normal text-center`}>
          {ensName ||
            (address && address?.slice(0, 6) + '...' + address?.slice(-4))}
        </span>

        {showCopyButton && (
          <CopyButton
            title={'Copy'}
            value={address}
            text={'Address copied to clipboard'}
            className="size-5"
          />
        )}

        {showStatus && (
          <span className="w-[10px] h-[10px] rounded-full bg-[#38fd6f]" />
        )}
      </div>
    </Tooltip>
  );
}
