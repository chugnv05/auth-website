import { PATHS } from "@/app/router/paths";
import { ChangePasswordForm } from "@/features/auth/change-password/components/ChangePasswordForm";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
  const navigate = useNavigate();

  return (
    <div className="page-container max-w-xl md:max-w-xl lg:max-w-2xl mx-auto py-10">
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold text-crimson-red">Change Password</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Update your password to keep your account secure.
          </p>
        </div>
        <ChangePasswordForm
          onSuccess={() => navigate(PATHS.DASHBOARD)}
          onCancel={() => navigate(PATHS.DASHBOARD)}
        />
      </div>
    </div>
  );
}
