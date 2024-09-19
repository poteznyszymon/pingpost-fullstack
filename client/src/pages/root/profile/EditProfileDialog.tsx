import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";
import {
  regiserValues,
  updateUserSchema,
  updateUserValues,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const EditProfileDialog = ({ user }: { user: User }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async (values: regiserValues) => {
      try {
        const res = await fetch("/api/users/edit", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
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
      queryClient.invalidateQueries({ queryKey: ["user", `${user.username}`] });
      setOpenDialog(false);
    },
  });

  const form = useForm<updateUserValues>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      displayName: user.displayName || "",
      email: user.email || "",
      password: "",
      newPassword: "",
      bio: user.bio || "",
    },
  });

  useEffect(() => {
    if (openDialog) {
      form.setValue("displayName", user.displayName || "");
      form.setValue("email", user.email || "");
      form.setValue("bio", user.bio || "");
    }
  }, [openDialog, user, form]);

  const onSubmit = (values: regiserValues) => {
    mutate(values);
  };

  const handleClose = () => {
    form.reset();
    setOpenDialog(false);
  };

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDialog(true)} variant={"secondary"} className="rounded-2xl">
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseClick={handleClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {" "}
        <DialogHeader>
          <DialogTitle>Edit your profile</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
                <FormField
                  control={form.control}
                  name="displayName"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Display Name" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Email" {...field} />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="current password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="new password"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="text-xs" />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Textarea placeholder="Bio" {...field} className="max-h-32"/>
                    </FormControl>
                    <FormMessage className="text-xs" />
                  </FormItem>
                )}
              />
              <LoadingButton loading={isPending}>Save</LoadingButton>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
