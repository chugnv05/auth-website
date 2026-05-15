import { PATHS } from "@/app/router/paths";
import {
  Button,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

import { Link } from "react-router-dom";

export default function RegisterForm() {
  return (
    <form className="space-y-6 text-crimson-red">
      <div className="flex gap-4">
        <div className="space-y-2 w-full">
          <Label variant="basic">First Name*</Label>

          <Input variant="basic" placeholder="Enter your first name" />
        </div>

        <div className="space-y-2 w-full">
          <Label variant="basic">Last Name*</Label>

          <Input variant="basic" placeholder="Enter your last name" />
        </div>
      </div>

      <div className="flex gap-4">
        <div className="space-y-2 w-full">
          <Label variant="basic">Gender*</Label>

          <Select>
            <SelectTrigger variant="auth">
              <SelectValue placeholder="Male" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="MALE">Male</SelectItem>
              <SelectItem value="FEMALE">Female</SelectItem>
              <SelectItem value="UNKNOWN">Unknown</SelectItem>
              <SelectItem value="OTHER">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2 w-full">
          <Label variant="basic">Date Of Birth*</Label>

          <Input variant="basic" type="date" placeholder="Enter your last name" />
        </div>
      </div>

      <div className="space-y-2">
        <Label variant="basic">Phone number*</Label>

        <Input variant="basic" type="number" placeholder="Enter your phone number" />
      </div>

      <div className="space-y-2">
        <Label variant="basic">Email*</Label>

        <Input variant="basic" type="email" placeholder="Enter your email" />
      </div>

      <div className="space-y-2">
        <Label variant="basic">Password*</Label>

        <Input variant="basic" type="password" placeholder="Enter your password" />
      </div>

      <Button variant="authBlock" size="lg" type="submit">
        Create Account
      </Button>

      <p className="text-sm">
        Already have an account?{" "}
        <Link to={PATHS.LOGIN} className="font-semibold hover:underline">
          Login
        </Link>
      </p>
    </form>
  );
}
