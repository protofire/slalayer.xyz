import Navigation from '@/components/ui/navigation';

const pages = [
  {
    name: 'Storage-providers',
    href: '/filecoin/storage-providers',
    subPagePath: '/filecoin/storage-providers',
  },
  {
    name: 'Customers-and-deals',
    href: '/filecoin/customers-and-deals',
    subPagePath: '/filecoin/customers-and-deals',
  },
  {
    name: 'Operators',
    href: '/filecoin/operators',
    subPagePath: '/filecoin/operators',
  },
];

export default function FilecoinPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col items-center gap-[100px] pt-[50px]">
      <Navigation pages={pages} />
      {children}
    </div>
  );
}
