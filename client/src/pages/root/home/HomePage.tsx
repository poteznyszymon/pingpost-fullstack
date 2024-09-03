import FeedSwitch from "@/components/FeedSwitch";
import PostEditor from "@/components/PostEditor";
import Posts from "@/components/Posts";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const HomePage = () => {
  const [feedType, setFeedType] = useState<"for-you" | "following">("for-you");
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `home | pingpost`;
  }, [pathname]);

  return (
    <div className="w-full min-h-screen flex-col space-y-5">
      <FeedSwitch
        firstFeed="foryou"
        SecondFeed="following"
        activeFeed={feedType}
        changeFeed={(feed) => setFeedType(feed)}
      />
      <PostEditor />
      <Posts feedType={"for-you"} />
    </div>
  );
};

export default HomePage;
