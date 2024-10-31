'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href || pathname.startsWith(href + '/');

  return (
    <Link
      href={href}
      className={`px-3 py-2 rounded transition-all ${
        isActive
          ? 'font-bold bg-[#002846] text-white border-b-2 border-blue-400'
          : 'text-gray-300 hover:text-white hover:bg-[#001c35] hover:border-b-2 hover:border-blue-400'
      }`}
    >
      {children}
    </Link>
  );
}
