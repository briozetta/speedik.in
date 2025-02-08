import { connectDatabase } from "@/lib/database";
import Advertisements from "@/lib/database/models/AdvertisementSchema";

export async function DELETE(request) {
  try {
    const { id } = await request.json();
    if (!id) return new Response(JSON.stringify({ message: 'Invalid input: ID is required' }), { status: 400 });

    await connectDatabase();
    const advertisement = await Advertisements.findByIdAndDelete(id);

    if (!advertisement) return new Response(JSON.stringify({ message: 'Advertisement not found' }), { status: 404 });

    return new Response(JSON.stringify({ message: 'Advertisement deleted successfully' }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), { status: 500 });
  }
}
