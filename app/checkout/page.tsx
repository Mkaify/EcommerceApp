import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
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

  return <CheckoutPage user={session.user} />
}
