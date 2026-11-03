import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// One-time migration endpoint: creates all Prisma tables in the connected
// Postgres database. Visit /api/setup once after the first successful deploy.
// Safe to call multiple times (CREATE TABLE IF NOT EXISTS semantics via Prisma).
export async function GET() {
  const results: string[] = [];
  try {
    // Create tables in dependency order using raw SQL (idempotent).
    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "User" (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        "fullName" TEXT NOT NULL,
        "passwordHash" TEXT NOT NULL,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL
      );
    `);
    results.push("User table ready");

    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Project" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        name TEXT NOT NULL,
        description TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Project_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE
      );
      CREATE INDEX IF NOT EXISTS "Project_userId_idx" ON "Project"("userId");
    `);
    results.push("Project table ready");

    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Folder" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        name TEXT NOT NULL,
        "projectId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "Folder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
        CONSTRAINT "Folder_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"(id) ON DELETE SET NULL
      );
      CREATE INDEX IF NOT EXISTS "Folder_userId_idx" ON "Folder"("userId");
    `);
    results.push("Folder table ready");

    await db.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "SavedCode" (
        id TEXT PRIMARY KEY,
        "userId" TEXT NOT NULL,
        kind TEXT NOT NULL,
        name TEXT NOT NULL,
        "typeLabel" TEXT NOT NULL,
        content TEXT NOT NULL,
        design TEXT NOT NULL DEFAULT '{}',
        "projectId" TEXT,
        "folderId" TEXT,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL,
        CONSTRAINT "SavedCode_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE,
        CONSTRAINT "SavedCode_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"(id) ON DELETE SET NULL,
        CONSTRAINT "SavedCode_folderId_fkey" FOREIGN KEY ("folderId") REFERENCES "Folder"(id) ON DELETE SET NULL
      );
      CREATE INDEX IF NOT EXISTS "SavedCode_userId_idx" ON "SavedCode"("userId");
    `);
    results.push("SavedCode table ready");

    return NextResponse.json({ ok: true, results });
  } catch (e) {
    return NextResponse.json(
      { ok: false, error: e instanceof Error ? e.message : "Unknown error", results },
      { status: 500 }
    );
  }
}
