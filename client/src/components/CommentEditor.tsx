import { SendHorizonal } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useState } from "react";

const CommentEditor = () => {
  const [text, setText] = useState("");

  return (
    <div>
      <div className="flex items-center gap-2">
        <Input
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
          <SendHorizonal className="size-4" />
        </Button>
      </div>
    </div>
  );
};

export default CommentEditor;
