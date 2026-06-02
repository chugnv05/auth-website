import { PATHS } from "@/app/router/paths";
import { VerifyOtpForm } from "@/features/auth/forgot-password";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function VerifyOtpPage() {
  const navigate = useNavigate();
  const localtion = useLocation();
  const email = localtion.state?.email as string | undefined;

  useEffect(() => {
    if (!email) navigate(PATHS.FORGOT_PASSWORD, { replace: true });
  }, [email, navigate]);

  if (!email) return true;

  return (
    <div className="page-container max-w-xl md:max-w-xl lg:max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-crimson-red">Verify OTP</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter the OTP sent to <span className="font-medium text-crimson-red">{email}</span>
          </p>
        </div>
        <VerifyOtpForm
          email={email}
          onSuccess={() => navigate(PATHS.RESET_PASSWORD, { state: { email, verified: true } })}
          onCancel={() => navigate(PATHS.FORGOT_PASSWORD)}
        />
      </div>
    </div>
  );
}
