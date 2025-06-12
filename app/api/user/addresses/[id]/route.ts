import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/db"

// Update an address
export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addressData = await request.json()
    const { id } = await params

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If this is set as default, unset all other defaults for this user
    if (addressData.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: user.id,
          type: addressData.type,
          id: { not: id }
        },
        data: { isDefault: false }
      })
    }

    // Update the address in database
    const updatedAddress = await prisma.address.update({
      where: { 
        id: id,
        userId: user.id 
      },
      data: addressData
    })

    return NextResponse.json(updatedAddress)
  } catch (error) {
    console.error("Error updating address:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete an address
export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    // Get user by email
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // Delete the address from database
    await prisma.address.delete({
      where: { 
        id: id,
        userId: user.id 
      }
    })

    return NextResponse.json({ message: "Address deleted successfully" })
  } catch (error) {
    console.error("Error deleting address:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 