import { Image, X } from "lucide-react";
import LoadingButton from "./LoadingButton";
import { Textarea } from "./ui/textarea";
import UserAvatar from "./UserAvatar";
import { useQuery } from "@tanstack/react-query";
import { User } from "@/lib/types";
import { Link } from "react-router-dom";
import { ChangeEvent, useRef, useState } from "react";
import useAddPostMutation from "@/hooks/useAddPost";

const PostEditor = () => {
  const { data: user } = useQuery<User>({ queryKey: ["authUser"] });
  const [text, setText] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const imageRef = useRef<HTMLInputElement | null>(null);
  const { mutate, isPending } = useAddPostMutation({
    onSuccess: () => {
      setText("");
      setImg(null);
      if (imageRef.current) {
        imageRef.current.value = "";
      }
    },
  });

  const handleImageChane = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.result) {
          setImg(reader.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    mutate({ text, img });
  };

  return (
    <div className="bg-card p-5 rounded-2xl shadow-sm">
      <div className="flex gap-5">
        <Link to={`/profile/${user?.username}`} className="flex-shrink-0">
          <UserAvatar avatarUrl={user?.profileImg || ""} className="" />
        </Link>
        <Textarea
          onChange={(e) => setText(e.target.value)}
          value={text}
          className="rounded-2xl px-5 py-2 resize-none h-12"
        />
      </div>
      {img && (
        <div className="h-64 my-5 ml-[4rem] rounded-2xl overflow-hidden relative group">
          <img
            className="object-contain w-full h-full border-2 rounded-2xl"
            src={img}
          />
          <div
            title="close image"
            onClick={() => {
              setImg(null);
              if (imageRef.current) {
                imageRef.current.value = "";
              }
            }}
            className="absolute top-3 right-3 size-7 hidden bg-primary group-hover:flex cursor-pointer items-center justify-center rounded-full"
          >
            <X className="size-4" />
          </div>
        </div>
      )}
      <div className="flex justify-end pt-5 items-center gap-5 ">
        <label htmlFor="image-input">
          <div
            className="hover:bg-primary/10 rounded-full p-2 cursor-pointer "
            title="Add photo"
          >
            <Image className="text-primary size-5" />
            <input
              ref={imageRef}
              onChange={(e) => handleImageChane(e)}
              id="image-input"
              hidden
              type="file"
            />
          </div>
        </label>
        <LoadingButton
          onClick={() => {
            handleSubmit();
          }}
          disabled={!text && !img}
          loading={isPending}
        >
          Post
        </LoadingButton>
      </div>
    </div>
  );
};

export default PostEditor;
