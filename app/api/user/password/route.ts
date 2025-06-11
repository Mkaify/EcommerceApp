import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, validateUserPassword, updateUserPassword } from "@/app/api/auth/[...nextauth]/route"

// Update user password
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { currentPassword, newPassword } = await request.json()

    if (!currentPassword || !newPassword) {
      return NextResponse.json({ error: "Current password and new password are required" }, { status: 400 })
    }

    if (newPassword.length < 8) {
      return NextResponse.json({ error: "New password must be at least 8 characters long" }, { status: 400 })
    }

    // Validate current password
    const isCurrentPasswordValid = validateUserPassword(session.user.email, currentPassword)
    if (!isCurrentPasswordValid) {
      return NextResponse.json({ error: "Current password is incorrect" }, { status: 400 })
    }

    // Update password (this REPLACES the old password)
    const passwordUpdated = updateUserPassword(session.user.email, newPassword)
    
    if (!passwordUpdated) {
      return NextResponse.json({ error: "Failed to update password" }, { status: 500 })
    }

    // Log for verification
    console.log(`Password updated for user: ${session.user.email}`)

    return NextResponse.json({ 
      message: "Password updated successfully"
    })
  } catch (error) {
    console.error("Error updating password:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 