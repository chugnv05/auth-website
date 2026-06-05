import { MESSAGES } from "@/shared/constants/messages";
import z from "zod";

export const createUserSchema = z.object({
  firstName: z.string().min(2, MESSAGES.user.firstName.invalid),
  lastName: z.string().min(2, MESSAGES.user.lastName.invalid),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN", "OTHER"], {
    required_error: MESSAGES.user.gender.invalid,
  }),
  dob: z.string().min(1, MESSAGES.user.dob.required),
  email: z.string().min(1, MESSAGES.user.email.blank).email(MESSAGES.user.email.format),
  phoneNumber: z.string().regex(/^0\d{9}$/, MESSAGES.user.phoneNumber.format),
});

export type CreateUserSchemaType = z.infer<typeof createUserSchema>;
