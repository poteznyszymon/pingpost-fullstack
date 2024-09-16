import { SearchIcon } from "lucide-react";
import { Input } from "./ui/input";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { User } from "@/lib/types";
import UserAvatar from "./UserAvatar";
import { Link } from "react-router-dom";

const SearchInput = () => {
  const [userInput, setUserInput] = useState("");
  const [openResultsMenu, setOpenResultsMenu] = useState(false);
  const queryClient = useQueryClient();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const { data } = useQuery<User[]>({
    queryKey: ["users", "search"],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/search/${userInput}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "something went wrong");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const handleBlur = () => {
    setTimeout(() => {
      setOpenResultsMenu(false);
    }, 200);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="relative">
        <div
          className="relative hidden sm:block"
          onClick={() => setOpenResultsMenu(true)}
        >
          <Input
            value={userInput}
            onChange={(e) => {
              setUserInput(e.target.value);
              queryClient.invalidateQueries({ queryKey: ["users", "search"] });
            }}
            id="searchField"
            className="pe-10 rounded-2xl"
            onBlur={() => {
              handleBlur();
              queryClient.removeQueries({ queryKey: ["users", "search"] });
            }}
          />
          <label htmlFor="searchField">
            <SearchIcon className="absolute right-3 top-1/2 hover:text-primary cursor-pointer -translate-y-1/2 transform text-muted-foreground" />
          </label>
        </div>
        {openResultsMenu && data && userInput && (
          <div
            className="absolute top-12 border w-full bg-background p-5 space-x-5 rounded-2xl"
            onMouseDown={() => setOpenResultsMenu(true)}
          >
            {data.map((user) => (
              <Link
                onClick={() => {
                  setOpenResultsMenu(false);
                  setUserInput("");
                }}
                to={`/profile/${user.username}`}
                key={user._id}
              >
                <div className="flex items-center gap-3 group">
                  <UserAvatar className="size-8" avatarUrl={user.profileImg} />
                  <div className="flex flex-col">
                    <p className="text-sm group-hover:underline">
                      {user.username}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      @{user.username}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </form>
    </>
  );
};

export default SearchInput;
