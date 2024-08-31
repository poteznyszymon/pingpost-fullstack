import { Image } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { Textarea } from "./ui/textarea";
import UserAvatar from "./UserAvatar";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { Link } from "react-router-dom";
import { useState } from "react";

const PostEditor = () => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const [userInput, setUserInput] = useState("");

  return (
    <div className="bg-card p-5 rounded-2xl sticky top-[5.25rem] shadow-sm">
      <div className="flex gap-5">
        <Link to={`/profile/${user?.username}`} className="flex-shrink-0">
          <UserAvatar avatarUrl={user?.profileImg || ""} className="size-10" />
        </Link>
        <Textarea
          onChange={(e) => setUserInput(e.target.value)}
          value={userInput}
          className="max-h-[20rem] rounded-2xl px-5 py-2 resize-none h-auto"
        />
      </div>
      <div className="flex justify-end pt-5 items-center gap-5 ">
        <label htmlFor="image-input">
          <div
            className="hover:bg-primary/10 rounded-full p-2 cursor-pointer "
            title="Add photo"
          >
            <Image className="text-primary size-5" />
            <input id="image-input" hidden type="file" />
          </div>
        </label>
        <LoadingButton disabled={!userInput} loading={false}>
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
