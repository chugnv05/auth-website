import { PATHS } from "@/app/router/paths";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/label";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLogin } from "../hooks/useLogin";
import { LoginFormValues, loginSchema } from "../schemas/login.schema";

export default function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLogin();

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit: SubmitHandler<LoginFormValues> = async (values) => {
    await loginMutation.mutateAsync(values);
    navigate(PATHS.DASHBOARD);
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <form onSubmit={handleSubmit} className="space-y-6 text-crimson-red onSubm">
      <div className="space-y-2">
        <Label variant="basic">Email*</Label>

        <Input
          variant="basic"
          id="email"
          // type="email"
          placeholder="Enter your email"
          {...form.register("email")}
        />
        {form.formState.errors.email ? (
          <p className="text-xs text-destructive">{form.formState.errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <Label variant="basic">Password*</Label>

        <Input
          variant="basic"
          id="password"
          type="password"
          placeholder="Enter your password"
          {...form.register("password")}
        />
        {form.formState.errors.password ? (
          <p className="text-xs text-destructive">{form.formState.errors.password.message}</p>
        ) : null}
      </div>

      <div className="flex items-center justify-between">
        <Label variant="basic">
          <Input variant="checkBox" type="checkbox" {...form.register("rememberMe")} />
          <span> Remember me</span>
        </Label>

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
  );
}
