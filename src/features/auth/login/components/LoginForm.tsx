import { PATHS } from "@/app/router/paths";
import { Button, Input, Label } from "@/shared/ui";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
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

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (values: LoginSchemaType) => {
    await loginMutation.mutateAsync(values);

    navigate(PATHS.DASHBOARD);
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-crimson-red onSubm">
      <div className="space-y-2">
        <Label variant="basic">Email*</Label>

        <Input
          variant="basic"
          id="email"
          type="email"
          placeholder="Enter your email"
          {...form.register("email")} //theo doi value
        />
      </div>

      <div className="space-y-2">
        <Label variant="basic">Password*</Label>

        <div className="relative">
          <Input
            variant="basic"
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            {...form.register("password")}
          />
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
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
