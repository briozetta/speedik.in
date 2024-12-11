"use client";
import Advertisement from "@/components/shared/Advertisement";

import SearchAndFilter from "@/components/shared/SearchAndFilter";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useVehiclesByQuery } from "@/hooks/useVehiclesByQuery";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleSecondFilter } from "@/redux/slices/carFilterDashboad";
import { Loader2 } from "lucide-react";
import FullScreenLoader from "../ui/SkeletonLoadings/FullScreenLoader";
import dynamic from "next/dynamic";
import NoVehiclesFound from "../ui/SkeletonLoadings/NoVehiclesFound";
const VehicleCardList = dynamic(() => import('@/components/shared/VehicleCardList'), {
  loading: () => <FullScreenLoader/>, 
});

export default function VehiclceListings({id}) {
 
  const {  searchTerm } = useSelector((state) => state.carFilters);
  const { vehicles, loading, hasMore, next } = useVehiclesByQuery();
  const dispatch = useDispatch();
  dispatch(setVehicleSecondFilter(id));

  const filteredvehicles = vehicles
  .filter(
    (vehicle) =>
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <>
      <div className="pt-10 bg-[#050B20]">
        <SearchAndFilter />
      </div>

      {(filteredvehicles.length === 0) & !loading ? (
        <>
        <NoVehiclesFound/>
        </>
      ) : (
        <div className=" bg-white mb-6 padding-x ">
          <VehicleCardList vehicles={filteredvehicles} />
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
