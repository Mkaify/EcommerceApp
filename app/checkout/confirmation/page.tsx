import type { Metadata } from "next"
import OrderConfirmation from "@/components/checkout/order-confirmation"

export const metadata: Metadata = {
  title: "Order Confirmation | E-commerce Store",
  description: "Thank you for your order",
}

export default function OrderConfirmationPage() {
  return <OrderConfirmation />
}
