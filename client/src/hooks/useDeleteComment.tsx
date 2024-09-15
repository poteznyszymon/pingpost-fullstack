import { useToast } from "@/components/ui/use-toast";
import { PostsPage, User } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface useDeleteCommentOptions {
  onSuccess?: () => void;
}

const useDeleteComment = (
  { onSuccess }: useDeleteCommentOptions,
  feedType: string
) => {
  const { toast } = useToast();
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { mutate: deleteComment, isPending } = useMutation({
    mutationFn: async ({
      postId,
      commentId,
    }: {
      postId: string;
      commentId: string;
    }) => {
      const res = await fetch(`/api/comments/${postId}/${commentId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "something went wrong");
      return { postId, commentId };
    },
    onSuccess: async ({ postId, commentId }) => {
      if (!user) return;

      const queryFilter: QueryFilters = { queryKey: ["posts", feedType] };

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) => {
                if (post._id === postId) {
                  return {
                    ...post,
                    comments: post.comments.filter(
                      (comment) => comment._id !== commentId
                    ),
                  };
                }
                return post;
              }),
            })),
          };
        }
      );

      if (onSuccess) {
        onSuccess();
      }
      toast({
        description: "Comment deleted successfully",
      });
    },
    onError: (error: Error) => {
      console.error("Error deleting comment:", error.message);
    },
  });

  return { deleteComment, isPending };
};

export default useDeleteComment;
