import { Post } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useGetPosts = (feedType: string) => {
  const { data, isLoading } = useQuery<Post[]>({
    queryKey: ["posts", `${feedType}`],
    queryFn: async () => {
      try {
        const res = await fetch("/api/posts/get-all");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { data, isLoading };
};

export default useGetPosts;
