import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Tüm bungalowları getir
export async function GET() {
  try {
    const bungalows = await prisma.bungalow.findMany({
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        rentals: true,
      },
    });

    return NextResponse.json(bungalows);
  } catch (error) {
    console.error("Error fetching bungalows:", error);
    return NextResponse.json(
      { error: "Failed to fetch bungalows" },
      { status: 500 }
    );
  }
}

// POST - Yeni bungalow oluştur
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      ownerId,
      dailyPrice,
      hasPool,
      poolSize,
      roomCount,
      hasInternet,
      masterBedroomCount,
      bedCount,
      bathroomCount,
      latitude,
      longitude,
    } = body;

    if (!ownerId || !dailyPrice || !roomCount || !bedCount || !bathroomCount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bungalow = await prisma.bungalow.create({
      data: {
        ownerId,
        dailyPrice,
        hasPool,
        poolSize,
        roomCount,
        hasInternet,
        masterBedroomCount,
        bedCount,
        bathroomCount,
        latitude,
        longitude,
      },
      include: {
        owner: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return NextResponse.json(bungalow, { status: 201 });
  } catch (error) {
    console.error("Error creating bungalow:", error);
    return NextResponse.json(
      { error: "Failed to create bungalow" },
      { status: 500 }
    );
  }
}
