import { prisma } from "@/lib/db";
import ProductGrid from "@/components/product/product-grid";
import ProductCardSkeleton from "@/components/product/product-card-skeleton";
import React, { Suspense } from "react";

// Fetch all published products
async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    });
    return products.map((product) => ({
      ...product,
      images: product.image ? [product.image] : ['/placeholder.svg'], // Convert single image to array
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

export default async function ShopPage() {
  const products = await getProducts();

  return (
    <main className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Shop All Products</h1>
      <Suspense fallback={<ProductCardSkeleton count={8} />}>
        <ProductGrid products={products} />
      </Suspense>
    </main>
  );
}
