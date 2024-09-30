//imports
import { Input } from "@/components/ui/input";
import { ListFilter, Search } from "lucide-react";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,DropdownMenuCheckboxItem,DropdownMenuContent,
  DropdownMenuLabel,DropdownMenuSeparator,DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import {setSearchTerm,setUserFilter} from "@/redux/slices/userFilter"

export default function AgentFilter() {
  const dispatch = useDispatch();
  const {userFilter,searchTerm} = useSelector((state)=>state.userFilter);
  return (
    <div className=" flex gap-2">
      {/* search and filters */}
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
          <DropdownMenuCheckboxItem
            className="text-xs cursor-pointer"
            checked={userFilter === "firstEntry"}
            onCheckedChange={() => dispatch(setUserFilter("firstEntry"))}
          >
            First Entry
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className="text-xs cursor-pointer "
            checked={userFilter === "recentlyAdded"}
            onCheckedChange={() => dispatch(setUserFilter("recentlyAdded"))}
          >
            Recently Added
          </DropdownMenuCheckboxItem>   
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
