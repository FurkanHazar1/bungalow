import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Spesifik bungalow getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bungalowId = parseInt(id);

    const bungalow = await prisma.bungalow.findUnique({
      where: { bungalowId },
      include: {
        owner: {
          select: {
            ownerId: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
        rentals: {
          include: {
            customer: {
              select: {
                firstName: true,
                lastName: true,
                email: true,
              },
            },
          },
        },
      },
    });

    if (!bungalow) {
      return NextResponse.json(
        { error: "Bungalow not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(bungalow);
  } catch (error) {
    console.error("Error fetching bungalow:", error);
    return NextResponse.json(
      { error: "Failed to fetch bungalow" },
      { status: 500 }
    );
  }
}

// PUT - Bungalow güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bungalowId = parseInt(id);
    const body = await request.json();

    const bungalow = await prisma.bungalow.update({
      where: { bungalowId },
      data: body,
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

    return NextResponse.json(bungalow);
  } catch (error) {
    console.error("Error updating bungalow:", error);
    return NextResponse.json(
      { error: "Failed to update bungalow" },
      { status: 500 }
    );
  }
}

// DELETE - Bungalow sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bungalowId = parseInt(id);

    await prisma.bungalow.delete({
      where: { bungalowId },
    });

    return NextResponse.json({ message: "Bungalow deleted successfully" });
  } catch (error) {
    console.error("Error deleting bungalow:", error);
    return NextResponse.json(
      { error: "Failed to delete bungalow" },
      { status: 500 }
    );
  }
}
