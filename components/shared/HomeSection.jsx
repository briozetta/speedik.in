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
       {/* <Image
        src={banner3}
        alt="banner"
        
        className="h-screen w-full object-cover"
        placeholder="blur"
      /> */}
      {/* Banner video */}
      <video
        src="/assets/homeVideo.mp4"
        autoPlay
        loop
        muted
        className="h-screen w-full object-cover"
      ></video>

      {/* Overlay Content */}
      <div className="absolute inset-0 flex flex-col justify-center sm:items-start padding-x text-white px-4">
        <p className="mt-4 sm:mt mb-6 text-base sm:text-lg opacity-80">
          Find the perfect vehicle for your next drive.
        </p>
        <h1 className="text-5xl md:text-5xl lg:text-6xl font-semibold max-w-7xl relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-100 via-neutral-100 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
          Pick Your Vehicle with{" "}
          <span className="bg-gradient-to-r from-emerald-600 opacity-100  to-green-300 bg-clip-text text-transparent">
            Gaadi9
          </span>
        </h1>

        {/* Search Bar */}
        <div className="flex items-center justify-start mt-8 p-2  shadow-lg sm:pb-2 pb-4 rounded-3xl">
          <div className="flex flex-col sm:flex-row items-center opacity-95 rounded-3xl w-full
           max-w-[85rem] px-5 bg-opacity-70 bg-[#1f1f1f57] sm:rounded-xl p-1 overflow-hidden">
            {vehicleTypes.map((vehicle, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      href={{
                        pathname:'/vehicle-list',
                        query:{id:vehicle.filter}
                      }}
                      className="flex-1 mx-1 hover:bg-gray-200 duration-300 cursor-pointer transition 
                        rounded-full flex hover:text-black items-center px-6 py-4 sm:border-b-[1.5px] border-b-2 
                        border-emerald-500"
                    >
                      <div className="flex items-center w-full">
                        <span className="bg-transparent text-sm w-full">
                          {vehicle.category}
                        </span>
                        <vehicle.icon size={28} className="ml-2" />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="top" className="text-emerald-800">Click to view {vehicle.category}</TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
            <span className="flex items-center justify-center px-8 py-4 sm:bg-emerald-800 text-white rounded-xl mt-4 sm:mt-0 sm:ml-4">
              <FaRoad className="mr-2" />
              <FlipWords className={"text-white"} duration={2000} words={words} />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
