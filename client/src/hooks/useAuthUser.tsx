import { User } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useAuthUser = () => {
  const { data, isLoading } = useQuery<User>({
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/get-me");
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      } catch (error) {
        console.log(error);
      }
    },
  });

  return { data, isLoading };
};

export default useAuthUser;
