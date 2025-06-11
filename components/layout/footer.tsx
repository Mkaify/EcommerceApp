import React from "react"
import Link from "next/link"

const Footer: React.FC = () => (
  <footer className="w-full bg-gray-900 text-white mt-8">
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div className="md:col-span-1">
          <h3 className="text-xl font-bold mb-4">Ecommerce</h3>
          <p className="text-gray-300 text-sm mb-4">
            Your trusted online shopping destination with quality products and excellent service.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="text-gray-300 hover:text-white transition-colors">Home</Link></li>
            <li><Link href="/shop" className="text-gray-300 hover:text-white transition-colors">Shop</Link></li>
            <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors">Products</Link></li>
            <li><Link href="/about" className="text-gray-300 hover:text-white transition-colors">About</Link></li>
            <li><Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Service */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/account" className="text-gray-300 hover:text-white transition-colors">My Account</Link></li>
            <li><Link href="/wishlist" className="text-gray-300 hover:text-white transition-colors">Wishlist</Link></li>
            <li><Link href="/cart" className="text-gray-300 hover:text-white transition-colors">Shopping Cart</Link></li>
            <li><Link href="/checkout" className="text-gray-300 hover:text-white transition-colors">Checkout</Link></li>
            <li><a href="mailto:support@ecommerce.com" className="text-gray-300 hover:text-white transition-colors">Support</a></li>
          </ul>
        </div>

        {/* Legal */}
        <div>
          <h4 className="text-lg font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/cookie-policy" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</Link></li>
            <li><Link href="/refund-policy" className="text-gray-300 hover:text-white transition-colors">Refund Policy</Link></li>
            <li><Link href="/shipping" className="text-gray-300 hover:text-white transition-colors">Shipping Info</Link></li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-700 mt-8 pt-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Ecommerce. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
              Terms
            </Link>
            <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
              Privacy
            </Link>
            <a href="mailto:legal@ecommerce.com" className="text-gray-300 hover:text-white text-sm transition-colors">
              Legal
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
)

export default Footer
