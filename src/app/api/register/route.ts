import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const { email, password, nameAr, nameEn } = await req.json();

    if (!email || !password || !nameAr || !nameEn) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already exists" }, { status: 400 });
    }

    const passwordHash = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        nameAr,
        nameEn,
      },
    });

    return NextResponse.json({ id: user.id, email: user.email });
  } catch (e) {
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
