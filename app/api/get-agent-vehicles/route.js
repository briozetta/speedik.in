import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/models/UserSchema";
import Vehicle from "@/lib/database/models/Vehicle.model";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";


export async function GET(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new Response("You must be logged in to access this resource", { status: 401 });
    }

    await connectDatabase();

    try{
      // Get the `userId` from query parameters
      const queryParams = request.nextUrl.searchParams;
      const userId = queryParams.get("userId");

      const vehicles = await Vehicle.find({ userId: userId });

     const user = await User.find({_id:userId})

     
     let agentVehicles = {
        user: [...user],
        vehicles: [...vehicles]
      }
      

       // Check if the vehicles exists
       if (!agentVehicles) {
        return NextResponse.json(
            { message: "vehicles not found" },
            { status: 404 }
        );
    }

    // Return the user data
    return NextResponse.json({ agentVehicles }, { status: 200 });
      
    }catch{
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );

    }

}