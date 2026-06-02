import { PATHS } from "@/app/router/paths";
import { ResetPasswordForm } from "@/features/auth/forgot-password";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email as string | undefined;
  const verified = location.state?.verified as boolean | undefined;

  useEffect(() => {
    if (!email || !verified) navigate(PATHS.FORGOT_PASSWORD, { replace: true });
  }, [email, verified, navigate]);

  if (!email || !verified) return null;

  return (
    <div className="page-container max-w-xl md:max-w-xl lg:max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-crimson-red">Reset Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your new password for {""}
            <span className="font-medium text-crimson-red">{email}</span>
          </p>
        </div>

        <ResetPasswordForm
          email={email}
          onSuccess={() => navigate(PATHS.LOGIN, { replace: true })}
          onCancel={() => navigate(PATHS.VERIFY_OTP, { state: { email } })}
        />
      </div>
    </div>
  );
}
