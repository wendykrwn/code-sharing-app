import { NextResponse } from "next/server";
import { connectDB, CodeModel } from "@/lib/mongodb";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: Request) {
  const { content, language } = await req.json();
  await connectDB();

  const id = uuidv4();

  await CodeModel.create({ uuid: id, content, language });

  return NextResponse.json({ id });
}
