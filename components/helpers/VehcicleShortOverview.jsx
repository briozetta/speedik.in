import Link from "next/link";
import { FaExclamationTriangle, FaCommentDots ,FaCheckCircle } from "react-icons/fa";

export default function VehcicleShortOverview() {
  return (
    <>
      <h4 className="text-2xl font-bold text-gray-800 mb-2">2023 Mercedes-Benz GLE 300d</h4>
      <ul className="mb-4 text-gray-600 space-y-2">
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          10,000 kms
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          Diesel
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          Automatic
        </li>
        <li className="flex items-center">
          <FaCheckCircle className="text-green-500 mr-2" size={18} />
          1st Owner
        </li>
      </ul>
      <div className="text-3xl font-semibold text-gray-900 mb-4">
        ₹89 Lakh 
        <span className="text-sm font-normal text-blue-500 ml-2">
          Make Your Offer
        </span>
      </div>
      <p className="text-sm text-gray-500 mb-6">
  Condition: <span className="font-semibold text-gray-900">Excellent</span> | Service History Available
</p>

      <button className="bg-emerald-500 text-white py-2 px-4 w-3/4 rounded-lg shadow-lg transform transition hover:scale-105">
        View Seller Details
      </button>
      <div className="flex justify-between gap-3 items-center mt-6">
        <p className="text-xs text-gray-500 flex items-center">
          <FaExclamationTriangle className="text-yellow-500 mr-2" size={20} />
          <span className="font-semibold">View More Vehicles!</span> Explore similar options available now

        </p>
        <div className="text-gray-500 flex items-center">
          <Link
            href="/"
            className="text-sm flex items-center hover:text-blue-500 transition"
          >
            <FaCommentDots className="mr-2" size={20} />
            Chat with Seller
          </Link>
        </div>
      </div>
    </>
  );
}
