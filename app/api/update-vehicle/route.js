// app/api/update-vehicle/route.js (or pages/api/update-vehicle.js if using pages directory)
import { connectDatabase } from "@/lib/database"; // Adjust the path as needed
import Vehicle from "@/lib/database/models/Vehicle.model";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const queryParams = request.nextUrl.searchParams;
    const id = queryParams.get('id');
    const vehicleData = await request.json(); // Get the updated vehicle data from the request body
    console.log(vehicleData,id);
    

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    await connectDatabase(); // Connect to the database
    console.log("started....");
    // Find the vehicle by ID and update it
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, vehicleData, {
      new: true,
    });
    console.log(updatedVehicle);
      console.log("ended....");

    if (!updatedVehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    return NextResponse.json({ vehicle: updatedVehicle }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Failed to update vehicle' }, { status: 500 });
  }
}
