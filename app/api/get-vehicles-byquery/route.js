import { connectDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import Vehicle from "@/lib/database/models/Vehicle.model";

export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    


    await connectDatabase();

    // Get skip, limit, and carFilter from query parameters
    const queryParams = request.nextUrl.searchParams;
    const skip = Number(queryParams.get("skip")) || 0;
    const limit = Number(queryParams.get("limit")) || 4;
    const carFilter = queryParams.get("carFilter");

  
    // Build the query object
    const query = {
      disabled: { $ne: true },
    };

    if (carFilter === "Two-Wheeler") {
      query.vehicleType = "Two-Wheeler";
    } else if (carFilter === "Commercial Vehicle") {
      query.vehicleType = "Commercial Vehicle";
    } else if (carFilter === "Four-Wheeler") {
      query.vehicleType = "Four-Wheeler";
    }

    // Fetch vehicles based on the query object
    const vehicles = await Vehicle.find(query)
      .sort({ createdAt: -1  })
      .skip(skip)
      .limit(limit)
      .exec();

    // Return the vehicles in the response
    return NextResponse.json({ vehicles }, { status: 200 });
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
