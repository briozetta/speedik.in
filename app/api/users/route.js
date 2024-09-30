import { connectDatabase } from "@/lib/database"; 
import User from "@/lib/database/models/UserSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
    try {
        // Connect to the database
        await connectDatabase();

        // Get skip and limit from query parameters
        const queryParams = request.nextUrl.searchParams;
        const skip = Number(queryParams.get('skip')) || 0; 
        const limit = Number(queryParams.get('limit')) || 10; 
        const userFilter = queryParams.get('userFilter') || null;

        // Declare users variable
        let users;

        // Fetch users based on the filter
        if (userFilter === "recentlyAdded") {
            users = await User.find().sort({ createdAt: -1 })
            .skip(skip).limit(limit).exec(); // Sort by most recent entries first
        } else {
            users = await User.find().sort({ createdAt: 1 })
            .skip(skip).limit(limit).exec(); // Sort by oldest entries first
        }

        // Return the users in the response
        return NextResponse.json({ users }, { status: 200 });

    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response('Internal Server Error', { status: 500 });
    }
}
