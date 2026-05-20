import { toast } from "sonner";

type ToastOptions = Parameters<typeof toast>[1];

export const notify = {
  success: (message: string, options?: ToastOptions) =>
    toast.success(message, { duration: 3000, ...options }),

  error: (message: string, options?: ToastOptions) =>
    toast.error(message, { duration: 5000, ...options }),

  warning: (message: string, options?: ToastOptions) =>
    toast.warning(message, { duration: 4000, ...options }),

  info: (message: string, options?: ToastOptions) =>
    toast.info(message, { duration: 3000, ...options }),
};
