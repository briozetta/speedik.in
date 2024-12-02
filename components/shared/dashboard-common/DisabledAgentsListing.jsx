import useSWR, { mutate } from 'swr';
import { DisableVehicleandUser } from "@/components/helpers/dashboard-helper/DisableVehicleandUser.jsx";
import {
  MoreHorizontal,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableCell,
  TableRow,
} from "./imports.js";
import Image from "next/image";
import Link from "next/link";
import { DropdownMenuLabel } from '@/components/ui/dropdown-menu.jsx';
const imagex = "https://i.pinimg.com/736x/8b/16/7a/8b167af653c2399dd93b952a48740620.jpg";

// Fetch function using fetch API
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function DisabledAgentsListing() {
  // Use SWR hook to fetch vehicle data
  const { data } = useSWR('/api/get-disabled-agents', fetcher);

  const handleFetchData = async () => {
    // This will trigger a re-fetch of the data from the endpoint
    mutate('/api/get-disabled-agents');
  };

  return (
    <>
      {data?.users?.map((user, index) => (
        <TableRow className="cursor-pointer" key={index}>
        <TableCell className="hidden sm:table-cell">
          <Image
            src={imagex}
            alt="Agent image"
            className="aspect-square rounded-xl 
      object-cover"
            height={40}
            width={40}
            priority
          />
        </TableCell>
        <TableCell className="font-medium">
          {user.firstName}
        </TableCell>
        <TableCell>
          <Badge variant="outline">Active</Badge>
        </TableCell>
        <TableCell className="hidden md:table-cell text-violet-500">
          {user.contact}
        </TableCell>
        <TableCell className="hidden md:table-cell">6</TableCell>
        <TableCell className="hidden md:table-cell text-orange-700">
          {new Date(user.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
           
              <DropdownMenuItem asChild><DisableVehicleandUser 
              userId={user._id} enableAgent={false} handleRefreshDisabled={handleFetchData} /></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>
      ))}
    </>
  );
}
