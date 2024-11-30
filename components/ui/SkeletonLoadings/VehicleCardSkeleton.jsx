import { Skeleton } from "@/components/ui/skeleton";

export default function VehicleCardSkeleton() {
  return (
    <div className="flex flex-col items-center gap-6 p-4 h-screen bg-white w-full max-w-7xl rounded-md shadow-md">
      {/* Loading Text */}
      <div className="text-lg font-medium text-emerald-700">Loading...</div>

      {/* Skeleton Card */}
      <div className="flex gap-4 w-full">
        {/* Image Placeholder */}
        <Skeleton className="w-40 h-64 rounded-md bg-emerald-100" />

        {/* Content Placeholder */}
        <div className="flex flex-col flex-1 space-y-4">
          {/* Title */}
          <Skeleton className="h-14 w-1/2 bg-emerald-100" />
          <Skeleton className="h-14 w-1/3 bg-emerald-100" />

          {/* Features List */}
          <div className="space-y-2">
            <Skeleton className="h-14 w-1/2 bg-emerald-50" />
            <Skeleton className="h-14 w-2/3 bg-emerald-50" />
            <Skeleton className="h-14 w-1/3 bg-emerald-50" />
          </div>

          {/* Price */}
          <Skeleton className="h-16 w-1/4 bg-emerald-200" />
        </div>
      </div>
    </div>
  );
}
