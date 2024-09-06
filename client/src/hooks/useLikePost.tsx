import { useToast } from "@/components/ui/use-toast";
import { Post, PostsPage, User } from "@/lib/types";
import {
  InfiniteData,
  QueryFilters,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const useLikePost = (feedType: string) => {
  const { toast } = useToast();

  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { mutate: likePost } = useMutation({
    mutationFn: async (postId: string) => {
      try {
        const res = await fetch(`api/posts/like/${postId}`, {
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
    onSuccess: async (updatedPost: Post) => {
      if (!user) return;
      user.likedPosts.push(updatedPost._id);
      queryClient.setQueryData<User>(["authUser"], user);
      updatedPost.likes.push(user._id);

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
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });
  return { likePost };
};

export default useLikePost;
