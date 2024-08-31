import { User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import FollowButton from "./FollowButton";
import { Link } from "react-router-dom";

interface UserTileProps {
  user: User;
}

const UserTile = ({ user }: UserTileProps) => {
  return (
    <div className="flex gap-5 items-center">
      <Link to={`/profile/${user.username}`} className="flex-shrink-0">
        <UserAvatar avatarUrl={user.profileImg} />
      </Link>
      <div className="flex flex-col justify-center">
        <Link to={`/profile/${user.username}`}>
          <p className="hover:underline font-semibold">
            {user.displayName || user.username}
          </p>
        </Link>
        <p className="text-xs text-muted-foreground">@{user.username}</p>
      </div>
      <FollowButton className="ml-auto" />
    </div>
  );
};

export default UserTile;
