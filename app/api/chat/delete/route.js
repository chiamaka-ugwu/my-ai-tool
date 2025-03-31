import connectDB from "@/config/db";
import Chat from "@/models/Chat";
import { getAuth } from "@clerk/nextjs/dist/types/server";
import { NextResponse } from "next/server";

export async function POST(req){
    try {
      const { userId } = getAuth(req); // get user id
      const { chatId } = await req.json(); // get chat id

      if (!userId) {
        return NextResponse.json({
          success: false,
          message: "User not authenticated",
        });
      }

      // connect to the database and delete chat
      await connectDB();
      await Chat.deleteOne({_id: chatId, userId});

      return NextResponse.json({ success: true, message: "Chat deleted" });
    } catch (error) {
        return NextResponse.json({ success: false, error: error.message });
        
    }
}