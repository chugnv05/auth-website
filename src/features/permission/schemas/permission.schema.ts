import { MESSAGES } from "@/shared/constants/messages";
import z from "zod";

export const permissionSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, MESSAGES.permission.blank)
    .max(50, MESSAGES.common.maxNameLength)
    .regex(/^[a-z_:]+$/, MESSAGES.permission.format),
  description: z
    .string()
    .trim()
    .min(1, MESSAGES.common.invalidDescription)
    .max(200, MESSAGES.common.maxDesLength),
  roles: z.array(z.string().trim()).min(1, MESSAGES.role.select),
});

export type PermissionSchemaType = z.infer<typeof permissionSchema>;
