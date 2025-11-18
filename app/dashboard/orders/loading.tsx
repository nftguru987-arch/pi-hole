import { Card } from "@/components/ui/card"

export default function OrdersLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <div className="border-b border-border bg-card sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="h-4 bg-muted rounded w-32 mb-4 animate-pulse" />
          <div className="h-8 bg-muted rounded w-48 animate-pulse mb-2" />
          <div className="h-4 bg-muted rounded w-96 animate-pulse" />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Orders List */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats Skeleton */}
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4">
                  <div className="h-8 bg-muted rounded w-16 mb-2 animate-pulse" />
                  <div className="h-4 bg-muted rounded w-20 animate-pulse" />
                </Card>
              ))}
            </div>

            {/* Filters Skeleton */}
            <div className="flex gap-4 items-center">
              <div className="flex-1 h-10 bg-muted rounded animate-pulse" />
              <div className="w-32 h-10 bg-muted rounded animate-pulse" />
            </div>

            {/* Table Skeleton */}
            <Card className="p-6">
              <div className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 bg-muted rounded animate-pulse" />
                ))}
              </div>
            </Card>
          </div>

          {/* Details Panel Skeleton */}
          <Card className="p-6 h-fit">
            <div className="h-6 bg-muted rounded w-32 mb-6 animate-pulse" />
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i}>
                  <div className="h-3 bg-muted rounded w-24 mb-2 animate-pulse" />
                  <div className="h-5 bg-muted rounded w-40 animate-pulse" />
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
