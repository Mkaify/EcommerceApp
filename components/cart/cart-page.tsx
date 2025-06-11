"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useCart } from "@/lib/hooks/useCart"
import CartItemComponent from "./cart-item"
import { ShoppingCart, ArrowRight, LogIn } from "lucide-react"

export default function CartPage() {
  const { state, isAuthenticated } = useCart()
  const [isClient, setIsClient] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <CartSkeleton />
  }

  // Show sign-in prompt if user is not authenticated
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <LogIn size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Sign in to view your cart</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          You need to sign in to add items to your cart and manage your shopping experience.
        </p>
        <div className="space-x-4">
          <Link
            href="/auth/signin?callbackUrl=/cart"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Sign In
          </Link>
          <Link
            href="/products"
            className="inline-block px-6 py-3 bg-gray-100 text-gray-900 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Browse Products
          </Link>
        </div>
      </div>
    )
  }

  if (state.items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <ShoppingCart size={64} className="mx-auto text-gray-300 mb-6" />
        <h1 className="text-3xl font-bold mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8 max-w-md mx-auto">
          Looks like you haven't added anything to your cart yet. Browse our products and find something you'll love!
        </p>
        <Link
          href="/products"
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Continue Shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <h2 className="text-lg font-medium">Cart Items ({state.itemCount})</h2>
            </div>

            <div className="divide-y">
              {state.items.map((item) => (
                <div key={item.id} className="p-6">
                  <CartItemComponent item={item} showControls={true} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 sticky top-24">
            <h2 className="text-lg font-medium mb-4">Order Summary</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>${state.subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span>Calculated at checkout</span>
              </div>

              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-medium">
                  <span>Estimated Total</span>
                  <span>${state.subtotal.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Link
              href="/checkout"
              className="w-full block py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-center"
            >
              Proceed to Checkout
              <ArrowRight size={16} className="ml-2" />
            </Link>

            <div className="mt-6 text-center">
              <Link href="/products" className="text-blue-600 hover:underline text-sm">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function CartSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="h-10 w-48 bg-gray-200 rounded animate-pulse mb-8"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-6 border-b">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse"></div>
            </div>

            <div className="divide-y">
              {[1, 2].map((item) => (
                <div key={item} className="p-6">
                  <div className="flex">
                    <div className="h-20 w-20 bg-gray-200 rounded animate-pulse"></div>
                    <div className="ml-4 flex-1">
                      <div className="h-5 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
                      <div className="h-4 w-1/4 bg-gray-200 rounded animate-pulse mb-4"></div>
                      <div className="flex justify-between">
                        <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

            <div className="space-y-4 mb-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex justify-between">
                  <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                </div>
              ))}

              <div className="border-t pt-4 mt-4">
                <div className="flex justify-between">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-5 w-20 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="h-12 bg-gray-200 rounded animate-pulse mb-6"></div>
            <div className="h-4 w-32 bg-gray-200 rounded animate-pulse mx-auto"></div>
          </div>
        </div>
      </div>
    </div>
  )
}
