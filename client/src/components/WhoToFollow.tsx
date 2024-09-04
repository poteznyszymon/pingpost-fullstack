import { User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import UserTile from "./UserTile";

const WhoToFollow = ({
  suggestedUsers,
  isLoading,
}: {
  suggestedUsers: User[];
  isLoading: boolean;
}) => {
  if (isLoading)
    return (
      <div className="w-72 lg:w-80 h-44 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  if (suggestedUsers.length > 0)
    return (
      <div className="space-y-5 rounded-2xl bg-card p-[1.1rem] shadow-sm ">
        <h1 className="text-xl font-bold">Who to follow</h1>
        {suggestedUsers.map((user) => (
          <UserTile user={user} key={user._id} />
        ))}
      </div>
    );
};

export default WhoToFollow;
