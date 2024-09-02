import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();

  return <div className="w-full h-screen flex-col space-y-5">{username}</div>;
};

export default ProfilePage;
