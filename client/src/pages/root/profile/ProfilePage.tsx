import ProfileSkeleton from "@/components/ProfileSkeleton";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import useFollowUser from "@/hooks/useFollowUser";
import useGetUser from "@/hooks/useGetUser";
import useUnfollowUser from "@/hooks/useUnfollowUser";
import { formatMemberSince } from "@/lib/formatDate";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import { Pen } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  useEffect(() => {
    document.title = `${username} | pingpost`;
  }, [username]);

  const { user, isError, refetch, isLoading } = useGetUser(username || "");
  const { data: loggedUser } = useQuery<User>({ queryKey: ["authUser"] });
  const { unfollow } = useUnfollowUser(username || "");
  const { follow } = useFollowUser(username || "");

  const isMyProfile = user?._id === loggedUser?._id;
  const isFollowing = user?.followers?.includes(loggedUser?._id || "") || false;


  if (isError)
    return (
      <div className="w-full h-screen flex items-center flex-col space-y-5">
        <p className="font-semibold text-center text-lg">
          An error has occurred
        </p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex-col ">
        <ProfileSkeleton />
      </div>
    );

  return (
    <div className="w-full min-h-screen flex-col ">
      <div className="bg-card w-full rounded-2xl shadow-sm p-5 relative flex flex-col gap-4">
        <div className="h-48 w-full bg-background rounded-2xl relative shadow-sm group/coverImg">
          <div
            title="change cover image"
            className="p-2 rounded-full opacity-0 transition-transform bg-primary cursor-pointer hover:scale-105 absolute top-2 right-2 group-hover/coverImg:opacity-100"
          >
            <Pen className="size-4 text-card" />
          </div>
        </div>
        <div className="absolute size-24 translate-x-8 top-48 -translate-y-[35%] group">
          <img
            src={user?.profileImg || "/placeholder_avatar.png"}
            className="size-24 rounded-full  absolute shadow-sm "
          />
          <div
            title="change image"
            className="p-2 rounded-full opacity-0 transition-transform bg-primary cursor-pointer hover:scale-105 absolute top-0 right-0 group-hover:opacity-100"
          >
            <Pen className="size-4 text-card" />
          </div>
        </div>
        <div className="mt-10 flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              {user?.displayName || user?.username}
            </h1>
            <p className="text-muted-foreground text-sm">@{user?.username}</p>
          </div>
          {isMyProfile ? (
            <Button variant={"secondary"}>Edit profile</Button>
          ) : isFollowing ? (
            <Button onClick={() => unfollow(user?._id || "")}>Unfollow</Button>
          ) : (
            <Button onClick={() => follow(user?._id || "")}>Follow</Button>
          )}
        </div>
        <div className="text-sm">
          {formatMemberSince(user?.createdAt || "")}
        </div>
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-1">
            following:<p className="font-bold">{user?.following.length}</p>
          </div>
          <div className="flex items-center gap-1">
            followers:<p className="font-bold">{user?.followers.length}</p>
          </div>
        </div>
        {user?.bio && (
          <>
            <Separator className="my-2" />
            <p className="text-sm">{user?.bio}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
