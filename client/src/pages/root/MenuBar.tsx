import { Button } from "@/components/ui/button";
import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

import { Bell, Bookmark, Home, User as UserIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface MenuBarProps {
  className?: string;
  newNotifications: boolean | undefined;
}

export default function MenuBar({ className, newNotifications }: MenuBarProps) {
  const { data } = useQuery<User>({ queryKey: ["authUser"] });

  return (
    <div className={className}>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Home"
        asChild
      >
        <Link to="/">
          <Home />
          <span className="hidden lg:inline">Home</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Notifications"
        asChild
      >
        <Link to="/notifications">
          <div className="relative">
            <Bell />
            {newNotifications && (
              <div className="bg-card size-2 absolute rounded-full top-0 right-1">
                <div className=" bg-primary size-2 rounded-full" />
              </div>
            )}
          </div>

          <span className="hidden lg:inline">Notifications</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link to="/bookmarks">
          <Bookmark />
          <span className="hidden lg:inline">Bookmarks</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Profile"
        asChild
      >
        <Link to={`/profile/${data?.username}`}>
          <UserIcon />
          <span className="hidden lg:inline">Profile</span>
        </Link>
      </Button>
    </div>
  );
}
