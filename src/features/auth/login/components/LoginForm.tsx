import { PATHS } from "@/app/router/paths";
import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
} from "@/shared/ui";
import { PasswordInput } from "@/shared/ui/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../hooks/useLogin";
import { loginSchema, type LoginSchemaType } from "../schemas/login.schema";

export default function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useForm<LoginSchemaType>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (values: LoginSchemaType) => {
    loginMutation.mutateAsync(values, {
      onSuccess: () => navigate(PATHS.DASHBOARD),
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-crimson-red onSubm">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic">Email*</FormLabel>
              <FormControl>
                <Input variant="basic" type="text" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel variant="basic">Password*</FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex items-center justify-between">
          <FormField
            control={form.control}
            name="rememberMe"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2 space-y-0">
                <FormControl>
                  <Input
                    variant="checkBox"
                    type="checkbox"
                    checked={field.value}
                    onChange={field.onChange}
                  />
                </FormControl>
                <Label variant="basic">Remember me</Label>
              </FormItem>
            )}
          />

          <Link to={PATHS.FORGOT_PASSWORD} className="text-sm hover:underline">
            Forgot password
          </Link>
        </div>

        <Button variant="authBlock" size="lg" type="submit" disabled={loginMutation.isPending}>
          {loginMutation.isPending ? "Signing in..." : "Sign in"}
        </Button>

        <p className="text-sm">
          Don't have an account?{" "}
          <Link to={PATHS.REGISTER} className="font-semibold hover:underline">
            Register now
          </Link>
        </p>
      </form>
    </Form>
  );
}
