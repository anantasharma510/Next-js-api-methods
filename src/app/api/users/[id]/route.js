import { users } from "@/util/db"; // Assuming users data is imported from your database utility
import { NextResponse } from "next/server";

// GET function to retrieve a user by ID
export function GET(request, { params }) {
    const { id } = params; // Extract the `id` from the route parameters

    const user = users.find((u) => u.id === parseInt(id)); // Find the user by ID

    if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
}

// PUT function to update user data
export async function PUT(request, { params }) {
    let payload = await request.json(); // Parse the incoming JSON body

    const userId = parseInt(params.id); // Extract ID from the URL parameters

    // Find the index of the user to update
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update the user's data in the array
    users[userIndex] = { ...users[userIndex], ...payload };

    return NextResponse.json(users[userIndex], { status: 200 });
}
