import { Skeleton } from "@heroui/react";

export default function GallerySkeleton({ length }) {
  return (
    <>
      {Array.from({ length: length }).map((_, i) => (
        <Skeleton key={i} className="rounded-2xl">
          <div className="size-40 bg-black/50" />
        </Skeleton>
      ))}
    </>
  );
}
