"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { useState, useEffect, useCallback, createContext, useContext } from "react"

interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  image: string
  quantity: number
  attributes?: Record<string, string>
  variantId: string | null
}

interface CartState {
  items: CartItem[]
  itemCount: number
  subtotal: number
}

interface CartContextType {
  state: CartState
  addToCart: (item: Omit<CartItem, "id" | "name" | "price" | "image"> & { productId: string }) => void
  updateQuantity: (id: string, quantity: number) => void
  removeFromCart: (id: string) => void
  clearCart: () => void
  isAuthenticated: boolean
}

const CartContext = createContext<CartContextType | undefined>(undefined)

const CART_STORAGE_KEY = "cart_items"

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession()
  const [state, setState] = useState<CartState>({
    items: [],
    itemCount: 0,
    subtotal: 0,
  })
  const [isInitialized, setIsInitialized] = useState(false)

  // Load cart from localStorage on mount and handle authentication changes
  useEffect(() => {
    const loadCart = () => {
      // Only load cart from localStorage if user is authenticated
      if (session) {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY)
        if (savedCart) {
          try {
            const items = JSON.parse(savedCart) as CartItem[]
            const itemCount = items.reduce((count, item) => count + item.quantity, 0)
            const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
            setState({ items, itemCount, subtotal })
          } catch (error) {
            console.error("Error parsing cart data:", error)
          }
        }
      } else {
        // Clear cart if user is not authenticated
        setState({ items: [], itemCount: 0, subtotal: 0 })
        localStorage.removeItem(CART_STORAGE_KEY)
      }
      setIsInitialized(true)
    }

    loadCart()
  }, [session])

  // Save cart to localStorage whenever it changes (only if authenticated)
  useEffect(() => {
    if (isInitialized && session) {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state.items))
    }
  }, [state.items, isInitialized, session])

  // Add item to cart
  const addToCart = useCallback(
    async (item: Omit<CartItem, "id" | "name" | "price" | "image"> & { productId: string }) => {
      // Require authentication to add items to cart
      if (!session) {
        throw new Error("Please sign in to add items to your cart")
      }

      try {
        // Fetch product details from API
        const response = await fetch(`/api/products/${item.productId}`)
        if (!response.ok) throw new Error("Failed to fetch product")

        const product = await response.json()

        setState((prevState) => {
          // Check if item already exists in cart
          const existingItemIndex = prevState.items.findIndex(
            (cartItem) =>
              cartItem.productId === item.productId &&
              JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes),
          )

          let newItems: CartItem[]

          if (existingItemIndex >= 0) {
            // Update quantity if item exists
            newItems = [...prevState.items]
            newItems[existingItemIndex].quantity += item.quantity
          } else {
            // Add new item
            const newItem: CartItem = {
              id: `${item.productId}_${Date.now()}`,
              productId: item.productId,
              name: product.name,
              price: product.price,
              image: product.images[0] || "",
              quantity: item.quantity,
              attributes: item.attributes,
              variantId: item.variantId,
            }
            newItems = [...prevState.items, newItem]
          }

          const itemCount = newItems.reduce((count, item) => count + item.quantity, 0)
          const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0)

          return { items: newItems, itemCount, subtotal }
        })
      } catch (error) {
        console.error("Error adding item to cart:", error)

        // Fallback for demo or when API is not available
        setState((prevState) => {
          const existingItemIndex = prevState.items.findIndex(
            (cartItem) =>
              cartItem.productId === item.productId &&
              JSON.stringify(cartItem.attributes) === JSON.stringify(item.attributes),
          )

          let newItems: CartItem[]

          if (existingItemIndex >= 0) {
            newItems = [...prevState.items]
            newItems[existingItemIndex].quantity += item.quantity
          } else {
            const newItem: CartItem = {
              id: `${item.productId}_${Date.now()}`,
              productId: item.productId,
              name: "Product Name", // Fallback
              price: 99.99, // Fallback
              image: "/placeholder.svg", // Fallback
              quantity: item.quantity,
              attributes: item.attributes,
              variantId: item.variantId,
            }
            newItems = [...prevState.items, newItem]
          }

          const itemCount = newItems.reduce((count, item) => count + item.quantity, 0)
          const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0)

          return { items: newItems, itemCount, subtotal }
        })
      }
    },
    [session],
  )

  // Update item quantity
  const updateQuantity = useCallback((id: string, quantity: number) => {
    setState((prevState) => {
      const newItems = prevState.items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item,
      )

      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0)
      const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0)

      return { items: newItems, itemCount, subtotal }
    })
  }, [])

  // Remove item from cart
  const removeFromCart = useCallback((id: string) => {
    setState((prevState) => {
      const newItems = prevState.items.filter((item) => item.id !== id)

      const itemCount = newItems.reduce((count, item) => count + item.quantity, 0)
      const subtotal = newItems.reduce((total, item) => total + item.price * item.quantity, 0)

      return { items: newItems, itemCount, subtotal }
    })
  }, [])

  // Clear cart
  const clearCart = useCallback(() => {
    setState({ items: [], itemCount: 0, subtotal: 0 })
  }, [])

  return React.createElement(
    CartContext.Provider,
    { value: { state, addToCart, updateQuantity, removeFromCart, clearCart, isAuthenticated: !!session } },
    children
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
