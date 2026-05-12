import LoginForm from "@/features/auth/components/LoginForm";

export default function LoginPage() {
  return (
    <div className="w-full h-auto object-contain md:w-full lg:w-[50%]">
      <h1 className="text-4xl font-bold text-crimson-red mb-10">Welcome Back</h1>
      <LoginForm />
    </div>
  );
}
