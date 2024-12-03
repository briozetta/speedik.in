import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import Vehicle from "@/lib/database/models/Vehicle.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("You must be logged in to access this resource", { status: 401 });
    }

    await connectDatabase();
    if (session.user.role === "Admin") {
        try {
          const vehicles = await Vehicle.find({ disabled: true });
          // Return the vehicles in the response
          return NextResponse.json({ vehicles }, { status: 200 });
        } catch (error) {
          console.error("Error fetching vehicles:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      } else {
        try {
          const vehicles = await Vehicle.find({
            disabled: true,
            userId: session.user._id,
          });
          // Return the vehicles in the response
          return NextResponse.json({ vehicles }, { status: 200 });
        } catch (error) {
          console.error("Error fetching user vehicles:", error);
          return new Response("Internal Server Error", { status: 500 });
        }
      }
  
}