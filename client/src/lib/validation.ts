import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string()
    .trim()
    .min(3, { message: "Username must be at least 3 characters long" }),
  email: z.string().trim().email("Invalid email address"),
  password: z
    .string()
    .min(3, { message: "Password must be at least 6 characters long" }),
});

export type regiserValues = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  username: z.string(),
  password: z.string().min(1, "Password cannot be empty"),
});

export type loginValues = z.infer<typeof loginSchema>;

export const createPostSchema = z.object({
  content: z.string(),
  image: z.string(),
});

export type createPostValues = z.infer<typeof createPostSchema>;
