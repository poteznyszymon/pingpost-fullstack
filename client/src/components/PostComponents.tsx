import { Post } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { Bookmark, Heart, MessageCircle } from "lucide-react";
import { Separator } from "./ui/separator";
import { parseHashtags } from "@/lib/parseHashtag";

interface PostComponentsProps {
  post: Post;
}

const PostComponents = ({ post }: PostComponentsProps) => {
  return (
    <div className="bg-card w-full rounded-2xl p-5 space-y-5 shadow-sm">
      <div className="flex gap-5 items-center">
        <Link to={`/profile/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.profileImg} />
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={`/profile/${post.user.username}`}>
            <p className="font-semibold hover:underline">
              {post.user.username}
            </p>
          </Link>
          <p className="text-muted-foreground text-xs">21 hours ago</p>
        </div>
      </div>
      <p>{parseHashtags(post.text)}</p>
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex gap-2 items-center">
            <Heart className="size-5 cursor-pointer" />
            <p className="text-xs font-semibold">{post.likes.length} likes</p>
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircle className="size-5 cursor-pointer" />
            <p className="text-xs font-semibold">
              {post.comments.length} comments
            </p>
          </div>
        </div>
        <Bookmark className="size-5 cursor-pointer" />
      </div>
    </div>
  );
};

export default PostComponents;
