'use client'

import AddVehicles from "@/components/shared/dashboard-common/AddVehicles";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
        <AddVehicles id={id} />
    </div>
  );
}
