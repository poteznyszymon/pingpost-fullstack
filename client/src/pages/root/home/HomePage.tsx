import PostEditor from "@/components/PostEditor";
import Posts from "@/components/Posts";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

const HomePage = () => {
  const [feedType, setFeedType] = useState<"for-you" | "following">("for-you");

  return (
    <div className="w-full  flex-col space-y-5">
      <Tabs className="shadow-sm" defaultValue={"for-you"}>
        <TabsList className="w-full bg-card grid grid-cols-2 h-[2.7rem]">
          <TabsTrigger
            value="for-you"
            className="h-full font-bold"
            onClick={() => setFeedType("for-you")}
          >
            For you
          </TabsTrigger>
          <TabsTrigger
            value="following"
            className="h-full font-bold"
            onClick={() => setFeedType("following")}
          >
            Following
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <PostEditor />
      <Posts feedType={feedType} />
    </div>
  );
};

export default HomePage;
