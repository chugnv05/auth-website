import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useForgotPassword } from "../hooks/useForgotPassword";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchemaType,
} from "../schemas/forgot-password.shema";

interface ForgotPasswordProps {
  onSuccess: (email: string) => void;
  onCancel: () => void;
}

export function ForgotPasswordForm({ onSuccess, onCancel }: ForgotPasswordProps) {
  const { mutate, isPending } = useForgotPassword();
  const form = useForm<ForgotPasswordSchemaType>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
  });

  const onSubmit = (values: ForgotPasswordSchemaType) => {
    mutate(values, {
      onSuccess: () => onSuccess(values.email),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic" required>
                Email
              </FormLabel>
              <FormControl>
                <Input variant="basic" type="email" placeholder="Enter your email" {...field} />
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
            Back to Login
          </Button>

          <Button type="submit" variant="authBlock" className="w-28" isLoading={isPending}>
            Send OTP
          </Button>
        </div>
      </form>
    </Form>
  );
}
