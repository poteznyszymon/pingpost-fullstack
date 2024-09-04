import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import useGetTrendingHashtag from "@/hooks/useGetTrendingHashtags";
import WhoToFollow from "./WhoToFollow";
import Trending from "./Trending";

const RightPanel = () => {
  const { suggestedUsers, isLoading } = useGetSuggestedUsers();
  const { trendingHashtags, isLoading: isHashtagLoading } =
    useGetTrendingHashtag();

  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <WhoToFollow
        suggestedUsers={suggestedUsers || []}
        isLoading={isLoading || isHashtagLoading}
      />
      <Trending
        trendingHashtags={trendingHashtags || []}
        isLoading={isLoading || isHashtagLoading}
      />
    </div>
  );
};

export default RightPanel;
