"use client"

import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  Eye, 
  ArrowLeft,
  Calendar,
  CreditCard
} from "lucide-react"

interface OrderItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface Order {
  id: string
  orderNumber: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  createdAt: string
  items: OrderItem[]
  shippingAddress: {
    name: string
    street: string
    city: string
    state: string
    zipCode: string
  }
}

const statusConfig = {
  pending: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100", label: "Pending" },
  processing: { icon: Package, color: "text-blue-600", bg: "bg-blue-100", label: "Processing" },
  shipped: { icon: Truck, color: "text-purple-600", bg: "bg-purple-100", label: "Shipped" },
  delivered: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", label: "Delivered" },
  cancelled: { icon: CheckCircle, color: "text-red-600", bg: "bg-red-100", label: "Cancelled" }
}

export default function OrdersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)

  // Demo orders data
  const demoOrders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-2024-001",
      status: "delivered",
      total: 299.99,
      createdAt: "2024-01-15T10:30:00Z",
      items: [
        {
          id: "1",
          name: "Premium Wireless Headphones",
          price: 199.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop"
        },
        {
          id: "2",
          name: "Smartphone Case",
          price: 49.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    },
    {
      id: "2",
      orderNumber: "ORD-2024-002",
      status: "shipped",
      total: 899.99,
      createdAt: "2024-01-20T14:15:00Z",
      items: [
        {
          id: "3",
          name: "4K Monitor",
          price: 899.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1527443154391-507e9dc6c5cc?w=500&h=500&fit=crop"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    },
    {
      id: "3",
      orderNumber: "ORD-2024-003",
      status: "processing",
      total: 459.98,
      createdAt: "2024-01-25T16:45:00Z",
      items: [
        {
          id: "4",
          name: "Gaming Keyboard",
          price: 159.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop"
        },
        {
          id: "5",
          name: "Gaming Mouse",
          price: 89.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop"
        },
        {
          id: "6",
          name: "Mouse Pad",
          price: 29.99,
          quantity: 7,
          image: "https://images.unsplash.com/photo-1615750185825-9611b3036580?w=500&h=500&fit=crop"
        }
      ],
      shippingAddress: {
        name: "John Doe",
        street: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001"
      }
    }
  ]

  useEffect(() => {
    if (status === "loading") return

    if (!session) {
      router.push("/auth/signin?callbackUrl=/account/orders")
      return
    }

    // Simulate API call
    const fetchOrders = async () => {
      setLoading(true)
      try {
        // In a real app, you'd fetch from your API
        // const response = await fetch("/api/user/orders")
        // const orders = await response.json()
        
        // For demo, use demo data
        await new Promise(resolve => setTimeout(resolve, 1000))
        setOrders(demoOrders)
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [session, status, router])

  if (status === "loading" || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  if (selectedOrder) {
    const StatusIcon = statusConfig[selectedOrder.status].icon

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center mb-6">
            <button
              onClick={() => setSelectedOrder(null)}
              className="flex items-center text-blue-600 hover:text-blue-700 mr-4"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Orders
            </button>
            <h1 className="text-2xl font-bold text-gray-900">
              Order {selectedOrder.orderNumber}
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            {/* Order Header */}
            <div className="bg-gray-50 px-6 py-4 border-b">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex items-center mb-2 md:mb-0">
                  <StatusIcon className={`h-5 w-5 mr-2 ${statusConfig[selectedOrder.status].color}`} />
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig[selectedOrder.status].bg} ${statusConfig[selectedOrder.status].color}`}>
                    {statusConfig[selectedOrder.status].label}
                  </span>
                </div>
                <div className="text-sm text-gray-600">
                  <div className="flex items-center mb-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    Ordered on {formatDate(selectedOrder.createdAt)}
                  </div>
                  <div className="flex items-center">
                    <CreditCard className="h-4 w-4 mr-1" />
                    Total: ${selectedOrder.total.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="px-6 py-4">
              <h3 className="text-lg font-semibold mb-4">Items Ordered</h3>
              <div className="space-y-4">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 pb-4 border-b border-gray-200 last:border-b-0">
                    <div className="relative w-16 h-16 flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-lg"
                        sizes="64px"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${item.price.toFixed(2)}</p>
                      <p className="text-sm text-gray-600">each</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-gray-50 px-6 py-4">
              <h3 className="text-lg font-semibold mb-2">Shipping Address</h3>
              <div className="text-gray-700">
                <p>{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>
                  {selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your Orders</h1>
          <Link
            href="/account"
            className="text-blue-600 hover:text-blue-700 font-medium"
          >
            Back to Account
          </Link>
        </div>

        {orders.length === 0 ? (
          <div className="text-center py-16">
            <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">
              When you place your first order, it will appear here.
            </p>
            <Link
              href="/products"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => {
              const StatusIcon = statusConfig[order.status].icon
              
              return (
                <div key={order.id} className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          Order {order.orderNumber}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Placed on {formatDate(order.createdAt)}
                        </p>
                      </div>
                      <div className="mt-3 md:mt-0 flex items-center space-x-4">
                        <div className="flex items-center">
                          <StatusIcon className={`h-4 w-4 mr-1 ${statusConfig[order.status].color}`} />
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusConfig[order.status].bg} ${statusConfig[order.status].color}`}>
                            {statusConfig[order.status].label}
                          </span>
                        </div>
                        <span className="font-semibold text-lg">
                          ${order.total.toFixed(2)}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      {order.items.slice(0, 3).map((item, index) => (
                        <div key={item.id} className="relative w-12 h-12 flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover rounded"
                            sizes="48px"
                          />
                        </div>
                      ))}
                      {order.items.length > 3 && (
                        <div className="w-12 h-12 bg-gray-100 rounded flex items-center justify-center text-sm font-medium text-gray-600">
                          +{order.items.length - 3}
                        </div>
                      )}
                      <span className="text-sm text-gray-600 ml-2">
                        {order.items.length} {order.items.length === 1 ? "item" : "items"}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="text-sm text-gray-600">
                        {order.items.length > 1 ? (
                          `${order.items[0].name} and ${order.items.length - 1} more item${order.items.length > 2 ? 's' : ''}`
                        ) : (
                          order.items[0].name
                        )}
                      </div>
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
} 