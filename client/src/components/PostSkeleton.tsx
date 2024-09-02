import { Skeleton } from "./ui/skeleton";

const PostSkeleton = () => {
  return (
    <div className="bg-card w-full h-[11rem] animate-pulse rounded-2xl p-5 space-y-5 shadow-sm">
      <div className="flex gap-5 items-center">
        <Skeleton className="size-9 rounded-full" />
        <div className="flex flex-col gap-2 justify-center">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-28" />
        </div>
      </div>
      <Skeleton className="w-full h-20" />
    </div>
  );
};

export default PostSkeleton;
