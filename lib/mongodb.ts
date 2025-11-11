import mongoose, { Schema, Document, models, model } from "mongoose";

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

export interface CodeDocument extends Document {
    uuid: string;
    content: string;
    language: string;
    createdAt: Date;
    updatedAt: Date;
}

  
const CodeSchema = new Schema<CodeDocument>(
    {
      uuid: { type: String, required: true, unique: true },
      content: { type: String, required: true },
      language: { type: String, default: "plaintext" },
    },
    { timestamps: true }
  );

export const CodeModel =
models.Code || model<CodeDocument>("Code", CodeSchema);