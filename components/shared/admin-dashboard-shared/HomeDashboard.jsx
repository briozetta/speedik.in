"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Dashboardlayout from "@/components/ui/Dashboard-layout";
import VehicleListingFilter from "@/components/helpers/dashboard-helper/VehicleListingFilter";
import VehicleListing from "../dashboard-common/VehicleListing";
import InfiniteScroll from "@/components/ui/infinite-scroll";
import { Loader2 } from "lucide-react";
import { useVehicles } from "@/hooks/useVehicles";
import { useState } from "react";


export default function HomeDashboard() {
  const { vehicles, loading, hasMore, next, handleRefresh } = useVehicles();
  const [selectedValue,setSelectedValue] = useState("active")
  
  return (
    <Dashboardlayout>
      <Tabs defaultValue={selectedValue}>
        <div className="flex items-start lg:flex-row flex-col gap-2 justify-between">
          <TabsList>
            <TabsTrigger onClick={()=>setSelectedValue("active")} value="active">Active</TabsTrigger>
            <TabsTrigger onClick={()=>setSelectedValue("disabled")} value="disabled">Disabled</TabsTrigger>
          </TabsList>
          
          {/* search and filter */}
          <VehicleListingFilter handleRefresh={handleRefresh} selectedValue={selectedValue} />
        </div>

        {/* table listings */}
        <VehicleListing vehicles={vehicles} handleRefresh={handleRefresh} selectedValue={selectedValue}/>
       
        <div className="flex items-start lg:flex-row flex-col gap-2 justify-center">
          <InfiniteScroll hasMore={hasMore} isLoading={loading} next={next} threshold={1}>
            {hasMore && <Loader2 className="my-4 h-8 w-8 animate-spin" />}
          </InfiniteScroll>
        </div>
      </Tabs>
    </Dashboardlayout>
  );
}
