import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { User } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const EditProfileDialog = ({ user }: { user: User }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
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
      queryClient.invalidateQueries({ queryKey: ["user", `${user.username}`] });
      setOpenDialog(false);
    },
  });

  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    newPassword: "",
    currentPassword: "",
    bio: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutate();
  };

  const handleClose = () => {
    setFormData({
      displayName: "",
      email: "",
      bio: "",
      newPassword: "",
      currentPassword: "",
    });
    setOpenDialog(false);
  };

  useEffect(() => {
    if (user) {
      setFormData({
        displayName: user.displayName || "",
        email: user.email || "",
        bio: user.bio || "",
        newPassword: "",
        currentPassword: "",
      });
    }
  }, [user, openDialog]);

  return (
    <Dialog open={openDialog}>
      <DialogTrigger asChild>
        <Button onClick={() => setOpenDialog(true)} variant={"secondary"}>
          Edit profile
        </Button>
      </DialogTrigger>
      <DialogContent
        onCloseClick={handleClose}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        {" "}
        <DialogHeader>
          <DialogTitle>Edit you profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-2">
              <Input
                name="displayName"
                placeholder="display name"
                value={formData.displayName}
                onChange={handleChange}
              />
              <Input
                type="email"
                name="email"
                placeholder="email"
                value={formData.email}
                onChange={handleChange}
              />
              <Input
                name="currentPassword"
                placeholder="current password"
                value={formData.currentPassword}
                onChange={handleChange}
              />
              <Input
                name="newPassword"
                placeholder="new password"
                value={formData.newPassword}
                onChange={handleChange}
              />
            </div>
            <Textarea
              name="bio"
              placeholder="bio"
              className="max-h-32"
              value={formData.bio}
              onChange={handleChange}
            />
            <LoadingButton loading={isPending}>Save</LoadingButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileDialog;
