import { PrismaClient } from "@prisma/client"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Log database connection info
console.log('🔗 Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
console.log('🔗 Postgres Prisma URL:', process.env.POSTGRES_PRISMA_URL ? 'Set' : 'Not set')
console.log('🔗 Environment:', process.env.NODE_ENV)

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
