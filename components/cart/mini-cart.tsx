"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ShoppingCart, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"
import { motion } from "framer-motion"
import { useCart } from "@/lib/hooks/useCart"
import CartItemComponent from "./cart-item"

export default function MiniCart() {
  const { state, isAuthenticated } = useCart()
  const [isOpen, setIsOpen] = useState(false)
  const [isClient, setIsClient] = useState(false)

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  const itemCount = isClient && isAuthenticated ? state.itemCount : 0

  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>
        <button className="relative p-2 text-gray-700 hover:text-blue-600" aria-label="Shopping cart">
          <ShoppingCart size={24} />
          {itemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-blue-600 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {itemCount}
            </span>
          )}
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content asChild>
          <motion.div
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl z-50 flex flex-col"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
          >
            <div className="flex items-center justify-between p-4 border-b">
              <Dialog.Title className="text-lg font-medium">Your Cart</Dialog.Title>
              <Dialog.Close asChild>
                <button className="p-2 text-gray-500 hover:text-gray-700" aria-label="Close">
                  <X size={20} />
                </button>
              </Dialog.Close>
            </div>

            {!isAuthenticated ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-lg font-medium mb-2">Sign in to view your cart</p>
                <p className="text-gray-500 text-center mb-6">
                  You need to sign in to add items to your cart.
                </p>
                <Dialog.Close asChild>
                  <Link
                    href="/auth/signin"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Sign In
                  </Link>
                </Dialog.Close>
              </div>
            ) : isClient && state.items.length === 0 ? (
              <div className="flex-1 flex flex-col items-center justify-center p-4">
                <ShoppingCart size={64} className="text-gray-300 mb-4" />
                <p className="text-lg font-medium mb-2">Your cart is empty</p>
                <p className="text-gray-500 text-center mb-6">
                  Looks like you haven't added anything to your cart yet.
                </p>
                <Dialog.Close asChild>
                  <Link
                    href="/products"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    Start Shopping
                  </Link>
                </Dialog.Close>
              </div>
            ) : (
              <>
                <div className="flex-1 overflow-y-auto p-4">
                  {isClient &&
                    state.items.map((item) => (
                      <div key={item.id} className="mb-4">
                        <CartItemComponent item={item} showControls={true} />
                      </div>
                    ))}
                </div>

                <div className="p-4 border-t">
                  <div className="flex justify-between mb-4">
                    <span className="font-medium">Subtotal</span>
                    <span className="font-medium">${isClient ? state.subtotal.toFixed(2) : "0.00"}</span>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Dialog.Close asChild>
                      <Link
                        href="/cart"
                        className="w-full py-2 px-4 bg-gray-100 text-gray-900 text-center font-medium rounded-md hover:bg-gray-200 transition-colors"
                      >
                        View Cart
                      </Link>
                    </Dialog.Close>

                    <Dialog.Close asChild>
                      <Link
                        href="/checkout"
                        className="w-full py-2 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 transition-colors"
                      >
                        Checkout
                      </Link>
                    </Dialog.Close>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
