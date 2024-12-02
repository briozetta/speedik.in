import { Skeleton } from "../skeleton";

export default function VehicleDetailsPageSkeleton() {
  return (
    <div className="bg-emerald-50 mt-[6rem] h-full p-4 sm:p-6 lg:p-8">
    <div className="flex flex-col lg:flex-row gap-6">
      {/* Vehicle Image Section */}
      
      <div className="relative w-full lg:w-2/3 h-[400px] sm:h-[500px] lg:h-[500px] bg-emerald-200 rounded-lg overflow-hidden animate-pulse">
  {/* Loading Indicator */}
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="flex items-center gap-2 text-emerald-900">
      <svg
        className="w-6 h-6 animate-spin"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      <span className="text-lg text-black font-medium">Loading...</span>
    </div>
  </div>

  <Skeleton className="w-full h-full object-cover rounded-lg" />
  {/* Left and Right Arrow Skeletons */}
  <div className="absolute top-1/2 left-0 flex items-center justify-between w-full px-4">
    <Skeleton className="w-10 h-10 bg-emerald-300 rounded-full" />
    <Skeleton className="w-10 h-10 bg-emerald-300 rounded-full" />
  </div>
</div>

  
      {/* Vehicle Details Section */}
      <div className="w-full h-[400px] lg:w-1/3 bg-white p-4 sm:p-6 rounded-lg animate-pulse">
        {/* Title Skeleton */}
        <Skeleton className="h-6 w-3/4 sm:w-2/3 mb-4 rounded-lg" />
  
        {/* Vehicle Details List */}
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-1/2 bg-emerald-100 rounded-lg" />
          <Skeleton className="h-4 w-1/3 rounded-lg bg-emerald-100" />
          <Skeleton className="h-4 w-1/4 rounded-lg bg-emerald-100" />
          <Skeleton className="h-4 w-1/4 rounded-lg bg-emerald-100" />
        </div>
  
        {/* Price Section */}
        <div className="mb-4">
          <Skeleton className="h-8 w-1/2 rounded-lg bg-emerald-100" />
        </div>
  
        {/* Condition and Location */}
        <div className="space-y-2 mb-6">
          <Skeleton className="h-4 w-full rounded-lg bg-emerald-100" />
        </div>
  
        {/* View Seller Button */}
        <div className="mb-4">
          <Skeleton className="h-10 w-full bg-emerald-100 rounded-lg" />
        </div>
  
        {/* Contact Info */}
        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-8 bg-emerald-100 rounded-full" />
          <Skeleton className="h-6 w-1/2 rounded-lg" />
        </div>
      </div>
    </div>
  
    
  </div>
  
  );
}