import UserAvatar from "./UserAvatar";
import { Notification } from "@/lib/types";
import { Bookmark, Heart, User } from "lucide-react";
import { Link } from "react-router-dom";

interface NotificationComponentProps {
  notification: Notification;
}

export const NotificationComponent = ({
  notification,
}: NotificationComponentProps) => {
  return (
    <div className="bg-card shadow-sm rounded-2xl p-5 flex gap-3">
      <div>
        {notification.type === "like" && (
          <Heart className="size-6 fill-primary text-primary" />
        )}
        {notification.type === "follow" && (
          <User className="size-6 fill-primary text-primary" />
        )}
        {notification.type === "bookmarks" && (
          <Bookmark className="size-6 fill-primary text-primary" />
        )}
      </div>
      <div className="flex-1 flex flex-col gap-5">
        <div className="flex gap-3 items-center">
          <Link to={`/profile/${notification.from.username}`}>
            <UserAvatar
              className="size-6"
              avatarUrl={notification.from.profileImg}
            />
          </Link>
          <div className="flex flex-wrap items-center space-x-1">
            <p className="font-semibold">{notification.from.username}</p>
            {notification.type === "like" && <p>liked your post</p>}
            {notification.type === "follow" && <p>followed you</p>}
            {notification.type === "comment" && <p>commented your post</p>}
            {notification.type === "bookmarks" && (
              <p>added your post to bookmarks</p>
            )}
          </div>
        </div>
        {(notification.type === "like" ||
          notification.type === "bookmarks" ||
          notification.type === "comment") && (
          <div className="text-muted-foreground">{notification.content}</div>
        )}
      </div>
    </div>
  );
};
