import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET - Spesifik sahip getir
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ownerId = parseInt(id);

    const owner = await prisma.bungalowOwner.findUnique({
      where: { ownerId },
      include: {
        bungalows: true,
      },
    });

    if (!owner) {
      return NextResponse.json(
        { error: "Owner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(owner);
  } catch (error) {
    console.error("Error fetching owner:", error);
    return NextResponse.json(
      { error: "Failed to fetch owner" },
      { status: 500 }
    );
  }
}

// PUT - Sahip güncelle
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ownerId = parseInt(id);
    const body = await request.json();

    const owner = await prisma.bungalowOwner.update({
      where: { ownerId },
      data: body,
    });

    return NextResponse.json(owner);
  } catch (error) {
    console.error("Error updating owner:", error);
    return NextResponse.json(
      { error: "Failed to update owner" },
      { status: 500 }
    );
  }
}

// DELETE - Sahip sil
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const ownerId = parseInt(id);

    await prisma.bungalowOwner.delete({
      where: { ownerId },
    });

    return NextResponse.json({ message: "Owner deleted successfully" });
  } catch (error) {
    console.error("Error deleting owner:", error);
    return NextResponse.json(
      { error: "Failed to delete owner" },
      { status: 500 }
    );
  }
}
