'use client';

import { useEffect, useState } from 'react';
import Combobox from '@/components/Combobox';

interface AddressSelectProps {
  readonly onChange: (provinceId: number) => void;
  readonly value?: number;
}

export default function AddressSelect({ onChange, value }: AddressSelectProps) {
  const [provincesData, setProvincesData] = useState<{ code: number; name: string }[]>([]);

  useEffect(() => {
    async function fetchProvinces() {
      const res = await fetch('/data/0.json');
      const data = await res.json();
      const mapped = data.map((item: { T_id: number; T_ten: string }) => ({
        code: item.T_id,
        name: item.T_ten,
      }));
      setProvincesData(mapped);
    }
    fetchProvinces();
  }, []);

  const handleSelectProvince = async (provinceId: number) => {
    onChange(provinceId);
  };

  return (
    <div className="space-y-6">
      <div className="relative w-full">
        <Combobox
          data={provincesData}
          value={value}
          type="province"
          onSelect={handleSelectProvince}
        />
      </div>
    </div>
  );
}
