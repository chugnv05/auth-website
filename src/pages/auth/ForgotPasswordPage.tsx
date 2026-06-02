import { PATHS } from "@/app/router/paths";
import { ForgotPasswordForm } from "@/features/auth/forgot-password";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const handleSuccess = (email: string) => {
    navigate(PATHS.VERIFY_OTP, { state: { email } });
  };

  return (
    <div className="page-container max-w-xl md:max-w-xl lg:max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-crimson-red">Forgot password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your email and we'll send you an OTP to reset your password.
          </p>
        </div>
        <ForgotPasswordForm onSuccess={handleSuccess} onCancel={() => navigate(PATHS.LOGIN)} />
      </div>
    </div>
  );
}
