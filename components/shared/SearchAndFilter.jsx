"use client";
import { FaFilter, FaSearch } from "react-icons/fa";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  setSearchTerm,
  setVehicleFilter,setLocationFilter
} from "@/redux/slices/carFilterDashboad";
import { useDispatch, useSelector } from "react-redux";
import { districtsInKerala } from "@/lib/contants";

export default function SearchAndFilter() {
  const { vehicleFilter, searchTerm ,locationFilter} = useSelector(
    (state) => state.carFilters
  );
  const dispatch = useDispatch();
  return (
    <section className="pt-20 ">
      <div className="bg-white rounded-t-[45px] padding-neutral sm:rounded-t-[140px] mx-auto px-4 ">
        <>
          <h2 className="text-gray-800 text-base">
            <span className="text-blue-500">Vehicle</span> / Listing
          </h2>
          <h3 className="font-bold text-2xl sm:text-4xl mt-2">
            Pick Your Vehicle
          </h3>
          
        </>
           
        <div className="mt-12 flex sm:flex-row flex-col justify-between gap-4 ">
          <div className="relative flex gap-2 items-center">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-10 md:w-[200px] lg:w-[336px]"
              value={searchTerm}
              onChange={(e) => dispatch(setSearchTerm(e.target.value))}
            />
            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex gap-2 sm:gap-4 items-center">
          <Select
              onValueChange={(value) => dispatch(setLocationFilter(value))}
            >
           
              <SelectTrigger className="w-[200px]">
              <span className="sm:block hidden  text-sm text-gray-500">Loaction:</span>
                <SelectValue placeholder={locationFilter} />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                <SelectItem  value="Default">Default</SelectItem>
                  {districtsInKerala.map((dist,index)=>(
                     <SelectItem  value={dist} key={index}>{dist}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              onValueChange={(value) => dispatch(setVehicleFilter(value))}
            >
           
              <SelectTrigger className="w-[200px] ">
              <FaFilter />
                <SelectValue placeholder={vehicleFilter} />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  <SelectItem value="firstEntry">First entry</SelectItem>
                  <SelectItem value="recentlyAdded">Recently added</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          

          </div>
        </div>
      </div>
    </section>
  );
}
