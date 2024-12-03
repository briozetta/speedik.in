import Link from "next/link";
import {
  FaCommentDots,
  FaCheckCircle,
  FaWhatsapp,
  FaPhoneAlt,
} from "react-icons/fa";
import { ViewSellerInfo } from "./ViewSellerInfo";
import WhatsAppComponent from "../ui/WhatsAppComponent";

export default function VehcicleShortOverview({ agentData }) {
  return (
    <>
      <h4 className="text-2xl font-bold text-gray-800 mb-2">
      {agentData?.year} {agentData?.brand} {agentData?.model}
      </h4>
      <ul className="mb-4 text-gray-600 space-y-2">
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          {agentData?.kilometers} kms
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          {agentData?.fuelType}
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          {agentData?.transmissionType}
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          {agentData?.ownership}
        </li>
      </ul>
      <div className="text-3xl font-semibold text-gray-900 mb-4">
        ₹{agentData?.price}
        <span className="text-sm font-normal text-blue-500 ml-2">
          Make Your Offer
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        Condition:{" "}
        <span className="font-semibold text-gray-900">
          {agentData?.condition}
        </span>{" "}
        | loacation - {agentData?.district} {agentData?.place || null}
      </p>

      {/* view seller details */}
      <ViewSellerInfo vehicle={agentData}/>
      
      <div className="flex justify-between gap-3 items-center mt-6">
        <div className="text-base text-blue-500 flex items-center">
          <FaPhoneAlt className=" text-yellow-500 mr-2" size={20} />
          <span className="font-semibold text-gray-900 hidden lg:block">
            Contact -{" "}
          </span>{" "}
          {agentData?.primaryContact}
        </div>

      </div>                 
       <WhatsAppComponent phoneNumber={agentData?.secondaryContact}/>
      
    </>
  );
}
