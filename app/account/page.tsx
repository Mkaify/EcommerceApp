import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
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

  return <AccountDashboard user={session.user} />
}
