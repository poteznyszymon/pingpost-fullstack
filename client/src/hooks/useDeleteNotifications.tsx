import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteNotifications = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate: deleteNotifications } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "Delete",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.log(error);
        throw new Error();
      }
    },
    onSuccess: () => {
      queryClient.setQueryData(["notifications", "page"], []);
      toast({
        description: "Notifications deleted successfully",
      });
    },
    onError: () => {
      toast({
        description: "Something went wrong. Please try again.",
        variant: "destructive",
      });
    },
  });

  return { deleteNotifications };
};

export default useDeleteNotifications;
