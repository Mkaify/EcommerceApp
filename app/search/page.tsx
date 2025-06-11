import { Suspense } from "react"
import type { Metadata } from "next"
import { prisma } from "@/lib/db"
import ProductGrid from "@/components/product/product-grid"
import ProductCardSkeleton from "@/components/product/product-card-skeleton"

interface SearchPageProps {
  searchParams: Promise<{
    q?: string
  }>
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const params = await searchParams
  const query = params.q || ""

  return {
    title: `Search results for "${query}" | E-commerce Store`,
    description: `Browse search results for "${query}" in our online store.`,
  }
}

async function searchProducts(query: string) {
  if (!query) return []

  try {
    // Convert query to lowercase for case-insensitive search
    const lowerQuery = query.toLowerCase();
    
    // First, find the category if searching by category name
    const category = await prisma.category.findFirst({
      where: {
        OR: [
          { name: { contains: lowerQuery } },
          { slug: { contains: lowerQuery } }
        ]
      }
    });

    // Search products by query and check categories
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        OR: [
          {
            name: {
              contains: lowerQuery
            }
          },
          {
            description: {
              contains: lowerQuery
            }
          },
          {
            category: {
              OR: [
                { name: { contains: lowerQuery } },
                { slug: { contains: lowerQuery } }
              ]
            }
          }
        ]
      },
      include: {
        category: true
      }
    });

    // Convert raw query results to match the expected format
    return products.map((product: any) => ({
      ...product,
      category: {
        name: product.categoryName,
        slug: product.categorySlug
      },
      images: product.image ? [product.image] : ['/placeholder.svg'],
    }));

    return products.map((product) => ({
      ...product,
      images: product.image ? [product.image] : ['/placeholder.svg'], // Convert single image to array
    }))
  } catch (error) {
    console.error("Error searching products:", error)
    return []
  }
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams
  const query = params.q || ""
  const products = await searchProducts(query)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">{query ? `Search results for "${query}"` : "Search"}</h1>

      {query ? (
        <>
          <p className="mb-6 text-gray-600">
            {products.length} {products.length === 1 ? "result" : "results"} found
          </p>

          <Suspense
            fallback={
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[...Array(4)].map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            }
          >
            {products.length > 0 ? (
              <ProductGrid products={products} />
            ) : (
              <div className="text-center py-16">
                <h2 className="text-xl font-medium mb-4">No products found</h2>
                <p className="text-gray-600 mb-8">
                  We couldn't find any products matching your search. Try using different keywords or browse our
                  categories.
                </p>
              </div>
            )}
          </Suspense>
        </>
      ) : (
        <div className="text-center py-16">
          <h2 className="text-xl font-medium mb-4">Enter a search term</h2>
          <p className="text-gray-600 mb-8">Please enter a search term to find products in our store.</p>
        </div>
      )}
    </div>
  )
}
