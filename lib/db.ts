import { PrismaClient } from "@prisma/client"

// PrismaClient is attached to the `global` object in development to prevent
// exhausting your database connection limit.
// Learn more: https://pris.ly/d/help/next-js-best-practices

const globalForPrisma = global as unknown as { prisma: PrismaClient }

// Determine which database URL to use at runtime
// Priority: POSTGRES_PRISMA_URL (Prisma Accelerate) > POSTGRES_DATABASE_URL > DATABASE_URL
const getDatabaseUrl = () => {
  if (process.env.POSTGRES_PRISMA_URL) {
    return process.env.POSTGRES_PRISMA_URL
  }
  if (process.env.POSTGRES_DATABASE_URL) {
    return process.env.POSTGRES_DATABASE_URL
  }
  return process.env.DATABASE_URL
}

const databaseUrl = getDatabaseUrl()

// Log database connection info
console.log('🔗 Database URL:', process.env.DATABASE_URL ? 'Set' : 'Not set')
console.log('🔗 Postgres Prisma URL:', process.env.POSTGRES_PRISMA_URL ? 'Set' : 'Not set')
console.log('🔗 Postgres Database URL:', process.env.POSTGRES_DATABASE_URL ? 'Set' : 'Not set')
console.log('🔗 Environment:', process.env.NODE_ENV)
console.log('🔗 Using URL:', databaseUrl ? 'Set' : 'Not set')

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    datasources: databaseUrl
      ? {
          db: {
            url: databaseUrl,
          },
        }
      : undefined,
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
