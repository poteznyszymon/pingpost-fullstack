import useGetPosts from "@/hooks/useGetPosts";
import PostComponents from "./PostComponents";
import PostSkeleton from "./PostSkeleton";
import InfiniteScrollBox from "./InfiniteScrollBox";
import { Loader2 } from "lucide-react";

interface PostsProps {
  feedType: "for-you" | "following" | "bookmarks" | "hashtag" | "user";
  tag?: string;
  username?: string;
}

const Posts = ({ feedType, tag, username }: PostsProps) => {
  const { data, isFetching, fetchNextPage, isFetchingNextPage, hasNextPage } =
    useGetPosts(feedType, tag, username);
  const posts = data?.pages.flatMap((page) => page.posts) || [];

  if (posts?.length === 0 && !isFetching)
    return <p className="text-center font-semibold">No posts here yet.</p>;
  if (isFetching && !isFetchingNextPage)
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  return (
    <>
      <InfiniteScrollBox
        onBottom={() => hasNextPage && !isFetching && fetchNextPage()}
        className="space-y-5 "
      >
        {posts?.map((post) => (
          <PostComponents key={post._id} feedType={feedType} post={post} />
        ))}
        {isFetchingNextPage && (
          <div className="flex w-full justify-center h-full items-center py-10">
            <Loader2 className="size-5 animate-spin" />
          </div>
        )}
      </InfiniteScrollBox>
    </>
  );
};

export default Posts;
