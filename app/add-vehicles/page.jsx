'use client'

import AddProducts from "@/components/shared/dashboard-common/AddProducts";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export default function Page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
    <div>
      <Suspense>
        <AddProducts id={id} />
      </Suspense>
    </div>
  );
}
