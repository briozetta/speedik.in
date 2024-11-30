import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function VehicleTableView({ agentData, addTestimonial }) {
  return (
    <div className="flex-1 w-full">
      <h4 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
        Vehicles Added By This User
      </h4>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">#</TableHead>
            <TableHead>Brand & Name</TableHead>
            <TableHead>Vehicle Type</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="cursor-pointer">
          {agentData?.vehicles.map((agentDatas) => (
            <TableRow
              onClick={() => addTestimonial(agentDatas)}
              key={agentDatas._id}
            >
              {/* Check if uploadedImages exists and has at least one item */}
              <TableCell>
              <Image
                className="rounded-md mb-2"
                src={agentDatas?.uploadedImages?.[0] || "/default-image.jpg"} // Default image if no uploadedImages
                alt="thumb"
                width={60}
                height={60}
              />
              </TableCell>
              <TableCell>{agentDatas?.brand}</TableCell>
              <TableCell>{agentDatas?.vehicleType}</TableCell>
              <TableCell className="text-right">{agentDatas?.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total Vehicles</TableCell>
            <TableCell className="text-right">
              {agentData?.vehicles.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
