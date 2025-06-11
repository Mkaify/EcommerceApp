"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/hooks/useCart"
import type { User } from "next-auth"
import ShippingForm from "./shipping-form"
import PaymentForm from "./payment-form"
import OrderSummary from "./order-summary"

interface CheckoutPageProps {
  user: User & {
    id: string
  }
}

type CheckoutStep = "shipping" | "payment" | "review"

export default function CheckoutPage({ user }: CheckoutPageProps) {
  const router = useRouter()
  const { state } = useCart()
  const [currentStep, setCurrentStep] = useState<CheckoutStep>("shipping")
  const [isClient, setIsClient] = useState(false)
  const [shippingData, setShippingData] = useState<any>(null)
  const [paymentData, setPaymentData] = useState<any>(null)

  // Handle hydration mismatch
  useEffect(() => {
    setIsClient(true)
  }, [])

  // Redirect to cart if cart is empty
  useEffect(() => {
    if (isClient && state.items.length === 0) {
      router.push("/cart")
    }
  }, [isClient, state.items.length, router])

  if (!isClient) {
    return <div className="container mx-auto px-4 py-8">Loading checkout...</div>
  }

  const handleShippingSubmit = (data: any) => {
    setShippingData(data)
    setCurrentStep("payment")
  }

  const handlePaymentSubmit = (data: any) => {
    setPaymentData(data)
    setCurrentStep("review")
  }

  const handleStepChange = (step: CheckoutStep) => {
    setCurrentStep(step)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>

      {/* Checkout progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          <div
            className={`flex flex-col items-center ${currentStep === "shipping" ? "text-blue-600" : "text-gray-500"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === "shipping" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              1
            </div>
            <span className="text-sm">Shipping</span>
          </div>

          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className="h-full bg-blue-600" style={{ width: currentStep === "shipping" ? "0%" : "100%" }}></div>
          </div>

          <div
            className={`flex flex-col items-center ${currentStep === "payment" ? "text-blue-600" : "text-gray-500"}`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === "payment" || currentStep === "review" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              2
            </div>
            <span className="text-sm">Payment</span>
          </div>

          <div className="flex-1 h-1 mx-2 bg-gray-200">
            <div className="h-full bg-blue-600" style={{ width: currentStep === "review" ? "100%" : "0%" }}></div>
          </div>

          <div className={`flex flex-col items-center ${currentStep === "review" ? "text-blue-600" : "text-gray-500"}`}>
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 ${
                currentStep === "review" ? "bg-blue-600 text-white" : "bg-gray-200"
              }`}
            >
              3
            </div>
            <span className="text-sm">Review</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          {currentStep === "shipping" && (
            <ShippingForm onSubmit={handleShippingSubmit} initialData={shippingData} userId={user.id} />
          )}

          {currentStep === "payment" && (
            <PaymentForm
              onSubmit={handlePaymentSubmit}
              onBack={() => setCurrentStep("shipping")}
              initialData={paymentData}
            />
          )}

          {currentStep === "review" && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Review Your Order</h2>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Shipping Information</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p>{shippingData.name}</p>
                  <p>{shippingData.address1}</p>
                  {shippingData.address2 && <p>{shippingData.address2}</p>}
                  <p>
                    {shippingData.city}, {shippingData.state} {shippingData.postalCode}
                  </p>
                  <p>{shippingData.country}</p>
                  <p>{shippingData.phone}</p>
                </div>
                <button
                  onClick={() => setCurrentStep("shipping")}
                  className="text-sm text-blue-600 mt-2 hover:underline"
                >
                  Edit
                </button>
              </div>

              <div className="mb-6">
                <h3 className="font-medium mb-2">Payment Method</h3>
                <div className="bg-gray-50 p-4 rounded">
                  <p>Credit Card ending in {paymentData.cardNumber.slice(-4)}</p>
                </div>
                <button
                  onClick={() => setCurrentStep("payment")}
                  className="text-sm text-blue-600 mt-2 hover:underline"
                >
                  Edit
                </button>
              </div>

              <button
                onClick={() => {
                  // Here you would submit the order to your API
                  router.push("/checkout/confirmation")
                }}
                className="w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Place Order
              </button>
            </div>
          )}
        </div>

        <div className="lg:col-span-1">
          <OrderSummary />
        </div>
      </div>
    </div>
  )
}
