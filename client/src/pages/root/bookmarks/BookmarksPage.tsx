import Posts from "@/components/Posts";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookmarksPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `bookmarks | pingpost`;
  }, [pathname]);

  return (
    <div className="w-full min-h-screen space-y-5">
      <div className="bg-card w-full shadow-sm h-[2.7rem] px-5 flex items-center justify-center rounded-2xl font-semibold text-center">
        Bookmarks
      </div>
      <Posts feedType={"bookmarks"} />
    </div>
  );
};

export default BookmarksPage;
