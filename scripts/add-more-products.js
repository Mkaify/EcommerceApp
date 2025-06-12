const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function addMoreProducts() {
  try {
    console.log('🌱 Adding more products to the database...')

    // Create/ensure the new Shoes category exists
    const shoes = await prisma.category.upsert({
      where: { slug: 'shoes' },
      update: {},
      create: {
        id: 'cat5',
        name: 'Shoes',
        slug: 'shoes',
      },
    })

    // Get existing categories
    const electronics = await prisma.category.findUnique({
      where: { slug: 'electronics' }
    })
    const clothing = await prisma.category.findUnique({
      where: { slug: 'clothing' }
    })
    const home = await prisma.category.findUnique({
      where: { slug: 'home-garden' }
    })

    if (!electronics || !clothing || !home) {
      throw new Error('Required categories not found')
    }

    console.log('📂 Categories ready')

    // Add new products (only ones that don't exist)
    const newProducts = [
      // Electronics Category - New ones
      {
        id: 'prod9',
        name: 'Smart Fitness Watch',
        slug: 'smart-fitness-watch',
        description: 'Advanced fitness tracking with heart rate monitor and GPS.',
        price: 299.99,
        categoryId: electronics.id,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&q=80',
        featured: true,
        isPublished: true,
      },
      {
        id: 'prod10',
        name: 'Smartphone with 5G',
        slug: 'smartphone-5g',
        description: 'Latest smartphone with 5G connectivity, triple camera, and all-day battery.',
        price: 799.99,
        categoryId: electronics.id,
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&q=80',
        featured: true,
        isPublished: true,
      },
      {
        id: 'prod11',
        name: 'Laptop Gaming Backpack',
        slug: 'laptop-gaming-backpack',
        description: 'Durable gaming backpack with RGB lighting and laptop compartment.',
        price: 129.99,
        categoryId: electronics.id,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },

      // Clothing Category - New ones
      {
        id: 'prod12',
        name: 'Summer Floral Dress',
        slug: 'summer-floral-dress',
        description: 'Light and breezy summer dress with beautiful floral patterns.',
        price: 89.99,
        categoryId: clothing.id,
        image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop&q=80',
        featured: true,
        isPublished: true,
      },
      {
        id: 'prod13',
        name: 'Elegant Evening Dress',
        slug: 'elegant-evening-dress',
        description: 'Sophisticated evening dress perfect for special occasions.',
        price: 199.99,
        categoryId: clothing.id,
        image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod14',
        name: 'Casual Summer Shorts',
        slug: 'casual-summer-shorts',
        description: 'Comfortable summer shorts made from breathable fabric.',
        price: 39.99,
        categoryId: clothing.id,
        image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod15',
        name: 'Summer Beach Bikini',
        slug: 'summer-beach-bikini',
        description: 'Trendy bikini set perfect for summer beach days.',
        price: 59.99,
        categoryId: clothing.id,
        image: 'https://images.unsplash.com/photo-1592657231448-1007f74b1fc1?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },

      // Shoes Category - All new
      {
        id: 'prod16',
        name: 'Running Sneakers',
        slug: 'running-sneakers',
        description: 'Professional running shoes with advanced cushioning technology.',
        price: 149.99,
        categoryId: shoes.id,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80',
        featured: true,
        isPublished: true,
      },
      {
        id: 'prod17',
        name: 'Casual Canvas Shoes',
        slug: 'casual-canvas-shoes',
        description: 'Comfortable canvas shoes perfect for everyday wear.',
        price: 69.99,
        categoryId: shoes.id,
        image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod18',
        name: 'Formal Leather Shoes',
        slug: 'formal-leather-shoes',
        description: 'Premium leather dress shoes for professional and formal occasions.',
        price: 199.99,
        categoryId: shoes.id,
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod19',
        name: 'Summer Sandals',
        slug: 'summer-sandals',
        description: 'Comfortable summer sandals with arch support and breathable design.',
        price: 79.99,
        categoryId: shoes.id,
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },

      // Home & Garden Category - New ones
      {
        id: 'prod20',
        name: 'Ergonomic Office Chair',
        slug: 'ergonomic-office-chair',
        description: 'Comfortable office chair with lumbar support and adjustable height.',
        price: 399.99,
        categoryId: home.id,
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod21',
        name: 'Minimalist Laptop Backpack',
        slug: 'minimalist-laptop-backpack',
        description: 'Sleek laptop backpack with multiple compartments and water-resistant material.',
        price: 89.99,
        categoryId: home.id,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80',
        featured: true,
        isPublished: true,
      },
      {
        id: 'prod22',
        name: 'Stainless Steel Water Bottle',
        slug: 'stainless-steel-water-bottle',
        description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
        price: 24.99,
        categoryId: home.id,
        image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod23',
        name: 'Organic Coffee Beans',
        slug: 'organic-coffee-beans',
        description: 'Premium single-origin coffee beans roasted to perfection.',
        price: 18.99,
        categoryId: home.id,
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      },
      {
        id: 'prod24',
        name: 'Garden Plant Set',
        slug: 'garden-plant-set',
        description: 'Beautiful collection of indoor plants perfect for home decoration.',
        price: 79.99,
        categoryId: home.id,
        image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop&q=80',
        featured: false,
        isPublished: true,
      }
    ]

    console.log('🛍️ Adding new products...')

    // Add each product using upsert to avoid duplicates
    for (const product of newProducts) {
      await prisma.product.upsert({
        where: { slug: product.slug },
        update: {},
        create: product
      })
      console.log(`   ✅ Added: ${product.name}`)
    }

    console.log('✅ Successfully added new products!')
    console.log('📊 Summary:')
    console.log(`   - New Shoes category added`)
    console.log(`   - ${newProducts.length} new products added`)
    console.log(`   - ${newProducts.filter(p => p.featured).length} new featured products`)
    console.log('')
    console.log('🌐 Your production store now has many more products!')

  } catch (error) {
    console.error('❌ Error adding products:', error)
    throw error
  } finally {
    await prisma.$disconnect()
  }
}

addMoreProducts()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  }) 