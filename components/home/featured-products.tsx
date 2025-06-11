"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "@/lib/hooks/useCart"
import { useWishlist } from "@/lib/hooks/useWishlist"
import { useSession } from "next-auth/react";

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  slug: string
}

interface FeaturedProductsProps {
  products: Product[]
}

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  const { addToCart } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()

  // Handle quick add - redirect to product page for size/color selection
  const handleQuickAdd = (productSlug: string) => {
    // Redirect to product page instead of quick add to ensure size/color selection
    window.location.href = `/products/${productSlug}`
  }

  // Handle wishlist toggle
  const toggleWishlist = (productId: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  if (!products || products.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No featured products available at the moment.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <motion.div
          key={product.id}
          className="group bg-white rounded-lg shadow-md overflow-hidden"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.3 }}
        >
          <div className="relative aspect-square overflow-hidden">
            <Link href={`/products/${product.slug}`}>
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
              />
            </Link>

            <button
              className="absolute top-2 right-2 p-2 bg-white bg-opacity-70 rounded-full shadow-sm hover:bg-opacity-100 transition-all"
              onClick={() => toggleWishlist(product.id)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill={isInWishlist(product.id) ? "red" : "none"}
                stroke={isInWishlist(product.id) ? "red" : "currentColor"}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
            </button>
          </div>

          <div className="p-4">
            <Link href={`/products/${product.slug}`} className="block">
              <h3 className="text-lg font-medium text-gray-900 hover:text-blue-600 truncate">{product.name}</h3>
            </Link>

            <div className="mt-2 flex justify-between items-center">
              <p className="text-lg font-semibold text-gray-900">${product.price.toFixed(2)}</p>

              <button
                onClick={() => handleQuickAdd(product.slug)}
                className="p-2 text-sm font-medium text-white bg-blue-600 rounded-full hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
              </button>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
