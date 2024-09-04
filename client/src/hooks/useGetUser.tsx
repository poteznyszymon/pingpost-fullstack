import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useGetUser = (username: string) => {
  const {
    data: user,
    isLoading,
    isError,
    refetch,
  } = useQuery<User>({
    queryKey: ["user", `${username}`],
    queryFn: async () => {
      try {
        const res = await fetch(`/api/users/${username}`);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { user, isLoading, isError, refetch };
};

export default useGetUser;
