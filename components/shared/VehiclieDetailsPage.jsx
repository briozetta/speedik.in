"use client";
import { useState } from "react";
import Image from "next/image";
import car from "@/public/assets/car.webp";
import pickup from "@/public/assets/pickup.jpg";
import CarouselButton from "../helpers/CarouselButton";
import VehcicleShortOverview from "../helpers/VehcicleShortOverview";
import { FaCalendarAlt, FaTachometerAlt, FaCogs, FaGasPump } from 'react-icons/fa';
import { IoMdPricetags } from 'react-icons/io';
import Link from 'next/link';

export default function VehicleDetailsPage() {
    const [currentImage, setCurrentImage] = useState(0);
    const carImages = [car, pickup];

    const changeImage = (direction) => {
        setCurrentImage((prev) =>
            direction === "next"
                ? (prev + 1) % carImages.length
                : (prev - 1 + carImages.length) % carImages.length
        );
    };

    const carDetails = {
        model: 'Toyota Camry New',
        description: '3.5 D5 PowerPulse Momentum 5dr AWD Geartronic Estate',
        year: '2023',
        mileage: '20',
        fuel: 'Petrol',
        transmission: 'Automatic',
        price: '40,000',
    };

    const features = [
        { icon: FaCalendarAlt, value: carDetails.year, label: "Year" },
        { icon: FaTachometerAlt, value: `${carDetails.mileage} miles`, label: "Mileage" },
        { icon: FaCogs, value: carDetails.transmission, label: "Transmission" },
        { icon: FaGasPump, value: carDetails.fuel, label: "Fuel" }
    ];

    return (
        <div className="bg-white rounded-2xl md:rounded-[80px] xl:rounded-[105px] mt-8 mb-12 pt-4">
            {/* Container with padding and centered */}
            <div className="p-6 rounded-lg max-w-7xl mx-auto">
                {/* Breadcrumb */}
                <div className="text-sm text-gray-500 mb-4">
                    <Link href="/listings" passHref>
                        <span className="hover:underline text-blue-500 cursor-pointer">Home</span>
                    </Link>
                    {' / '}
                    <Link href="/listings" passHref>
                        <span className="hover:underline cursor-pointer">Listings</span>
                    </Link>
                    {' / '}
                    <span className="text-gray-900">{carDetails.model}</span>
                </div>

                {/* Title and Description */}
                <div className="flex flex-col md:flex-row justify-between items-start">
                    <div>
                        <h2 className="text-4xl font-medium text-gray-900">{carDetails.model}</h2>
                        <p className="text-gray-500 text-sm mt-2">{carDetails.description}</p>

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
                        <div className="text-3xl font-semibold text-gray-900 mb-2">₹{carDetails.price}</div>
                        <div className="text-sm text-gray-500 flex items-center">
                            <IoMdPricetags className="mr-1 text-gray-500" />
                            <span>Make An Offer Price</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image carousel and details section */}
            <div className="flex justify-center px-4 items-center bg-gray-50">
                <div className="flex flex-col md:flex-row bg-white shadow-lg rounded-lg overflow-hidden max-w-7xl w-full">
                    {/* Image Carousel */}
                    <div className="w-full lg:w-2/3 relative">
                        <Image
                            src={carImages[currentImage]}
                            placeholder="blur"
                            alt="Car"
                            className="w-full h-full object-cover"
                        />
                        {/* Left/Right buttons */}
                        <CarouselButton onClick={() => changeImage("prev")} direction="left" />
                        <CarouselButton onClick={() => changeImage("next")} direction="right" />
                    </div>

                    {/* Car Details */}
                    <div className="w-full md:w-1/2 p-6">
                        <VehcicleShortOverview />
                    </div>
                </div>
            </div>
        </div>
    );
}
