import { useToast } from "@/components/ui/use-toast";
import { Post, User } from "@/lib/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const useAddToBookmarks = () => {
  const { toast } = useToast();

  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { mutate: addToBookmarks } = useMutation({
    mutationFn: async (postId: string) => {
      try {
        const res = await fetch(`api/posts/add-to-bookmarks/${postId}`, {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data.post;
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: async (post: Post) => {
      user?.bookmarks.push(post._id);
      queryClient.setQueryData<User>(["authUser"], user);
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  return { addToBookmarks };
};

export default useAddToBookmarks;
