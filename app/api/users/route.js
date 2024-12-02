import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/models/UserSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session) {
            return new Response('You must be logged in to access this resource', { status: 401 });
        }

        // check if the user is an admin
        if (session.user?.role !== 'Admin') {
            return new Response('You are not an admin', { status: 403 });
        }

        // Connect to the database
        await connectDatabase();

        // Get skip and limit from query parameters
        const queryParams = request.nextUrl.searchParams;
        const skip = Number(queryParams.get('skip')) || 0;
        const limit = Number(queryParams.get('limit')) || 10;
        const userFilter = queryParams.get('userFilter') || null;

        // Declare users variable
        let users;

        // Build the query object
        const query = {
            disabled: { $ne: true },
        };
        // Fetch users based on the filter
        if (userFilter === "recentlyAdded") {
            users = await User.find(query).sort({ createdAt: -1 })
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
