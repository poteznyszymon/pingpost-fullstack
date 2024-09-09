import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSetNotificationsReaded = () => {
  const queryClient = useQueryClient();

  const { mutate: setReaded } = useMutation({
    mutationFn: async () => {
      try {
        const res = await fetch("/api/notifications", {
          method: "POST",
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Something went wrong");
        return data;
      } catch (error) {
        console.log(error);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications", "menubar"] });
    },
  });
  return { setReaded };
};

export default useSetNotificationsReaded;
