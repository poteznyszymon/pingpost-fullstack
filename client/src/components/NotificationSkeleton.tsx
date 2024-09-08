import { Skeleton } from "./ui/skeleton";

const NotificationSkeleton = () => {
  return (
    <div className="bg-card p-5 shadow-sm rounded-2xl flex animate-pulse gap-3">
      <Skeleton className="size-6 rounded-full " />
      <div className="flex flex-col flex-1 gap-5">
        <Skeleton className="w-24 h-4" />
        <Skeleton className="w-full h-8" />
      </div>
    </div>
  );
};

export default NotificationSkeleton;
