import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm kiralama işlemlerini getir
export async function GET() {
  try {
    const rentals = await prisma.rental.findMany({
      include: {
        bungalow: {
          select: {
            bungalowId: true,
            dailyPrice: true,
            roomCount: true,
            bedCount: true,
            owner: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        customer: {
          select: {
            customerId: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(rentals);
  } catch (error) {
    console.error("Error fetching rentals:", error);
    return NextResponse.json(
      { error: "Failed to fetch rentals" },
      { status: 500 }
    );
  }
}

// POST - Yeni kiralama işlemi oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { bungalowId, customerId, startDate, endDate } = body;

    if (!bungalowId || !customerId || !startDate || !endDate) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const rental = await prisma.rental.create({
      data: {
        bungalowId,
        customerId,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
      include: {
        bungalow: {
          select: {
            bungalowId: true,
            dailyPrice: true,
            roomCount: true,
            bedCount: true,
            owner: {
              select: {
                firstName: true,
                lastName: true,
              },
            },
          },
        },
        customer: {
          select: {
            customerId: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(rental, { status: 201 });
  } catch (error) {
    console.error("Error creating rental:", error);
    return NextResponse.json(
      { error: "Failed to create rental" },
      { status: 500 }
    );
  }
}
