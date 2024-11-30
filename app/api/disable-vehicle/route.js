import { authOptions } from "@/app/utils/authOptions";
import Vehicle from "@/lib/database/models/Vehicle.model";
import { getServerSession } from "next-auth";
import { connectDatabase } from "@/lib/database";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json(
        { message: "You must be logged in to access this resource" },
        { status: 401 }
      );
    }

    // Parse the request body
    const { _id,enableVehicle } = await request.json();

    if (!_id) {
      return NextResponse.json(
        { message: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    await connectDatabase();

    const dynamicValue = enableVehicle === false ? false : true;

    const vehicle = await Vehicle.findByIdAndUpdate(
      _id,
      { disabled: dynamicValue },
      { new: true } // Returns the updated document
    );

    if (!vehicle) {
      return NextResponse.json(
        { message: "Vehicle not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Vehicle disabled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error disabling vehicle:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
