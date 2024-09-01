import { Hashtag } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useGetTrendingHashtag = () => {
  const { data: trendingHashtags, isLoading } = useQuery<Hashtag[]>({
    queryKey: ["trendingHashtags"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/hashtags/trending");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { trendingHashtags, isLoading };
};

export default useGetTrendingHashtag;
