/**
 * ⏳ SKELETON LOADING
 */

export default function Skeleton({ className }: any) {
  return (
    <div
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );

  {isLoading && (
  <div className="grid grid-cols-3 gap-4">
    {Array.from({ length: 6 }).map((_, i) => (
      <Skeleton key={i} className="h-32" />
    ))}
  </div>
)}
}