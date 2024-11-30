import { Input } from "@/components/ui/input";
import { ListFilter, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setCarFilter } from "@/redux/slices/carFilterDashboad";
import { IoIosRefresh } from "react-icons/io";

export default function VehicleListingFilter({ selectedValue, handleRefresh }) {
  const dispatch = useDispatch();
  const { carFilter, searchTerm } = useSelector((state) => state.carFilters);

  return (
    <>
      {selectedValue === `active` && (
        <div className=" flex gap-2">
          <button
            onClick={handleRefresh}
            className="flex justify-center items-center text-gray-800 text-sm 
             hover:transition-transform hover:scale-105"
          >
            <IoIosRefresh size={17} /> refresh
          </button>
          <Search className="absolute left-2.5 top-2.5 h-4 w-2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-8 gap-1">
                <ListFilter className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Filter
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Filter by</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {[
                { label: "First Entry", value: "firstEntry" },
                { label: "Recently Added", value: "recentlyAdded" },
                { label: "Commercial Vehicles", value: "Commercial Vehicle" },
                { label: "Two Wheeler", value: "Two-Wheeler" },
                { label: "Four Wheeler", value: "Four-Wheeler" },
              ].map((filter) => (
                <DropdownMenuCheckboxItem
                  key={filter.value}
                  className="text-xs cursor-pointer"
                  checked={carFilter === filter.value}
                  onCheckedChange={() => dispatch(setCarFilter(filter.value))}
                >
                  {filter.label}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href={"/add-vehicles"}>
            <Button size="sm" className="h-8 gap-1  bg-emerald-600">
              <PlusCircle className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only text-emerald-50 sm:whitespace-nowrap">
                Add Product
              </span>
            </Button>
          </Link>
        </div>
      )}
    </>
  );
}
