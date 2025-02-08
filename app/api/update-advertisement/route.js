import { connectDatabase } from "@/lib/database";
import Advertisements from "@/lib/database/models/AdvertisementSchema";

export async function PUT(request) {
  try {
    const { _id, ...updates } = await request.json();
    if (!_id) return new Response(JSON.stringify({ message: 'Invalid input: ID is required' }), { status: 400 });

    await connectDatabase();

    const advertisement = await Advertisements.findByIdAndUpdate(_id, updates, { new: true });

    if (!advertisement) return new Response(JSON.stringify({ message: 'Advertisement not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Advertisement updated successfully', advertisement }), { status: 200 });
  } catch (error) {
    console.error("Error updating advertisement:", error.message);
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
