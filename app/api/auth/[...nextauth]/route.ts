import NextAuth, { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

// File-based user storage for persistence across server restarts
const USERS_FILE = join(process.cwd(), 'temp-users.json')

// Initialize users file if it doesn't exist
function initUsersFile() {
  if (!existsSync(USERS_FILE)) {
    // Initialize with admin user
    const initialUsers = {
      "admin@example.com": {
        id: "1",
        name: "Admin User",
        email: "admin@example.com", 
        role: "admin",
        password: "password"
      }
    }
    writeFileSync(USERS_FILE, JSON.stringify(initialUsers, null, 2), 'utf8')
  }
}



// Read users from file
function readUsers() {
  try {
    initUsersFile()
    const data = readFileSync(USERS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading users file:', error)
    return {}
  }
}

// Write users to file
function writeUsers(users: Record<string, any>) {
  try {
    writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), 'utf8')
  } catch (error) {
    console.error('Error writing users file:', error)
  }
}

// Function to get user by email
export function getUserByEmail(email: string) {
  const users = readUsers()
  return users[email] || null
}

// Function to update user
export function updateUser(email: string, updates: Partial<{ name: string; role: string }>) {
  const users = readUsers()
  if (users[email]) {
    users[email] = { ...users[email], ...updates }
    writeUsers(users)
    return users[email]
  }
  return null
}

// Function to create or get user
export function createOrGetUser(userData: { id: string; name: string; email: string; role: string; password?: string }) {
  const users = readUsers()
  let user = users[userData.email]
  if (!user) {
    // Only create if user doesn't exist
    users[userData.email] = userData
    writeUsers(users)
    user = userData
  }
  // Return existing user without overwriting their data
  return user
}

// Function to validate user password
export function validateUserPassword(email: string, password: string): boolean {
  const users = readUsers()
  const user = users[email]
  if (!user) return false
  
  // For demo purposes, we'll store passwords as plain text
  // In a real app, you'd use bcrypt.compare(password, user.hashedPassword)
  return user.password === password
}

// Function to update user password
export function updateUserPassword(email: string, newPassword: string): boolean {
  const users = readUsers()
  if (users[email]) {
    users[email] = { ...users[email], password: newPassword }
    writeUsers(users)
    return true
  }
  return false
}

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET || "your-secret-key-here",
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "admin@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        // Check if user exists and validate password
        const existingUser = getUserByEmail(credentials.email)
        
        if (existingUser) {
          // Validate password for existing user
          const isValidPassword = validateUserPassword(credentials.email, credentials.password)
          if (isValidPassword) {
            return existingUser
          } else {
            return null // Invalid password
          }
        } else {
          // For demo purposes, create new users with the provided password
          // In a real app, you'd have a separate registration process
          const userData = {
            id: credentials.email,
            name: "Demo User",
            email: credentials.email,
            role: "user",
            password: credentials.password
          }
          return createOrGetUser(userData)
        }
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
    signOut: "/"
  },
  callbacks: {
    async jwt({ token, user, trigger }) {
      // If this is a sign in, save the user info to the token and ensure user is in store
      if (user) {
        token.id = user.id
        token.role = user.role
        
        // Ensure user is in the store
        createOrGetUser({
          id: user.id,
          name: user.name || "User",
          email: user.email,
          role: user.role
        })
      }
      
      // If this is an update trigger, get the latest user data
      if (trigger === "update" && token.email) {
        const latestUser = getUserByEmail(token.email as string)
        if (latestUser) {
          token.name = latestUser.name
          token.email = latestUser.email
        }
      }
      
      return token
    },
    async session({ session, token }) {
      // Always fetch the latest user data when creating a session
      if (token.email) {
        const latestUser = getUserByEmail(token.email as string)
        if (latestUser) {
          session.user.id = latestUser.id
          session.user.name = latestUser.name
          session.user.email = latestUser.email
          session.user.role = latestUser.role
        } else {
          // Fallback to token data
          session.user.id = token.id
          session.user.name = token.name
          session.user.email = token.email
          session.user.role = token.role
        }
      }
      
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
