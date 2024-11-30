"use client"
import AddProducts from "@/components/shared/dashboard-common/AddProducts";
import { useSearchParams } from "next/navigation";

export default function page() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');

  return (
   <div><AddProducts id={id}/></div>
  );
}
