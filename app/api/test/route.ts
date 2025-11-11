import { NextResponse } from "next/server";
import { connectDB, CodeModel } from "@/lib/mongodb";

export async function GET() {
  await connectDB();

  const code = await CodeModel.create({
    content: "console.log('test')",
    language: "javascript",
  });

  return NextResponse.json({ success: true, id: code._id });
}
