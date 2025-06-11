"use client"

import { useState, useEffect } from "react"
import { useWishlist } from "@/lib/hooks/useWishlist"
import ProductCard from "@/components/product/product-card"
import Link from "next/link"
import { Heart } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  slug: string
}

export default function WishlistPage() {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist()
  const [products, setProducts] = useState<Product[]>([])
  const [productsLoading, setProductsLoading] = useState(false)

  // Fetch product details for wishlist items
  useEffect(() => {
    const fetchProducts = async () => {
      if (wishlistItems.length === 0) {
        setProducts([])
        return
      }

      setProductsLoading(true)
      try {
        const productPromises = wishlistItems.map(async (productId) => {
          const response = await fetch(`/api/products/${productId}`)
          if (response.ok) {
            const product = await response.json()
            return {
              id: product.id,
              name: product.name,
              price: product.price,
              image: product.image || "/placeholder.svg",
              slug: product.slug || product.id,
            }
          }
          return null
        })

        const results = await Promise.all(productPromises)
        const validProducts = results.filter((product): product is Product => product !== null)
        setProducts(validProducts)
      } catch (error) {
        console.error("Error fetching wishlist products:", error)
      }
      setProductsLoading(false)
    }

    if (!loading) {
      fetchProducts()
    }
  }, [wishlistItems, loading])

  if (loading || productsLoading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your wishlist...</p>
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <Heart className="h-24 w-24 text-gray-300 mx-auto mb-4" />
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Your Wishlist is Empty</h1>
          <p className="text-gray-600 mb-8">Save items you love to your wishlist and shop them later.</p>
          <Link
            href="/shop"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">My Wishlist</h1>
        <p className="text-gray-600">{products.length} {products.length === 1 ? 'item' : 'items'} saved</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div key={product.id} className="relative">
            <ProductCard 
              product={{
                id: product.id,
                name: product.name,
                price: product.price,
                images: [product.image],
                slug: product.slug,
              }} 
            />
            <button
              onClick={() => removeFromWishlist(product.id)}
              className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
              aria-label="Remove from wishlist"
            >
              <Heart className="h-4 w-4 fill-current" />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 