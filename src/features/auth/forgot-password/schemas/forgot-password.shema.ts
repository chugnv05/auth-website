import { MESSAGES } from "@/shared/constants/messages";
import { z } from "zod";

export const forgotPasswordSchema = z.object({
  email: z.string().trim().email(MESSAGES.user.email.format),
});

export const verifyOtpSchema = z.object({
  otpCode: z
    .string()
    .min(1, MESSAGES.otp.required)
    .max(6, MESSAGES.otp.format)
    .regex(/^\d+$/, MESSAGES.otp.regex),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .trim()
      .min(6, MESSAGES.user.password.invalid)
      .regex(/[A-Z]/, MESSAGES.user.password.uppercase)
      .regex(/[a-z]/, MESSAGES.user.password.lowercase)
      .regex(/\d/, MESSAGES.user.password.number)
      .regex(/[@#$%&*!]/, MESSAGES.user.password.specialCharacters),
    reNewPassword: z.string().trim().min(1, MESSAGES.user.password.reEnter),
  })
  .refine((data) => data.newPassword === data.reNewPassword, {
    message: MESSAGES.user.password.doNotMatch,
    path: ["reNewPassword"],
  });

export type ForgotPasswordSchemaType = z.infer<typeof forgotPasswordSchema>;
export type VerifyOtpSchemaType = z.infer<typeof verifyOtpSchema>;
export type ResetPasswordSchemaType = z.infer<typeof resetPasswordSchema>;
