import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import Vehicle from "@/lib/database/models/Vehicle.model";
import { getServerSession } from "next-auth";


export async function POST(request) {
    const session = await getServerSession(authOptions);
    if (!session) {
        return new Response('You must be logged in to access this resource', { status: 401 });
    }

    try {
        // Parse the request body
        const data = await request.json();

        // Connect to the database
        await connectDatabase();

        // Create a new vehicle in the database
        await Vehicle.create(data);

        // Send success response with created vehicle
        return new Response(JSON.stringify({ message: 'Vehicle added successfully' }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.error('Error adding vehicle:', error);

        // Send error response if something goes wrong
        return new Response(JSON.stringify({ message: 'Failed to add vehicle', error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
