import { MESSAGES } from "@/shared/constants/messages";
import z from "zod";

export const updateMeSchema = z.object({
  firstName: z.string().trim().min(2, MESSAGES.user.firstName.invalid),
  lastName: z.string().trim().min(2, MESSAGES.user.lastName.invalid),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN", "OTHER"], { message: MESSAGES.user.dob.required }),
  dob: z.string().min(1, MESSAGES.user.dob.required),
  phoneNumber: z
    .string()
    .trim()
    .regex(/^[0-9]{10,11}$/, MESSAGES.user.phoneNumber.format),
  email: z.string().trim().email(MESSAGES.user.email.format),
});

export type UpdateMeSchemaType = z.infer<typeof updateMeSchema>;

export const updateUserByIdSchema = z.object({
  firstName: z.string().min(2, MESSAGES.user.firstName.invalid),
  lastName: z.string().min(2, MESSAGES.user.lastName.invalid),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN", "OTHER"], {
    message: MESSAGES.user.gender.invalid,
  }),
  dob: z.string().min(1, MESSAGES.user.dob.required),
  email: z.string().min(1, MESSAGES.user.email.blank).email(MESSAGES.user.email.format),
  phoneNumber: z.string().regex(/^0\d{9}$/, MESSAGES.user.phoneNumber.format),
  status: z.enum(["ACTIVE", "LOCKED", "EXPIRED", "DELETED"], {
    message: MESSAGES.user.status.invalid,
  }),
});

export type UpdateUserByIdSchemaType = z.infer<typeof updateUserByIdSchema>;
