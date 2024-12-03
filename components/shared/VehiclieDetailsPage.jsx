"use client";
import { useState } from "react";
import Image from "next/image";
import CarouselButton from "../helpers/CarouselButton";
import VehicleShortOverview from "../helpers/VehicleShortOverview";
import { FaCalendarAlt, FaTachometerAlt, FaCogs, FaGasPump } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';
import Link from 'next/link';

export default function VehicleDetailsPage({agentData}) {
    const [currentImage, setCurrentImage] = useState(0);
    const carImages = agentData?.vehicle?.uploadedImages
    ? [...agentData.vehicle.uploadedImages]
    : [];
   
    const changeImage = (direction) => {
        setCurrentImage((prev) =>
            direction === "next"
                ? (prev + 1) % carImages.length
                : (prev - 1 + carImages.length) % carImages.length
        );                  
    };

    const features = [
        { icon: FaCalendarAlt, value: agentData?.vehicle?.year, label: "Year" },
        { icon: FaTachometerAlt, value: `${agentData?.vehicle?.kilometers} km`, label: "Mileage" },
        { icon: FaCogs, value: agentData?.vehicle?.transmissionType, label: "Transmission" },
        { icon: FaGasPump, value: agentData?.vehicle?.fuelType, label: "Fuel" }
    ];

    return (
        <div className="bg-white rounded-2xl md:rounded-[80px] xl:rounded-[105px] mt-8 mb-12 pt-4">
            {/* Container with padding and centered */}
            <div className="p-6 rounded-lg max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href="/" passHref>
                        <span className="hover:underline text-blue-500 cursor-pointer">Home</span>
                    </Link>
                    {' / '}
                    
                        <span className="hover:underline cursor-pointer">Listings</span>
                  
                    {' / '}
                    <span className="text-gray-900">{agentData?.vehicle.model}</span>
                </div>

                {/* Title and Description */}
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-medium text-gray-900">{agentData?.vehicle?.brand} {agentData?.vehicle?.model}</h2>
                        
                        {/* Features */}
                        <div className="flex flex-wrap mt-4 gap-2">
                            {features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="flex items-center text-xs bg-green-100 rounded-full
                                    px-2 py-1 sm:px-6 sm:py-2 sm:text-sm text-green-700 mb-2"
                                >
                                    <feature.icon className="mr-2 text-emerald-700" />
                                    {feature.value}
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Price and Action buttons */}
                    <div className="sm:flex hidden sm:flex-row md:flex-col items-start md:items-end mt-6 md:mt-0 w-full md:w-auto">
                        <div className="text-3xl font-semibold text-gray-900 mb-2">₹{agentData?.vehicle?.price}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <IoMdPricetags className="mr-1 text-gray-500" />
                            <span>Make An Offer / contact now</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image carousel and details section */}
            <div className="flex justify-center px-4 items-center bg-gray-50">
                <div className="flex flex-col md:flex-row 0 shadow-lg rounded-lg overflow-hidden max-w-7xl w-full">
                    {/* Image Carousel */}
                    <div className="w-full lg:w-2/3 relative">
                        <Image
                            src={carImages[currentImage]}
                            width={500}
                            height={500}
                            alt="Car"
                            priority
                         className="w-full h-[400px] sm:h-[500px] object-fill sm:object-cover"
                        />
                        {/* Left/Right buttons */}
                        <CarouselButton onClick={() => changeImage("prev")} direction="left" />
                        <CarouselButton onClick={() => changeImage("next")} direction="right" />
                    </div>
                         
                    {/* Car Details */}
                    <div className="w-full md:w-1/2 p-6">
                        <VehicleShortOverview  agentData={agentData?.vehicle}/>
                    </div>
                </div>
            </div>
        </div>
    );
}
