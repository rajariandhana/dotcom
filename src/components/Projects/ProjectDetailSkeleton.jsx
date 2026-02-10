import { Skeleton } from "@heroui/react";

export default function ProjectDetailSkeleton() {
  return (
    <div className="flex flex-col w-96 sm:w-[600px]">
      <Skeleton className="h-8 w-3/4 mb-2 rounded-md" />

      <div className="flex gap-x-1 mb-8">
        {Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={i} className="h-6 w-20 rounded-full" />
        ))}
      </div>

      <Skeleton className="h-52 w-96 sm:w-[600px] sm:h-[400px] mb-8 rounded-2xl" />

      <div className="space-y-2 mb-4">
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-full rounded-md" />
        <Skeleton className="h-4 w-5/6 rounded-md" />
      </div>

      <Skeleton className="h-10 w-32 rounded-md" />
    </div>
  );
}
