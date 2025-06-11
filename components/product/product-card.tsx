"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { useWishlist } from "@/lib/hooks/useWishlist"
import { formatPrice } from "@/lib/utils"

interface ProductCardProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
    slug: string
  }
}

export default function ProductCard({ product }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const router = useRouter()
  const { addToCart, isAuthenticated } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Redirect to product page to allow size/color selection
    router.push(`/products/${product.slug}`)
  }

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  return (
    <motion.div
      className="group relative bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link href={`/products/${product.slug}`} className="block">
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 ${isHovered ? "scale-110" : "scale-100"}`}
          />

          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />

          <button
            onClick={toggleWishlist}
            className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md z-10"
            aria-label={inWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={18} className={inWishlist ? "fill-red-500 text-red-500" : "text-gray-600"} />
          </button>
        </div>

        <div className="p-4">
          <h3 className="text-lg font-medium text-gray-900 truncate">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between">
            <p className="text-lg font-semibold">{formatPrice(product.price)}</p>

            <button
              onClick={handleQuickAdd}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
              aria-label="Add to cart"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}
