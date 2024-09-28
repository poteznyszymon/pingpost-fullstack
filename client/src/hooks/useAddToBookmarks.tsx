import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useAddToBookmarks = () => {
  const { toast } = useToast();
  const { data: user, isFetching: isAdding } = useQuery<User>({
    queryKey: ["authUser"],
  });
  const queryClient = useQueryClient();

  const { mutate: addToBookmarks } = useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(`api/posts/add-to-bookmarks/${postId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "something went wrong");
      return data.post;
    },
    onMutate: async (postId: string) => {
      if (!user) return;

      await queryClient.cancelQueries({ queryKey: ["bookmarks"] });

      const previousUserData = queryClient.getQueryData<User>(["authUser"]);

      user.bookmarks.push(postId);
      queryClient.setQueryData<User>(["authUser"], user);

      return { previousUserData };
    },
    onError: (_error, _postId, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData<User>(["authUser"], context.previousUserData);
      }

      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { addToBookmarks, isAdding };
};

export default useAddToBookmarks;
