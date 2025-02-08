import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/models/UserSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request) {
    try {
        // Get the session and check authentication
        // const session = await getServerSession(authOptions);
        // if (!session) {
        //     return NextResponse.json(
        //         { message: "You must be logged in to access this resource" },
        //         { status: 401 }
        //     );
        // }

        // Connect to the database
        await connectDatabase();

        // Get the `userId` from query parameters
        const queryParams = request.nextUrl.searchParams;
        const userId = queryParams.get("userId");

        // Validate if `userId` is provided
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Find the user by ID
        const user = await User.findById(userId).select("-password");

        // Check if the user exists
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Return the user data
        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}



// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const client = await clientPromise;
//       const db = client.db('your_database_name');
//       const advertisements = await db.collection('advertisements').find({}).toArray();

//       res.status(200).json({ data: advertisements });
//     } catch (error) {
//       res.status(500).json({ message: 'Failed to fetch advertisements', error });
//     }
//   } else {
//     res.status(405).json({ message: 'Method not allowed' });
//   }
// }