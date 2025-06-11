import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { prisma } from "@/lib/db"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Get user's wishlist
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

    const wishlistItems = await prisma.wishlist.findMany({
      where: {
        userId: user.id,
      },
      select: {
        productId: true,
      },
    })

    // Return array of product IDs for the hook
    const productIds = wishlistItems.map(item => item.productId)
    return NextResponse.json(productIds)
  } catch (error) {
    console.error("Error fetching wishlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Add item to wishlist
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { productId } = await request.json()

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
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

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: { id: productId },
    })

    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    // Check if item already exists in wishlist
    const existingItem = await prisma.wishlist.findFirst({
      where: {
        userId: user.id,
        productId,
      },
    })

    if (existingItem) {
      return NextResponse.json({ message: "Item already in wishlist" })
    }

    // Add item to wishlist
    const wishlistItem = await prisma.wishlist.create({
      data: {
        userId: user.id,
        productId,
      },
    })

    return NextResponse.json(wishlistItem)
  } catch (error) {
    console.error("Error adding to wishlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Remove item from wishlist
export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const url = new URL(request.url)
    const productId = url.searchParams.get("productId")

    if (!productId) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
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

    // Delete wishlist item
    await prisma.wishlist.deleteMany({
      where: {
        userId: user.id,
        productId,
      },
    })

    return NextResponse.json({ message: "Item removed from wishlist" })
  } catch (error) {
    console.error("Error removing from wishlist:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
