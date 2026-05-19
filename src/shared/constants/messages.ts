export const MESSAGES = {
  auth: {
    loginSuccess: "Login successful",
    loginError: "Invalid email or password",
    logoutSuccess: "Logged out successfully",
    sessionExpired: "Session exporied, please login again",
    registerSuccess: "Account created successfully",
    registerError: "Account creation failed",
  },
  common: {
    saveSuccess: "Saved successfully",
    saveError: "Save failed, please try again",
    updateSuccess: "Updated successfully",
    updateError: "Update failed, please try again",
    deleteSuccess: "Deleted successfully",
    deleteError: "Delete failed, please try again",
    errorGeneric: "Something went wrong, please try again",
  },
} as const;
