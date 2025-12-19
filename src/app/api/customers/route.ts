import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm müşterileri getir
export async function GET() {
  try {
    const customers = await prisma.customer.findMany({
      select: {
        customerId: true,
        firstName: true,
        lastName: true,
        nationalId: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(customers);
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json(
      { error: "Failed to fetch customers" },
      { status: 500 }
    );
  }
}

// POST - Yeni müşteri oluştur
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

    const customer = await prisma.customer.create({
      data: {
        firstName,
        lastName,
        nationalId,
        email,
        password,
      },
    });

    return NextResponse.json(customer, { status: 201 });
  } catch (error) {
    console.error("Error creating customer:", error);
    return NextResponse.json(
      { error: "Failed to create customer" },
      { status: 500 }
    );
  }
}
