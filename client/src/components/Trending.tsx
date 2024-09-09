import { Hashtag } from "@/lib/types";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";

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
        <h1 className="text-lg font-semibold">Trending topics</h1>
        {trendingHashtags.map((hashtag) => (
          <div key={hashtag._id} className="flex flex-col">
            <Link to={`/hashtag/${hashtag.tag}`}>
              <Button
                variant={"ghost"}
                className="w-full flex flex-col items-start group"
              >
                <p className="text font-semibold group-hover:underline">
                  #{hashtag.tag}
                </p>
                <p className="text-xs text-muted-foreground">
                  {hashtag.count} {hashtag.count === 1 ? "post" : "posts"}
                </p>
              </Button>
            </Link>
          </div>
        ))}
      </div>
    );
};

export default Trending;
