'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface Page {
  name: string;
  href: string;
  subPagePath: string;
}

interface NavigationProps {
  pages: Page[];
}

export default function Navigation({ pages }: NavigationProps) {
  const pathname = usePathname();

  return (
    <nav className={`font-medium text-[18px]/[24px]`}>
      <ul className="flex gap-8">
        {pages.map(({ href, name, subPagePath }) => {
          const isActive =
            pathname === href || pathname.startsWith(subPagePath + '/');

          return (
            <li key={href}>
              <Link
                className={`px-3 py-2 rounded transition-all ${
                  isActive
                    ? 'font-bold bg-[#002846] text-white border-b-2 border-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-[#001c35] hover:border-b-2 hover:border-blue-400'
                }`}
                href={href}
              >
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
