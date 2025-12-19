import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Spesifik kiralama işlemini getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rentalId = parseInt(id);

    const rental = await prisma.rental.findUnique({
      where: { rentalId },
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
                email: true,
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

    if (!rental) {
      return NextResponse.json(
        { error: "Rental not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(rental);
  } catch (error) {
    console.error("Error fetching rental:", error);
    return NextResponse.json(
      { error: "Failed to fetch rental" },
      { status: 500 }
    );
  }
}

// PUT - Kiralama işlemini güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rentalId = parseInt(id);
    const body = await request.json();

    // startDate ve endDate'i Date nesnesine dönüştür
    const updateData: any = { ...body };
    if (body.startDate) {
      updateData.startDate = new Date(body.startDate);
    }
    if (body.endDate) {
      updateData.endDate = new Date(body.endDate);
    }

    const rental = await prisma.rental.update({
      where: { rentalId },
      data: updateData,
      include: {
        bungalow: {
          select: {
            bungalowId: true,
            dailyPrice: true,
            roomCount: true,
            bedCount: true,
          },
        },
        customer: {
          select: {
            customerId: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });

    return NextResponse.json(rental);
  } catch (error) {
    console.error("Error updating rental:", error);
    return NextResponse.json(
      { error: "Failed to update rental" },
      { status: 500 }
    );
  }
}

// DELETE - Kiralama işlemini sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const rentalId = parseInt(id);

    await prisma.rental.delete({
      where: { rentalId },
    });

    return NextResponse.json({ message: "Rental deleted successfully" });
  } catch (error) {
    console.error("Error deleting rental:", error);
    return NextResponse.json(
      { error: "Failed to delete rental" },
      { status: 500 }
    );
  }
}
