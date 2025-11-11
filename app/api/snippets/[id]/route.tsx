import { NextResponse } from "next/server";
import { connectDB, CodeModel } from "@/lib/mongodb";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {

  try {
    const { id } = await params

    await connectDB();

    const code = await CodeModel.findOne({ uuid: id }).lean();

    if (!code) {
        return NextResponse.json({ error: "Code non trouvé" }, { status: 404 });
      }

    return NextResponse.json(code);

  } catch (error) {
    console.error("Erreur API GET /code:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
