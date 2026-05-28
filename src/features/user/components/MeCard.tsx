import type { User } from "@/entities/user/types";
import { genderData } from "@/shared/config/gender.data";
import { STATUS_CONFIG } from "@/shared/config/status.data";
import { RoleType } from "@/shared/constants/role";
import type { Status } from "@/shared/constants/status";
import { formatDate } from "@/shared/lib/format";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";
import type { UseFormReturn } from "react-hook-form";
import type { UpdateMeSchemaType } from "../schemas/update.schema";

interface MeCardProps {
  form: UseFormReturn<UpdateMeSchemaType>;
  user: User;
  isEditing: boolean;
}

export function MeCard({ form, user, isEditing }: MeCardProps) {
  const role = user.roles?.[0]?.name ?? "";
  const isAdmin = role === RoleType.ADMIN;
  const isManager = role === RoleType.MANAGER;
  const canEditPhone = isAdmin || isManager;
  const canEditEmail = isAdmin;

  const status = STATUS_CONFIG[user.status as Status] ?? STATUS_CONFIG["ACTIVE"];

  return (
    <div className="flex flex-col gap-6">
      {/* cụm input */}
      <div className="flex flex-col gap-4">
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic">First Name</FormLabel>
                <FormControl>
                  <Input variant="basic" disabled={!isEditing} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic">Last Name</FormLabel>
                <FormControl>
                  <Input variant="basic" disabled={!isEditing} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic">Gender</FormLabel>
                <Select disabled={!isEditing} onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger variant="auth">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderData.map((g) => (
                      <SelectItem key={g.value} value={g.value}>
                        {g.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic">Date of Birth</FormLabel>
                <FormControl>
                  <Input variant="basic" type="date" disabled={!isEditing} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic">Phone Number</FormLabel>
              <FormControl>
                <Input
                  variant="basic"
                  type="tel"
                  disabled={!isEditing || !canEditPhone}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic" required>
                Email
              </FormLabel>
              <FormControl>
                <Input
                  variant="basic"
                  type="text"
                  disabled={!isEditing || !canEditEmail}
                  defaultValue={user.email}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>

      <div className="flex items-start justify-between text-sm text-crimson-red/70">
        <div className="flex flex-col gap-1">
          <span>Created: {formatDate(user.createdAt)}</span>
          <span>Updated: {formatDate(user.updatedAt)}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className={`size-2.5 rounded-full ${status.color}`} />
          <span className="font-medium">{status.label}</span>
        </div>
      </div>
    </div>
  );
}
