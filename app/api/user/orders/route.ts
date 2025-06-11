import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

// Demo orders data
const demoOrders = [
  {
    id: "order_001",
    orderNumber: "ECM-2024-001",
    status: "delivered",
    total: 129.99,
    currency: "USD",
    orderDate: "2024-01-15T10:30:00Z",
    deliveryDate: "2024-01-18T14:20:00Z",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    items: [
      {
        id: "item_001",
        productId: "1",
        name: "Premium Headphones",
        price: 129.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
      }
    ]
  },
  {
    id: "order_002",
    orderNumber: "ECM-2024-002",
    status: "shipped",
    total: 89.99,
    currency: "USD",
    orderDate: "2024-01-20T15:45:00Z",
    estimatedDelivery: "2024-01-25T12:00:00Z",
    trackingNumber: "1Z999AA1234567890",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    items: [
      {
        id: "item_002",
        productId: "2",
        name: "Smartphone Case",
        price: 29.99,
        quantity: 2,
        image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop"
      },
      {
        id: "item_003",
        productId: "3",
        name: "Wireless Charger",
        price: 29.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1609081219090-a6d81d3085bf?w=500&h=500&fit=crop"
      }
    ]
  },
  {
    id: "order_003",
    orderNumber: "ECM-2024-003",
    status: "processing",
    total: 199.99,
    currency: "USD",
    orderDate: "2024-01-22T09:15:00Z",
    estimatedShipping: "2024-01-24T12:00:00Z",
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "USA"
    },
    items: [
      {
        id: "item_004",
        productId: "4",
        name: "Bluetooth Speaker",
        price: 199.99,
        quantity: 1,
        image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop"
      }
    ]
  }
]

// Get user's orders
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    // In a real app, you'd fetch from your database using the user ID
    // const orders = await prisma.order.findMany({
    //   where: { userId: session.user.id },
    //   include: { items: true },
    //   orderBy: { createdAt: 'desc' }
    // })

    // For demo purposes, return demo orders
    return NextResponse.json(demoOrders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

// Create a new order
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const orderData = await request.json()

    // In a real app, you'd create the order in your database
    // const order = await prisma.order.create({
    //   data: {
    //     userId: session.user.id,
    //     ...orderData
    //   }
    // })

    // For demo purposes, return a mock order
    const newOrder = {
      id: Date.now().toString(),
      orderNumber: `ORD-${new Date().getFullYear()}-${Date.now()}`,
      status: "pending",
      ...orderData,
      createdAt: new Date().toISOString()
    }

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    console.error("Error creating order:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 