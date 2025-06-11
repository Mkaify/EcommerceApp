"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"

export default function NewsletterSignup() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email) return

    setStatus("loading")

    try {
      // Here you would call your API to subscribe the user
      // For now, we'll simulate a successful subscription
      await new Promise((resolve) => setTimeout(resolve, 1000))

      setStatus("success")
      setMessage("Thank you for subscribing to our newsletter!")
      setEmail("")
    } catch (error) {
      setStatus("error")
      setMessage("An error occurred. Please try again.")
    }
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-gray-600">Stay updated with our latest products, offers, and news.</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Your email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <motion.button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
            whileTap={{ scale: 0.95 }}
          >
            {status === "loading" ? "Subscribing..." : "Subscribe"}
          </motion.button>
        </form>

        {status === "success" && (
          <motion.p
            className="mt-4 text-center text-green-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>
        )}

        {status === "error" && (
          <motion.p
            className="mt-4 text-center text-red-600"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {message}
          </motion.p>
        )}
      </div>
    </section>
  )
}
