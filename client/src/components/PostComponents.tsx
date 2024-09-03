import { Post, User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { Bookmark, Heart, MessageCircle, X } from "lucide-react";
import { Separator } from "./ui/separator";
import { parseHashtags } from "@/lib/parseHashtag";
import { formatRelativeDate } from "@/lib/formatDate";
import { useQuery } from "@tanstack/react-query";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import useDeletePost from "@/hooks/useDeletePost";
import { DialogTitle } from "@radix-ui/react-dialog";
import { useState } from "react";
import LoadingButton from "./LoadingButton";

interface PostComponentsProps {
  post: Post;
}

const PostComponents = ({ post }: PostComponentsProps) => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const { mutate, isPending } = useDeletePost({
    onSuccess() {
      setOpenDialog(false);
    },
    onDelete() {
      setOpenDialog(false);
    },
  });
  const isOwnPost = post.user._id === user?._id;
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <div className="bg-card w-full rounded-2xl p-5 space-y-5 shadow-sm group">
      <div className="flex gap-4 items-center">
        <Link to={`/profile/${post.user.username}`}>
          <UserAvatar avatarUrl={post.user.profileImg} />
        </Link>
        <div className="flex flex-col justify-center">
          <Link to={`/profile/${post.user.username}`}>
            <p className="font-semibold hover:underline">
              {post.user.username}
            </p>
          </Link>
          <p className="text-muted-foreground text-xs">
            {formatRelativeDate(new Date(post.createdAt))}
          </p>
        </div>
        {isOwnPost && (
          <Dialog open={openDialog}>
            <DialogTrigger
              className="ml-auto"
              onClick={() => setOpenDialog(true)}
            >
              <div className="opacity-0 group-hover:opacity-100 transition-all cursor-pointer hover:bg-primary p-1 rounded-full">
                <X className="size-5" />
              </div>
            </DialogTrigger>
            <DialogContent
              className="px-10"
              onCloseClick={() => setOpenDialog(false)}
            >
              <DialogTitle>
                Are you sure you want to delete this post? This action cannot be
                undone.
              </DialogTitle>
              <DialogFooter className="flex gap-3 md:gap-0">
                <Button onClick={() => setOpenDialog(false)} variant="outline">
                  Cancel
                </Button>
                <LoadingButton
                  loading={isPending}
                  variant="destructive"
                  className="bg-primary hover:bg-primary/80"
                  onClick={() => mutate(post._id || "")}
                >
                  Delete
                </LoadingButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
      <p>{parseHashtags(post.text)}</p>
      {post.img && <img className="rounded-2xl" src={post.img || ""} />}
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
