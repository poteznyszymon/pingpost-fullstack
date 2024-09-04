import { Skeleton } from "./ui/skeleton";

const ProfileSkeleton = () => {
  return (
    <div className="bg-card w-full rounded-2xl shadow-sm p-5 relative flex flex-col gap-4">
      <Skeleton className="h-48 rounded-2xl" />
      <div className="absolute size-24 translate-x-8 top-48 bg-card p-1 rounded-full -translate-y-[35%] group">
        <Skeleton className="w-full h-full rounded-full" />
      </div>
      <div className="mt-10 flex justify-between">
        <div className="flex flex-col gap-1">
            <Skeleton className="h-5 w-32"/>
            <Skeleton className="h-4 w-24"/>
        </div>
        <Skeleton className="h-10 w-28"/>
      </div>
      <Skeleton className="h-6 w-44"/>
      <Skeleton className="h-6 w-44"/>
    </div>
  );
};

export default ProfileSkeleton;
