import { NextResponse } from "next/server";
import { connectDB, CodeModel } from "@/lib/mongodb";
import { randomBytes } from "crypto";

export async function POST(req: Request) {
  const { content, language } = await req.json();

  await connectDB();

  const id = randomBytes(5).toString("hex");
  const code = await CodeModel.create({ _id: id, content, language });

  return NextResponse.json({ id: code._id });
}
