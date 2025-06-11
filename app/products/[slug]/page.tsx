import { notFound } from "next/navigation"
import { prisma } from "@/lib/db"
import ProductDetails from "@/components/product/product-details"

interface ProductPageProps {
  params: {
    slug: string
  }
}

async function getProduct(slug: string) {
  try {
    const product = await prisma.product.findUnique({
      where: {
        slug: slug,
        isPublished: true,
      },
    })

    if (!product) {
      return null
    }

    return {
      ...product,
      images: product.image ? [product.image] : ['/placeholder.svg'],
    }
  } catch (error) {
    console.error("Error fetching product:", error)
    return null
  }
}

async function getRelatedProducts(currentProductId: string) {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        NOT: {
          id: currentProductId,
        },
      },
      take: 4,
      orderBy: {
        createdAt: 'desc',
      },
    })

    return products.map((product) => ({
      ...product,
      images: product.image ? [product.image] : ['/placeholder.svg'],
    }))
  } catch (error) {
    console.error("Error fetching related products:", error)
    return []
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)

  if (!product) {
    notFound()
  }

  const relatedProducts = await getRelatedProducts(product.id)

  return (
    <main className="container mx-auto px-4 py-8">
      <ProductDetails product={product} relatedProducts={relatedProducts} />
    </main>
  )
}

export async function generateMetadata({ params }: ProductPageProps) {
  const resolvedParams = await params
  const product = await getProduct(resolvedParams.slug)

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | Ecommerce Store`,
    description: product.description || `Buy ${product.name} at our online store`,
  }
} 