import { connectDatabase } from "@/lib/database";
import Advertisements from "@/lib/database/models/AdvertisementSchema";

export async function POST(request) {
  try {
    const data = await request.json();
    await connectDatabase();
    const advertisement = await Advertisements.create(data);

    return new Response(JSON.stringify({ message: 'Advertisement added successfully', advertisement }), {
      status: 201,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
