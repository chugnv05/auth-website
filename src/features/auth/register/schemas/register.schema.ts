import { MESSAGES } from "@/shared/constants/messages";
import z from "zod";

export const registerSchema = z.object({
  firstName: z.string().min(2, MESSAGES.user.firstName.invalid),
  lastName: z.string().min(2, MESSAGES.user.lastName.invalid),
  gender: z.enum(["MALE", "FEMALE", "UNKNOWN", "OTHER"], { message: MESSAGES.user.dob.required }),
  dob: z
    .string()
    .min(1, MESSAGES.user.dob.required)
    .refine(
      (val) => {
        const birth = new Date(val);
        const today = new Date();
        const age = today.getFullYear() - birth.getFullYear();
        return age >= 16;
      },
      { message: MESSAGES.user.dob.invalid },
    ),
  email: z.string().email(MESSAGES.user.email.format),
  phoneNumber: z.string().regex(/^[0-9]{10,11}$/, MESSAGES.user.phoneNumber.format),
  password: z.string().min(6, MESSAGES.user.password.invalid),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
