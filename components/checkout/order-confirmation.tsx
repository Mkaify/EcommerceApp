"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/lib/hooks/useCart"
import { CheckCircle } from "lucide-react"

export default function OrderConfirmation() {
  const { clearCart } = useCart()

  // Clear cart on successful order
  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div className="container mx-auto px-4 py-16 text-center">
      <div className="max-w-md mx-auto">
        <CheckCircle size={64} className="mx-auto text-green-500 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Thank You for Your Order!</h1>
        <p className="text-gray-600 mb-8">
          Your order has been received and is now being processed. You will receive an email confirmation shortly.
        </p>

        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-lg font-medium mb-4">Order Details</h2>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Order Number:</span>
            <span className="font-medium">#ORD12345</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Date:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-600">Payment Method:</span>
            <span>Credit Card</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Shipping Method:</span>
            <span>Standard Shipping</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            href="/account/orders"
            className="flex-1 py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            View Order
          </Link>
          <Link
            href="/"
            className="flex-1 py-3 px-4 border border-gray-300 rounded-md text-gray-700 font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  )
}
