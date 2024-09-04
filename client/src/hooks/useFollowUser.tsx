import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useFollowUser = (username: string) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });

  const { mutate: follow } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/users/follow/${id}`, {
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

      queryClient.setQueryData<User[]>(["suggestedUsers"], (oldData) => {
        if (!oldData) return;
        return oldData.map((item) =>
          item._id === updatedUser._id
            ? { ...item, followers: updatedUser.followers }
            : item
        );
      });

      queryClient.setQueryData<User>(["user", username], updatedUser);

      toast({ description: `${username} followed successfully` });
    },
  });

  return { follow };
};

export default useFollowUser;
