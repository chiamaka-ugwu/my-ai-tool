import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function GET(req){
    try {
        const {userId} = getAuth(req) // get user id

        if (!userId) {
            return NextResponse.json({success: false, message: "User not authenticated"})
        }

        // connect to the database and fetch all chats of the user
        await connectDB();
        const data = await Chat.find({userId})

        return NextResponse.json({success: true, data})

    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
        
    }
}