import { useToast } from "@/components/ui/use-toast";
import { Post, PostsPage } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

interface useDeletePostOptions {
  onSuccess?: () => void;
  onDelete?: () => void;
}

const useDeletePost = (options: useDeletePostOptions) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/posts/delete/${id}`, {
          method: "DELETE",
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
    onSuccess: async (deletedPost: Post) => {
      const queryFilter: QueryFilters = { queryKey: ["posts", "for-you"] };
      await queryClient.cancelQueries(queryFilter);

      queryClient.setQueriesData<InfiniteData<PostsPage, string | null>>(
        queryFilter,
        (oldData) => {
          if (!oldData) return;

          return {
            pageParams: oldData.pageParams,
            pages: oldData.pages.map((page) => ({
              nextCursor: page.nextCursor,
              posts: page.posts.filter((p) => p._id !== deletedPost._id),
            })),
          };
        }
      );

      toast({ description: "Post deleted successfully" });
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error) => {
      toast({ variant: "destructive", description: `${error.message}` });
      if (options.onDelete) {
        options.onDelete();
      }
    },
  });

  return { data, mutate, isPending };
};

export default useDeletePost;
