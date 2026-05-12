import { PATHS } from "@/routers/paths";
import { Button } from "@/shared/ui/Button";
import { Input } from "@/shared/ui/Input";
import { Label } from "@/shared/ui/label";
import { Link } from "react-router-dom";

export default function LoginForm() {
  return (
    <form className="space-y-6 text-crimson-red">
      <div className="space-y-2">
        <Label variant="basic">Email*</Label>

        <Input variant="basic" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-2">
        <Label variant="basic">Password*</Label>

        <Input variant="basic" placeholder="Enter your password" />
      </div>

      <div className="flex items-center justify-between">
        <Label variant="basic">
          <Input variant="checkBox" type="checkbox" />
          <span> Remember me</span>
        </Label>

        <Link to={PATHS.FORGOT_PASSWORD} className="text-sm hover:underline">
          Forgot password
        </Link>
      </div>

      <Button variant="authBlock" size="lg" type="submit">
        Sign in
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
