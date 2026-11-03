import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";
import { getSessionUser } from "@/lib/auth";

const createSchema = z.object({
  kind: z.enum(["qr", "barcode"]),
  name: z.string().min(1).max(120),
  typeLabel: z.string().min(1).max(80),
  content: z.string().min(1).max(10000),
  design: z.unknown().optional(),
  projectId: z.string().optional(),
});

export async function GET() {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const codes = await db.savedCode.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { project: { select: { name: true } } },
  });
  return NextResponse.json({ codes });
}

export async function POST(req: Request) {
  const user = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const body = await req.json().catch(() => null);
  const parsed = createSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message }, { status: 400 });
  }
  const { kind, name, typeLabel, content, design, projectId } = parsed.data;
  const code = await db.savedCode.create({
    data: {
      userId: user.id,
      kind,
      name,
      typeLabel,
      content,
      design: design ? JSON.stringify(design) : "{}",
      projectId: projectId || null,
    },
  });
  return NextResponse.json({ code });
}
