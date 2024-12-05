"use client";
import RecommendedVehicles from '@/components/shared/RecommendedVehicles';
import VehicleOverview from '@/components/shared/VehicleOverview';
import VehiclieDetailsPage from '@/components/shared/VehiclieDetailsPage';
import VehicleDetailsPageSkeleton from '@/components/ui/SkeletonLoadings/VehicleDetailsPageSkeleton';
import axios from 'axios';
import useSWR from 'swr';
const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Page({params}) {
  const id = params.id;
  const { data: agentData, isLoading } = useSWR(
    id ? `/api/get-specific-vehicle?id=${id}` : null,
    fetcher
  )

  if(isLoading){
   return <VehicleDetailsPageSkeleton/>
  }
  
  return (
    <main className='bg-[#050B20] h-80'>
      <section className='pt-[4.5rem] '>
        <VehiclieDetailsPage agentData={agentData} />
      </section>
      <section className='sm:padding-x' >
        <VehicleOverview  agentData={agentData}/>
      </section>
    </main>
  );
}
