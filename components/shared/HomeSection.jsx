"use client";
import Image from "next/image";
import banner3 from "@/public/assets/banner3.jpg";
import { FaRoad, FaCar } from "react-icons/fa";
import { CiDeliveryTruck } from "react-icons/ci";
import { RiEBikeFill } from "react-icons/ri";
import { FlipWords } from "../ui/flip-words";
import Link from "next/link";
import { TooltipContent, Tooltip, TooltipTrigger, TooltipProvider } from "../ui/tooltip";

export default function HomeSection() {
  const vehicleTypes = [
    { category: "Four Wheeler", icon: FaCar,filter:"Four-Wheeler" },
    { category: "Two Wheeler", icon: RiEBikeFill ,filter:"Two-Wheeler" },
    { category: "Commercial Vehicles", icon: CiDeliveryTruck,filter:"Commercial Vehicle"  },
  ];
  
  const words = ["Select Your Vehicle", "View Details", "Contact"];

  return (
    <div className="relative">
      {/* Banner Image */}
      <video
        src="/assets/homeVideo.mp4"
        autoPlay
        loop
        muted
        className="h-screen w-full object-cover"
      ></video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center sm:items-start padding-x text-white px-4">
        <p className="mt-4 sm:mt mb-6 text-lg ">
          Find the perfect vehicle for your next drive.
        </p>
        <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold">
          Drive Your Journey with{" "}
          <span className="bg-gradient-to-r from-emerald-600 to-green-300 bg-clip-text text-transparent">
            Gaadi9
          </span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center justify-start mt-8 p-2 bg-white shadow-lg sm:pb-2 pb-4 rounded-3xl">
          <div className="flex flex-col sm:flex-row items-center w-full max-w-[85rem] px-5 bg-white sm:rounded-full overflow-hidden">
            {vehicleTypes.map((vehicle, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={{
                        pathname:'/vehicle-list',
                        query:{id:vehicle.filter}
                      }}
                      className="flex-1 hover:bg-gray-200 duration-300 cursor-pointer transition 
                        rounded-full flex items-center px-6 py-4 border-b sm:border-b-0 sm:border-r 
                        border-gray-200"
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-transparent text-gray-700 text-sm w-full">
                          {vehicle.category}
                        </span>
                        <vehicle.icon size={28} className="ml-2 text-gray-600" />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-emerald-800">Click to view {vehicle.category}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            <span className="flex items-center justify-center px-8 py-4 bg-emerald-600 text-white rounded-xl mt-4 sm:mt-0 sm:ml-4">
              <FaRoad className="mr-2" />
              <FlipWords className={"text-white"} duration={2000} words={words} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
