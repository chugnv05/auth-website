import { PATHS } from "@/routers/paths";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form className="space-y-6 text-crimson-red">
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm">
          Email
        </label>

        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          className="w-full rounded-xl border border-crimson-red px-4 py-3 outline-none transition focus:border-primary"
        />
      </div>

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          placeholder="Enter your password"
          className="w-full rounded-xl border border-crimson-red px-4 py-3 outline-none transition focus:border-primary"
        />
      </div>

      <div
        className="flex items-center justify-between
      "
      >
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" />
          <span> Remember me</span>
        </label>

        <Link to={PATHS.FORGOT_PASSWORD} className="text-sm hover:underline">
          Forgot password?
        </Link>
      </div>

      <Button variant="authBlock" type="submit">
        Sign in
      </Button>

      <p className="text-sm">
        Don't have an account?{" "}
        <Link to={PATHS.REGISTER} className="font-semibold hover:underline">
          Create now
        </Link>
      </p>
    </form>
  );
}
