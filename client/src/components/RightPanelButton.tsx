import { User } from "@/lib/types";
import { Button } from "./ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useToast } from "./ui/use-toast";

interface FollowButtonProps {
  className?: string;
  userToFollow: User;
}

const RightPanelButton = ({ className, userToFollow }: FollowButtonProps) => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const isFollowed =
    userToFollow?.followers?.includes(user?._id || "") || false;

  const { mutate } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch(`/api/users/follow/${userToFollow._id}`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data.user;
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: async (updatedUser: User) => {
      updatedUser.followers.push(user?._id || "");
      user?.following.push(updatedUser._id);

      queryClient.setQueryData<User[]>(["suggestedUsers"], (oldData) => {
        if (!oldData) return;
        return oldData.map((item) =>
          item._id === updatedUser._id
            ? { ...item, followers: updatedUser.followers }
            : item
        );
      });
      queryClient.setQueryData<User>(["user", `${user?.username}`], user);

      queryClient.setQueryData<User>(
        ["user", userToFollow.username],
        updatedUser
      );

      toast({ description: `${userToFollow.username} followed successfully` });
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      className={className}
      disabled={isFollowed}
    >
      {isFollowed ? "Followed" : "Follow"}
    </Button>
  );
};

export default RightPanelButton;
