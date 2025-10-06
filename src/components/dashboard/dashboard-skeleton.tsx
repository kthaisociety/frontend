import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <Skeleton className="h-10 w-32" />
        <Skeleton className="h-10 w-24" />
      </div>
      <div className="bg-card rounded-lg p-6 shadow-sm">
        <Skeleton className="h-8 w-24 mb-4" />
        <div className="space-y-4">
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
          <div>
            <Skeleton className="h-4 w-16 mb-2" />
            <Skeleton className="h-6 w-48" />
          </div>
        </div>
      </div>
    </div>
  );
}
