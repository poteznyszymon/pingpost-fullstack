import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const BookmarksPage = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    document.title = `bookmarks | pingpost`;
  }, [pathname]);

  return (
    <div className="w-full h-screen flex-col space-y-5">BookmarksPage</div>
  );
};

export default BookmarksPage;
