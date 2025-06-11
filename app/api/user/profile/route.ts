import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { authOptions, updateUser, getUserByEmail, createOrGetUser } from "@/app/api/auth/[...nextauth]/route"

// Update user profile
export async function PUT(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { name, email } = await request.json()

    if (!name || !email) {
      return NextResponse.json({ error: "Name and email are required" }, { status: 400 })
    }

    console.log(`Updating profile for user: ${session.user.email}`)
    
    // Check if user exists in store
    let existingUser = getUserByEmail(session.user.email)
    console.log(`Current user in store:`, existingUser)

    // If user doesn't exist in store, create them (fallback for existing sessions)
    if (!existingUser) {
      console.log(`User not in store, creating them now`)
      existingUser = createOrGetUser({
        id: session.user.id || session.user.email,
        name: session.user.name || "User",
        email: session.user.email,
        role: session.user.role || "user"
      })
      console.log(`Created user in store:`, existingUser)
    }

    // Update the user in the NextAuth user store
    const updatedUser = updateUser(session.user.email, { name, email })

    if (!updatedUser) {
      return NextResponse.json({ error: "Failed to update user after creation" }, { status: 500 })
    }

    console.log(`Updated user:`, updatedUser)

    return NextResponse.json({ 
      message: "Profile updated successfully",
      user: { name: updatedUser.name, email: updatedUser.email }
    })
  } catch (error) {
    console.error("Error updating profile:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
} 