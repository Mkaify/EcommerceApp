import { Suspense } from "react"
import { prisma } from "@/lib/db"
import ProductGrid from "@/components/product/product-grid"
import ProductFilters from "@/components/product/product-filters"
import ProductCardSkeleton from "@/components/product/product-card-skeleton"
import SortDropdown from "@/components/product/sort-dropdown"

interface ProductsPageProps {
  searchParams: Promise<{
    category?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    page?: string
  }>
}

async function getProducts(searchParams: {
    category?: string
    sort?: string
    minPrice?: string
    maxPrice?: string
    page?: string
  }) {
  const {
    category,
    sort = 'newest',
    minPrice,
    maxPrice,
    page = '1'
  } = searchParams

  const pageNumber = parseInt(page)
  const itemsPerPage = 12
  const skip = (pageNumber - 1) * itemsPerPage

  try {
    const where: any = {
      isPublished: true,
    }

    if (category) {
      const categoryRecord = await prisma.category.findUnique({
        where: { slug: category }
      });
      if (categoryRecord) {
        where.categoryId = categoryRecord.id;
      }
    }

    if (minPrice || maxPrice) {
      where.price = {}
      if (minPrice) where.price.gte = parseFloat(minPrice)
      if (maxPrice) where.price.lte = parseFloat(maxPrice)
    }

    let orderBy: any = { createdAt: 'desc' }
    switch (sort) {
      case 'price-low':
        orderBy = { price: 'asc' }
        break
      case 'price-high':
        orderBy = { price: 'desc' }
        break
      case 'name':
        orderBy = { name: 'asc' }
        break
      case 'newest':
      default:
        orderBy = { createdAt: 'desc' }
        break
    }

    const [products, totalCount] = await Promise.all([
      prisma.product.findMany({
        where,
        include: {
          category: true
        },
        orderBy,
        skip,
        take: itemsPerPage,
      }),
      prisma.product.count({ where })
    ])

    const productsWithImages = products.map((product) => ({
      ...product,
      images: product.image ? [product.image] : ['/placeholder.svg'],
    }))

    return {
      products: productsWithImages,
      totalCount,
      currentPage: pageNumber,
      totalPages: Math.ceil(totalCount / itemsPerPage),
    }
  } catch (error) {
    console.error("Error fetching products:", error)
    return {
      products: [],
      totalCount: 0,
      currentPage: 1,
      totalPages: 0,
    }
  }
}

async function getCategories() {
  try {
    const categories = await prisma.category.findMany({
      where: { parentId: null },
      orderBy: { name: 'asc' },
    })
    return categories
  } catch (error) {
    console.error("Error fetching categories:", error)
    return []
  }
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const resolvedSearchParams = await searchParams
  const [productsData, categories] = await Promise.all([
    getProducts(resolvedSearchParams),
    getCategories()
  ])

  const { products, totalCount, currentPage, totalPages } = productsData

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <ProductFilters categories={categories} searchParams={resolvedSearchParams} />
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Products</h1>
              <p className="text-gray-600">{totalCount} products found</p>
            </div>

            {/* Sort Dropdown */}
            <SortDropdown currentSort={resolvedSearchParams.sort} />
          </div>

          {/* Products Grid */}
          <Suspense fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <ProductCardSkeleton key={i} />
              ))}
            </div>
          }>
            {products.length > 0 ? (
              <>
                <ProductGrid products={products} />
                
                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="flex items-center space-x-2">
                      {currentPage > 1 && (
                        <a
                          href={`?${new URLSearchParams({ ...resolvedSearchParams, page: String(currentPage - 1) }).toString()}`}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Previous
                        </a>
                      )}
                      
                      {[...Array(totalPages)].map((_, i) => {
                        const page = i + 1
                        if (page === currentPage) {
                          return (
                            <span
                              key={page}
                              className="px-3 py-2 bg-blue-600 text-white rounded-md text-sm font-medium"
                            >
                              {page}
                            </span>
                          )
                        }
                        
                        // Show first, last, and pages around current
                        if (page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1) {
                          return (
                            <a
                              key={page}
                              href={`?${new URLSearchParams({ ...resolvedSearchParams, page: String(page) }).toString()}`}
                              className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                            >
                              {page}
                            </a>
                          )
                        }
                        
                        // Show ellipsis
                        if (page === 2 && currentPage > 4) {
                          return <span key={page} className="px-2 text-gray-500">...</span>
                        }
                        if (page === totalPages - 1 && currentPage < totalPages - 3) {
                          return <span key={page} className="px-2 text-gray-500">...</span>
                        }
                        
                        return null
                      })}
                      
                      {currentPage < totalPages && (
                        <a
                          href={`?${new URLSearchParams({ ...resolvedSearchParams, page: String(currentPage + 1) }).toString()}`}
                          className="px-3 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          Next
                        </a>
                      )}
                    </nav>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <a
                  href="/products"
                  className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  View All Products
                </a>
              </div>
            )}
          </Suspense>
        </main>
      </div>
    </div>
  )
} 