import { InputWithPassword } from "@/components/InputWithPassword";
import LoadingButton from "@/components/LoadingButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { loginSchema, loginValues } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { mutate: loginUser, isPending } = useMutation({
    mutationFn: async (values: loginValues) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error);
        return data;
      } catch (error) {
        const errorMessage =
          (error as Error).message || "Unknown error occurred";
        throw new Error(errorMessage);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        description: `${error.message}`,
      });
    },
  });

  const form = useForm<loginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "demo",
      password: "demo123",
    },
  });

  const onSubmit = (values: loginValues) => {
    loginUser(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="username" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />{" "}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <InputWithPassword placeholder="password" {...field} />
              </FormControl>
              <FormMessage className="text-xs" />{" "}
            </FormItem>
          )}
        />
        <LoadingButton loading={isPending} className="w-full">
          Login
        </LoadingButton>
      </form>
    </Form>
  );
};

export default LoginForm;
