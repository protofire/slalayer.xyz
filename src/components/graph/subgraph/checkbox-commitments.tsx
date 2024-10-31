'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Row } from '@tanstack/react-table';
import { Subgraph } from './columns';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export default function CheckboxCommitments({ row }: { row: Row<Subgraph> }) {
  const [open, setOpen] = useState(false);
  const isSelected = row.getIsSelected();

  const handleCheckboxClick = () => {
    if (isSelected) {
      row.toggleSelected(false);
      row.original.selectedOption = undefined;
    } else {
      setOpen(true);
    }
  };

  const handlePlanSelect = (value: 'gold' | 'silver' | 'bronze') => {
    row.original.selectedOption = value;

    row.toggleSelected(true);

    setOpen(false);
  };
  const selectedOption = row.original.selectedOption;
  return (
    <div className="flex justify-center items-center">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <div
            className="flex flex-col items-center"
            onClick={handleCheckboxClick}
          >
            <Checkbox
              className={cn(
                selectedOption === 'bronze' &&
                  'data-[state=checked]:bg-[#cd7f32]',
                selectedOption === 'silver' &&
                  'data-[state=checked]:bg-[#c0c0c0]',
                selectedOption === 'gold' &&
                  'data-[state=checked]:bg-[#ffd700]',
              )}
              checked={isSelected}
            />
          </div>
        </PopoverTrigger>
        {open && (
          <PopoverContent side="left" className="w-auto p-0">
            <div className="flex flex-col space-y-2 p-2">
              <button onClick={() => handlePlanSelect('gold')}>Gold</button>
              <button onClick={() => handlePlanSelect('silver')}>Silver</button>
              <button onClick={() => handlePlanSelect('bronze')}>Bronze</button>
            </div>
          </PopoverContent>
        )}
      </Popover>
    </div>
  );
}
