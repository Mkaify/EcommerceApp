const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function debugDatabase() {
  try {
    console.log('🔍 Checking database connection...')
    
    // Test connection
    await prisma.$queryRaw`SELECT 1`
    console.log('✅ Database connection successful')
    
    // Check categories
    const categories = await prisma.category.findMany()
    console.log(`📂 Categories found: ${categories.length}`)
    categories.forEach(cat => console.log(`   - ${cat.name} (${cat.slug})`))
    
    // Check products
    const products = await prisma.product.findMany()
    console.log(`🛍️ Products found: ${products.length}`)
    products.forEach(prod => console.log(`   - ${prod.name} (featured: ${prod.featured}, published: ${prod.isPublished})`))
    
    // Check featured products specifically
    const featuredProducts = await prisma.product.findMany({
      where: {
        featured: true,
        isPublished: true,
      }
    })
    console.log(`⭐ Featured products: ${featuredProducts.length}`)
    featuredProducts.forEach(prod => console.log(`   - ${prod.name}`))
    
  } catch (error) {
    console.error('❌ Database error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

debugDatabase() 