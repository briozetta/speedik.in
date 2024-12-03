import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"
import Image from "next/image"
 
  
  export function ViewSellerInfo({vehicle}) {
    return (
      <AlertDialog>
        <AlertDialogTrigger asChild>
        <button className="bg-emerald-500 text-white py-2 px-4 w-3/4 rounded-lg shadow-lg transform transition hover:scale-105">
        View Seller Details
      </button>
        </AlertDialogTrigger>
        <AlertDialogContent>
  <div className="flex items-center space-x-4">
    <Image
      src="https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg"
      width={50}
      height={50}
      alt="Dealer Logo"
      className="rounded-full shadow-md"
    />
    <div>
      <h3 className="text-lg font-bold text-gray-800">Seller Information</h3>
      <p className="text-sm text-gray-500">Details of the seller and vehicle registration</p>
    </div>
  </div>
  <div className="mt-6 p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-50 space-y-4">
    <div className="flex items-center space-x-3">
      <span className="text-indigo-500">
        <i className="fas fa-user"></i>
      </span>
      <p className="text-gray-800">
        <span className="font-semibold">Full Name:</span> {vehicle.fullname}
      </p>
    </div>
    <div className="flex items-center space-x-3">
      <span className="text-green-500">
        <i className="fas fa-phone"></i>
      </span>
      <p className="text-gray-800">
        <span className="font-semibold">Phone Number:</span> +91-{vehicle.primaryContact}    
      </p>
    </div>
   {vehicle.secondaryContact &&  <div className="flex items-center space-x-3">
      <span className="text-blue-500">
        <i className="fab fa-whatsapp"></i>
      </span>
      <p className="text-gray-800">
        <span className="font-semibold">WhatsApp Number:</span> +91-{vehicle.secondaryContact}
      </p>
    </div>}
    <div className="flex items-center space-x-3">
      <span className="text-yellow-500">
        <i className="fas fa-map-marker-alt"></i>
      </span>
      <p className="text-gray-800">
        <span className="font-semibold">Vehicle registration:</span> {vehicle.district}
      </p>
    </div>
  </div>
  <AlertDialogFooter className="mt-6">
    <AlertDialogAction className="bg-emerald-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-emerald-600">
      Close
    </AlertDialogAction>
  </AlertDialogFooter>
</AlertDialogContent>

      </AlertDialog>
    )
  }
  