import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useGetSuggestedUsers = () => {
  const { data: suggestedUsers, isLoading } = useQuery<User[]>({
    queryKey: ["suggestedUsers"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/users/get-suggested");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { suggestedUsers, isLoading };
};

export default useGetSuggestedUsers;
