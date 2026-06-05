import { PATHS } from "@/app/router/paths";
import { genderData } from "@/shared/config/gender.data";
import {
  Button,
  Form,
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
import { PasswordInput } from "@/shared/ui/custom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import ContinueWithSocial from "../../components/ContinueWithSocial";
import { useRegister } from "../hooks/useRegister";
import { registerSchema, type RegisterSchemaType } from "../schemas/register.schema";

export function RegisterForm() {
  const registerMutation = useRegister();
  const form = useForm<RegisterSchemaType>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      gender: undefined,
      dob: "",
      email: "",
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (values: RegisterSchemaType) => {
    registerMutation.mutate(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 text-crimson-red">
        <div className="flex gap-4">
          {/* First Name */}
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic" required>
                  First Name
                </FormLabel>
                <FormControl>
                  <Input variant="basic" placeholder="Enter your first name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Last Name */}
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic" required>
                  Last Name
                </FormLabel>
                <FormControl>
                  <Input variant="basic" placeholder="Enter your last name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex gap-4">
          {/* Gender */}
          <FormField
            control={form.control}
            name="gender"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic" required>
                  Gender
                </FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger variant="auth">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {genderData.map((gender) => (
                      <SelectItem key={gender.value} value={gender.value}>
                        {gender.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Date of birth */}
          <FormField
            control={form.control}
            name="dob"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormLabel variant="basic" required>
                  Date of Birth
                </FormLabel>
                <FormControl>
                  <Input variant="basic" type="date" {...field} />
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
              <FormLabel variant="basic" required>
                Phone Number
              </FormLabel>
              <FormControl>
                <Input
                  variant="basic"
                  type="tel"
                  placeholder="Enter your phone number"
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
              <FormLabel variant="basic" required>
                Password
              </FormLabel>
              <FormControl>
                <PasswordInput
                  autoComplete="new-password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant="authBlock" size="lg" type="submit" disabled={registerMutation.isPending}>
          {registerMutation.isPending ? "Creating..." : "Create Account"}
        </Button>

        <ContinueWithSocial />

        <p className="text-sm">
          Already have an account?{" "}
          <Link to={PATHS.LOGIN} className="font-semibold hover:underline">
            Login
          </Link>
        </p>
      </form>
    </Form>
  );
}
