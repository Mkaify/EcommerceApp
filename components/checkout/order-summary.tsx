"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { useCart } from "@/lib/hooks/useCart"

export default function OrderSummary() {
  const { state } = useCart()
  const [isClient, setIsClient] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <OrderSummarySkeleton />
  }

  return (
    <div className="bg-white rounded-lg shadow p-6 sticky top-24">
      <h2 className="text-lg font-medium mb-4">Order Summary</h2>

      <div className="max-h-80 overflow-y-auto mb-6">
        {state.items.map((item) => (
          <div key={item.id} className="flex py-3 border-b border-gray-100 last:border-b-0">
            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
              <Image
                src={item.image || "/placeholder.svg"}
                alt={item.name}
                width={64}
                height={64}
                className="h-full w-full object-cover object-center"
              />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
              <div>
                <div className="flex justify-between text-sm font-medium text-gray-900">
                  <h3 className="truncate max-w-[180px]">{item.name}</h3>
                  <p className="ml-4">${(item.price * item.quantity).toFixed(2)}</p>
                </div>

                {item.attributes && Object.keys(item.attributes).length > 0 && (
                  <div className="mt-1 text-xs text-gray-500">
                    {Object.entries(item.attributes).map(([key, value]) => (
                      <span key={key} className="mr-2">
                        {key.charAt(0).toUpperCase() + key.slice(1)}: {value}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-end justify-between text-xs">
                <p className="text-gray-500">Qty {item.quantity}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span>${state.subtotal.toFixed(2)}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span>Free</span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Tax</span>
          <span>${(state.subtotal * 0.1).toFixed(2)}</span>
        </div>

        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between font-medium">
            <span>Total</span>
            <span>${(state.subtotal + state.subtotal * 0.1).toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function OrderSummarySkeleton() {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-6"></div>

      <div className="space-y-4 mb-6">
        {[1, 2].map((item) => (
          <div key={item} className="flex py-3">
            <div className="h-16 w-16 bg-gray-200 rounded animate-pulse"></div>
            <div className="ml-4 flex-1">
              <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="h-3 w-1/3 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        ))}
      </div>

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
    </div>
  )
}
