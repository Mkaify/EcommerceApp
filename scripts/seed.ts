import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create categories
  const categories = await Promise.all([
    prisma.category.create({
      data: {
        id: 'cat1',
        name: 'Electronics',
        slug: 'electronics',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat2',
        name: 'Clothing',
        slug: 'clothing',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat3',
        name: 'Home & Garden',
        slug: 'home-garden',
      },
    }),
    prisma.category.create({
      data: {
        id: 'cat4',
        name: 'Sports',
        slug: 'sports',
      },
    }),
  ])

  // Create products
  const products = await Promise.all([
    prisma.product.create({
      data: {
        id: 'prod1',
        name: 'Wireless Bluetooth Headphones',
        slug: 'wireless-bluetooth-headphones',
        description: 'High-quality wireless headphones with noise cancellation and long battery life.',
        price: 199.99,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        featured: true,
        isPublished: true,
        categoryId: 'cat1',
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod2',
        name: 'Smartphone Case',
        slug: 'smartphone-case',
        description: 'Durable protective case for your smartphone with military-grade protection.',
        price: 29.99,
        image: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=500&h=500&fit=crop',
        featured: false,
        isPublished: true,
        categoryId: 'cat1',
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod3',
        name: 'Cotton T-Shirt',
        slug: 'cotton-t-shirt',
        description: 'Comfortable 100% cotton t-shirt available in multiple colors and sizes.',
        price: 24.99,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        featured: true,
        isPublished: true,
        categoryId: 'cat2',
      },
    }),
    prisma.product.create({
      data: {
        id: 'prod4',
        name: 'Running Shoes',
        slug: 'running-shoes',
        description: 'Lightweight and comfortable running shoes perfect for daily workouts.',
        price: 129.99,
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        featured: true,
        isPublished: true,
        categoryId: 'cat4',
      },
    }),
  ])

  console.log('Database has been seeded. 🌱')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  }) 