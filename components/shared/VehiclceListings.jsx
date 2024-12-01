"use client";
import Advertisement from "@/components/shared/Advertisement";
import VehicleCardList from "@/components/shared/VehicleCardList";
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import { useSearchParams } from "next/navigation";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useVehiclesByQuery } from "@/hooks/useVehiclesByQuery";
import { useDispatch } from "react-redux";
import { setCarFilter } from "@/redux/slices/carFilterDashboad";
import { Loader2 } from "lucide-react";

export default function VehiclceListings() {
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { vehicles, loading, hasMore, next } = useVehiclesByQuery();
  const dispatch = useDispatch();
  dispatch(setCarFilter(id));

  return (
    <>
      <div className="mt-10 bg-[#050B20]">
        <SearchAndFilter />
      </div>

      {(vehicles.length === 0) & !loading ? (
        <div className="text-center text-gray-500">No vehicles available</div>
      ) : (
        <div className=" bg-white mb-6 padding-x ">
          <VehicleCardList vehicles={vehicles} />
        </div>
      )}

      <div className="flex items-center lg:flex-row flex-col gap-2 justify-center">
        <InfiniteScroll
          hasMore={hasMore}
          isLoading={loading}
          next={next}
          threshold={1}
        >
          {hasMore && (
            <Loader2 className="my-12 h-12 w-12 animate-spin text-black" />
          )}
        </InfiniteScroll>
      </div>
    </>
  );
}
