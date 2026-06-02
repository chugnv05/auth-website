import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui";
import { PasswordInput } from "@/shared/ui/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useChangePassword } from "../hooks/useChangePassword";
import {
  changePasswordSchema,
  type ChangePasswordSchemaType,
} from "../schemas/change-password.shema";

interface ChangePasswordFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

export function ChangePasswordForm({ onSuccess, onCancel }: ChangePasswordFormProps) {
  const { mutate, isPending } = useChangePassword();

  const form = useForm<ChangePasswordSchemaType>({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      reNewPassword: "",
    },
  });

  const onSubmit = (values: ChangePasswordSchemaType) => {
    mutate(values, { onSuccess });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* Mat khau hien tai */}
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic" required>
                Current Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter current password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Mat khau moi */}
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic" required>
                New Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Enter new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Nhap lai mat khau */}
        <FormField
          control={form.control}
          name="reNewPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic" required>
                Confirm New Password
              </FormLabel>
              <FormControl>
                <PasswordInput placeholder="Confirm new password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center pt-2">
          <Button
            type="button"
            variant="outline"
            className="w-28"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button type="submit" variant="authBlock" className="w-28" isLoading={isPending}>
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
}
