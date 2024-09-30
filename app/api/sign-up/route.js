"use server";
import { connectDatabase } from "@/lib/database";
import { handleError } from "@/lib/utils";
import User from "@/lib/database/models/UserSchema";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/utils/authOptions";

export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    
    
    const data = await request.json(); 
    const { firstName, lastName, contact, password } = data;
    console.log(firstName, lastName, contact, password); 

    // Connect to the database
    await connectDatabase();
    
    // Await the result of the findOne query
    const existingUser = await User.findOne({ contact });
    
    // Check if the user exists
    if (existingUser) {
      return NextResponse.json({ error: "This user already exists" }, { status: 400 });
    }
   
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    await User.create({
      firstName,
      lastName,
      contact,
      password: hashedPassword,
    });

    // Return the created user
    return NextResponse.json({ ok: true, user: "user created successfully" }, { status: 201 });
  } catch (error) {
    handleError(error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
