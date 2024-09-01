import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { Hashtag, User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import UserTile from "./UserTile";
import useGetTrendingHashtag from "@/hooks/useGetTrendingHashtags";
import { Link } from "react-router-dom";

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

function WhoToFollow({
  suggestedUsers,
  isLoading,
}: {
  suggestedUsers: User[];
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="w-72 lg:w-80 h-44 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (suggestedUsers.length > 0)
    return (
      <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm ">
        <h1 className="text-xl font-bold">Who to follow</h1>
        {suggestedUsers.map((user) => (
          <UserTile user={user} key={user._id} />
        ))}
      </div>
    );
}

function Trending({
  trendingHashtags,
  isLoading,
}: {
  trendingHashtags: Hashtag[];
  isLoading: boolean;
}) {
  if (!isLoading && trendingHashtags.length > 0)
    return (
      <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm ">
        <h1 className="text-xl font-bold">Trending topics</h1>
        {trendingHashtags.map((hashtag) => (
          <div className="flex flex-col">
            <Link to={`/hashtag/${hashtag.tag}`}>
              <p className="hover:underline">#{hashtag.tag}</p>
            </Link>
            <p className="text-xs text-muted-foreground">{hashtag.count}</p>
          </div>
        ))}
      </div>
    );
}
