import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";

interface useDeletePostOptions {
  onSuccess?: () => void;
  onDelete?: () => void;
}

const useDeletePost = (options: useDeletePostOptions) => {
  const { toast } = useToast();

  const { data, mutate, isPending } = useMutation({
    mutationFn: async (id: string) => {
      try {
        const res = await fetch(`/api/posts/delete/${id}`, {
          method: "DELETE",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      toast({ description: "Post deleted successfully" });
      if (options.onSuccess) {
        options.onSuccess();
      }
    },
    onError: (error) => {
      toast({ variant: "destructive", description: `${error.message}` });
      if (options.onDelete) {
        options.onDelete();
      }
    },
  });

  return { data, mutate, isPending };
};

export default useDeletePost;
