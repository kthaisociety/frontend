import { Skeleton } from "@/components/ui/skeleton"
import { Card } from "@/components/ui/card"

export function EventCardSkeleton() {
  return (
    <Card className="relative overflow-hidden h-[380px]">
      {/* Background Image Skeleton */}
      <div className="absolute inset-0">
        <Skeleton className="h-full w-full" />
      </div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-linear-to-t from-white/55 via-white/50 to-transparent pointer-events-none z-15" />

      {/* Content Overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
        {/* Title */}
        <Skeleton className="h-7 w-3/4 mb-3" />

        {/* Date */}
        <div className="flex items-center gap-2 mb-4">
          <Skeleton className="h-4 w-4 rounded" />
          <Skeleton className="h-4 w-48" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-4">
          <Skeleton className="h-10 w-32 rounded-md" />
          <Skeleton className="h-10 w-24 rounded-md" />
        </div>
      </div>
    </Card>
  )
}

export function EventsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
      <EventCardSkeleton />
    </div>
  )
}



