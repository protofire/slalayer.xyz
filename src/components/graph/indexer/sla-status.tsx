'use client';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

export default function SlaStatus({
  active_sla_status,
  address,
}: {
  active_sla_status: boolean;
  address: string;
}) {
  const [isActive, setIsActive] = useState(active_sla_status);

  useEffect(() => {
    const activeIndexers = JSON.parse(
      localStorage.getItem('activeIndexers') || '[]',
    );

    if (activeIndexers.includes(address)) {
      setIsActive(true);
    }
  }, [address]);
  return (
    <div
      className={cn(
        'text-sm w-[100px] text-white py-1 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto',
        isActive && 'bg-green-600 hover:bg-green-700',
      )}
    >
      {isActive ? 'Active' : 'Inactive'}
    </div>
  );
}
