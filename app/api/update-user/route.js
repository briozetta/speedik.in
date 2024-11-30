import { authOptions } from "@/app/utils/authOptions";
import { connectDatabase } from "@/lib/database";
import User from "@/lib/database/models/UserSchema";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function PUT(request) {
    try {
        // Get the session and check authentication
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json(
                { message: "You must be logged in to access this resource" },
                { status: 401 }
            );
        }

        // // Check if the user is an admin
        // if (session.user?.role !== "Admin") {
        //     return NextResponse.json(
        //         { message: "You are not an admin" },
        //         { status: 403 }
        //     );
        // }

        // Connect to the database
        await connectDatabase();

        // Parse the request body to get updated data
        const updatedData = await request.json();
        const { userId, password, contact, firstName, lastName } = updatedData.newData;

        // Validate if `userId` is provided
        if (!userId) {
            return NextResponse.json(
                { message: "User ID is required" },
                { status: 400 }
            );
        }

        // Prepare the fields to update
        const updateFields = {};

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            updateFields.password = hashedPassword; // Hash the password before saving
        }

        if (contact) updateFields.contact = contact;
        if (firstName) updateFields.firstName = firstName;
        if (lastName) updateFields.lastName = lastName;

        // Update the user in the database
        const user = await User.findByIdAndUpdate(userId, updateFields, {
            new: true, // Return the updated user document
        });

        // Check if the user exists
        if (!user) {
            return NextResponse.json(
                { message: "User not found" },
                { status: 404 }
            );
        }

        // Return the updated user data (excluding the password)
        const { password: _, ...userWithoutPassword } = user.toObject();

        return NextResponse.json({ user: userWithoutPassword }, { status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
