import { Post } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";
import { formatRelativeDate } from "@/lib/formatDate";
import { Button } from "./ui/button";
import { useState } from "react";

interface CommentsComponentProps {
  post: Post;
}

const CommentsComponent = ({ post }: CommentsComponentProps) => {
  const numberOfComments = 2;
  const [cursor, setCursor] = useState(
    Math.max(post.comments.length - numberOfComments, 0)
  );
  const moreComments = cursor > 0;

  const comments = post.comments.slice(cursor, post.comments.length);

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
      ))}
    </>
  );
};

export default CommentsComponent;
