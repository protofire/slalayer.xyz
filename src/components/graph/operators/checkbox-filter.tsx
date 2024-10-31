import React, { useEffect } from 'react';
import { Table as ReactTable } from '@tanstack/react-table';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

interface CheckboxFilterProps<TData> {
  table: ReactTable<TData>;
}

export default function CheckboxFilter<TData>({
  table,
}: CheckboxFilterProps<TData>) {
  const [checked, setChecked] = React.useState<boolean>(true);

  useEffect(() => {
    if (checked) {
      table.getColumn('numAvs' as string)?.setFilterValue(true);
    } else {
      table.getColumn('numAvs' as string)?.setFilterValue(undefined);
    }
  }, [checked, table]);

  return (
    <div className="flex items-center gap-3">
      <Switch
        checked={checked}
        onCheckedChange={(checked) => setChecked(checked)}
        id="airplane-mode"
      />
      <Label htmlFor="airplane-mode">Hide with 0 AVS secured</Label>
    </div>
  );
}
