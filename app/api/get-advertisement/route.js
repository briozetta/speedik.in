import { connectDatabase } from "@/lib/database";
import Advertisements from "@/lib/database/models/AdvertisementSchema";

export async function GET() {
  try {
    await connectDatabase();
    const advertisements = await Advertisements.find();
    return Response.json({ message: 'Advertisements fetched successfully', advertisements }, { status: 200 });
  } catch (error) {
    return Response.json({ message: 'Failed to fetch advertisements', error: error.message }, { status: 500 });
  }
}
