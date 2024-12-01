import React from 'react';
import VehicleMobileCard from '../helpers/VehicleMobileCard';
import FullScreenLoader from '../ui/SkeletonLoadings/FullScreenLoader';
import dynamic from 'next/dynamic';
const VehicleCard = dynamic(() => import('@/components/helpers/VehicleCard'), {
  loading: () => <FullScreenLoader/>, // Optional: A fallback loader
});

export default function VehicleCardList({vehicles}) {
  

    return (
      <div className="sm:container mx-auto sm:px-4">
     
      <div className="sm:grid hidden sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {vehicles.map((vehicle) => (
          <VehicleCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
      <div className="sm:hidden ">
        {vehicles.map((vehicle) => (
          <VehicleMobileCard key={vehicle._id} vehicle={vehicle} />
        ))}
      </div>
    </div>
    );
}
