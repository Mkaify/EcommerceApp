"use client"

import { useState } from "react"
import Link from "next/link"
import { LayoutDashboard, Package, ShoppingCart, Users, Settings, BarChart, PlusCircle } from "lucide-react"

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("dashboard")

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setActiveTab("dashboard")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "dashboard" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("products")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "products" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Package className="mr-3 h-5 w-5" />
                Products
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("orders")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "orders" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <ShoppingCart className="mr-3 h-5 w-5" />
                Orders
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("users")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "users" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Users className="mr-3 h-5 w-5" />
                Users
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "analytics" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <BarChart className="mr-3 h-5 w-5" />
                Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full flex items-center p-2 rounded-md ${
                  activeTab === "settings" ? "bg-blue-50 text-blue-600" : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {activeTab === "dashboard" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Dashboard Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Total Sales</h3>
                <p className="text-3xl font-bold">$12,345</p>
                <p className="text-green-600 text-sm mt-2">+12% from last month</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Orders</h3>
                <p className="text-3xl font-bold">156</p>
                <p className="text-green-600 text-sm mt-2">+8% from last month</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Customers</h3>
                <p className="text-3xl font-bold">432</p>
                <p className="text-green-600 text-sm mt-2">+5% from last month</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-gray-500 text-sm font-medium mb-2">Products</h3>
                <p className="text-3xl font-bold">89</p>
                <p className="text-gray-600 text-sm mt-2">2 added this month</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Recent Orders</h3>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Order ID
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Customer
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Total
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#1234</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">John Doe</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2023-06-15</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                            Delivered
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$125.00</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#1233</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Jane Smith</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2023-06-14</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                            Shipped
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$89.50</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">#1232</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">Robert Johnson</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">2023-06-14</td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm">
                          <span className="px-2 py-1 text-xs font-medium rounded-full bg-yellow-100 text-yellow-800">
                            Processing
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">$245.99</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setActiveTab("orders")}
                  >
                    View all orders
                  </Link>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow">
                <h3 className="text-lg font-medium mb-4">Popular Products</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md mr-4"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Product Name 1</h4>
                      <p className="text-xs text-gray-500">Category: Electronics</p>
                    </div>
                    <div className="text-sm font-medium">$99.99</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md mr-4"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Product Name 2</h4>
                      <p className="text-xs text-gray-500">Category: Clothing</p>
                    </div>
                    <div className="text-sm font-medium">$49.99</div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gray-200 rounded-md mr-4"></div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium">Product Name 3</h4>
                      <p className="text-xs text-gray-500">Category: Home</p>
                    </div>
                    <div className="text-sm font-medium">$79.99</div>
                  </div>
                </div>
                <div className="mt-4">
                  <Link
                    href="#"
                    className="text-sm text-blue-600 hover:underline"
                    onClick={() => setActiveTab("products")}
                  >
                    View all products
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "products" && (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Products</h2>
              <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                <PlusCircle className="mr-2 h-5 w-5" />
                Add Product
              </button>
            </div>

            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-4 border-b">
                <input type="text" placeholder="Search products..." className="w-full p-2 border rounded-md" />
              </div>

              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Product
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Category
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Inventory
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {/* Product rows would be mapped here */}
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md"></div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Product Name 1</div>
                            <div className="text-sm text-gray-500">SKU: PRD-001</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Electronics</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$99.99</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">25</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-gray-200 rounded-md"></div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">Product Name 2</div>
                            <div className="text-sm text-gray-500">SKU: PRD-002</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Clothing</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$49.99</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">42</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                          Published
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a href="#" className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-900">
                          Delete
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t">
                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">Showing 1 to 2 of 2 results</div>
                  <div className="flex space-x-2">
                    <button className="px-3 py-1 border rounded-md text-sm">Previous</button>
                    <button className="px-3 py-1 border rounded-md text-sm bg-blue-600 text-white">1</button>
                    <button className="px-3 py-1 border rounded-md text-sm">Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Other tabs would be implemented similarly */}
        {activeTab === "orders" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Orders</h2>
            <div className="text-center py-8">
              <p>Orders management implementation coming soon</p>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Users</h2>
            <div className="text-center py-8">
              <p>User management implementation coming soon</p>
            </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Analytics</h2>
            <div className="text-center py-8">
              <p>Analytics dashboard implementation coming soon</p>
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Settings</h2>
            <div className="text-center py-8">
              <p>Settings page implementation coming soon</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
