"use client"

import { useRouter, useSearchParams } from "next/navigation"

interface SortDropdownProps {
  currentSort?: string
}

export default function SortDropdown({ currentSort }: SortDropdownProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams)
    params.set('sort', sortValue)
    params.delete('page') // Reset to first page when sorting changes
    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="sort" className="text-sm font-medium text-gray-700">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort || 'newest'}
        className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        onChange={(e) => handleSortChange(e.target.value)}
      >
        <option value="newest">Newest</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="name">Name: A to Z</option>
      </select>
    </div>
  )
} 