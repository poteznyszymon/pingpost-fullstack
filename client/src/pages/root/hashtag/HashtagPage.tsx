import { useEffect } from "react";
import { useParams } from "react-router-dom";

const HashtagPage = () => {
  const { tag } = useParams();

  useEffect(() => {
    document.title = `${tag} | pingpost`;
  }, [tag]);

  return <div className="w-full h-screen flex-col space-y-5">{tag}</div>;
};

export default HashtagPage;
