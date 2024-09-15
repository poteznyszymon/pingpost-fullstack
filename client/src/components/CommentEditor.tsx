import { Loader2, SendHorizontal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import React, { useEffect, useRef, useState } from "react";
import useAddComment from "@/hooks/useAddComment";

interface CommentEditorProps {
  feedType: string;
  postId: string;
}

const CommentEditor = ({ postId, feedType }: CommentEditorProps) => {
  const [text, setText] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { addComment, isPending } = useAddComment(
    {
      onSuccess: () => {
        setText("");
      },
    },
    feedType
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addComment({ postId, text });
  };

  return (
    <form onSubmit={onSubmit} className="flex items-center gap-2">
      <Input
        ref={inputRef}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a comment"
        className="rounded-2xl text-sm"
      />
      <Button
        disabled={!text}
        title="send comment"
        variant={"default"}
        className="rounded-2xl"
      >
        {!isPending && <SendHorizontal className="size-4" />}
        {isPending && <Loader2 className="size-4 animate-spin" />}
      </Button>
    </form>
  );
};

export default CommentEditor;
