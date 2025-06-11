import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting to seed the database...')

  // Create categories
  const electronics = await prisma.category.upsert({
    where: { slug: 'electronics' },
    update: {},
    create: {
      name: 'Electronics',
      slug: 'electronics',
    },
  })

  const clothing = await prisma.category.upsert({
    where: { slug: 'clothing' },
    update: {},
    create: {
      name: 'Clothing',
      slug: 'clothing',
    },
  })

  const home = await prisma.category.upsert({
    where: { slug: 'home-garden' },
    update: {},
    create: {
      name: 'Home & Garden',
      slug: 'home-garden',
    },
  })

  const shoes = await prisma.category.upsert({
    where: { slug: 'shoes' },
    update: {},
    create: {
      name: 'Shoes',
      slug: 'shoes',
    },
  })

  // Create sample products with proper categorization
  const products = [
    // Electronics Category
    {
      name: 'Wireless Bluetooth Headphones',
      slug: 'wireless-bluetooth-headphones',
      description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
      price: 199.99,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Smart Fitness Watch',
      slug: 'smart-fitness-watch',
      description: 'Advanced fitness tracking with heart rate monitor and GPS.',
      price: 299.99,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Wireless Mouse',
      slug: 'wireless-mouse',
      description: 'Ergonomic wireless mouse with precision tracking and long battery life.',
      price: 39.99,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1660491083562-d91a64d6ea9c?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Smartphone with 5G',
      slug: 'smartphone-5g',
      description: 'Latest smartphone with 5G connectivity, triple camera, and all-day battery.',
      price: 799.99,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Laptop Gaming Backpack',
      slug: 'laptop-gaming-backpack',
      description: 'Durable gaming backpack with RGB lighting and laptop compartment.',
      price: 129.99,
      categoryId: electronics.id,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80',
      featured: false,
    },

    // Clothing Category
    {
      name: 'Premium Cotton T-Shirt',
      slug: 'premium-cotton-t-shirt',
      description: 'Soft, comfortable cotton t-shirt perfect for everyday wear.',
      price: 29.99,
      categoryId: clothing.id,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Summer Floral Dress',
      slug: 'summer-floral-dress',
      description: 'Light and breezy summer dress with beautiful floral patterns.',
      price: 89.99,
      categoryId: clothing.id,
      image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Elegant Evening Dress',
      slug: 'elegant-evening-dress',
      description: 'Sophisticated evening dress perfect for special occasions.',
      price: 199.99,
      categoryId: clothing.id,
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Casual Summer Shorts',
      slug: 'casual-summer-shorts',
      description: 'Comfortable summer shorts made from breathable fabric.',
      price: 39.99,
      categoryId: clothing.id,
      image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Summer Beach Bikini',
      slug: 'summer-beach-bikini',
      description: 'Trendy bikini set perfect for summer beach days.',
      price: 59.99,
      categoryId: clothing.id,
      image: 'https://images.unsplash.com/photo-1592657231448-1007f74b1fc1?w=500&h=500&fit=crop&q=80',
      featured: false,
    },

    // Shoes Category
    {
      name: 'Running Sneakers',
      slug: 'running-sneakers',
      description: 'Professional running shoes with advanced cushioning technology.',
      price: 149.99,
      categoryId: shoes.id,
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Casual Canvas Shoes',
      slug: 'casual-canvas-shoes',
      description: 'Comfortable canvas shoes perfect for everyday wear.',
      price: 69.99,
      categoryId: shoes.id,
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Formal Leather Shoes',
      slug: 'formal-leather-shoes',
      description: 'Premium leather dress shoes for professional and formal occasions.',
      price: 199.99,
      categoryId: shoes.id,
      image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Summer Sandals',
      slug: 'summer-sandals',
      description: 'Comfortable summer sandals with arch support and breathable design.',
      price: 79.99,
      categoryId: shoes.id,
      image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&h=500&fit=crop&q=80',
      featured: false,
    },

    // Home & Garden Category
    {
      name: 'Ergonomic Office Chair',
      slug: 'ergonomic-office-chair',
      description: 'Comfortable office chair with lumbar support and adjustable height.',
      price: 399.99,
      categoryId: home.id,
      image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Minimalist Laptop Backpack',
      slug: 'minimalist-laptop-backpack',
      description: 'Sleek laptop backpack with multiple compartments and water-resistant material.',
      price: 89.99,
      categoryId: home.id,
      image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop&q=80',
      featured: true,
    },
    {
      name: 'Stainless Steel Water Bottle',
      slug: 'stainless-steel-water-bottle',
      description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
      price: 24.99,
      categoryId: home.id,
      image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Organic Coffee Beans',
      slug: 'organic-coffee-beans',
      description: 'Premium single-origin coffee beans roasted to perfection.',
      price: 18.99,
      categoryId: home.id,
      image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
    {
      name: 'Garden Plant Set',
      slug: 'garden-plant-set',
      description: 'Beautiful collection of indoor plants perfect for home decoration.',
      price: 79.99,
      categoryId: home.id,
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=500&h=500&fit=crop&q=80',
      featured: false,
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }

  // Create a sample user
  await prisma.user.upsert({
    where: { email: 'demo@example.com' },
    update: {},
    create: {
      email: 'demo@example.com',
      name: 'Demo User',
      password: 'demo123', // In a real app, this should be hashed
    },
  })

  console.log('✅ Database seeded successfully!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 