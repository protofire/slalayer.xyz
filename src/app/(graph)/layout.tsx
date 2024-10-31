import Navigation from '@/components/ui/navigation';

const pages = [
  {
    name: 'Indexers',
    href: '/',
    subPagePath: '/',
  },
  {
    name: 'Subgraphs',
    href: '/graph/subgraphs',
    subPagePath: '/graph/subgraphs',
  },
  {
    name: 'Operators',
    href: '/graph/operators',
    subPagePath: '/graph/operators',
  },
];

export default function GraphPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col gap-10 items-center py-6 w-full max-w-[1400px]">
      <Navigation pages={pages} />
      {children}
    </div>
  );
}
