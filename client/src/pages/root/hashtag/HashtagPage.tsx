import { useParams } from "react-router-dom";

const HashtagPage = () => {
  const { tag } = useParams();

  return <div className="w-full h-screen flex-col space-y-5">{tag}</div>;
};

export default HashtagPage;
