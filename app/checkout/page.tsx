import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import CheckoutPage from "@/components/checkout/checkout-page"

export const metadata = {
  title: "Checkout | E-commerce Store",
  description: "Complete your purchase",
}

export default async function Checkout() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/checkout")
  }

  // Ensure user has all required fields
  const user = {
    ...session.user,
    name: session.user.name || "User",
    email: session.user.email || "",
    id: session.user.id || "",
    role: session.user.role || "user"
  }

  return <CheckoutPage user={user} />
}
