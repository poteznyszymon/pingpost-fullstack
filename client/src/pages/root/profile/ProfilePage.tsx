import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { username } = useParams();
  useEffect(() => {
    document.title = `${username} | pingpost`;
  }, [username]);

  return <div className="w-full h-screen flex-col space-y-5">{username}</div>;
};

export default ProfilePage;
