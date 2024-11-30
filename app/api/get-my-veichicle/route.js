import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import Vehicle from "@/lib/database/models/Vehicle.model";

export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("You must be logged in to access this resource", { status: 401 });
    }


    await connectDatabase();

    // Get skip, limit, and carFilter from query parameters
  
    const skip = 0;
    const limit =  4;
    const carFilter = "Four-Wheeler";

    // Build the query object
    const query = {
      disabled: { $ne: true },
    };

    if (session.user?.role !== "Admin") {
      // If the user is an Agent, filter by their userId
      query.userId = session.user?._id;
    }

    if (carFilter === "Two-Wheeler") {
      query.vehicleType = "Two-Wheeler";
    } else if (carFilter === "Commercial Vehicle") {
      query.vehicleType = "Commercial Vehicle";
    } else if (carFilter === "Four-Wheeler") {
      query.vehicleType = "Four-Wheeler";
    }

    // Fetch vehicles based on the query object
    const vehicles = await Vehicle.find(query)
      .sort({ createdAt: carFilter === "recentlyAdded" ? -1 : 1 })
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
