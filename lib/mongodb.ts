import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI non défini dans .env");
}

let isConnected = false;

export async function connectDB() {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI);
    isConnected = !!db.connections[0].readyState;
    console.log("Connecté à MongoDB");
  } catch (error) {
    console.error("Erreur de connexion MongoDB:", error);
  }
}

const CodeSchema = new mongoose.Schema(
  {
    content: String,
    language: String,
  },
  { timestamps: true }
);

export const CodeModel =
  mongoose.models.Code || mongoose.model("Code", CodeSchema);
