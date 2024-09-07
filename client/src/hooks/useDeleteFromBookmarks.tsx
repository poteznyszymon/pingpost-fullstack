import { useToast } from "@/components/ui/use-toast";
import { Post, PostsPage, User } from "@/lib/types";
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const useDeleteFromBookmarks = () => {
  const { toast } = useToast();

  const { data: user, isFetching: isDeleting } = useQuery<User>({
    queryKey: ["authUser"],
  });
  const queryClient = useQueryClient();

  const { mutate: deleteFromBookmarks } = useMutation({
    mutationFn: async (postId: string) => {
      try {
        const res = await fetch(`api/posts/delete-from-bookmarks/${postId}`, {
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
      if (!user) return;

      // auth user cache
      user.bookmarks = user.bookmarks.filter(
        (postId) => postId !== post._id.toString()
      );
      queryClient.setQueryData<User>(["authUser"], user);

      // post bookmarks cache
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        { queryKey: ["posts", "bookmarks"] },
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((p) => p._id !== post._id),
            })),
          };
        }
      );
    },

    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  return { deleteFromBookmarks, isDeleting };
};

export default useDeleteFromBookmarks;
