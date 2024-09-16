import Posts from "@/components/Posts";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const HashtagPage = () => {
  const { tag } = useParams();
  const queryClient = useQueryClient();

  useEffect(() => {
    document.title = `${tag} | pingpost`;
    queryClient.invalidateQueries({ queryKey: ["posts", "hashtag"] });
  }, [tag, queryClient]);

  return (
    <div className="w-full min-h-screen flex-col space-y-5">
      <div className="bg-card shadow-sm rounded-2xl px-5 h-[2.7rem] flex items-center justify-center font-semibold">
        #{tag}
      </div>
      <Posts feedType="hashtag" tag={tag} />
    </div>
  );
};

export default HashtagPage;
