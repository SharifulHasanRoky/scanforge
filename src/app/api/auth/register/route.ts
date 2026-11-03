import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { setSessionCookie } from "@/lib/auth";

const schema = z.object({
  fullName: z.string().min(2, "Enter your full name").max(80),
  email: z.string().email("Enter a valid email"),
  phone: z.string().min(6, "Enter a valid phone number").max(24),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message || "Invalid input" }, { status: 400 });
  }
  const { fullName, email, phone, password } = parsed.data;
  const existing = await db.user.findUnique({ where: { email: email.toLowerCase() } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists" }, { status: 409 });
  }
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await db.user.create({
    data: { fullName, email: email.toLowerCase(), phone, passwordHash },
  });
  await setSessionCookie(user.id);
  return NextResponse.json({
    user: { id: user.id, name: user.fullName, email: user.email, phone: user.phone },
  });
}
