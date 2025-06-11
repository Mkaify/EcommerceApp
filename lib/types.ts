// Product types
export interface Product {
  id: string
  name: string
  slug: string
  description: string | null
  price: number
  image: string | null
  featured: boolean
  isPublished: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ProductWithImages extends Omit<Product, 'image'> {
  images: string[]
}

// Category types
export interface Category {
  id: string
  name: string
  slug: string
  parentId: string | null
  createdAt: Date
  updatedAt: Date
}

// User types
export interface User {
  id: string
  email: string
  name: string | null
  createdAt: Date
  updatedAt: Date
}

// Cart types
export interface CartItem {
  productId: string
  quantity: number
  variantId: string | null
}

// Order types
export interface Order {
  id: string
  userId: string
  total: number
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  orderId: string
  productId: string
  quantity: number
  price: number
} 