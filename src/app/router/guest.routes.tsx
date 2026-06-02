import ResetPasswordPage from "@/pages/auth/ResetPasswordPage";
import VerifyOtpPage from "@/pages/auth/VerifyOtpPage";
import ForgotPasswordPage from "@/pages/forgot-password/ForgotPasswordPage";
import LoginPage from "@/pages/login/LoginPage";
import RegisterPage from "@/pages/register/RegisterPage";
import { PATHS } from "./paths";

export const guestRoutes = [
  {
    path: PATHS.LOGIN,
    element: <LoginPage />,
  },
  {
    path: PATHS.REGISTER,
    element: <RegisterPage />,
  },
  {
    path: PATHS.FORGOT_PASSWORD,
    element: <ForgotPasswordPage />,
  },
  {
    path: PATHS.VERIFY_OTP,
    element: <VerifyOtpPage />,
  },
  {
    path: PATHS.RESET_PASSWORD,
    element: <ResetPasswordPage />,
  },
];
