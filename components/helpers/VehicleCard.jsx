// components/CarCard.jsx
import Image from "next/image"; 
import { IoMdCar } from "react-icons/io";
import { FaGasPump } from "react-icons/fa"; 
import Link from "next/link";
import { Separator } from "../ui/separator";
import { IoIosArrowRoundForward } from "react-icons/io";
import { TbCalendar } from "react-icons/tb";

export default function VehicleCard({ vehicle }) {
  
  return (
    <div className="bg-white rounded-lg shadow-sm border rounded-t-xl overflow-hidden ">
      {/* Car Image */}
      <div className="relative w-full h-52">
        <Image
          src={vehicle.uploadedImages[0]}
          alt={vehicle.model}
          fill 
          sizes="(min-width: 808px) 50vw, 100vw"
          className="rounded-t-xl"
        />
        {/* Price Tag */}
        <div className="absolute top-2 left-2 bg-emerald-600 text-white px-3 py-1 rounded-full text-sm">
          {vehicle.brand} 
        </div>
       
      </div>

      <div className="p-3 px-6">
        {/* Car Details */}
        <div>
          <h3 className="text-lg font-normal">{vehicle.brand} {vehicle.model}</h3>
          <p className="text-gray-500 text-[14px] py-1 pb-2">
            {vehicle.colour}
          </p>
          <Separator />

          <div className="flex items-center justify-between my-4 space-x-4">
            <div className="flex flex-col gap-1 items-center space-x-1">
              <IoMdCar className="text-gray-600 w-5 h-5" />
              <span className="text-gray-600 text-sm">{vehicle.kilometers} km</span>
            </div>
            <div className="flex flex-col gap-1 items-center space-x-1">
              <FaGasPump className="text-gray-600 w-5 h-5" />
              <span className="text-gray-600 text-sm">{vehicle.fuelType}</span>
            </div>
            <div className="flex flex-col gap-1 items-center space-x-1">
              <TbCalendar className="text-gray-600 w-5 h-5" />
              <span className="text-gray-600 text-sm">{vehicle.year}</span>
            </div>
          </div>
          <Separator />
        </div>

        {/* Price and Link */}
        <div className="my-2 mt-3 flex justify-between items-center">
          <span className="text-xl text-gray-700 font-semibold">₹{vehicle.price}</span>
          <Link
            href={`/vehicle-details/${vehicle._id}`}
            className="text-blue-600 flex gap-1 justify-center items-center hover:text-blue-800 text-sm"
          >
            View Details <IoIosArrowRoundForward className="-rotate-45" size={22} />
          </Link>
        </div>
      </div>
    </div>
  );
}
