import { useToast } from "@/components/ui/use-toast";
import { editUserData } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface userEditUserOptions {
  onSuccess: () => void;
}

const useEditUserData = (username: string, options: userEditUserOptions) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: editUserData) => {
      try {
        const res = await fetch("/api/users/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "something went wrong");
        }
        return data;
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";

        toast({
          variant: "destructive",
          title: `${errorMessage}`,
        });
        throw error;
      }
    },
    onSuccess: () => {
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["user", `${username}`] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
  });
  return { mutate, isPending };
};

export default useEditUserData;
