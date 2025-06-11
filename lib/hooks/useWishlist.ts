"use client"

import { useState, useEffect } from "react"

export function useWishlist() {
  const [wishlistItems, setWishlistItems] = useState<string[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load wishlist from localStorage
    const savedWishlist = localStorage.getItem("wishlist")
    if (savedWishlist) {
      setWishlistItems(JSON.parse(savedWishlist))
    }
    setLoading(false)
  }, [])

  const addToWishlist = (productId: string) => {
    setWishlistItems((prev) => {
      const newWishlist = [...prev, productId]
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      return newWishlist
    })
  }

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => {
      const newWishlist = prev.filter((id) => id !== productId)
      localStorage.setItem("wishlist", JSON.stringify(newWishlist))
      return newWishlist
    })
  }

  const isInWishlist = (productId: string) => {
    return wishlistItems.includes(productId)
  }

  return {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    loading
  }
}
