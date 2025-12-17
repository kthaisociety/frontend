"use client";

import { Skeleton } from "@/components/ui/skeleton";

export function TeamsSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="h-56 bg-[#2552A7]" />
      <div className="mx-auto max-w-7xl px-7 md:px-10 lg:px-16 -mt-6 pb-12">
        <div className="rounded-3xl bg-white border border-slate-200/80 px-5 md:px-8 lg:px-10 py-8 md:py-10">
          <Skeleton className="h-5 w-40 mb-6" />
          <div className="flex justify-between items-end mb-8">
            <div className="space-y-3">
              <Skeleton className="h-8 w-56" />
              <Skeleton className="h-4 w-80" />
            </div>
            <Skeleton className="h-10 w-48" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="p-5 border rounded-xl">
                <Skeleton className="h-4 w-24 mb-3" />
                <Skeleton className="h-6 w-40 mb-2" />
                <Skeleton className="h-4 w-56 mb-6" />
                <Skeleton className="h-8 w-24" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
