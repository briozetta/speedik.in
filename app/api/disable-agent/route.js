import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth";
import { connectDatabase } from "@/lib/database";
import { NextResponse } from "next/server";
import User from "@/lib/database/models/UserSchema";

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
    const { _id,enableAgent } = await request.json();


    if (!_id) {
      return NextResponse.json(
        { message: "Vehicle ID is required" },
        { status: 400 }
      );
    }

    await connectDatabase();

    const dynamicValue = enableAgent === false ? false : true;

    const agent = await User.findByIdAndUpdate(
      _id,
      { disabled: dynamicValue },
      { new: true } // Returns the updated document
    );

    if (!agent) {
      return NextResponse.json(
        { message: "agent not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "agent disabled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error disabling agent:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
