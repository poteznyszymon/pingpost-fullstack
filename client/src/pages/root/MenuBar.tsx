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
          <Home strokeWidth={1.2}/>
          <span className="hidden lg:inline font-normal">Home</span>
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
            <Bell strokeWidth={1.2}/>
            {newNotifications && (
              <div className="bg-card size-2 absolute rounded-full top-0 right-1">
                <div className=" bg-primary size-2 rounded-full" />
              </div>
            )}
          </div>

          <span className="hidden lg:inline font-normal">Notifications</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Bookmarks"
        asChild
      >
        <Link to="/bookmarks">
          <Bookmark strokeWidth={1.2}/>
          <span className="hidden lg:inline font-normal">Bookmarks</span>
        </Link>
      </Button>
      <Button
        variant="ghost"
        className="flex items-center justify-start gap-3"
        title="Profile"
        asChild
      >
        <Link to={`/profile/${data?.username}`}>
          <UserIcon strokeWidth={1.2}/>
          <span className="hidden lg:inline font-normal">Profile</span>
        </Link>
      </Button>
    </div>
  );
}
