import useGetSuggestedUsers from "@/hooks/useGetSuggestedUsers";
import { User } from "@/lib/types";
import { Loader2 } from "lucide-react";
import UserTile from "./UserTile";

const RightPanel = () => {
  const { suggestedUsers, isLoading } = useGetSuggestedUsers();

  return (
    <div className="sticky top-[5.25rem] hidden h-fit w-72 flex-none space-y-5 md:block lg:w-80">
      <WhoToFollow
        suggestedUsers={suggestedUsers || []}
        isLoading={isLoading}
      />
      <Trending />
    </div>
  );
};

export default RightPanel;

function WhoToFollow({
  suggestedUsers,
  isLoading,
}: {
  suggestedUsers: User[];
  isLoading: boolean;
}) {
  if (isLoading)
    return (
      <div className="w-72 lg:w-80 h-44 flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    );
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm ">
      <h1 className="text-xl font-bold">Who to follow</h1>
      {suggestedUsers.map((user) => (
        <UserTile user={user} key={user._id} />
      ))}
    </div>
  );
}

function Trending() {
  return (
    <div className="space-y-5 rounded-2xl bg-card p-5 shadow-sm h-80"></div>
  );
}
