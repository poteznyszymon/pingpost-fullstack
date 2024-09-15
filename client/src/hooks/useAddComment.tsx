import { Post, PostsPage, User } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

interface useAddCommentOptions {
  onSuccess: () => void;
}

const useAddComment = (options: useAddCommentOptions, feedType: string) => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { mutate: addComment, isPending } = useMutation({
    mutationFn: async ({ postId, text }: { postId: string; text: string }) => {
      try {
        const res = await fetch(`/api/comments/create/${postId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ text }),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "something went wrong");
        return data.post;
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: async (updatedPost: Post) => {
      if (!user) return;

      const queryFilter: QueryFilters = { queryKey: ["posts", `${feedType}`] };
      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return oldData;
          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((p) => {
                if (p._id === updatedPost._id) {
                  return updatedPost;
                }
                return p;
              }),
            })),
          };
        }
      );

      if (options.onSuccess) {
        options.onSuccess();
      }
    },
  });

  return { addComment, isPending };
};

export default useAddComment;
