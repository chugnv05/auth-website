import { MESSAGES } from "@/shared/constants/messages";
import z from "zod";

export const roleSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, MESSAGES.role.blank)
    .max(50, MESSAGES.common.maxNameLength)
    .regex(/^[A-Z0-9_]+$/, MESSAGES.role.format),
  description: z
    .string()
    .trim()
    .min(1, MESSAGES.common.invalidDescription)
    .max(200, MESSAGES.common.maxDesLength),
  permissions: z.array(z.string().trim()).min(1, MESSAGES.permission.select),
});

export type RoleSchemaType = z.infer<typeof roleSchema>;
