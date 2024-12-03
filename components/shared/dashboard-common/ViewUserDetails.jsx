"use client"

import { UserDatas } from "@/components/helpers/dashboard-helper/UserDatas"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"
import useSWR from "swr"
import axios from "axios"
import VehicleCardSkeleton from "@/components/ui/SkeletonLoadings/VehicleCardSkeleton"


const SHEET_SIDES = ["left"]
const fetcher = (url) => axios.get(url).then((res) => res.data);

export function ViewUserDetails({ vehicle }) {
  const { data: agentData, error } = useSWR(
    vehicle?.userId ? `/api/get-agent-vehicles?userId=${vehicle.userId}` : null,
    fetcher
  )

  if (error) {
    console.error("Error fetching user data:", error)
  }

 
  // Check if agentData and agentVehicles are available
  if (!agentData?.agentVehicles) {                    
    return (
      <div className="grid grid-cols-2 gap-2">
        {SHEET_SIDES.map((side) => (
          <Sheet key={side}>
            <SheetTrigger asChild>
            <div className="text-emerald-500 py-1 px-2 cursor-pointer ">
            view details
              
            </div>
            </SheetTrigger>
            <SheetContent
              side={side}
              className="w-full max-w-full sm:max-w-[640px] md:max-w-[800px] lg:max-w-[1200px] bg-[#e4e3e3fb] overflow-y-auto"
            >
              {/* Render a loading message or spinner */}
              <VehicleCardSkeleton/>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2">
      {SHEET_SIDES.map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <div className="text-emerald-500 py-1 px-2 cursor-pointer">
            view details
              
            </div>
          </SheetTrigger>
          <SheetContent
            side={side}
            className="w-full max-w-full sm:max-w-[640px] md:max-w-[800px] lg:max-w-[1200px] bg-[#e4e3e3fb] overflow-y-auto"
          >
            {/* Render UserDatas when agentVehicles is available */}
            <UserDatas vehicle={vehicle} agentData={agentData?.agentVehicles} />
          </SheetContent>
        </Sheet>
      ))}
    </div>
  )
}
