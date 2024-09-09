"use client";
import RecommendedVehicles from '@/components/shared/RecommendedVehicles';
import VehicleOverview from '@/components/shared/VehicleOverview';
import VehiclieDetailsPage from '@/components/shared/VehiclieDetailsPage';
import React from 'react';

export default function Page() {
  return (
    <main className='bg-[#050B20] h-80'>
      <section className='pt-[4.5rem] '>
        <VehiclieDetailsPage />
      </section>
      <section className='sm:padding-x'>
        <VehicleOverview/>
      </section>
    </main>
  );
}
