import { connectDatabase } from "@/lib/database";
import Vehicle from "@/lib/database/models/Vehicle.model";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export async function GET(request) {
  try {
    const queryParams = request.nextUrl.searchParams;
    const id = queryParams.get('id'); // Retrieve the `id` parameter

    if (!id) {
      return NextResponse.json({ error: 'ID parameter is required' }, { status: 400 });
    }

    await connectDatabase();
    const vehicle = await Vehicle.findOne({ _id: id});

    if (!vehicle) {
      return NextResponse.json({ error: 'Vehicle not found' }, { status: 404 });
    }

    return NextResponse.json({ vehicle }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ error: 'Failed to retrieve vehicle' }, { status: 500 });
  }
}
