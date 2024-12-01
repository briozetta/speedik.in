import React from 'react';
import VehicleCard from '../helpers/VehicleCard';
import car from "@/public/assets/car.webp";
import pickup from "@/public/assets/pickup.jpg";
import VehicleMobileCard from '../helpers/VehicleMobileCard';

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
