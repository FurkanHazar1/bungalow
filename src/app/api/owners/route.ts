import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm sahipleri getir
export async function GET() {
  try {
    const owners = await prisma.bungalowOwner.findMany({
      select: {
        ownerId: true,
        firstName: true,
        lastName: true,
        nationalId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(owners);
  } catch (error) {
    console.error("Error fetching owners:", error);
    return NextResponse.json(
      { error: "Failed to fetch owners" },
      { status: 500 }
    );
  }
}

// POST - Yeni sahibi oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { firstName, lastName, nationalId, email, password } = body;

    if (!firstName || !lastName || !nationalId || !email || !password) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const owner = await prisma.bungalowOwner.create({
      data: {
        firstName,
        lastName,
        nationalId,
        email,
        password,
      },
    });

    return NextResponse.json(owner, { status: 201 });
  } catch (error) {
    console.error("Error creating owner:", error);
    return NextResponse.json(
      { error: "Failed to create owner" },
      { status: 500 }
    );
  }
}
