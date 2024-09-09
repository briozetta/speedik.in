import React from 'react';
import car from "@/public/assets/car.webp";
import pickup from "@/public/assets/pickup.jpg";
import Image from 'next/image';

const RecommendedVehicles = () => {
  return (
    <div className="p-4 max-w-md bg-white rounded-lg shadow-md mt-4">
      {/* Heading */}
      <div className="mb-3">
        <h2 className="text-lg font-semibold">Recommended Used Cars</h2>
        <p className="text-gray-500 text-sm">Showing 15 more cars you might like</p>
      </div>

      {/* Car List */}
      <div className="relative">
        <div className="flex space-x-3 overflow-x-auto hide-scroll-bar">
          {/* First Car Card */}
          <div className="w-56 bg-white rounded-lg shadow p-3">
            <Image
            width={200}
            height={300}
            placeholder='blur'
              className="w-full h-28 rounded-lg object-cover mb-3"
              src={car}
              alt="BMW X5"
            />
            <h3 className="font-semibold text-sm">2020 BMW X5 xDrive 30d</h3>
            <p className="text-xs text-gray-500">43,000 kms • Diesel • Automatic</p>
            <p className="font-semibold text-lg mt-1">₹79 Lakh</p>
          </div>

          {/* Second Car Card */}
          <div className="w-56 bg-white rounded-lg shadow p-3">
            <Image
            width={200}
            height={300}
            placeholder='blur'
              className="w-full h-28 rounded-lg object-cover mb-3"
              src={pickup}
              alt="BMW 7 Series"
            />
            <h3 className="font-semibold text-sm">2019 BMW 7 Series 730Ld</h3>
            <p className="text-xs text-gray-500">53,000 kms • Diesel • Automatic</p>
            <p className="font-semibold text-lg mt-1">₹71.50 Lakh</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecommendedVehicles;
