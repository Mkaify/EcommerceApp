import { prisma } from "@/lib/db"
import HeroSection from "@/components/home/hero-section"
import FeaturedProducts from "@/components/home/featured-products"
import CategoryShowcase from "@/components/home/category-showcase"
import SpecialOffers from "@/components/home/special-offers"
import NewsletterSignup from "@/components/home/newsletter-signup"

// Fetch featured products
async function getFeaturedProducts() {
  try {
    const products = await prisma.product.findMany({
      where: {
        featured: true,
        isPublished: true,
      },
      take: 8,
    })

    return products.map((product) => ({
      ...product,
      images: product.image ? [product.image] : ['/placeholder.svg'], // Convert single image to array
    }))
  } catch (error) {
    console.error("Error fetching featured products:", error)
    return []
  }
}

// Modify the getCategories function to handle potential database errors
async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        parentId: null, // Only top-level categories
      },
      take: 4,
    })

    // Add real category images
    const categoryImages = {
      'electronics': 'https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=400&h=400&fit=crop&q=80',
      'clothing': 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop&q=80',
      'home-garden': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop&q=80',
      'shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=400&fit=crop&q=80'
    }
    
    return categories.map(category => ({
      ...category,
      image: categoryImages[category.slug as keyof typeof categoryImages] || '/placeholder.svg'
    }))
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

// Update the Home component to handle empty data
export default async function Home() {
  const featuredProducts = (await getFeaturedProducts()) || []
  const categories = (await getCategories()) || []

  return (
    <main>
      <HeroSection />

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Featured Products</h2>
          {/* Removed Suspense because FeaturedProducts is a Client Component using React Context */}
          <FeaturedProducts products={featuredProducts} />
        </div>
      </section>

      {categories.length > 0 && <CategoryShowcase categories={categories} />}

      <SpecialOffers />

      <NewsletterSignup />
    </main>
  )
}
