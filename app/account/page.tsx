import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import AccountDashboard from "@/components/account/account-dashboard"

export const metadata = {
  title: "Account Dashboard | E-commerce Store",
  description: "Manage your account, orders, and personal information",
}

export default async function AccountPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/auth/login?callbackUrl=/account")
  }

  // Ensure user has all required fields
  const user = {
    ...session.user,
    name: session.user.name || "User",
    email: session.user.email || "",
    id: session.user.id || "",
    role: session.user.role || "user"
  }

  return <AccountDashboard user={user} />
}
