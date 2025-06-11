import React from "react"
import Image from "next/image"
import { useCart } from "@/lib/hooks/useCart"
import { Minus, Plus, X } from "lucide-react"

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

interface CartItemProps {
  item: CartItem
  showControls?: boolean
}

const CartItemComponent: React.FC<CartItemProps> = ({ item, showControls = true }) => {
  const { updateQuantity, removeFromCart } = useCart()

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleRemove = () => {
    removeFromCart(item.id)
  }

  return (
    <div className="flex items-center gap-3 py-3">
      <div className="relative w-16 h-16 flex-shrink-0">
        <Image 
          src={item.image || "/placeholder.svg"} 
          alt={item.name || "Product"} 
          fill
          className="object-cover rounded-md"
          sizes="64px"
        />
      </div>
      
      <div className="flex-1 min-w-0">
        <h3 className="font-medium text-sm text-gray-900 truncate">
          {item.name || "Product"}
        </h3>
        {item.attributes && (
          <p className="text-xs text-gray-500">
            Size: {item.attributes.size || 'N/A'} | Color: {item.attributes.color || 'N/A'}
          </p>
        )}
        <p className="text-sm text-gray-500">
          ${(item.price || 0).toFixed(2)}
        </p>
        
        {showControls && (
          <div className="flex items-center mt-2 gap-2">
            <button
              onClick={() => handleUpdateQuantity(item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus size={12} />
            </button>
            
            <span className="text-sm font-medium w-8 text-center">
              {item.quantity}
            </span>
            
            <button
              onClick={() => handleUpdateQuantity(item.quantity + 1)}
              className="p-1 rounded-md border border-gray-300 hover:bg-gray-50"
            >
              <Plus size={12} />
            </button>
          </div>
        )}
      </div>
      
      {showControls && (
        <button
          onClick={handleRemove}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
          aria-label="Remove item"
        >
          <X size={16} />
        </button>
      )}
      
      {!showControls && (
        <div className="text-right">
          <p className="text-sm font-medium">
            {item.quantity} × ${(item.price || 0).toFixed(2)}
          </p>
          <p className="text-sm font-bold">
            ${((item.price || 0) * item.quantity).toFixed(2)}
          </p>
        </div>
      )}
    </div>
  )
}

export default CartItemComponent
