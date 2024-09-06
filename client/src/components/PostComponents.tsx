import { Post, User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { Bookmark, Heart, MessageCircle, X } from "lucide-react";
import { Separator } from "./ui/separator";
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
import { parseText } from "@/lib/ParseText";
import useAddToBookmarks from "@/hooks/useAddToBookmarks";
import useDeleteFromBookmarks from "@/hooks/useDeleteFromBookmarks";
import useLikePost from "@/hooks/useLikePost";
import useUnlikePost from "@/hooks/useUnlikePost";

interface PostComponentsProps {
  post: Post;
  feedType: string;
}

const PostComponents = ({ post, feedType }: PostComponentsProps) => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const { addToBookmarks, isAdding } = useAddToBookmarks();
  const { deleteFromBookmarks, isDeleting } = useDeleteFromBookmarks();
  const { likePost } = useLikePost(feedType);
  const { unlikePost } = useUnlikePost(feedType);
  const { mutate, isPending } = useDeletePost({
    onSuccess() {
      setOpenDialog(false);
    },
    onDelete() {
      setOpenDialog(false);
    },
  });
  const isOwnPost = post.user._id === user?._id;
  const inBookmarks = user?.bookmarks.includes(post._id);
  const isLiked = user?.likedPosts.includes(post._id);
  const [openDialog, setOpenDialog] = useState(false);

  const handleBookmarksClick = () => {
    if (!isAdding && !isDeleting) {
      if (inBookmarks) {
        return deleteFromBookmarks(post._id);
      } else {
        return addToBookmarks(post._id);
      }
    }
  };

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
      <p>{parseText(post.text)}</p>
      {post.img && <img className="rounded-2xl" src={post.img || ""} />}
      <Separator className="my-4" />
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-5">
          <div className="flex gap-1 items-center">
            <div
              title={isLiked ? "unlike post" : "like post"}
              className="hover:bg-primary/10 p-1 rounded-full cursor-pointer group/likes"
              onClick={
                !isLiked
                  ? () => likePost(post._id)
                  : () => {
                      unlikePost(post._id);
                    }
              }
            >
              <Heart
                className={`size-5 group-hover/likes:text-primary  ${isLiked ? "fill-primary text-primary" : ""}`}
              />
            </div>
            <p className="text-xs font-semibold">
              {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
            </p>
          </div>
          <div className="flex gap-2 items-center">
            <MessageCircle className="size-5 cursor-pointer" />
            <p className="text-xs font-semibold">
              {post.comments.length} comments
            </p>
          </div>
        </div>
        <div
          title={inBookmarks ? "delete from bookmarks" : "add to bookmarks"}
          className="hover:bg-primary/10 p-1 rounded-full group/bookmarks cursor-pointer"
          onClick={handleBookmarksClick}
        >
          <Bookmark
            className={`size-5 group-hover/bookmarks:text-primary  ${inBookmarks ? "fill-primary text-primary" : ""}`}
          />
        </div>
      </div>
    </div>
  );
};

export default PostComponents;
