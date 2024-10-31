'use client';

import { useState } from 'react';
import RegisterPopUp from './register-pop-up';

interface RegisterIndexerProps {
  address: string;
  registration_status: boolean;
}

export default function RegisterIndexer({
  address,
  registration_status,
}: RegisterIndexerProps) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      {registration_status ? (
        <div className="text-sm w-[100px] text-white py-1 rounded-lg transition-all flex items-center justify-center gap-2 mx-auto bg-green-600 hover:bg-green-700">
          Registered
        </div>
      ) : (
        <button
          className="bg-[#00182b] text-sm text-white py-1 px-4 rounded-lg hover:bg-[#002a4c] transition-all flex items-center justify-center gap-2 mx-auto"
          onClick={() => setIsOpenModal(true)}
        >
          Register
        </button>
      )}

      <RegisterPopUp
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        indexerAddress={address}
      />
    </>
  );
}
