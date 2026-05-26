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
  user: {
    firstName: "Your first name must be at least 2 characters",
    lastName: "Your last name must be at least 2 characters",
    dob: "Your age must be at least 16",
    phoneNumber: {
      existed: "Phone number already existed",
      format: "Phone number must be 10 digits, starting with 0. Example: 0974 xxx xxx",
    },
    email: {
      required: "Email required",
      blank: "Email must not be blank",
      format: "Must be a valid email with domain",
      existed: "Email already existed",
    },
    password: {
      invalid: "Your password must be at least 6 characters.",
      blank: "Password must not be blank",
      uppercase: "Password must contain at least one uppercase letter",
      lowercase: "Password must contain at least one lowercase letter",
      number: "Password must contain at least one digit",
      specialCharacters: "Password must contain at least one special character(@#$%&*!)",
    },
  },
  role: {
    notFound: "Role not found",
    blank: "Role name cannot be blank",
    format:
      "Role name must only contain uppercase letters, numbers, and the '_' character to separate words",
    existed: "Role already existed",
  },
  permission: {
    denied: "Permission denied",
    notFound: "Permission not found",
    blank: "Permission name cannot be blank",
    format:
      "Permisison name must only contain lowercase letters, ':', and the '_' character to separate words",
    existed: "Permission already existed",
  },
} as const;
