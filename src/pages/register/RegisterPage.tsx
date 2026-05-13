import RegisterForm from "@/features/auth/register/components/RegisterForm";

export default function RegisterPage() {
  return (
    <div className="w-full h-auto object-contain md:w-full lg:w-[50%]">
      <h1 className="text-4xl font-bold text-crimson-red mb-10">Welcome To The Sun</h1>
      <RegisterForm />
    </div>
  );
}
