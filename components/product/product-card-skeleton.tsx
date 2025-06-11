type ProductCardSkeletonProps = {
  count?: number;
};

export default function ProductCardSkeleton({ count = 1 }: ProductCardSkeletonProps) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
          <div className="aspect-square bg-gray-200" />
          <div className="p-4">
            <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-6 bg-gray-200 rounded w-1/3" />
          </div>
        </div>
      ))}
    </>
  );
}
