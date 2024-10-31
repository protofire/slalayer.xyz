'use client';

import ConnectButton from '@/components/ui/connect-button';
import Navigation from '../ui/navigation';
import Link from 'next/link';
import Image from 'next/image';

const pages = [
  {
    name: 'The Graph',
    href: '/',
    subPagePath: '/graph',
  },
  {
    name: 'Filecoin',
    href: '/filecoin/storage-providers',
    subPagePath: '/filecoin',
  },
];

export default function Header() {
  return (
    <header className="z-10 border-b flex items-center justify-between w-full h-20 mx-0 p-2 sm:p-3 lg:p-4">
      <Link href="/" className="flex items-center gap-2">
        <Image src="/logo.webp" alt="Logo" width={45} height={33} priority />
        <div className="flex items-center gap-2">
          <h1 className="text-[24px] leading-[30px] font-semibold text-white">
            SLA Layer
          </h1>
          <span className="hidden sm:inline text-gray-300">
            | Infrastructure Guarantees as a Service
          </span>
        </div>
      </Link>
      <div className="mx-auto">
        <Navigation pages={pages} />
      </div>
      <div className="items-center flex">
        <ConnectButton />
      </div>
    </header>
  );
}
