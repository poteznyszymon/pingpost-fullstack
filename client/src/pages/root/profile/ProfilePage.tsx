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
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditProfileDialog from "./EditProfileDialog";
import LoadingButton from "@/components/LoadingButton";
import useEditUserData from "@/hooks/useEditUserData";
import Posts from "@/components/Posts";

const ProfilePage = () => {
  const { username } = useParams();
  useEffect(() => {
    document.title = `${username} | pingpost`;
    setProfileImg(null);
    setCoverImg(null);
  }, [username]);

  const [profileImg, setProfileImg] = useState<string | null>();
  const [coverImg, setCoverImg] = useState<string | null>();
  const { user, isError, refetch, isLoading, isRefetching } = useGetUser(
    username || ""
  );
  const { data: loggedUser } = useQuery<User>({ queryKey: ["authUser"] });
  const { unfollow } = useUnfollowUser(username || "");
  const { follow } = useFollowUser(username || "");

  const { mutate, isPending } = useEditUserData(username || "", {
    onSuccess() {
      setProfileImg(null);
      setCoverImg(null);
    },
  });

  const isMyProfile = user?._id === loggedUser?._id;
  const isFollowing = user?.followers?.includes(loggedUser?._id || "") || false;

  const handleImageChane = (
    e: ChangeEvent<HTMLInputElement>,
    type: "profile" | "cover"
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          if (type === "profile") {
            setProfileImg(reader.result as string);
          } else {
            setCoverImg(reader.result as string);
          }
        }
      };
      reader.readAsDataURL(file);
    }
  };

  if (isError)
    return (
      <div className="w-full h-screen flex items-center flex-col space-y-5">
        <p className="font-semibold text-center text-lg">
          An error has occurred
        </p>
        <Button onClick={() => refetch()}>Try again</Button>
      </div>
    );

  if (isLoading || isRefetching)
    return (
      <div className="w-full min-h-screen flex-col ">
        <ProfileSkeleton />
      </div>
    );

  return (
    <div className="w-full min-h-screen flex-col space-y-5">
      <div className="bg-card w-full rounded-2xl shadow-sm p-5 relative flex flex-col gap-4">
        <div className="h-48 w-full bg-background rounded-2xl relative shadow-sm group/coverImg">
          {(coverImg || user?.coverImg) && (
            <img
              src={coverImg || user?.coverImg}
              alt="cover image"
              className="size-full rounded-2xl object-cover"
            />
          )}
          {isMyProfile && (
            <label htmlFor="coverImg">
              <div
                title="change cover image"
                className="p-2 rounded-full opacity-0 transition-transform bg-primary cursor-pointer hover:scale-105 absolute top-2 right-2 group-hover/coverImg:opacity-100"
              >
                <Pen className="size-4 text-card" />
              </div>
            </label>
          )}

          <input
            hidden
            id="coverImg"
            type="file"
            onChange={(e) => handleImageChane(e, "cover")}
          />
        </div>
        <div className="absolute size-24 translate-x-8 top-48 -translate-y-[35%] group">
          <img
            src={profileImg || user?.profileImg || "/placeholder_avatar.png"}
            className="size-24 rounded-full absolute shadow-sm object-cover"
          />
          {isMyProfile && (
            <label htmlFor="profileImg">
              <div
                title="change image"
                className="p-2 rounded-full opacity-0 transition-transform bg-primary cursor-pointer hover:scale-105 absolute top-0 right-0 group-hover:opacity-100"
              >
                <Pen className="size-4 text-card" />
              </div>
            </label>
          )}
          <input
            hidden
            id="profileImg"
            type="file"
            onChange={(e) => handleImageChane(e, "profile")}
          />
        </div>
        <div className="mt-10 flex justify-between">
          <div className="flex flex-col">
            <h1 className="text-2xl font-semibold">
              {user?.displayName || user?.username}
            </h1>
            <p className="text-muted-foreground text-sm">@{user?.username}</p>
          </div>
          <div className="flex items-center gap-3">
            {isMyProfile && (profileImg || coverImg) && (
              <LoadingButton
                loading={isPending}
                onClick={async () => {
                  mutate({ coverImg, profileImg });
                }}
              >
                Save
              </LoadingButton>
            )}
            {isMyProfile && user ? (
              <EditProfileDialog user={user} />
            ) : isFollowing ? (
              <Button onClick={() => unfollow(user?._id || "")}>
                Unfollow
              </Button>
            ) : (
              <Button onClick={() => follow(user?._id || "")}>Follow</Button>
            )}
          </div>
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
      <div className="bg-card rounded-2xl shadow-sm h-[2.7rem] flex items-center justify-center">
        {username}'s posts
      </div>
      <Posts feedType="user" username={username} />
    </div>
  );
};

export default ProfilePage;
