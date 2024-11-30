// Import
import { DisableVehicle } from "@/components/helpers/dashboard-helper/DisableVehicle.jsx";
import { TabsContent, MoreHorizontal, Badge, Button, Card, CardContent, CardDescription, CardHeader, 
  CardTitle, DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
  ,Table, TableBody, TableCell, TableHead, TableHeader, TableRow  } from "./imports.js";
import Image from "next/image";
import Link from "next/link";
import { useSelector } from "react-redux";
import DisabledVehicleListing from "./DisabledVehicleListing.jsx";
import { ViewUserDetails } from "./ViewUserDetails.jsx";


export default function VehicleListing({ vehicles,handleRefresh ,selectedValue}) {
  const {  searchTerm } = useSelector((state) => state.carFilters);

  const filteredvehicles = vehicles
  .filter(
    (vehicle) =>
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.model.toLowerCase().includes(searchTerm.toLowerCase())
  )
  return (
    <TabsContent value={selectedValue}>
      <Card x-chunk="dashboard-06-chunk-0">
        <CardHeader>
          <CardTitle className="uppercase">{selectedValue} Vehicles</CardTitle>
          <CardDescription>
            Manage your vehicle and view it's details.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            {/* table header */}
            <TableHeader>
              <TableRow>
                <TableHead className="hidden w-[100px] sm:table-cell">
                  <span className="sr-only">Image</span>
                </TableHead>
                <TableHead>Brand and Model</TableHead>
                <TableHead>Year</TableHead>
                <TableHead className="hidden md:table-cell">Asking Price</TableHead>
                <TableHead className="hidden md:table-cell">Added By</TableHead>
                <TableHead className="hidden md:table-cell">
                  Created at
                </TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            {/* table header end */}

            {/* table content */}
            {selectedValue === "active" ? <>{filteredvehicles.map((vehicle,index) => (
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
                    
                    <span className="text-blue-600" >
                       <ViewUserDetails vehicle={vehicle}/>
                    </span>
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
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                       
                      <Link href={{
                        pathname:'/add-vehicles',
                        query: { id:vehicle._id  },
                      }}><DropdownMenuItem>Edit</DropdownMenuItem></Link>
                        <DropdownMenuItem asChild><DisableVehicle vehicleId={vehicle._id} handleRefresh={handleRefresh}/></DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              </TableBody>
            ))}</> : <>
            <DisabledVehicleListing/>
            </> }

            {/* table content  end*/}
          </Table>
        </CardContent>
        
      </Card>
    </TabsContent>
  );
}
