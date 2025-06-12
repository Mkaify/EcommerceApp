import { type NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { 
  getUserByEmail, 
  createOrGetUser, 
  validateUserPassword 
} from "@/lib/auth-utils"

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