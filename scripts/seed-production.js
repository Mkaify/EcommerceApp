const { PrismaClient } = require('@prisma/client')

// Use the Vercel Postgres URL from environment
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.POSTGRES_PRISMA_URL || process.env.DATABASE_URL
    }
  }
})

async function seedProduction() {
  try {
    console.log('🌱 Starting production database seeding...')

    // Create categories
    console.log('📂 Creating categories...')
    const categories = await Promise.all([
      prisma.category.upsert({
        where: { slug: 'electronics' },
        update: {},
        create: { id: 'cat1', name: 'Electronics', slug: 'electronics' }
      }),
      prisma.category.upsert({
        where: { slug: 'clothing' },
        update: {},
        create: { id: 'cat2', name: 'Clothing', slug: 'clothing' }
      }),
      prisma.category.upsert({
        where: { slug: 'home-garden' },
        update: {},
        create: { id: 'cat3', name: 'Home & Garden', slug: 'home-garden' }
      }),
      prisma.category.upsert({
        where: { slug: 'sports' },
        update: {},
        create: { id: 'cat4', name: 'Sports', slug: 'sports' }
      })
    ])
    console.log(`✅ Created ${categories.length} categories`)

    // Create products
    console.log('🛍️ Creating products...')
    const products = await Promise.all([
      prisma.product.upsert({
        where: { slug: 'wireless-bluetooth-headphones' },
        update: {},
        create: {
          id: 'prod1',
          name: 'Wireless Bluetooth Headphones',
          slug: 'wireless-bluetooth-headphones',
          description: 'High-quality wireless headphones with noise cancellation and long battery life.',
          price: 199.99,
          image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
          featured: true,
          categoryId: 'cat1'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'smartphone-case' },
        update: {},
        create: {
          id: 'prod2',
          name: 'Smartphone Case',
          slug: 'smartphone-case',
          description: 'Durable protective case for your smartphone with military-grade protection.',
          price: 29.99,
          image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
          featured: false,
          categoryId: 'cat1'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'cotton-t-shirt' },
        update: {},
        create: {
          id: 'prod3',
          name: 'Cotton T-Shirt',
          slug: 'cotton-t-shirt',
          description: 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.',
          price: 24.99,
          image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
          featured: true,
          categoryId: 'cat2'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'running-shoes' },
        update: {},
        create: {
          id: 'prod4',
          name: 'Running Shoes',
          slug: 'running-shoes',
          description: 'Lightweight and comfortable running shoes perfect for daily workouts.',
          price: 129.99,
          image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
          featured: true,
          categoryId: 'cat4'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'coffee-maker' },
        update: {},
        create: {
          id: 'prod5',
          name: 'Coffee Maker',
          slug: 'coffee-maker',
          description: 'Programmable coffee maker with thermal carafe and built-in grinder.',
          price: 149.99,
          image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=500&h=500&fit=crop',
          featured: false,
          categoryId: 'cat3'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'wireless-mouse' },
        update: {},
        create: {
          id: 'prod6',
          name: 'Wireless Mouse',
          slug: 'wireless-mouse',
          description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
          price: 49.99,
          image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop',
          featured: false,
          categoryId: 'cat1'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'yoga-mat' },
        update: {},
        create: {
          id: 'prod7',
          name: 'Yoga Mat',
          slug: 'yoga-mat',
          description: 'Non-slip yoga mat made from eco-friendly materials, perfect for all fitness levels.',
          price: 39.99,
          image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
          featured: false,
          categoryId: 'cat4'
        }
      }),
      prisma.product.upsert({
        where: { slug: 'desk-lamp' },
        update: {},
        create: {
          id: 'prod8',
          name: 'Desk Lamp',
          slug: 'desk-lamp',
          description: 'Modern LED desk lamp with adjustable brightness and USB charging port.',
          price: 79.99,
          image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop',
          featured: false,
          categoryId: 'cat3'
        }
      })
    ])
    console.log(`✅ Created ${products.length} products`)

    // Create demo users
    console.log('👥 Creating demo users...')
    const users = await Promise.all([
      prisma.user.upsert({
        where: { email: 'demo@example.com' },
        update: {},
        create: {
          id: 'user1',
          email: 'demo@example.com',
          password: 'password',
          name: 'Demo User'
        }
      }),
      prisma.user.upsert({
        where: { email: 'admin@example.com' },
        update: {},
        create: {
          id: 'user2',
          email: 'admin@example.com',
          password: 'password',
          name: 'Admin User'
        }
      })
    ])
    console.log(`✅ Created ${users.length} demo users`)

    console.log('🎉 Production database seeding completed successfully!')
    console.log('🌐 Your site should now have products at: https://v0-e-commerce-platform-requirements-oc7phn9tm.vercel.app')
    
  } catch (error) {
    console.error('❌ Error seeding database:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

seedProduction()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 