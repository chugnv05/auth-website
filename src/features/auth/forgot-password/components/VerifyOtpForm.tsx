import { Button, Form, FormField, FormItem, FormLabel, FormMessage } from "@/shared/ui";
import { OtpInput } from "@/shared/ui/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useVerifyOtp } from "../hooks/useForgotPassword";
import { verifyOtpSchema, type VerifyOtpSchemaType } from "../schemas/forgot-password.shema";

interface VerifyOtpFormProps {
  email: string;
  onSuccess: () => void;
  onCancel: () => void;
}

export function VerifyOtpForm({ email, onSuccess, onCancel }: VerifyOtpFormProps) {
  const { mutate, isPending } = useVerifyOtp(email);

  const form = useForm<VerifyOtpSchemaType>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: { otpCode: "" },
  });

  const onSubmit = (values: VerifyOtpSchemaType) => {
    mutate(values, { onSuccess });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormField
          control={form.control}
          name="otpCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic" required>
                OTP Code
              </FormLabel>
              <OtpInput value={field.value} onChange={field.onChange} />
              <FormMessage className="text-center" />
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
            Back
          </Button>
          <Button type="submit" variant="authBlock" className="w-28" isLoading={isPending}>
            Verify
          </Button>
        </div>
      </form>
    </Form>
  );
}
