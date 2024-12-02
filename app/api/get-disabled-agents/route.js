import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/models/UserSchema";

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export async function GET() {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response("You must be logged in to access this resource", { status: 401 });
    }

    await connectDatabase();

    try {
        const users = await User.find({ disabled: true });
        // Return the users in the response
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        console.error("Error fetching users:", error);
        return new Response("Internal Server Error", { status: 500 });
    }
}