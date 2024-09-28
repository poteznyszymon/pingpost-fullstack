import { useToast } from "@/components/ui/use-toast";
import { PostsPage, User } from "@/lib/types";
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
      const res = await fetch(`api/posts/delete-from-bookmarks/${postId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "something went wrong");
      return data.post;
    },
    onMutate: async (postId: string) => {
      if (!user) return;

      await queryClient.cancelQueries({ queryKey: ["posts", "bookmarks"] });

      const previousUserData = queryClient.getQueryData<User>(["authUser"]);

      user.bookmarks = user.bookmarks.filter((id) => id !== postId);
      queryClient.setQueryData<User>(["authUser"], user);

      const previousBookmarksData = queryClient.getQueryData<
        InfiniteData<PostsPage>
      >(["posts", "bookmarks"]);
      queryClient.setQueryData<InfiniteData<PostsPage>>(
        ["posts", "bookmarks"],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.filter((p) => p._id !== postId),
            })),
          };
        }
      );

      return { previousUserData, previousBookmarksData };
    },
    onError: (_error, _postId, context) => {
      if (context?.previousUserData) {
        queryClient.setQueryData<User>(["authUser"], context.previousUserData);
      }
      if (context?.previousBookmarksData) {
        queryClient.setQueryData<InfiniteData<PostsPage>>(
          ["posts", "bookmarks"],
          context.previousBookmarksData
        );
      }

      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { deleteFromBookmarks, isDeleting };
};

export default useDeleteFromBookmarks;
