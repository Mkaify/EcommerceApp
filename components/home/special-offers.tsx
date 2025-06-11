"use client"

import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function SpecialOffers() {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Special Offers</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Summer Sale Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden h-80 shadow-xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop&q=80"
              alt="Summer Sale"
              fill
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-blue-700/80 to-purple-600/90"></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">Limited Time</span>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-sm">Save up to</div>
                  <div className="text-white text-3xl font-bold">50%</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-4xl font-bold mb-3 text-white leading-tight">
                  Summer Sale
                </h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  Discover amazing deals on selected items
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Shop Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* New Collection Card */}
          <motion.div
            className="relative rounded-2xl overflow-hidden h-80 shadow-xl"
            whileHover={{ scale: 1.02, y: -5 }}
            transition={{ duration: 0.3 }}
          >
            {/* Background Image */}
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=800&h=600&fit=crop&q=80"
              alt="New Collection"
              fill
              className="object-cover"
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-gray-900/90 via-gray-800/85 to-black/90"></div>
            
            {/* Content */}
            <div className="absolute inset-0 p-8 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div className="bg-white/20 backdrop-blur-sm rounded-full px-3 py-1">
                  <span className="text-white text-sm font-medium">New Arrivals</span>
                </div>
                <div className="text-right">
                  <div className="text-white/80 text-sm">Fresh</div>
                  <div className="text-white text-3xl font-bold">Styles</div>
                </div>
              </div>
              
              <div>
                <h3 className="text-4xl font-bold mb-3 text-white leading-tight">
                  New Collection
                </h3>
                <p className="text-white/90 text-lg mb-6 leading-relaxed">
                  Discover our latest trending arrivals
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-2 px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg"
                >
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
