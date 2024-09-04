import { Hashtag } from "@/lib/types";
import { Link } from "react-router-dom";

const Trending = ({
  trendingHashtags,
  isLoading,
}: {
  trendingHashtags: Hashtag[];
  isLoading: boolean;
}) => {
  if (!isLoading && trendingHashtags.length > 0)
    return (
      <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm ">
        <h1 className="text-xl font-bold">Trending topics</h1>
        {trendingHashtags.map((hashtag) => (
          <div key={hashtag._id} className="flex flex-col">
            <Link to={`/hashtag/${hashtag.tag}`}>
              <p className="hover:underline">#{hashtag.tag}</p>
            </Link>
            <p className="text-xs text-muted-foreground">{hashtag.count}</p>
          </div>
        ))}
      </div>
    );
};

export default Trending;
