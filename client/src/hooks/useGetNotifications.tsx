import { Notification } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";

const useGetNotifications = (options = {}, type: string) => {
  const {
    data: notifications,
    isPending,
    isRefetching,
  } = useQuery<Notification[]>({
    queryKey: ["notifications", `${type}`],
    queryFn: async () => {
      try {
        const res = await fetch("/api/notifications");
        const data = await res.json();
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Error fetching posts");
        }
        return data;
      } catch (error) {
        console.log("Error fetching notifications:", error);
        throw error;
      }
    },
    ...options,
  });

  return { notifications, isPending, isRefetching };
};

export default useGetNotifications;
