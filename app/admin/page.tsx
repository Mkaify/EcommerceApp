import { getServerSession } from "next-auth/next"
import { redirect } from "next/navigation"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import AdminDashboard from "@/components/admin/admin-dashboard"

export const metadata = {
  title: "Admin Dashboard | E-commerce Store",
  description: "Manage your store, products, orders, and users",
}

export default async function AdminPage() {
  const session = await getServerSession(authOptions)

  if (!session || session.user.role !== "ADMIN") {
    redirect("/")
  }

  return <AdminDashboard />
}
