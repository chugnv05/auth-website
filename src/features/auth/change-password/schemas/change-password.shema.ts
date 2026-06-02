import { MESSAGES } from "@/shared/constants/messages";
import z from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, MESSAGES.user.password.required),
    newPassword: z
      .string()
      .min(6, MESSAGES.user.password.invalid)
      .regex(/[A-Z]/, MESSAGES.user.password.uppercase)
      .regex(/[a-z]/, MESSAGES.user.password.lowercase)
      .regex(/\d/, MESSAGES.user.password.number)
      .regex(/[@#$%&*!]/, MESSAGES.user.password.specialCharacters),
    reNewPassword: z.string().min(1, MESSAGES.user.password.reEnter),
  })
  .refine((data) => data.newPassword === data.reNewPassword, {
    message: MESSAGES.user.password.doNotMatch,
    path: ["reNewPassword"],
  });

export type ChangePasswordSchemaType = z.infer<typeof changePasswordSchema>;
