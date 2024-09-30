import {
  FaCarSide,
  FaTachometerAlt,
  FaGasPump,
  FaCalendarAlt,
  FaCogs,
  FaRoad,
} from "react-icons/fa";
import { BsPerson } from "react-icons/bs";
import { GiGearStickPattern } from "react-icons/gi";
import { MdOutlineColorLens, MdOutlineDriveEta } from "react-icons/md";
import {
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";
import Image from "next/image";


const VehicleOverview = () => {
  const carDetails = [
    { icon: FaCarSide, label: "Body", value: "SUV" },
    { icon: FaTachometerAlt, label: "Mileage", value: "28,000 miles" },
    { icon: FaGasPump, label: "Fuel Type", value: "Petrol" },
    { icon: FaCalendarAlt, label: "Year", value: "2023" },
    { icon: GiGearStickPattern, label: "Transmission", value: "Automatic" },
    {
      icon: MdOutlineDriveEta,
      label: "Drive Type",
      value: "Front Wheel Drive",
    },
    { icon: BsPerson, label: "Condition", value: "Used" },
    { icon: FaCogs, label: "Engine Size", value: "4.8L" },
    { icon: MdOutlineColorLens, label: "Color", value: "Blue" },
    { icon: FaRoad, label: "Doors", value: "5-door" },
    { icon: FaCogs, label: "Cylinders", value: "6" },
  ];

  return (
    <div className="bg-white pt-6">
      <h2 className="text-3xl text-gray-900 font-medium mx-auto xl:px-16 px-4">
        Car Overview
      </h2>
      <div
        className="gap-16 items-center px-4 mx-auto max-w-screen-xl
      lg:grid lg:grid-cols-3 pb-8 lg:pb-16 lg:px-6"
      >
        <div
          className="col-span-2 grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2
         xl:grid-cols-3 border  rounded-xl p-4 gap-4"
        >
          {carDetails.map((detail, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row justify-start text-[14px] py-4 items-center"
            >
              <div className="flex  space-x-2">
                <detail.icon className="text-2xl text-gray-800" />
                <p className="font-light">{detail.label} -</p>
              </div>
              <p className="text-gray-600 font-medium">{detail.value}</p>
            </div>
          ))}
        </div>

        <div
          className="mt-10 lg:mt-0 p-6 bg-white rounded-lg shadow-sm border-[1.5px] max-w-full lg:max-w-xl
         mx-auto lg:mx-0"
        >
          <div className="flex flex-col py-2 mb-4">
            <Image
              src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
              width={40}
              height={40}
              alt="Dealer Logo"
              className="h-12
         w-12 my-2 rounded-full mr-4 shadow-md"
            />
            <div>
              <h3 className="text-xl font-semibold py-3">Volvo Cars Marin</h3>
              <p className="text-gray-600">
                619 Francisco Blvd E, San Rafael, CA 94901
              </p>
            </div>
          </div>
          <div className="flex justify-center items-center gap-4 mb-6">
            <div className="flex text-xs items-center">
              <Button
                variant="secondary"
                className="flex gap-1 items-center justify-center"
              >
                <FaMapMarkerAlt className="text-blue-500" />
                Get Directions
              </Button>
            </div>
            <div className="flex items-center text-xs">
              <Button
                variant="secondary"
                className="flex gap-1 items-center justify-center"
              >
                <FaPhoneAlt className="text-blue-500" />
                +76 956 039 967
              </Button>
            </div>
          </div>

          <Button
            variant="outline-success"
            className="w-full border rounded-2xl py-6 text-emerald-600 border-green-500 mb-3 flex 
      items-center justify-center"
          >
            Chat Via Whatsapp <FaArrowRight className="ml-2" />
          </Button>
          <a
            href="#"
            className="text-blue-500 text-center  flex items-center justify-center"
          >
            View all stock at this dealer <FaArrowRight className="ml-2" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default VehicleOverview;
