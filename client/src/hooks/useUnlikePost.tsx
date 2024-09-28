import { useToast } from "@/components/ui/use-toast";
import { Post, PostsPage, User } from "@/lib/types";
import {
  InfiniteData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

const useUnlikePost = (feedType: string) => {
  const { toast } = useToast();
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const queryClient = useQueryClient();

  const { mutate: unlikePost } = useMutation({
    mutationFn: async (postId: string) => {
      const res = await fetch(`/api/posts/unlike/${postId}`, {
        method: "POST",
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "something went wrong");
      return data.post;
    },
    onMutate: async (postId: string) => {
      if (!user) return;

      await queryClient.cancelQueries({ queryKey: ["posts", `${feedType}`] });

      const previousPosts = queryClient.getQueryData<InfiniteData<PostsPage>>([
        "posts",
        `${feedType}`,
      ]);

      user.likedPosts = user.likedPosts.filter((id) => id !== postId);
      queryClient.setQueryData<User>(["authUser"], user);

      const optimisticUpdate = (post: Post) => ({
        ...post,
        likes: post.likes.filter((userId) => userId !== user._id),
      });

      queryClient.setQueryData<InfiniteData<PostsPage>>(
        ["posts", `${feedType}`],
        (oldData) => {
          if (!oldData) return oldData;
          return {
            ...oldData,
            pages: oldData.pages.map((page) => ({
              ...page,
              posts: page.posts.map((post) =>
                post._id === postId ? optimisticUpdate(post) : post
              ),
            })),
          };
        }
      );

      return { previousPosts };
    },
    onError: (_error, _postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(
          ["posts", `${feedType}`],
          context.previousPosts
        );
      }

      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { unlikePost };
};

export default useUnlikePost;
