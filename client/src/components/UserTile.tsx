import { User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import FollowButton from "./RightPanelButton";
import { Link } from "react-router-dom";

interface UserTileProps {
  user: User;
}

const UserTile = ({ user }: UserTileProps) => {
  return (
    <div className="flex gap-3 items-center">
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
      <FollowButton userToFollow={user} className="ml-auto h-9 text-sm rounded-2xl" />
    </div>
  );
};

export default UserTile;
