"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, ShoppingCart, Star, Share2, Truck, Shield, RotateCcw, AlertCircle } from "lucide-react"
import { useCart } from "@/lib/hooks/useCart"
import { useWishlist } from "@/lib/hooks/useWishlist"
import ProductCard from "./product-card"

interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  images: string[]
  featured: boolean
  isPublished: boolean
}

interface ProductDetailsProps {
  product: Product
  relatedProducts: Product[]
}

export default function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [quantity, setQuantity] = useState(1)
  const [selectedSize, setSelectedSize] = useState("")
  const [selectedColor, setSelectedColor] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  
  const router = useRouter()
  const { addToCart, isAuthenticated } = useCart()
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist()
  const inWishlist = isInWishlist(product.id)

  const handleAddToCart = async () => {
    setError("")
    
    if (!isAuthenticated) {
      // Redirect to sign in if not authenticated
      router.push(`/auth/signin?callbackUrl=${encodeURIComponent(window.location.pathname)}`)
      return
    }

    // Validate that size and color are selected
    if (!selectedSize) {
      setError("Please select a size before adding to cart")
      return
    }

    if (!selectedColor) {
      setError("Please select a color before adding to cart")
      return
    }

    setIsLoading(true)

    try {
      await addToCart({
        productId: product.id,
        quantity: quantity,
        variantId: null,
        attributes: {
          size: selectedSize,
          color: selectedColor
        }
      })
      
      // Clear error and show success (you could add a toast notification here)
      setError("")
    } catch (error) {
      console.error("Error adding to cart:", error)
      setError("Failed to add item to cart. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const toggleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id)
    } else {
      addToWishlist(product.id)
    }
  }

  // Mock data for demo
  const sizes = ["XS", "S", "M", "L", "XL"]
  const colors = ["Black", "White", "Gray", "Blue"]
  const features = [
    "Free shipping on orders over $50",
    "30-day return policy",
    "1-year warranty included",
    "Secure payment processing"
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
              priority
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`relative aspect-square overflow-hidden rounded-md border-2 ${
                    selectedImage === index ? "border-blue-500" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <div className="flex items-center space-x-2 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <span className="text-sm text-gray-600">(128 reviews)</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</p>
          </div>

          {product.description && (
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* Size Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Size <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-5 gap-2">
              {sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`py-2 px-3 text-sm font-medium rounded-md border ${
                    selectedSize === size
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">
              Color <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`py-2 px-4 text-sm font-medium rounded-md border ${
                    selectedColor === color
                      ? "border-blue-500 bg-blue-50 text-blue-700"
                      : "border-gray-300 bg-white text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  {color}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Quantity</label>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                -
              </button>
              <span className="px-4 py-2 border border-gray-300 rounded-md">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                +
              </button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-md">
              <AlertCircle className="h-4 w-4 text-red-500 flex-shrink-0" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={handleAddToCart}
              disabled={isLoading}
              className="w-full flex items-center justify-center py-3 px-6 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              {isLoading ? "Adding..." : "Add to Cart"}
            </button>
            
            <div className="flex space-x-3">
              <button
                onClick={toggleWishlist}
                className={`flex-1 flex items-center justify-center py-2 px-4 border rounded-md font-medium transition-colors ${
                  inWishlist
                    ? "border-red-300 bg-red-50 text-red-700"
                    : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                <Heart className={`h-4 w-4 mr-2 ${inWishlist ? "fill-current" : ""}`} />
                {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
              </button>
              
              <button className="flex items-center justify-center py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Features</h3>
            <div className="grid grid-cols-1 gap-3">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center space-x-3">
                  {index === 0 && <Truck className="h-5 w-5 text-green-600" />}
                  {index === 1 && <RotateCcw className="h-5 w-5 text-blue-600" />}
                  {index === 2 && <Shield className="h-5 w-5 text-purple-600" />}
                  {index === 3 && <Shield className="h-5 w-5 text-gray-600" />}
                  <span className="text-sm text-gray-700">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts && relatedProducts.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You May Also Like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedProducts.slice(0, 4).map((relatedProduct) => (
              <ProductCard key={relatedProduct.id} product={{
                id: relatedProduct.id,
                name: relatedProduct.name,
                price: relatedProduct.price,
                images: relatedProduct.images,
                slug: relatedProduct.slug,
              }} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 