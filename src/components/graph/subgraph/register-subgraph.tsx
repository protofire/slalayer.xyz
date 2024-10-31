'use client';

import { cn } from '@/lib/utils';

interface RegisterSubgraphProps {
  registration_status: boolean;
}

export default function RegisterSubgraph({
  registration_status,
}: RegisterSubgraphProps) {
  return (
    <div
      className={cn(
        'text-sm w-[100px] text-white py-1 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto',
        registration_status && 'bg-green-600 hover:bg-green-700',
      )}
    >
      {registration_status ? 'Registered' : 'Not Registered'}
    </div>
  );
}
