import { users } from "@/util/db"; // Ensure this path is correct
import { NextResponse } from "next/server";

export function GET() {
    const data = users; // Ensure 'users' contains the expected data
    return NextResponse.json(data, { status: 200 });
}

export async function POST(request) {
    try {
        const payload = await request.json();
        console.log(payload.name,payload.email); // Logging payload for debugging

        if (!payload.name?.trim() || !payload.email?.trim() ) {
            return NextResponse.json({ error: "All fields are required." }, { status: 400 });
        }

        // If all fields are provided, process the data further
        return NextResponse.json({ result: "Data received successfully." }, { status: 200 });
    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Invalid request data." }, { status: 400 });
    }
}
