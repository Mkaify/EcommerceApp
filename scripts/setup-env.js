#!/usr/bin/env node

/**
 * Setup environment variables for Prisma schema validation
 * Ensures DATABASE_URL is set to a valid PostgreSQL URL (not Prisma Accelerate URL)
 * This is needed because Prisma schema validation requires postgresql:// or postgres:// protocol
 */

function isValidPostgresUrl(url) {
  if (!url) return false
  // Check if URL starts with valid PostgreSQL protocol (not prisma+postgres://)
  return (
    url.startsWith('postgresql://') ||
    url.startsWith('postgres://')
  ) && !url.startsWith('prisma+postgres://')
}

function setupDatabaseUrl() {
  // Check if DATABASE_URL is already set and valid
  if (isValidPostgresUrl(process.env.DATABASE_URL)) {
    console.log('✓ DATABASE_URL is already set and valid')
    return
  }

  // Try to get a valid PostgreSQL URL from Vercel environment variables
  // Priority order:
  // 1. POSTGRES_URL (Vercel Postgres direct connection)
  // 2. POSTGRES_URL_NON_POOLING (Vercel Postgres non-pooling)
  // 3. DATABASE_URL_UNPOOLED (Neon unpooled)
  // 4. POSTGRES_PRISMA_URL (convert from Accelerate if possible - but we need regular URL)

  const candidates = [
    process.env.POSTGRES_URL,
    process.env.POSTGRES_URL_NON_POOLING,
    process.env.DATABASE_URL_UNPOOLED,
    process.env.POSTGRES_URL_NO_SSL,
  ]

  for (const candidate of candidates) {
    if (isValidPostgresUrl(candidate)) {
      process.env.DATABASE_URL = candidate
      console.log('✓ Set DATABASE_URL from available environment variable')
      return
    }
  }

  // If we still don't have a valid URL, check if we have POSTGRES_PRISMA_URL
  // This is Prisma Accelerate URL which we can't use for schema validation
  // But we can try to extract the underlying connection info if available
  if (process.env.POSTGRES_PRISMA_URL) {
    console.warn('⚠ POSTGRES_PRISMA_URL is set but cannot be used for schema validation')
    console.warn('⚠ Prisma Accelerate URLs (prisma+postgres://) are not valid for schema validation')
    console.warn('⚠ Please set DATABASE_URL to a regular PostgreSQL URL in Vercel environment variables')
  }

  // Final check - if DATABASE_URL is still not valid, warn but don't fail
  // This allows the build to continue, but Prisma generate will fail with a clearer error
  if (!isValidPostgresUrl(process.env.DATABASE_URL)) {
    console.error('✗ DATABASE_URL is not set or invalid for Prisma schema validation')
    console.error('✗ Please ensure DATABASE_URL is set to a PostgreSQL URL (postgresql:// or postgres://)')
    console.error('✗ In Vercel, set DATABASE_URL to your PostgreSQL connection string')
    // Don't exit with error here - let Prisma generate fail with a clearer error message
  }
}

// Run the setup
setupDatabaseUrl()

