import { MESSAGES } from "@/shared/constants/messages";
import { z } from "zod"; // valid data trc khi ban request
export const loginSchema = z.object({
  email: z.string().min(3, MESSAGES.user.email.format),
  password: z.string().min(6, MESSAGES.user.password.invalid),
  rememberMe: z.boolean(),
});

export type LoginSchemaType = z.infer<typeof loginSchema>;
