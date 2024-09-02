import useGetPosts from "@/hooks/useGetPosts";
import PostComponents from "./PostComponents";
import PostSkeleton from "./PostSkeleton";

interface PostsProps {
  feedType: "for-you" | "following";
}

const Posts = ({ feedType }: PostsProps) => {
  const { data: posts, isLoading } = useGetPosts(feedType);

  if (posts?.length === 0)
    return (
      <p className="text-center text-lg font-semibold">No posts here yet.</p>
    );
  if (isLoading)
    return (
      <>
        <PostSkeleton />
        <PostSkeleton />
        <PostSkeleton />
      </>
    );
  return (
    <>{posts?.map((post) => <PostComponents key={post._id} post={post} />)}</>
  );
};

export default Posts;
