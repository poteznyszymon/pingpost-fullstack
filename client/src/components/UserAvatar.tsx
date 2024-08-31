import { cn } from "@/lib/utils";

interface UserAvatarProps {
  avatarUrl: string | null;
  size?: number;
  className?: string;
}

const UserAvatar = ({ avatarUrl, className }: UserAvatarProps) => {
  return (
    <img
      alt="avatar"
      src={avatarUrl || "/placeholder_avatar.png"}
      className={cn(
        "size-9 flex-none rounded-full hover:scale-105 transition-all duration-300",
        className
      )}
    />
  );
};

export default UserAvatar;
