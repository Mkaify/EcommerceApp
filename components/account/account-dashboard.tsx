"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import type { User } from "next-auth"
import { 
  UserIcon, Package, Heart, MapPin, LogOut, Settings, ShoppingBag, 
  Plus, Edit, Trash2, Eye, Truck, CheckCircle, Clock, Star,
  Save, X, AlertCircle
} from "lucide-react"
import { useWishlist } from "@/lib/hooks/useWishlist"

interface AccountDashboardProps {
  user: User & {
    id: string
    role: string
  }
}

export default function AccountDashboard({ user: initialUser }: AccountDashboardProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [currentUser, setCurrentUser] = useState(initialUser)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <div className="flex items-center mb-4">
              {currentUser.image ? (
                <Image
                  src={currentUser.image || "/placeholder.svg"}
                  alt={currentUser.name || "User"}
                  width={60}
                  height={60}
                  className="rounded-full"
                />
              ) : (
                <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                  <UserIcon size={24} />
                </div>
              )}
              <div className="ml-4">
                <p className="font-medium">{currentUser.name}</p>
                <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
            </div>

            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab("overview")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "overview" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <UserIcon size={18} className="mr-3" />
                Overview
              </button>

              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Package size={18} className="mr-3" />
                Orders
              </button>

              <button
                onClick={() => setActiveTab("wishlist")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "wishlist" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Heart size={18} className="mr-3" />
                Wishlist
              </button>

              <button
                onClick={() => setActiveTab("addresses")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "addresses" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <MapPin size={18} className="mr-3" />
                Addresses
              </button>

              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings size={18} className="mr-3" />
                Account Settings
              </button>

              <button
                onClick={() => signOut({ callbackUrl: window.location.origin })}
                className="w-full flex items-center p-2 rounded-md text-red-600 hover:bg-red-50"
              >
                <LogOut size={18} className="mr-3" />
                Sign Out
              </button>
            </nav>
          </div>

          {currentUser.role === "ADMIN" && (
            <div className="bg-gray-800 text-white rounded-lg p-4">
              <h3 className="font-medium mb-2">Admin Access</h3>
              <Link href="/admin" className="flex items-center p-2 rounded-md hover:bg-gray-700">
                <Settings size={18} className="mr-2" />
                Admin Dashboard
              </Link>
            </div>
          )}
        </div>

        {/* Main content */}
        <div className="md:col-span-3 bg-white rounded-lg shadow p-6">
          {activeTab === "overview" && <AccountOverview setActiveTab={setActiveTab} />}
          {activeTab === "orders" && <OrderHistory />}
          {activeTab === "wishlist" && <WishlistItems />}
          {activeTab === "addresses" && <AddressBook />}
          {activeTab === "settings" && <AccountSettings user={currentUser} onUserUpdate={setCurrentUser} />}
        </div>
      </div>
    </div>
  )
}

// Account Overview Component
function AccountOverview({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Account Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <Package size={20} className="text-blue-600 mr-2" />
            <h3 className="font-medium">Recent Orders</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Track, return, or buy things again</p>
          <button 
            onClick={() => setActiveTab("orders")} 
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            View Orders →
          </button>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <Heart size={20} className="text-blue-600 mr-2" />
            <h3 className="font-medium">Wishlist</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Items you've saved for later</p>
          <button 
            onClick={() => setActiveTab("wishlist")} 
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            View Wishlist →
          </button>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <MapPin size={20} className="text-blue-600 mr-2" />
            <h3 className="font-medium">Addresses</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Manage your shipping addresses</p>
          <button 
            onClick={() => setActiveTab("addresses")} 
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            View Addresses →
          </button>
        </div>

        <div className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex items-center mb-2">
            <Settings size={20} className="text-blue-600 mr-2" />
            <h3 className="font-medium">Account Settings</h3>
          </div>
          <p className="text-sm text-gray-500 mb-3">Update your personal information</p>
          <button 
            onClick={() => setActiveTab("settings")} 
            className="text-sm text-blue-600 hover:underline font-medium"
          >
            Edit Settings →
          </button>
        </div>
      </div>
    </div>
  )
}

// Order History Component
function OrderHistory() {
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedOrder, setSelectedOrder] = useState<any>(null)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`/api/user/orders`)
        if (response.ok) {
          const data = await response.json()
          setOrders(data)
        }
      } catch (error) {
        console.error("Error fetching orders:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-50'
      case 'shipped': return 'text-blue-600 bg-blue-50'
      case 'processing': return 'text-yellow-600 bg-yellow-50'
      case 'cancelled': return 'text-red-600 bg-red-50'
      default: return 'text-gray-600 bg-gray-50'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} />
      case 'shipped': return <Truck size={16} />
      case 'processing': return <Clock size={16} />
      default: return <Package size={16} />
    }
  }

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading your orders...</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="py-8 text-center">
        <ShoppingBag size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-2">No orders yet</h3>
        <p className="text-gray-500 mb-4">When you place an order, it will appear here.</p>
        <Link href="/products" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Start Shopping
        </Link>
      </div>
    )
  }

  if (selectedOrder) {
    return (
      <div>
        <div className="flex items-center mb-6">
          <button
            onClick={() => setSelectedOrder(null)}
            className="text-blue-600 hover:text-blue-800 mr-4"
          >
            ← Back to Orders
          </button>
          <h2 className="text-xl font-semibold">Order Details</h2>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-medium mb-2">Order Information</h3>
              <p className="text-sm text-gray-600">Order #: {selectedOrder.orderNumber}</p>
              <p className="text-sm text-gray-600">Date: {new Date(selectedOrder.orderDate).toLocaleDateString()}</p>
              <p className="text-sm text-gray-600">Total: ${selectedOrder.total}</p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Status</h3>
              <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${getStatusColor(selectedOrder.status)}`}>
                {getStatusIcon(selectedOrder.status)}
                <span className="ml-1 capitalize">{selectedOrder.status}</span>
              </div>
              {selectedOrder.trackingNumber && (
                <p className="text-sm text-gray-600 mt-2">Tracking: {selectedOrder.trackingNumber}</p>
              )}
            </div>
            <div>
              <h3 className="font-medium mb-2">Shipping Address</h3>
              <div className="text-sm text-gray-600">
                <p>{selectedOrder.shippingAddress.name}</p>
                <p>{selectedOrder.shippingAddress.street}</p>
                <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="space-y-4">
            {selectedOrder.items.map((item: any) => (
              <div key={item.id} className="flex items-center border rounded-lg p-4">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={80}
                  height={80}
                  className="rounded-md object-cover"
                />
                <div className="ml-4 flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm font-medium">${item.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Order History</h2>
      <div className="space-y-4">
        {orders.map((order) => (
          <div key={order.id} className="border rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Order #{order.orderNumber}</h3>
                <p className="text-sm text-gray-600">{new Date(order.orderDate).toLocaleDateString()}</p>
              </div>
              <div className="text-right">
                <div className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${getStatusColor(order.status)}`}>
                  {getStatusIcon(order.status)}
                  <span className="ml-1 capitalize">{order.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex -space-x-2">
                {order.items.slice(0, 3).map((item: any, index: number) => (
                  <Image
                    key={item.id}
                    src={item.image}
                    alt={item.name}
                    width={40}
                    height={40}
                    className="rounded-md border-2 border-white object-cover"
                  />
                ))}
                {order.items.length > 3 && (
                  <div className="w-10 h-10 rounded-md bg-gray-100 border-2 border-white flex items-center justify-center text-xs font-medium">
                    +{order.items.length - 3}
                  </div>
                )}
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-medium">${order.total}</span>
                <button
                  onClick={() => setSelectedOrder(order)}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Wishlist Component
function WishlistItems() {
  const { wishlistItems, removeFromWishlist, loading } = useWishlist()
  const [products, setProducts] = useState<any[]>([])
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlistItems.length === 0) {
        setProductsLoading(false)
        return
      }

      try {
        const productPromises = wishlistItems.map(productId =>
          fetch(`/api/products/${productId}`).then(res => res.ok ? res.json() : null)
        )
        const productResults = await Promise.all(productPromises)
        setProducts(productResults.filter(Boolean))
      } catch (error) {
        console.error("Error fetching wishlist products:", error)
      } finally {
        setProductsLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [wishlistItems])

  if (loading || productsLoading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading your wishlist...</p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="py-8 text-center">
        <Heart size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium mb-2">Your wishlist is empty</h3>
        <p className="text-gray-500 mb-4">Save items you like for later by clicking the heart icon.</p>
        <Link href="/products" className="inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          Browse Products
        </Link>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">My Wishlist ({products.length} items)</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg p-4">
            <div className="relative">
              <Image
                src={product.images[0] || "/placeholder.svg"}
                alt={product.name}
                width={300}
                height={200}
                className="w-full h-48 object-cover rounded-md mb-4"
              />
              <button
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
            <h3 className="font-medium mb-2">{product.name}</h3>
            <p className="text-lg font-bold text-blue-600 mb-3">${product.price}</p>
            <div className="flex space-x-2">
              <Link
                href={`/products/${product.slug}`}
                className="flex-1 px-3 py-2 bg-blue-600 text-white text-center rounded-md hover:bg-blue-700 text-sm"
              >
                View Details
              </Link>
              <Link
                href={`/products/${product.slug}`}
                className="px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm text-center"
              >
                Add to Cart
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// Address Book Component
function AddressBook() {
  const [addresses, setAddresses] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<any>(null)
  const [formData, setFormData] = useState({
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    phone: '',
    type: 'shipping',
    isDefault: false
  })

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const response = await fetch(`/api/user/addresses`)
        if (response.ok) {
          const data = await response.json()
          setAddresses(data)
        }
      } catch (error) {
        console.error("Error fetching addresses:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchAddresses()
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const method = editingAddress ? 'PUT' : 'POST'
      const url = editingAddress ? `/api/user/addresses/${editingAddress.id}` : '/api/user/addresses'
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        const updatedAddress = await response.json()
        if (editingAddress) {
          setAddresses(addresses.map(addr => addr.id === editingAddress.id ? updatedAddress : addr))
        } else {
          setAddresses([...addresses, updatedAddress])
        }
        setShowForm(false)
        setEditingAddress(null)
        setFormData({
          name: '', street: '', city: '', state: '', zipCode: '', country: 'US', 
          phone: '', type: 'shipping', isDefault: false
        })
      }
    } catch (error) {
      console.error("Error saving address:", error)
    }
  }

  const handleEdit = (address: any) => {
    setEditingAddress(address)
    setFormData(address)
    setShowForm(true)
  }

  const handleDelete = async (addressId: string) => {
    if (confirm('Are you sure you want to delete this address?')) {
      try {
        const response = await fetch(`/api/user/addresses/${addressId}`, {
          method: 'DELETE'
        })
        if (response.ok) {
          setAddresses(addresses.filter(addr => addr.id !== addressId))
        }
      } catch (error) {
        console.error("Error deleting address:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p>Loading your addresses...</p>
      </div>
    )
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Address Book</h2>
        <button
          onClick={() => setShowForm(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          <Plus size={16} className="mr-2" />
          Add Address
        </button>
      </div>

      {showForm && (
        <div className="mb-6 p-6 border rounded-lg bg-gray-50">
          <h3 className="text-lg font-medium mb-4">
            {editingAddress ? 'Edit Address' : 'Add New Address'}
          </h3>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Street Address</label>
              <input
                type="text"
                value={formData.street}
                onChange={(e) => setFormData({...formData, street: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">State</label>
              <input
                type="text"
                value={formData.state}
                onChange={(e) => setFormData({...formData, state: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">ZIP Code</label>
              <input
                type="text"
                value={formData.zipCode}
                onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Address Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="shipping">Shipping</option>
                <option value="billing">Billing</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={formData.isDefault}
                  onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm">Set as default address</span>
              </label>
            </div>
            <div className="md:col-span-2 flex space-x-3">
              <button
                type="submit"
                className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              >
                <Save size={16} className="mr-2" />
                {editingAddress ? 'Update' : 'Save'} Address
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false)
                  setEditingAddress(null)
                  setFormData({
                    name: '', street: '', city: '', state: '', zipCode: '', country: 'US',
                    phone: '', type: 'shipping', isDefault: false
                  })
                }}
                className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {addresses.length === 0 ? (
        <div className="py-8 text-center">
          <MapPin size={48} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-lg font-medium mb-2">No addresses saved</h3>
          <p className="text-gray-500 mb-4">Add a shipping address to speed up checkout.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((address) => (
            <div key={address.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    address.type === 'shipping' ? 'bg-blue-100 text-blue-600' : 'bg-green-100 text-green-600'
                  }`}>
                    {address.type}
                  </span>
                  {address.isDefault && (
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-100 text-yellow-600 ml-2">
                      Default
                    </span>
                  )}
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(address)}
                    className="text-blue-600 hover:text-blue-800"
                  >
                    <Edit size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(address.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <div className="text-sm">
                <p className="font-medium">{address.name}</p>
                <p>{address.street}</p>
                <p>{address.city}, {address.state} {address.zipCode}</p>
                <p className="text-gray-600">{address.phone}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Account Settings Component
function AccountSettings({ 
  user, 
  onUserUpdate 
}: { 
  user: User & { id: string; role: string }, 
  onUserUpdate: (user: User & { id: string; role: string }) => void 
}) {
  const { data: session, update } = useSession();
  const [formData, setFormData] = useState({
    name: user.name || '',
    email: user.email || '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [activeSection, setActiveSection] = useState('profile')
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email
        })
      })

      if (response.ok) {
        setMessage('Profile updated successfully!')
        
        // Update the local user state immediately
        const updatedUser = {
          ...user,
          name: formData.name,
          email: formData.email
        }
        onUserUpdate(updatedUser)
        
        // Update the session for navbar consistency
        if (update) {
          await update()
        }
        
        setTimeout(() => setMessage(''), 3000)
      } else {
        const errorData = await response.json()
        setMessage(`Error: ${errorData.error || 'Failed to update profile'}`)
      }
    } catch (error) {
      console.error('Profile update error:', error)
      setMessage('Error updating profile. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage('New passwords do not match.')
      return
    }

    setSaving(true)
    setMessage('')

    try {
      const response = await fetch('/api/user/password', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: formData.currentPassword,
          newPassword: formData.newPassword
        })
      })

      if (response.ok) {
        setMessage('Password updated successfully!')
        setFormData({...formData, currentPassword: '', newPassword: '', confirmPassword: ''})
        setTimeout(() => setMessage(''), 3000)
      } else {
        setMessage('Error updating password. Please check your current password.')
      }
    } catch (error) {
      setMessage('Error updating password. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">Account Settings</h2>
      
      <div className="flex space-x-1 mb-6 border-b">
        <button
          onClick={() => setActiveSection('profile')}
          className={`px-4 py-2 font-medium ${
            activeSection === 'profile'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Profile Information
        </button>
        <button
          onClick={() => setActiveSection('security')}
          className={`px-4 py-2 font-medium ${
            activeSection === 'security'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          Security
        </button>
      </div>

      {message && (
        <div className={`p-4 rounded-md mb-6 ${
          message.includes('successfully') ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'
        }`}>
          <div className="flex items-center">
            {message.includes('successfully') ? (
              <CheckCircle size={16} className="mr-2" />
            ) : (
              <AlertCircle size={16} className="mr-2" />
            )}
            {message}
          </div>
        </div>
      )}

      {activeSection === 'profile' && (
        <form onSubmit={handleProfileUpdate} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <p className="text-sm text-gray-500 mt-1">
              Note: Changing your email will require email verification.
            </p>
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {saving ? 'Updating...' : 'Update Profile'}
          </button>
        </form>
      )}

      {activeSection === 'security' && (
        <form onSubmit={handlePasswordChange} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Current Password</label>
            <input
              type="password"
              value={formData.currentPassword}
              onChange={(e) => setFormData({...formData, currentPassword: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">New Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              minLength={8}
            />
            <p className="text-sm text-gray-500 mt-1">
              Password must be at least 8 characters long.
            </p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Confirm New Password</label>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            disabled={saving}
            className="flex items-center px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            ) : (
              <Save size={16} className="mr-2" />
            )}
            {saving ? 'Updating...' : 'Update Password'}
          </button>
        </form>
      )}
    </div>
  )
} 