import useSWR, { mutate } from 'swr';
import { DisableVehicle } from "@/components/helpers/dashboard-helper/DisableVehicle.jsx";
import {
  MoreHorizontal,
  Badge,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  TableBody,
  TableCell,
  TableRow,
} from "./imports.js";
import Image from "next/image";
import Link from "next/link";

// Fetch function using fetch API
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function DisabledVehicleListing() {
  // Use SWR hook to fetch vehicle data
  const { data } = useSWR('/api/get-disabled-vehicles', fetcher);

  const handleFetchData = async () => {
    // This will trigger a re-fetch of the data from the endpoint
    mutate('/api/get-disabled-vehicles');
  };

  return (
    <>
      {data?.vehicles?.map((vehicle, index) => (
        <TableBody key={index}>
          <TableRow>
            <TableCell className="hidden sm:table-cell">
              <Image
                src={vehicle.uploadedImages[0]}
                alt="Product image"
                className="aspect-square rounded-md object-cover"
                height={68}
                width={68}
              />
            </TableCell>
            <TableCell className="font-medium uppercase">
              {vehicle.brand} {vehicle.model}
            </TableCell>
            <TableCell>
              <Badge variant="outline">{vehicle.year}</Badge>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              ₹{vehicle.price}
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {vehicle.fullname}{" "}
              <Link className="text-blue-600" href="#">
                - view details
              </Link>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {new Date(vehicle.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </TableCell>
            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button aria-haspopup="true" size="icon" variant="ghost">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <Link
                    href={{
                      pathname: "/add-vehicles",
                      query: { id: vehicle._id },
                    }}
                  >
                    <DropdownMenuItem>Edit</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem asChild>
                    <DisableVehicle
                    enableVehicle={false}
                      vehicleId={vehicle._id}
                      handleRefreshDisabled={handleFetchData}
                    />
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        </TableBody>
      ))}
    </>
  );
}
