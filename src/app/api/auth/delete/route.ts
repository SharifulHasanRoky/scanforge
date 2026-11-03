import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { getSessionUser, clearSessionCookie } from "@/lib/auth";

export async function POST() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  // Cascade rules in the schema remove codes/projects/folders automatically.
  await db.user.delete({ where: { id: user.id } });
  await clearSessionCookie();
  return NextResponse.json({ ok: true });
}
