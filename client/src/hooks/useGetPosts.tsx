import { PostsPage } from "@/lib/types";
import { useInfiniteQuery } from "@tanstack/react-query";

const useGetPosts = (feedType: string) => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ["posts", feedType],
    queryFn: async ({ pageParam = null }) => {
      try {
        if (feedType === "for-you") {
          const res = await fetch(
            `/api/posts/get-all${pageParam ? `?cursor=${pageParam}` : ""}`
          );
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error fetching posts");
          }
          const data: PostsPage = await res.json();

          return data;
        } else if (feedType === "following") {
          const res = await fetch(
            `/api/posts/get-following${pageParam ? `?cursor=${pageParam}` : ""}`
          );
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error fetching posts");
          }
          const data: PostsPage = await res.json();

          return data;
        } else {
          const res = await fetch(
            `/api/posts/get-bookmarks${pageParam ? `?cursor=${pageParam}` : ""}`
          );
          if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.error || "Error fetching posts");
          }
          const data: PostsPage = await res.json();

          return data;
        }
      } catch (error) {
        console.log("Error fetching posts:", error);
        throw error;
      }
    },
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });

  return {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  };
};

export default useGetPosts;
