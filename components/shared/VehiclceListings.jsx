"use client";
import Advertisement from "@/components/shared/Advertisement";
import Image from 'next/image'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import SearchAndFilter from "@/components/shared/SearchAndFilter";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { useVehiclesByQuery } from "@/hooks/useVehiclesByQuery";
import { useDispatch, useSelector } from "react-redux";
import { setVehicleSecondFilter } from "@/redux/slices/carFilterDashboad";
import { Loader2 } from "lucide-react";
import FullScreenLoader from "../ui/SkeletonLoadings/FullScreenLoader";
import dynamic from "next/dynamic";
import NoVehiclesFound from "../ui/SkeletonLoadings/NoVehiclesFound";
import imgshow from '../../public/assets/banner3.jpg'

// const zain = require("../../public/assets/")
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
  console.log("filtervichle", filteredvehicles);
  
  return (
    <>
      <div className="pt-10 bg-[#050B20]">
        <SearchAndFilter />
      </div>

      
      <div className="relative overflow-hidden bg-[rgb(52_211_153_/var(--tw-text-opacity))] text-white">
  <div className="absolute inset-0 bg-[url('/placeholder.svg?height=400&width=1200')] opacity-20 bg-cover bg-center" />
  <div className="container mx-auto px-4 py-8 relative">
    <div className="grid md:grid-cols-2 gap-8 items-center">
      {/* Left Section */}
      <div className="space-y-4">
        <Badge className="bg-white/20 hover:bg-white/30 text-white">Limited Time Offer</Badge>
        <h2 className="text-4xl font-bold">Year End Sale!</h2>
        <p className="text-xl opacity-90">Get up to 15% off on premium vehicles</p>
        <div className="flex gap-4">
          <Button size="lg" variant="secondary">View Offers</Button>
          <Button size="lg" variant="outline" className="bg-transparent text-white hover:bg-white/20">
            Learn More
          </Button>
        </div>
      </div>
      {/* Right Section */}
      <div className="relative w-full h-full">
        <Image
          src={imgshow}
          alt="Featured Vehicle"
          width={500}
          height={300}
          className="object-cover w-full h-full rounded-tl-lg rounded-bl-lg" // Ensures no gaps with rounded corners on left
          priority
        />
      </div>
    </div>
  </div>
</div>


     

      

      {(filteredvehicles.length === 0) & !loading ? (
        <div className="text-center text-gray-500">No vehicles available</div>
      ) : (
        <div className=" bg-white mb-6 padding-x " style={{paddingTop:"2rem"}}>
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
