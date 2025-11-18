export default function SupportLoading() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Header Skeleton */}
      <div>
        <div className="h-8 bg-muted rounded w-64 mb-2"></div>
        <div className="h-4 bg-muted rounded w-96"></div>
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="rounded-lg border bg-card p-6">
            <div className="h-4 bg-muted rounded w-20 mb-4"></div>
            <div className="h-8 bg-muted rounded w-16 mb-2"></div>
            <div className="h-3 bg-muted rounded w-24"></div>
          </div>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex gap-4">
        <div className="h-10 bg-muted rounded flex-1 max-w-sm"></div>
        <div className="h-10 bg-muted rounded w-32"></div>
        <div className="h-10 bg-muted rounded w-32"></div>
      </div>

      {/* Table Skeleton */}
      <div className="rounded-lg border bg-card">
        <div className="p-4 border-b">
          <div className="h-5 bg-muted rounded w-32"></div>
        </div>
        <div className="divide-y">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="p-4 flex items-center gap-4">
              <div className="h-4 bg-muted rounded w-16"></div>
              <div className="h-4 bg-muted rounded flex-1"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-4 bg-muted rounded w-20"></div>
              <div className="h-4 bg-muted rounded w-24"></div>
              <div className="h-6 bg-muted rounded w-20"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
