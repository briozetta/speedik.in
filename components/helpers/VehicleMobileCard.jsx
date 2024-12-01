import Image from "next/image";
import { IoMdBookmark } from "react-icons/io";
import { FaGasPump } from "react-icons/fa";
import { TbManualGearbox } from "react-icons/tb";

export default function VehicleMobileCard({ car }) {
  return (
    <div className="border rounded-lg mb-4 shadow-sm overflow-hidden hover:shadow-md transition-shadow flex bg-white">
      {/* Image Section */}
      <div className="relative flex-shrink-0 w-[45%]">
        <Image
          src={car.image}
          alt={car.model}
          width={250}
          height={180}
          className="w-full h-full object-cover"
        />
       
      </div>

      {/* Details Section moved to the right */}
      <div className="flex-grow p-4">
        {/* Header: Price */}
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-emerald-600">
            ₹ {car.price.toLocaleString()}
          </h3>
        </div>

        {/* Model */}
        <h4 className="text-sm font-bold text-gray-800">{car.model}</h4>

        {/* Fuel & Transmission */}
        <div className="flex items-center text-xs text-gray-500 mt-1">
          <FaGasPump className="text-emerald-500 mr-1" /> {car.fuel}
          <span className="mx-2">|</span>
          <TbManualGearbox className="text-emerald-500 mr-1" /> {car.transmission}
        </div>

        {/* Location */}
        <div className="text-xs text-gray-500 mt-2">Arayedathupalam</div>
      </div>
    </div>
  );
}
