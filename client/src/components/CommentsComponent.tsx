import { Post, User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { formatRelativeDate } from "@/lib/formatDate";
import { Button } from "./ui/button";
import { useState } from "react";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import LoadingButton from "./LoadingButton";
import useDeleteComment from "@/hooks/useDeleteComment";

interface CommentsComponentProps {
  user: User;
  post: Post;
  feedType: string;
}

const CommentsComponent = ({
  post,
  user,
  feedType,
}: CommentsComponentProps) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState<string | null>(
    null
  );
  const numberOfComments = 2;
  const [cursor, setCursor] = useState(
    Math.max(post.comments.length - numberOfComments, 0)
  );
  const moreComments = cursor > 0;

  const comments = post.comments.slice(cursor, post.comments.length);

  const { deleteComment, isPending } = useDeleteComment(
    {
      onSuccess: () => {
        setOpenDialog(false);
      },
    },
    feedType
  );

  const handleDeleteClick = (commentId: string) => {
    setSelectedCommentId(commentId);
    setOpenDialog(true);
  };

  return (
    <>
      {moreComments && (
        <div className="flex">
          <Button
            onClick={() =>
              setCursor((prevCursor) =>
                Math.max(prevCursor - numberOfComments, 0)
              )
            }
            variant={"link"}
            className="font-semibold mx-auto"
          >
            Load more comments
          </Button>
        </div>
      )}
      {comments.map((comment) => (
        <div
          key={comment._id}
          className="flex justify-between items-center group/comment"
        >
          <div className="flex items-center gap-3">
            <Link to={`/profile/${comment.user.username}`}>
              <UserAvatar avatarUrl={comment.user.profileImg} />
            </Link>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <Link to={`/profile/${comment.user.username}`}>
                  <p className="text-sm font-semibold hover:underline">
                    {comment.user.displayName || comment.user.username}
                  </p>
                </Link>
                <p className="text-xs text-muted-foreground">
                  {formatRelativeDate(new Date(comment.createdAt))}
                </p>
              </div>
              <p className="text-sm">{comment.text}</p>
            </div>
          </div>
          {comment.user._id === user._id && (
            <Dialog open={openDialog && selectedCommentId === comment._id}>
              <DialogTrigger
                className="ml-auto"
                onClick={() => handleDeleteClick(comment._id)}
              >
                <div className="opacity-0 group-hover/comment:opacity-100 transition-all cursor-pointer hover:bg-primary p-1 rounded-full">
                  <X className="size-5" />
                </div>
              </DialogTrigger>
              <DialogContent
                className="px-10"
                onCloseClick={() => setOpenDialog(false)}
              >
                <DialogTitle className="font-normal">
                  Are you sure you want to delete this comment? This action
                  cannot be undone.
                </DialogTitle>
                <DialogFooter className="flex gap-3 md:gap-0">
                  <Button
                    onClick={() => setOpenDialog(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <LoadingButton
                    loading={isPending}
                    variant="destructive"
                    className="bg-primary hover:bg-primary/80"
                    onClick={() =>
                      deleteComment({
                        postId: post._id,
                        commentId: comment._id,
                      })
                    }
                  >
                    Delete
                  </LoadingButton>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          )}
        </div>
      ))}
    </>
  );
};

export default CommentsComponent;
