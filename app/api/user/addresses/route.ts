import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { prisma } from "@/lib/db"

// Get all addresses for the current user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // Get user by email, create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || 'User',
          password: 'temp', // In real app, handle this properly
        }
      })
    }

    // Fetch addresses from database
    const addresses = await prisma.address.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' }
    })

    return NextResponse.json(addresses)
  } catch (error) {
    console.error("Error fetching addresses:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Add a new address
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const addressData = await request.json()

    // Get user by email, create if doesn't exist
    let user = await prisma.user.findUnique({
      where: { email: session.user.email },
    })

    if (!user) {
      // Create user if doesn't exist
      user = await prisma.user.create({
        data: {
          email: session.user.email,
          name: session.user.name || 'User',
          password: 'temp', // In real app, handle this properly
        }
      })
    }

    // If this is set as default, unset all other defaults for this user
    if (addressData.isDefault) {
      await prisma.address.updateMany({
        where: { 
          userId: user.id,
          type: addressData.type 
        },
        data: { isDefault: false }
      })
    }

    // Create the new address
    const newAddress = await prisma.address.create({
      data: {
        ...addressData,
        userId: user.id
      }
    })

    return NextResponse.json(newAddress)
  } catch (error) {
    console.error("Error creating address:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Update an address
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id, ...addressData } = await request.json()

    if (!id) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 })
    }

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

    // Update the address
    const address = await prisma.address.update({
      where: { 
        id, 
        userId: user.id 
      },
      data: addressData
    })

    return NextResponse.json(address)
  } catch (error) {
    console.error("Error updating address:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Delete an address
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const id = url.searchParams.get("id")

    if (!id) {
      return NextResponse.json({ error: "Address ID is required" }, { status: 400 })
    }

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
        id, 
        userId: user.id 
      }
    })

    return NextResponse.json({ message: "Address deleted successfully" })
  } catch (error) {
    console.error("Error deleting address:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 