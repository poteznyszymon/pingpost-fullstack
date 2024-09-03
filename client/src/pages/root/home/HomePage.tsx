import FeedSwitch from "@/components/FeedSwitch";
import PostEditor from "@/components/PostEditor";
import Posts from "@/components/Posts";
import { useState } from "react";

const HomePage = () => {
  const [feedType, setFeedType] = useState<"for-you" | "following">("for-you");

  return (
    <div className="w-full min-h-screen flex-col space-y-5">
      <FeedSwitch
        firstFeed="foryou"
        SecondFeed="following"
        activeFeed={feedType}
        changeFeed={(feed) => setFeedType(feed)}
      />
      <PostEditor />
      <Posts feedType={feedType} />
    </div>
  );
};

export default HomePage;
