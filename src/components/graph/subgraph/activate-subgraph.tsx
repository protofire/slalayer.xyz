'use client';

import Modal from '@/components/ui/modal';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import PricingContent from './pricing/pricing-content';

export default function ActivateSubgraph({
  active_sla_status,
  subgraph_id,
}: {
  active_sla_status: boolean;
  subgraph_id: string;
}) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isActive, setIsActive] = useState(active_sla_status);

  useEffect(() => {
    const activeSubgraphs = JSON.parse(
      localStorage.getItem('activeSubgraphs') || '[]',
    );

    if (activeSubgraphs.includes(subgraph_id)) {
      setIsActive(true);
    }
  }, [subgraph_id]);

  return (
    <>
      {isActive ? (
        <div className="text-sm w-[100px] text-white py-1 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto bg-green-600 hover:bg-green-700">
          Active
        </div>
      ) : (
        <button
          className={cn(
            'bg-[#00182b] text-sm text-white py-1 px-2 rounded-lg hover:bg-[#002a4c] transition-all flex items-center gap-2 mx-auto ',
          )}
          onClick={() => setIsOpenModal(true)}
        >
          {'Activate SLA'}
        </button>
      )}
      <Modal
        className="flex flex-col p-5 text-white"
        isOpen={isOpenModal}
        onClickOutside={() => setIsOpenModal(false)}
      >
        <PricingContent subgraph_id={subgraph_id} />
      </Modal>
    </>
  );
}
